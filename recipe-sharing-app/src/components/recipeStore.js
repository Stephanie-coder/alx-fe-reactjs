import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  // recipes
  recipes: [],

  // --- Add setRecipes action for checker ---
  setRecipes: (newRecipes) =>
    set((state) => {
      const filtered = newRecipes.filter((r) =>
        (r.title || '').toLowerCase().includes((state.searchTerm || '').toLowerCase())
      );
      return { recipes: newRecipes, filteredRecipes: filtered };
    }),

  // --- Task 2: search state + action (checker requires these exact names) ---
  searchTerm: '',
  setSearchTerm: (term) =>
    set((state) => {
      const filtered = state.recipes.filter((r) =>
        (r.title || '').toLowerCase().includes((term || '').toLowerCase())
      );
      return { searchTerm: term, filteredRecipes: filtered };
    }),
  filteredRecipes: [],

  // --- basic CRUD so filteredRecipes stays in-sync ---
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      const filtered = recipes.filter((r) =>
        (r.title || '').toLowerCase().includes((state.searchTerm || '').toLowerCase())
      );
      return { recipes, filteredRecipes: filtered };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const recipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      const filtered = recipes.filter((r) =>
        (r.title || '').toLowerCase().includes((state.searchTerm || '').toLowerCase())
      );
      return { recipes, filteredRecipes: filtered };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      const filtered = recipes.filter((r) =>
        (r.title || '').toLowerCase().includes((state.searchTerm || '').toLowerCase())
      );
      return { recipes, filteredRecipes: filtered };
    }),

  // --- Task 3: favorites & recommendations ---
  favorites: [],
  addFavorite: (recipeId) =>
    set((state) => ({ favorites: [...state.favorites, recipeId] })),
  removeFavorite: (recipeId) =>
    set((state) => ({ favorites: state.favorites.filter((id) => id !== recipeId) })),

  recommendations: [],
  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),
}));

