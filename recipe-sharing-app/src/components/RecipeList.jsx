import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes added yet.</p>
      ) : (
        recipes.map((recipe) => {
          const isFavorite = favorites.includes(recipe.id);
          return (
            <div
              key={recipe.id}
              style={{
                border: '1px solid #ccc',
                padding: '8px',
                marginTop: '8px',
                borderRadius: '5px',
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>

              {/* ✅ Favorite button */}
              <button
                onClick={() =>
                  isFavorite
                    ? removeFavorite(recipe.id)
                    : addFavorite(recipe.id)
                }
              >
                {isFavorite ? '💔 Remove Favorite' : '❤️ Add to Favorites'}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecipeList;


