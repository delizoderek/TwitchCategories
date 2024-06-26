var true_check = false;
const temp = '<div class="Layout-sc-nxg1ff-0 hbYWXo side-nav-header" data-a-target="side-nav-header-expanded"><h2 class="CoreText-sc-cpl358-0 ezafKb">Followed Channels</h2></div>'
// Finds the right element, clicks the bonus button
function clickPoints() {
  console.log("Element detected.");

  // Get all clickable buttons inside 'community-points-summary'
  var elems = document
    .querySelector(".community-points-summary")
    .querySelectorAll("button");

  // Click each button, except for the first, which is the points spending menu
  elems.forEach(function (currentElem, index, arr) {
    if (index != 0) {
      // Click the button and display the console log
      console.log("Twitch Points Autoclicker: Clicked!");
      currentElem.click();

      // Record the collection to the storage
      updateClicks();
    }
  });
}

function updateClicks() {
  chrome.runtime.sendMessage({ clickedBonusPoints: 1 }, function (response) {
    if (chrome.runtime.lastError) {
      msg = {};
    } else {
      msg = msg || {};
    }
  });
}

// Check if user is opted into hiding bonus chests and hide them accordingly
function hideBonusPointsSection() {
  chrome.storage.sync.get(
    {
      hideBonusChests: false,
    },
    function (items) {
      var hideBonusChests = items.hideBonusChests;

      if (hideBonusChests) {
        var value = "none";
      } else {
        var value = "block";
      }

      if (
        document.body.contains(
          document.getElementsByClassName("community-points-summary")[0]
        )
      ) {
        // Chests themselves
        document.getElementsByClassName(
          "community-points-summary"
        )[0].children[1].style.display = value;
        // Floaty +50 text
        document.getElementsByClassName(
          "community-points-summary"
        )[0].children[0].children[3].style.display = value;
      }
    }
  );
}

//Answer background.js handshake
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === "check") {
    sendResponse({ status: "confirmed" });
  }
  if ("hideBonusChests" in msg) {
    sendResponse({ status: "ok" });
    hideBonusPointsSection();
  }
  if ("urlChanged" in msg) {
    true_check = true;
    setTimeout(checkPage, 5000);
    sendResponse({ status: "ok" });
  }
});

// Run main functions after 10 second delay to let other extensions load and potentially modify HTML
function main() {
  setTimeout(function () {
    console.log("Twitch Categories Initialized");
  }, 100);
}

function init() {
  document.querySelector('main').innerHTML = ''
  const followedChannels = document.querySelectorAll('a[data-a-id^="followed-channel"]');
  const doc = document.querySelector("div.side-bar-contents");
  // doc.classList.add('control-display')
  // const children = doc.children;
  const liveChannels = []
  for(let node of followedChannels){
    if(!node.firstChild.className.includes('offline')){
      liveChannels.push(node)
    }
  }
  const newCategory = buildCategory(liveChannels)
  console.log(newCategory)
  parent.insertBefore(newCategory,nodeFollowedChannels)
  // doc.appendChild()
  test()
}

function test(){
  var data = {
    title: "Constructing HTML Elements"
}

var template = [
    '<div class="tutorial">',
        '<h1 class="tutorial-heading">{{title}}<h1>',
    '</div>'
].join("\n");
// template: '<div ...>\n<h1 ...>{{title}}<h1>\n</div>'

var html = Mustache.render(template, data);
console.log(html)
}
console.log('init')
// main();
init()