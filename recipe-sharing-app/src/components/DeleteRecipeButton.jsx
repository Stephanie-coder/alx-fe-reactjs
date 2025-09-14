import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/'); // go back to the home (recipe list) after deleting
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        marginTop: '10px',
        cursor: 'pointer',
        borderRadius: '4px',
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
