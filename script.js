// Recipe data

const allRecipes = [
  {
    id: 1,
    title: "Vegan Lentil Soup",
    image: "./assets/ramen.jpg",
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: ["vegan"],
    cuisine: "Mexican",
    ingredients: [
      "red lentils",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "cumin",
      "paprika",
      "vegetable broth",
      "olive oil",
      "salt"
    ],
    pricePerServing: 2.5,
    popularity: 85
  },
  {
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image: "./assets/ramen.jpg",
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper"
    ],
    pricePerServing: 3.0,
    popularity: 92
  },
  {
    id: 3,
    title: "Gluten-Free Chicken Stir-Fry",
    image: "./assets/ramen.jpg",
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: ["gluten-free"],
    cuisine: "Thai",
    ingredients: [
      "chicken breast",
      "broccoli",
      "bell pepper",
      "carrot",
      "soy sauce (gluten-free)",
      "ginger",
      "garlic",
      "sesame oil",
      "cornstarch",
      "green onion",
      "sesame seeds",
      "rice"
    ],
    pricePerServing: 4.0,
    popularity: 78
  },
  {
    id: 4,
    title: "Dairy-Free Tacos",
    image: "./assets/ramen.jpg",
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: ["dairy-free"],
    cuisine: "Japanese",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado"
    ],
    pricePerServing: 2.8,
    popularity: 88
  },
  {
    id: 5,
    title: "Middle Eastern Hummus",
    image: "./assets/ramen.jpg",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/middle-eastern-hummus",
    diets: ["vegan", "gluten-free"],
    cuisine: "Indian",
    ingredients: [
      "chickpeas",
      "tahini",
      "garlic",
      "lemon juice",
      "olive oil"
    ],
    pricePerServing: 1.5,
    popularity: 95
  },
  {
    id: 6,
    title: "Quick Avocado Toast",
    image: "./assets/ramen.jpg",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://example.com/quick-avocado-toast",
    diets: ["vegan"],
    cuisine: "Italian",
    ingredients: [
      "bread",
      "avocado",
      "lemon juice",
      "salt"
    ],
    pricePerServing: 2.0,
    popularity: 90
  },
  {
    id: 7,
    title: "Beef Stew",
    image: "./assets/ramen.jpg",
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: [],
    cuisine: "Italian",
    ingredients: [
      "beef chunks",
      "potatoes",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "beef broth",
      "red wine",
      "bay leaves",
      "thyme",
      "salt",
      "black pepper",
      "butter",
      "flour",
      "celery",
      "mushrooms"
    ],
    pricePerServing: 5.5,
    popularity: 80
  }
];

// Display all recipes or filtered recipes

const loadAllRecipes = (recipes = allRecipes) => {
  
  const recipeGrid = document.querySelector(".recipe-grid-container");

  recipeGrid.innerHTML = "";

    recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.title}">
    <h3>${recipe.title}</h3>
    <hr>
    <p>Cuisine: ${recipe.cuisine}</p>
    <p>Time: ${recipe.readyInMinutes}</p>
    <hr>
    <p>Ingredients:</p>
    <ul class="ingredient-list">
      ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
    </ul>
    `;

    recipeGrid.appendChild(recipeCard);

  });
};

window.addEventListener("DOMContentLoaded", () => {
  loadAllRecipes();
});

// Filter button logic

const filterButtons = Array.from(document.getElementsByClassName("filter-button"));
const allFoodButton = document.getElementById("all-button");
const activeFilters = [];

filterButtons.forEach(button => {
  button.addEventListener("click", () => selectFilter(button));
});

const selectFilter = (button) => {
  const cuisine = button.innerText;

  if (button === allFoodButton) {
    activeFilters.length = 0;
    filterButtons.forEach(button => button.classList.remove("active-filter"));
    allFoodButton.classList.add("active-filter");
  } else {
    allFoodButton.classList.remove("active-filter");

    if (button.classList.contains("active-filter")) {
      button.classList.remove("active-filter");
      // Remove the filter from the array
      const index = activeFilters.indexOf(cuisine);
      if (index > -1) activeFilters.splice(index, 1);
    } else {
      button.classList.add("active-filter");
      activeFilters.push(cuisine);
    }
  }

  applyFilters();
};

const applyFilters = () => {
  let filteredRecipes = allRecipes;

  if (activeFilters.length > 0) {
    filteredRecipes = allRecipes.filter(recipe => 
      activeFilters.includes(recipe.cuisine)
    );
  }

  loadAllRecipes(filteredRecipes);
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

  sortButtons.forEach(btn => {
    let btnText = btn.innerText.split(" ")[0];

    if (btn !== button) {
    btn.innerText = btnText + sortingEmojis[0];
    sortStates[btnText] = 0;
    btn.classList.remove("active-sorting");
    }

  });

  if (sortStates[buttonText] === 0) {
    sortStates[buttonText] = 1;
    button.innerText = buttonText + sortingEmojis[1];
    button.classList.add("active-sorting");
  } else if (sortStates[buttonText] === 1) {
    sortStates[buttonText] = 2;
    button.innerText = buttonText + sortingEmojis[2];
  } else {
    sortStates[buttonText] = 0;
    button.innerText = buttonText + sortingEmojis[0];
    button.classList.remove("active-sorting");
  }

};

