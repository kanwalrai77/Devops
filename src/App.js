import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      // Using TheMealDB API (no API key required)
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipes(data.meals.slice(0, 5)); // Get first 5 recipes
      setLoading(false);
    } catch (error) {
      setError('Error fetching recipes: ' + error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading delicious recipes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Delicious Recipes</h1>
        <p>Discover amazing dishes</p>
      </header>
      
      <main className="App-main">
        <div className="posts-container">
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="post-card">
              <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal}
                className="recipe-image"
              />
              <h2>{recipe.strMeal}</h2>
              <div className="recipe-info">
                <span>Category: {recipe.strCategory}</span>
                <span>Area: {recipe.strArea}</span>
              </div>
              <p className="recipe-summary">
                {recipe.strInstructions.substring(0, 150)}...
              </p>
              <div className="article-meta">
                <span>Recipe ID: {recipe.idMeal}</span>
                <a 
                  href={recipe.strSource} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="read-more"
                >
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="App-footer">
        <p>Powered by TheMealDB</p>
      </footer>
    </div>
  );
}

export default App;
