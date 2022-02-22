const API_URL = "https://clone-youtube-api-d5dmr.ondigitalocean.app/";

async function fetchData() {
  const response = await fetch(API_URL);
  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson;
}

function populateCategories(categories) {
  const categoriesListUl = document.querySelector(".categories__list");
  const categoriesHtmlArray = categories.map((category, index) => {
    return `
            <li class="categories__item">
                <button class="categories__button categories__button--${index === 0 ? "active" : "disabled"}">
                    ${category.name}
                </button>
            </li>
        `;
  });
  const categoriesHtml = categoriesHtmlArray.join(" ");
  categoriesListUl.insertAdjacentHTML("beforeend", categoriesHtml);
}

function populateSubscriptions (subscriptions){
  const subscriptionsListUl = document.querySelector(".subscriptions");
  const subscriptionsHtmlArray = subscriptions.map((subscription, index) => {
    return  ` 
              <li class="menu-group__item">
                <a href="${subscription.link}" class="menu-group__link">
                  <img src="${subscription.thumb}" alt="Canal Jacob Music" class="menu-group__icon menu-group__icon--image"/>
                  <span class="menu-group__text">${subscription.name}</span>
                  <span class="menu-group__alert"></span>
                </a>
              </li>
            `;
  });
  const subscriptionsHtml = subscriptionsHtmlArray.join(" ");
  subscriptionsListUl.insertAdjacentHTML("beforeend", subscriptionsHtml);
}

function secondsToMinutes(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  return {
    minutes,
    seconds
  };
}

function transformThousandsInK(thousands) {
  const thousandsString = String(thousands); // "27000"
  const thousandsLength = thousandsString.length; // 5
  if (thousandsLength < 4) {
    return thousands; // 900
  } else {
    return thousandsString.substring(0, thousandsLength - 3); //27000 -> |27|000
  }
}
function videoPublishedAgo(createdAt) {
  const now = new Date(); // data de agora
  const createdAtDate = new Date(createdAt); // data de criacao do video na api

  const dateNowTime = now.getTime();
  const createdAtTime = createdAtDate.getTime();

  const daysAgo = Math.floor((dateNowTime - createdAtTime) / (24 * 3600 * 1000));

  return daysAgo > 1 ? `${daysAgo} days ago` : `${daysAgo} day ago`;
}
function populateVideos (videos){
  const galleryListUl = document.querySelector(".gallery__list");
  const videosHtmlArray = videos.map((video, index) => {
    const time = secondsToMinutes(video.seconds);
    return  `
              <li class="gallery__item">
                <div class="gallery__video--thumb">
                  <img src="${video.thumb}" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit" class="gallery__video--img">
                  <span class="gallery__video--time">${time.minutes}:${time.seconds}</span>
                </div>
                <div class="gallery__video--info">
                  <div class="gallery__video--block--left">
                    <img src="./assets/images/video-user-avatar-01.png" alt="name profile" class="gallery__video--avatar">
                  </div> 
                  <div class="gallery__video--block--right">
                    <span class="gallery__video--name">${video.name}</span>
                    <span class="gallery__video--name--user">${video.author}
                      <svg class="gallery__video--icon--check" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10C7.76 10 10 7.76 10 5C10 2.24 7.76 0 5 0ZM3.96 7.965L1.485 5.49L2.51 4.465L3.96 5.915L7.635 2.24L8.66 3.265L3.96 7.965Z" fill="#727272"/>
                      </svg>  
                    </span>
                    <span class="gallery__video--text">${transformThousandsInK(video.views)}K views • ${videoPublishedAgo(video.createdAt)}</span>
                  </div>
                </div>
              </li>
            `;
  });
  const videosHtml = videosHtmlArray.join(" ");
  galleryListUl.insertAdjacentHTML("beforeend", videosHtml);
}
  

async function main() {
  const data = await fetchData();
  populateCategories(data.categories);
  populateSubscriptions(data.subscriptions);
  populateVideos(data.videos);
}
main();
