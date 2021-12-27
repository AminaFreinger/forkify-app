import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function() {
  try{
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();

    //0)Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    //1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //2) loading recipe
    //the function will return a promise that's why we should 'await' it
    await model.loadRecipe(id);

    //3) rendering recipe
    //the method from the RecipeView class that renders the received data and saves it in the class
    recipeView.render(model.state.recipe);
  } catch(err){
    //we do not pass any arg into the renderError() fun to use its default arg value
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try{
  resultsView.renderSpinner();
  //1) Get search query
  const query = searchView.getQuery();
  if(!query) throw err;
  //2) Load search results
  await model.loadSearchResults(query);
  //3) Render results
  ///resultsView.render(model.state.search.results); //loads all results
   resultsView.render(model.getSearchResultsPage());

   //4) Render initial pagination buttons
   paginationView.render(model.state.search);
  } catch(err){
    resultsView.renderError(resultsView._errorMessage);
  }
};

const controlPagination = function(goToPage) {
  //1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function() {
  //1) add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  //2) update recipe view
  recipeView.update(model.state.recipe);
  //3) render the bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
  try{
    //Show loading spinner
    addRecipeView.renderSpinner();
    //upload new recipe
    //'uploadRecipe' is an async function that returns a promise. We should await for it to handle it
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //Success message
    addRecipeView.renderMessage();

    //change ID in the URL
    window.history.pushState(null,'',`#${model.state.recipe.id}`);

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //close form window
    setTimeout(function() {
      addRecipeView.toggleWindow();
      location.reload();
    }, MODAL_CLOSE_SEC * 1000);

  } catch(err){
    console.error(`${err} 🔥`);
    //addRecipeView.renderError(err.message);
    alert(`${addRecipeView._errorMessage} ${err}`);
  }

};

//If the function will always be called with the start of an app, then IIFE is ok to be used for the 'init' function.
//If it will be called, for example, on some event then you can't use IIFE.
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks); 
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); 
  paginationView.addHandlerBtnClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
