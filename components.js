const header =
  '<div class="Layout-sc-nxg1ff-0 hbYWXo side-nav-header" data-a-target="side-nav-header-expanded"><h2 class="header-text">Cool Channels</h2></div>';
const columnTemplate = templateFromHtml('<div class="flex-column"></div>');
const categories = ["category1", "category2"];
const followedChannels = document.querySelector('div[aria-label="Followed Channels"]')
const parent = followedChannels.parentNode
const followHeader = followedChannels.firstChild
const followText = followHeader.firstChild
followedChannels.classList = 'flex-column side-nav-section control-display'
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
parent.insertBefore(recommendedChannels,followedChannels)


function templateFromHtml(htmlString) {
  const template = document.createElement("template");
  template.innerHTML = htmlString;
  return template;
}

function buildCategory(channelList) {
  console.log(channelList[0])
  const outerContainer = document.createElement('div')
  outerContainer.appendChild(htmlMarkupToNode(header));
  const innerContainer = document.createElement('div');
  innerContainer.classList = 'flex-column side-nav-section'
  innerContainer.appendChild(channelList[0])
  innerContainer.appendChild(channelList[1])
  outerContainer.appendChild(innerContainer)
  return outerContainer
}

function htmlMarkupToNode(html) {
  let template = document.createElement("template");
  template.innerHTML = html;
  let node = template.content.cloneNode(true);
  return node;
}

class Category {
  constructor(name, visible, defCategory) {
    this._name = name;
    this._visible = visible;
    this.CategoryNode = defCategory
      ? this.#getDefaultCategory(defCategory)
      : this.#buildNewCategory();
  }

  #getDefaultCategory(defCategory) {
    const node = document.querySelector(
      `div[aria-label="${defCategory} Channels"]`
    );
    if (!node) return undefined;
    console.log(node);
  }

  #buildNewCategory() {
    const folders = categories.reduce(
      (acc, curr) => ({
        [curr]: columnTemplate.content.cloneNode(true),
        ...acc,
      }),
      {}
    );
    for (let i = 0; i < channelList.length; i++) {
      if (i % 2 === 0) folders["category2"].appendChild(channelList[i]);
      else folders["category1"].appendChild(channelList[i]);
    }
    console.log({ folders });
    const outerContainer = columnTemplate.content.cloneNode(true);
    outerContainer.appendChild(htmlMarkupToNode(header));
    // innerContainer.appendChild(docs)
    outerContainer.appendChild(folders["category1"]);
    outerContainer.appendChild(folders["category2"]);
    console.log({});
    return outerContainer;
  }
}
