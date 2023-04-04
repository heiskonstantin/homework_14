const inputWidth = document.querySelector(".container-input-width");
const inputHeight = document.querySelector(".container-input-height");
const btn = document.querySelector(".input-button");
const result = document.querySelector(".result");

const useRequest = (url) => {
  return fetch(url)
    .then((response) => {
      return response;
    })
    .then((data) => {
      const cardBlock = `
                    <div class="card">
                        <img class="result-images__img" src="${data.url}">
                    </div>
                    `;
      result.innerHTML = cardBlock;
    })
    .catch(() => {
      console.log("error");
    });
};

btn.addEventListener("click", async () => {
  if (
    inputWidth.value < 100 ||
    inputWidth.value > 300 ||
    isNaN(inputWidth.value)
  ) {
    result.innerHTML = "number outside the range from 100 to 300";
  } else if (
    inputHeight.value < 100 ||
    inputHeight.value > 300 ||
    isNaN(inputHeight.value)
  ) {
    result.innerHTML = "number outside the range from 100 to 300";
  } else {
    await useRequest(
      `https://picsum.photos/${inputWidth.value}/${inputHeight.value}`
    );
  }
});
