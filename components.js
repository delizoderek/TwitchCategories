const header =
  '<div class="Layout-sc-nxg1ff-0 hbYWXo side-nav-header" data-a-target="side-nav-header-expanded"><h2 class="header-text">Cool Channels</h2></div>';

function htmlMarkupToNode(html) {
  let template = document.createElement("template");
  template.innerHTML = html;
  let node = template.content.cloneNode(true);
  return node;
}

function jsxStuff() {
  return (
    <a
      data-a-id="followed-channel-0"
      data-test-selector="followed-channel"
      class="ScCoreLink-sc-udwpw5-0 cmQKL InjectLayout-sc-588ddc-0 hqHHYw side-nav-card__link tw-link"
      href="/whippy"
    >
      <div class="Layout-sc-nxg1ff-0 kZFVrV side-nav-card__avatar">
        <figure
          aria-label="Whippy"
          class="ScAvatar-sc-12nlgut-0 dncwPH tw-avatar"
        >
          <img
            class="InjectLayout-sc-588ddc-0 iDjrEF tw-image tw-image-avatar"
            alt="Whippy"
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/178ca329-9f44-4719-bea8-6b474d3ec6bf-profile_image-70x70.png"
          />
        </figure>
      </div>
      <div class="Layout-sc-nxg1ff-0 blhocS">
        <div
          data-a-target="side-nav-card-metadata"
          class="Layout-sc-nxg1ff-0 bGPqDX"
        >
          <div class="Layout-sc-nxg1ff-0 gcwIMz side-nav-card__title">
            <p
              title="Whippy"
              data-a-target="side-nav-title"
              class="CoreText-sc-cpl358-0 gYupEs InjectLayout-sc-588ddc-0 emHXNr"
            >
              Whippy
            </p>
          </div>
          <div
            class="Layout-sc-nxg1ff-0 bXhxYI side-nav-card__metadata"
            data-a-target="side-nav-game-title"
          >
            <p title="Grand Theft Auto V" class="CoreText-sc-cpl358-0 ciPVTQ">
              Grand Theft Auto V
            </p>
          </div>
        </div>
        <div
          class="Layout-sc-nxg1ff-0 iiA-dIp side-nav-card__live-status"
          data-a-target="side-nav-live-status"
        >
          <div class="Layout-sc-nxg1ff-0 gcwIMz">
            <div
              class="ScChannelStatusIndicator-sc-1cf6j56-0 dtUsEc tw-channel-status-indicator"
              data-test-selector="0"
              aria-label="Live"
            ></div>
            <div class="Layout-sc-nxg1ff-0 gtLBqE">
              <span
                data-test-selector="1"
                aria-label="3.4K viewers"
                class="CoreText-sc-cpl358-0 iUznyJ"
              >
                3.4K
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
