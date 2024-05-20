class StateManager {
  constructor() {
    this.state = new Map();
  }

  initState(anchorNodes) {
    anchorNodes.forEach((node) => {
      const streamerLink = node.getAttribute("href");
      const viewerCount = parseInt(
        node.querySelector('[data-a-target="side-nav-live-status"] span')
          .textContent
      );
      const online = Number.isSafeInteger(viewerCount);
      const imgSrc = node.querySelector("img").getAttribute("src");
      const streamerHandle = node.querySelector(
        ".side-nav-card__title p"
      ).textContent;
      const streamerCategory = node.querySelector(
        '[data-a-target="side-nav-game-title"] p'
      ).textContent;

      this.state.set(streamerLink, {
        online,
        viewerCount,
        imgSrc,
        streamerHandle,
        streamerLink,
        streamerCategory,
      });
    });

    console.log("Initial State:", this.state);
  }

  onUpdate(newAnchorNodes) {
    const newState = new Map();
    newAnchorNodes.forEach((node) => {
      if (node) {
        const streamerLink = node?.getAttribute("href");
        const online = node.querySelector("div.side-nav-card__avatar") !== null;
        const viewerCount = online
          ? parseInt(
              node.querySelector("span.CoreText-sc-1txzju1-0.gWcDEo")
                .textContent
            )
          : 0;
        const imgSrc = node.querySelector(
          "img.InjectLayout-sc-1i43xsx-0.cXFDOs.tw-image.tw-image-avatar"
        ).src;
        const streamerHandle = node
          .querySelector(
            "p.CoreText-sc-1txzju1-0.fdYGpZ.HcPqQ.InjectLayout-sc-1i43xsx-0"
          )
          .textContent.trim();
        const streamerCategory = node
          .querySelector("p.CoreText-sc-1txzju1-0.eUABfN")
          .textContent.trim();

        newState.set(streamerLink, {
          online,
          viewerCount,
          imgSrc,
          streamerHandle,
          streamerLink,
          streamerCategory,
        });
      }
    });

    // Determine which fields need to be created, updated, or deleted
    const addedKeys = [...newState.keys()].filter(
      (key) => !this.state.has(key)
    );
    const updatedKeys = [...newState.keys()].filter(
      (key) =>
        this.state.has(key) &&
        JSON.stringify(this.state.get(key)) !==
          JSON.stringify(newState.get(key))
    );

    console.log("Added keys:", addedKeys);
    console.log("Updated keys:", updatedKeys);

    // this.state = newState;
  }

  onDelete(anchorNodes) {
    anchorNodes.forEach((node) => {
      const streamerLink = node.getAttribute("href");
      if (this.state.has(streamerLink)) {
        this.state.delete(streamerLink);
      }
    });
    console.log("Updated State:", this.state);
  }

  createAnchorNode(temp) {
    const [streamer] = this.state.values();
    const anchorNode = document.createElement("a");
    anchorNode.href = streamer.streamerLink;
    anchorNode.className =
      "ScCoreLink-sc-16kq0mq-0 eBmhqT InjectLayout-sc-1i43xsx-0 ivecvv side-nav-card__link tw-link";
    anchorNode.setAttribute("data-a-id", "followed-channel-0");
    anchorNode.setAttribute("data-test-selector", "followed-channel");
    anchorNode.setAttribute("aria-haspopup", "dialog");

    const avatarDiv = document.createElement("div");
    avatarDiv.className = streamer.online
      ? "side-nav-card__avatar"
      : "side-nav-card__avatar--offline";
    const img = document.createElement("img");
    img.src = streamer.imgSrc;
    img.alt = streamer.streamerHandle;
    avatarDiv.appendChild(img);
    anchorNode.appendChild(avatarDiv);

    const metadataDiv = document.createElement("div");
    metadataDiv.className = "Layout-sc-1xcs6mc-0 cxkdpa";
    const titleDiv = document.createElement("div");
    titleDiv.className = "Layout-sc-1xcs6mc-0 xxjeD side-nav-card__title";
    const titleP = document.createElement("p");
    titleP.textContent = streamer.streamerHandle;
    titleP.title = streamer.streamerHandle;
    titleP.className =
      "CoreText-sc-1txzju1-0 fdYGpZ HcPqQ InjectLayout-sc-1i43xsx-0";
    titleDiv.appendChild(titleP);
    metadataDiv.appendChild(titleDiv);
    anchorNode.appendChild(metadataDiv);

    // Add other metadata elements as needed...

    return anchorNode;
  }
}
