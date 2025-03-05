// Filter button selection logic

const filterButtons = Array.from(document.getElementsByClassName("filter-button"));
const allFoodButton = document.getElementById("all-button");

filterButtons.forEach(button => {
  button.addEventListener("click", () => selectFilter(button));
});

const selectFilter = (button) => {
  if (button === allFoodButton) {
    filterButtons.forEach(button => button.classList.remove("active-filter"));
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

// Sort button selection logic

const sortButtons = Array.from(document.getElementsByClassName("sorting-button"));
const sortStates = {};
const sortingEmojis = [" ↕️", " ⬆️", " ⬇️"];

sortButtons.forEach(button => {
  sortStates[button.innerText] = 0;
  button.innerText += sortingEmojis[0];
  button.addEventListener("click", () => selectSorting(button));
});

const selectSorting = (button) => {

  let buttonText = button.innerText.split(" ")[0];

  sortButtons.forEach(button => {
    button.classList.remove("active-sorting");
  })

  if (sortStates[buttonText] === 0) {
    sortStates[buttonText] = 1;
    button.innerText = buttonText + sortingEmojis[1];
  } else if (sortStates[buttonText] === 1) {
    sortStates[buttonText] = 2;
    button.innerText = buttonText + sortingEmojis[2];
  } else {
    sortStates[buttonText] = 0;
    button.innerText = buttonText + sortingEmojis[0];
  }

  if (sortStates[buttonText] !== 0) {
    button.classList.add("active-sorting");
  }

}