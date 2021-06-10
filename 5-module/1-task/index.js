const button = document.querySelector('.hide-self-button');

function hideSelf() {
  button.addEventListener("click", () => {
    button.hidden = true;
  })
}