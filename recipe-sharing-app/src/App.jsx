import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';

// ✅ Import the new components
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

const App = () => {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <h1>Recipe Sharing App</h1>

        <AddRecipeForm />
        <SearchBar />

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>

        {/* ✅ Add the new components here */}
        <FavoritesList />
        <RecommendationsList />
      </div>
    </Router>
  );
};

export default App;
