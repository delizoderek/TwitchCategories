// document.addEventListener('DOMSubtreeModified',(event) => {
// 	const [_, mainNav] = document.querySelectorAll(".simplebar-scroll-content")
// 	const sideNav = document.querySelectorAll(".simplebar-scroll-content div.side-nav-section")
// 	if(sideNav) {
// 		console.log("yeet", sideNav)
// 		sideNav.forEach((node) => {

// 			if(!node.ariaLabel.toLowerCase().includes('followed')){
// 					node.remove()
// 			}
// 		})
// 	}

// 	if(location.pathname === '/'){
// 		document.querySelector(".simplebar-scroll-content > .root-scrollable__content").style.visibility="hidden"
// 	} else {
// 		document.querySelector(".simplebar-scroll-content > .root-scrollable__content").style.visibility=""
// 	}

// 	if(mainNav){
// 		// mainNav.remove()
// 	}

// })

const [sideNav, mainNav] = document.querySelectorAll(
  ".simplebar-scroll-content"
);
const whitelist = new Set([
  "settings",
  "overweight_unicorn",
  "kawaiilhea02",
  "tipsilog",
]);

const path = location.pathname.split("/");

// if(!whitelist.has(path[1])){
// 	mainNav.remove()
// }

// function monitorLocationChange() {
// 	chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
// 		 // Tab id where the location change occurred
// 		 const tabId = details.tabId;
// 		 // New URL after the change
// 		 const newUrl = details.url;

//  // Callback function to be executed when the event is triggered
//  console.log(`Location changed in Tab ${tabId} to: ${newUrl}`);
//  // Put your custom logic or API calls here to respond to location changes.
// 	});
// }

// // Create a MutationObserver to watch for changes to the node's children
// var observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     // Check if the mutation was a childList change
//     if (mutation.type === 'childList') {
//       console.log('Child of node updated',mutation);
//     }
//   });
// });

// // Configure the observer to watch for childList changes
// var config = {
//   childList: true,
//   subtree: true
// };

// function timeoutFunction() {
//   const loadedSideNav = document.querySelectorAll(".simplebar-scroll-content div.side-nav-section")
//   console.log(loadedSideNav);
//   if (!loadedSideNav) {
//     setTimeout(timeoutFunction, 500);
//     console.log("Keyword not found.");
//   } else {
//     console.log("Keyword found.");

// 		// Start observing the node
// 		observer.observe(loadedSideNav[1], config);
// 		// loadedSideNav.forEach((node) => {

// 		// 	if(!node.ariaLabel.toLowerCase().includes('followed')){
// 		// 			node.remove()
// 		// 	}
// 		// })
//   }
// }

// setTimeout(timeoutFunction, 500);
// monitorLocationChange()

let nodeNav;

const config = {
  childList: true,
  subtree: true,
};

function createNewMenu() {
  const navNode = document.querySelector(".side-bar-contents nav");
  nodeNav = navNode.cloneNode(false);
  navNode.parentNode.prepend(nodeNav);
  navNode.style.visibility = "hidden";
}

function addNodes(nodeList) {
  nodeList.forEach((node) => {
    if (node.tagName === 'A') {
      nodeNav.appendChild(node.cloneNode(true));
    } else {
      const nodes = getNodes(node);
      if (nodes.linkNode) {
        nodeNav.appendChild(nodes.linkNode);
      }
    }
  });
}

function removeNodes(nodeList) {
  nodeList.forEach((node) => {
    const nodes = getNodes(node);
    const linkNodeToRemove = nodeNav.querySelector(
      `a[href="${nodes.linkNode.href}"]`
    );
    if (linkNodeToRemove) {
      linkNodeToRemove.remove();
    }
  });
}

const followedObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    try {
      // Check if the mutation was a childList change
      if (mutation.type === "childList") {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          addNodes(mutation.addedNodes);
        }

        if (mutation.removedNodes && mutation.removedNodes.length > 0) {
          removeNodes(mutation.removedNodes);
        }
      }
    } catch (error) {
      console.error("Error occurred in MutationObserver callback:", error);
    }
  });
});

const recommendedObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // Check if the mutation was a childList change
    if (mutation.type === "childList") {
      console.log("Child of node updated", mutation);
    }
  });
});

const suggestedObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // Check if the mutation was a childList change
    if (mutation.type === "childList") {
      console.log("Child of node updated", mutation);
    }
  });
});

function getNodes(parentNode) {
  const sideNavCard = parentNode.querySelector(".side-nav-card");
  if (!sideNavCard) return {};

  const gameTitleNode = sideNavCard.querySelector(".side-nav-card__metadata p");
  const imgNode = sideNavCard.querySelector(".tw-avatar img");
  const linkNode = sideNavCard.querySelector('a');
  const viewerCountNode = sideNavCard.querySelector(".jOVwMQ span");

  return { gameTitleNode, imgNode, linkNode, viewerCountNode };
}

const observer = new MutationObserver(function (mutations) {
  const loadedSideNav = document.querySelectorAll(
    ".simplebar-scroll-content div.side-nav-section"
  );

  if (loadedSideNav && loadedSideNav.length > 0) {
    createNewMenu();
    const [followed, recommended, suggested] = loadedSideNav;
    if (followed) {
      const followerNodes = followed.children[1].querySelectorAll("a");
      addNodes(followerNodes)
      followedObserver.observe(followed, config);
    }
    // if(recommended) recommendedObserver.observe(recommended, { childList: true, subtree: true });
    // if(suggested) suggestedObserver.observe(suggested, { childList: true, subtree: true });
    // Disconnect the old observer
    observer.disconnect();
  }
});

observer.observe(document.body, config);

// document.addEventListener("DOMContentLoaded", function () {
//   observer.observe(document.body, config);
// });
