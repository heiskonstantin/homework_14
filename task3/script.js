const input = document.querySelector(".container-input");
const btn = document.querySelector(".input-button");
const result = document.querySelector(".result");

function useRequest(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    } else {
      console.log("response status: " + xhr.status);
    }
  };

  xhr.onerror = function () {
    console.log("error! response status: " + xhr.status);
  };
  xhr.send();
}

function showResult(apiData) {
  let cards = "";

  apiData.forEach((item) => {
    const cardBlock = `
        <div class="result-images">
         <img class="result-images__img" src="${item.download_url}">
            <p class="result-images__title">${item.author}</p>
        </div>
        `;
    cards += cardBlock;
    result.innerHTML = cards;
  });
}

btn.addEventListener("click", () => {
  if (input.value < 1 || input.value > 10 || isNaN(input.value)) {
    result.innerHTML = "number outside the range from 1 to 10";
  } else {
    useRequest(
      `https://picsum.photos/v2/list/?limit=${input.value}`,
      showResult
    );
  }
});
