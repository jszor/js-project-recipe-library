// Filter button selection logic

let buttons = Array.from(document.getElementsByClassName("filter-button"));
let allFoodButton = document.getElementById("all-button");

buttons.forEach(button => {
  button.addEventListener("click", () => selectFilter(button));
});

const selectFilter = (button) => {
  if (button === allFoodButton) {
    buttons.forEach(button => button.classList.remove("active-filter"));
    allFoodButton.classList.add("active-filter");
  } else {
    allFoodButton.classList.remove("active-filter");
  }

  if (button.classList.contains("active-filter") && button !== allFoodButton) {
    button.classList.remove("active-filter");
  } else {
    button.classList.add("active-filter");
  }
}