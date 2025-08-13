interface Recipe {
  title: string;
  description: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  tips?: string[];
}

// Mock AI service for recipe generation - replace with actual AI API
export const generateRecipeFromImage = async (imageFile: File): Promise<Recipe> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock response based on common food items - in a real app, this would analyze the image
  const mockRecipes: Recipe[] = [
    {
      title: "Classic Margherita Pizza",
      description: "A traditional Italian pizza with fresh basil, mozzarella, and tomato sauce on a crispy crust.",
      cookTime: "25 minutes",
      servings: "4 people",
      difficulty: "Medium",
      ingredients: [
        "1 pizza dough (store-bought or homemade)",
        "1/2 cup pizza sauce",
        "8 oz fresh mozzarella cheese, sliced",
        "1/4 cup fresh basil leaves",
        "2 tablespoons extra virgin olive oil",
        "Salt and pepper to taste",
        "1 tablespoon cornmeal (for dusting)"
      ],
      instructions: [
        "Preheat your oven to 475°F (245°C). If using a pizza stone, place it in the oven while preheating.",
        "Roll out the pizza dough on a floured surface to about 12 inches in diameter.",
        "Transfer dough to a pizza pan or parchment paper if using a pizza stone.",
        "Spread pizza sauce evenly over the dough, leaving a 1-inch border for the crust.",
        "Distribute mozzarella slices evenly over the sauce.",
        "Drizzle with olive oil and season with salt and pepper.",
        "Bake for 12-15 minutes until crust is golden and cheese is bubbly.",
        "Remove from oven and immediately top with fresh basil leaves.",
        "Let cool for 2-3 minutes before slicing and serving."
      ],
      tips: [
        "For a crispier crust, pre-bake the dough for 3-4 minutes before adding toppings",
        "Use fresh mozzarella for the best flavor and texture",
        "Don't overload with sauce to prevent a soggy bottom"
      ]
    },
    {
      title: "Fresh Garden Salad",
      description: "A crisp and refreshing salad with mixed greens, vegetables, and a light vinaigrette.",
      cookTime: "15 minutes",
      servings: "2-3 people",
      difficulty: "Easy",
      ingredients: [
        "4 cups mixed greens (arugula, spinach, lettuce)",
        "1 cup cherry tomatoes, halved",
        "1 cucumber, sliced",
        "1/2 red onion, thinly sliced",
        "1/4 cup feta cheese, crumbled",
        "2 tablespoons olive oil",
        "1 tablespoon balsamic vinegar",
        "1 teaspoon Dijon mustard",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Wash and dry all vegetables thoroughly.",
        "In a large salad bowl, combine mixed greens, cherry tomatoes, cucumber, and red onion.",
        "In a small bowl, whisk together olive oil, balsamic vinegar, and Dijon mustard.",
        "Season the dressing with salt and pepper to taste.",
        "Pour dressing over salad and toss gently to coat.",
        "Top with crumbled feta cheese.",
        "Serve immediately for best texture."
      ],
      tips: [
        "Chill all ingredients beforehand for a refreshing salad",
        "Add dressing just before serving to prevent wilting",
        "Try adding nuts or seeds for extra crunch"
      ]
    },
    {
      title: "Creamy Pasta Carbonara",
      description: "Rich and creamy Italian pasta dish with bacon, eggs, and Parmesan cheese.",
      cookTime: "20 minutes",
      servings: "4 people",
      difficulty: "Medium",
      ingredients: [
        "400g spaghetti or linguine",
        "200g bacon or pancetta, diced",
        "3 large eggs",
        "1 cup freshly grated Parmesan cheese",
        "2 cloves garlic, minced",
        "1/4 cup white wine (optional)",
        "Black pepper to taste",
        "Salt for pasta water",
        "Fresh parsley for garnish"
      ],
      instructions: [
        "Bring a large pot of salted water to boil and cook pasta according to package directions.",
        "While pasta cooks, fry bacon in a large skillet until crispy. Add garlic and cook 1 minute.",
        "If using wine, add it to deglaze the pan and let it reduce.",
        "In a bowl, whisk together eggs, Parmesan cheese, and plenty of black pepper.",
        "Reserve 1 cup of pasta cooking water before draining.",
        "Add hot, drained pasta to the skillet with bacon.",
        "Remove from heat and quickly stir in the egg mixture, adding pasta water gradually.",
        "Toss vigorously until creamy sauce forms without scrambling the eggs.",
        "Serve immediately with extra Parmesan and black pepper."
      ],
      tips: [
        "The key is working quickly and off heat when adding eggs to prevent scrambling",
        "Save some pasta water - the starch helps create a silky sauce",
        "Use freshly grated Parmesan for the best flavor"
      ]
    }
  ];

  // Return a random recipe for demo purposes
  return mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
};

// For a real implementation, you would use an AI vision API like:
/*
export const generateRecipeFromImage = async (imageFile: File): Promise<Recipe> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  const response = await fetch('/api/analyze-food', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze image');
  }
  
  return response.json();
};
*/