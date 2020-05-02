import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";
function App() {
  const APP_ID = "53c99899";
  const APP_KEY = "5bcac43624cd4fde163db0d5b37859e3";
  const example_get = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

  const [recipes, setRecipes] = useState([]);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  //const [counter, setCounter] = useState(0);

  // useEffect(() => {
  //   console.log("Effect has been run");
  // }, []); //we can add a state here.. ie counter.. that means that this effect will run each time counter changes.
  //for now let's put the async call here... for our api

  useEffect(() => {
    console.log("Effect has been run");
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    //add await every time we have a promise
    const response = await fetch(
      `/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
    );
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
    //a diff way to write the promise:
    // fetch().then((response) => {
    //   response.json();
    // });
  };
  const updateSearch = (e) => {
    //console.log("hello nurse");
    setSearch(e.target.value);
    console.log("Hmm..:" + e.target.value);
  };

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={updateQuery}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit" value="Search">
          Cauta reteta
        </button>
      </form>
      {/* <h1 onClick={() => setCounter(counter + 1)}>{counter}</h1> */}
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
