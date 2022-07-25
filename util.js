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