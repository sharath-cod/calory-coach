// Food structure equivalents
const vegFoods = [
  { name: "Apple", calories: 95 }, { name: "Banana", calories: 105 },
  { name: "Broccoli (1 cup)", calories: 55 }, { name: "Rice (1 cup cooked)", calories: 200 },
  { name: "Bread (1 slice)", calories: 70 }, { name: "Carrot", calories: 40 },
  { name: "Orange", calories: 62 }, { name: "Almonds (10 pieces)", calories: 70 },
  { name: "Yogurt (1 cup)", calories: 150 }, { name: "Spinach (1 cup)", calories: 7 },
  { name: "Cottage Cheese (1/2 cup)", calories: 100 }, { name: "Oatmeal (1 cup cooked)", calories: 154 },
  { name: "Peanut Butter (2 tbsp)", calories: 190 }, { name: "Avocado", calories: 240 }
];

const nonVegFoods = [
  { name: "Chicken (100g)", calories: 165 }, { name: "Banana", calories: 105 },
  { name: "Egg", calories: 70 }, { name: "Apple", calories: 95 },
  { name: "Broccoli (1 cup)", calories: 55 }, { name: "Rice (1 cup cooked)", calories: 200 },
  { name: "Bread (1 slice)", calories: 70 }, { name: "Carrot", calories: 40 },
  { name: "Orange", calories: 62 }, { name: "Almonds (10 pieces)", calories: 70 },
  { name: "Yogurt (1 cup)", calories: 150 }, { name: "Salmon (100g)", calories: 200 },
  { name: "Spinach (1 cup)", calories: 7 }, { name: "Cottage Cheese (1/2 cup)", calories: 100 },
  { name: "Oatmeal (1 cup cooked)", calories: 154 }, { name: "Peanut Butter (2 tbsp)", calories: 190 },
  { name: "Avocado", calories: 240 }
];

// Utility: Shuffle array
function shuffleFoods(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// BMR calculation (no activity level)
function calculateCalorieLevel(age, heightCm, weightKg, gender) {
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  bmr += gender === "M" ? 5 : -161;
  return bmr;
}

// Suggest food items
function suggestFood(calorieLevel, isVeg) {
  const foods = isVeg ? [...vegFoods] : [...nonVegFoods];
  shuffleFoods(foods);

  let totalCalories = 0;
  let suggestions = [];

  for (const food of foods) {
    if (totalCalories + food.calories <= calorieLevel) {
      suggestions.push(`${food.name} (${food.calories} calories)`);
      totalCalories += food.calories;
    }
    if (totalCalories >= calorieLevel) break;
  }

  let output = `<h3>To meet your calorie level of ${Math.round(calorieLevel)} calories, consider eating:</h3><ul>`;
  for (const item of suggestions) {
    output += `<li>${item}</li>`;
  }
  output += `</ul><strong>Total Calories Suggested: ${totalCalories}</strong>`;

  document.getElementById("suggestions").innerHTML = output;
}

// Input collection and validation
document.getElementById("calorie-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const isVeg = document.getElementById("isVeg").value === "1";

  if (!isNaN(age) && !isNaN(height) && !isNaN(weight)) {
    const calorieLevel = calculateCalorieLevel(age, height, weight);
    suggestFood(calorieLevel, isVeg);
  } else {
    alert("Please enter valid numbers for age, height, and weight.");
  }
});
// show result page instead of same page
const originalSuggest = suggestFood;

suggestFood = function(calorieLevel, isVeg){
  const foods = isVeg ? [...vegFoods] : [...nonVegFoods];
  shuffleFoods(foods);

  let totalCalories = 0;
  let suggestions = [];

  for (const food of foods) {
    if (totalCalories + food.calories <= calorieLevel) {
      suggestions.push(`${food.name} (${food.calories} calories)`);
      totalCalories += food.calories;
    }
    if (totalCalories >= calorieLevel) break;
  }

  let output = `<h3>To meet your calorie level of ${Math.round(calorieLevel)} calories:</h3><ul>`;
  for (const item of suggestions) {
    output += `<li>${item}</li>`;
  }
  output += `</ul><strong>Total Calories Suggested: ${totalCalories}</strong>`;

  document.querySelector(".container").style.display = "none";
  document.getElementById("resultPage").style.display = "block";
  document.getElementById("resultContent").innerHTML = output;
};

// back button
function goBack(){
  document.querySelector(".container").style.display = "block";
  document.getElementById("resultPage").style.display = "none";
}