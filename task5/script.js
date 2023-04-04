const inputPage = document.querySelector(".container-input-page");
const inputLimit = document.querySelector(".container-input-limit");
const btn = document.querySelector(".input-button");
const result = document.querySelector(".result");

if (JSON.parse(localStorage.getItem("images"))) {
  showCards();
}

const useRequest = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let imagesData = [];
      data.forEach((item) => {
        imagesData.push({
          imageSrc: item.download_url,
        });
      });
      localStorage.setItem("images", JSON.stringify(imagesData));
      showCards();
    })
    .catch(() => {
      console.log("error");
    });
};

function showCards() {
  let cards = "";
  const data = JSON.parse(localStorage.getItem("images"));

  data.forEach((item) => {
    const cardBlock = `
            <div class="result-images">
                <img class="result-images__img" src="${item.imageSrc}">
            </div>
        `;
    cards += cardBlock;
    result.innerHTML = cards;
  });
}

btn.addEventListener("click", async () => {
  if (
    (inputPage.value < 1 || inputPage.value > 10 || isNaN(inputPage.value)) &&
    (inputLimit.value < 1 || inputLimit.value > 10 || isNaN(inputLimit.value))
  ) {
    result.innerHTML = "page number and limit out of range 1 to 10";
  } else if (
    inputPage.value < 1 ||
    inputPage.value > 10 ||
    isNaN(inputPage.value)
  ) {
    result.innerHTML = "page number out of range 1 to 10";
  } else if (
    inputLimit.value < 1 ||
    inputLimit.value > 10 ||
    isNaN(inputLimit.value)
  ) {
    result.innerHTML = "limit number out of range 1 to 10";
  } else {
    await useRequest(
      `https://picsum.photos/v2/list?page=${inputPage.value}&limit=${inputLimit.value}`
    );
  }
});
