const header =
  '<div class="Layout-sc-nxg1ff-0 hbYWXo side-nav-header" data-a-target="side-nav-header-expanded"><h2 class="header-text">Cool Channels</h2></div>';
const columnTemplate = templateFromHtml('<div class="flex-column"></div>');
const categories = ["category1", "category2"];
const nodeFollowedChannels = document.querySelector('div[aria-label="Followed Channels"]')
const parent = nodeFollowedChannels.parentNode
const followHeader = nodeFollowedChannels.firstChild
const followText = followHeader.firstChild
nodeFollowedChannels.classList = 'flex-column side-nav-section control-display'
// followHeader.classList = 'header-padding side-nav-header'
// followText.classList = 'header-text'
const recommendedChannels = document.querySelector('div[aria-label="Recommended Channels"]')
const recommendedHeader = recommendedChannels.firstChild
const recommendText = recommendedHeader.firstChild
const recChannelContainer = recommendedHeader.nextSibling
recommendedChannels.classList = 'flex-column side-nav-section'
recommendedHeader.classList = 'header-padding side-nav-header'
recommendText.classList = 'header-text'
recChannelContainer.style.background = 'red'
// parent.insertBefore(recommendedChannels,nodeFollowedChannels)


function templateFromHtml(htmlString) {
  const template = document.createElement("template");
  template.innerHTML = htmlString;
  return template;
}

function buildCategory(channelList) {
  console.log(channelList.length)
  const outerContainer = document.createElement('div')
  outerContainer.appendChild(htmlMarkupToNode(header));
  const innerContainer = document.createElement('div');
  innerContainer.classList = 'flex-column side-nav-section'
  channelList.forEach(element => innerContainer.appendChild(element));
  outerContainer.appendChild(innerContainer)
  return outerContainer
}

function htmlMarkupToNode(html) {
  let template = document.createElement("template");
  template.innerHTML = html;
  let node = template.content.cloneNode(true);
  return node;
}

// class ElementBuilder {
//   #header = 
// }