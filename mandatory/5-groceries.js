/*
As you you can have an Array of Objects, you can also store Arrays in Objects.

In this exercise, you'll practice:
 - How to loop through the properties (keys) of an Object and read its values.
 - How to access an Array stored inside an Object.
 - How to access a specific property of an object and set it.

You're going shopping, and you need a shopping list. You've already created your weekly meal plan
that contains the missing ingredients for your menus. It is stored in the "weeklyMealPlan" object.
Complete the exercises below.
*/

// Here is your
let weeklyMealPlan = {
  monday: ["Cheese", "Eggs", "Tomato", "Paprika", "Leek"],
  tuesday: ["Wrap", "Tuna", "Canned beans", "Cheese", "Carrot", "Aubergine"],
  wednesday: ["Orange Juice", "Apple", "Ananas", "Black tea"],
  thursday: ["Lamb", "Salt", "Bulgur", "Potato"],
  friday: ["Rice milk", "Blueberries", "Porridge", "Banana", "Cinnamon"],
  saturday: ["Olive oil", "Potato", "Salmon", "Asparagus"],
  sunday: [],
};

/*
Exercise 1:
  Loop through the weekly meal plan object to gather weekly ingredients into the weeklyGroceriesToBuy array.
  The weeklyGroceriesToBuy array shouldn't contain any repeating items.
*/
// Gather all week item names into this array

// It took a while to solve this, originally I tried to solve it using flatMap() (which seems awesome!), but then realised
// the map() component wasn't required and that there was a flat() function on its own I could use. Hopefully its ok to solve it like
// this as I was also thinking about using .concat() or the spread operator as an alternative.

let allWeeklyIngredients = Object.values(weeklyMealPlan).flat();

let weeklyGroceriesToBuy = allWeeklyIngredients.filter((ingredient, index) => {
  return allWeeklyIngredients.indexOf(ingredient) === index;
});

/*
Exercise 2:
  Loop through your list again, but now only collect the weekend items into the weekendGroceriesToBuy array.
*/
// Gather weekend item names into this array

let allWeekendIngredients = Object.keys(weeklyMealPlan)
  .map((key) => {
    if (key === "saturday" || key === "sunday") {
      return Object.values(weeklyMealPlan[key]);
    }
  })
  .flat();

let weekendGroceriesToBuy = allWeekendIngredients.filter(
  (ingredient, index) => {
    return (
      ingredient !== undefined &&
      allWeekendIngredients.indexOf(ingredient) === index
    );
  }
);

/*
Exercise 3:
  Loop through your weekly meal plan:
    - count how many ingredients you should buy each day
    - and update the corresponding properties of numberOfItemsPerWeek object.

*/
// Gather daily item counts into this object
let numberOfItemsPerWeek = {
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0,
  sunday: 0,
};

let itemsPerDay = Object.keys(numberOfItemsPerWeek).forEach((day) => {
  numberOfItemsPerWeek[day] = Object.keys(weeklyMealPlan[day]).length;
});

/* ======= TESTS - DO NOT MODIFY ===== 
- To run the tests for this exercise, run `npm test -- --testPathPattern 5-groceries.js`
- To run all exercises/tests in the mandatory folder, run `npm test`
- (Reminder: You must have run `npm install` one time before this will work!)
*/

test("Exercise 1 - Weekly groceries to buy contains correct items", () => {
  const expectedWeeklyGroceriesToBuy = [
    "Cheese",
    "Eggs",
    "Tomato",
    "Paprika",
    "Leek",
    "Wrap",
    "Tuna",
    "Canned beans",
    "Carrot",
    "Aubergine",
    "Orange Juice",
    "Apple",
    "Ananas",
    "Black tea",
    "Lamb",
    "Salt",
    "Bulgur",
    "Potato",
    "Rice milk",
    "Blueberries",
    "Porridge",
    "Banana",
    "Cinnamon",
    "Olive oil",
    "Salmon",
    "Asparagus",
  ];
  expect(weeklyGroceriesToBuy).toIncludeSameMembers(
    expectedWeeklyGroceriesToBuy
  );
});

test("Exercise 2 - Weekend groceries to buy contains correct items", () => {
  const expectedWeekendGroceriesToBuy = [
    "Olive oil",
    "Potato",
    "Salmon",
    "Asparagus",
  ];
  expect(weekendGroceriesToBuy).toIncludeSameMembers(
    expectedWeekendGroceriesToBuy
  );
});

test("Exercise 3 - Numer of items per week contains the correct counts", () => {
  const expectedNumberOfItemsPerWeek = {
    monday: 5,
    tuesday: 6,
    wednesday: 4,
    thursday: 4,
    friday: 5,
    saturday: 4,
    sunday: 0,
  };
  expect(numberOfItemsPerWeek).toEqual(expectedNumberOfItemsPerWeek);
});
