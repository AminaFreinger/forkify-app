import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
   _parentElement = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _addBtn = document.querySelector('.nav__btn--add-recipe');
    _closeBtn = document.querySelector('.btn--close-modal');
    _message = 'Recipe was successfully uploaded :)';
    _errorMessage = `Wrong recipe input data format. Please use correct format.`;

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._parentElement.classList.toggle('hidden');
    }

    _renderForm() {
        this._parentElement.insertAdjacentHTML('beforeend', this._generateFormMarkup());
    }

    // clearForm(){
    //     this._parentElement.innerHTML = '';
    // }

    _addHandlerShowWindow() {
        this._addBtn.addEventListener('click', this.toggleWindow.bind(this));
        this._renderForm();
    }
    _addHandlerHideWindow() {
        this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        document.querySelector('.upload').addEventListener('submit', function(e) {
            e.preventDefault();
            //will give an array that contains the data from all fields of the form
            const dataArr = [...new FormData(this)];
            //convert data to an object
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    _generateFormMarkup() {
        return `
        <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input required name="title" type="text" />
          <label>URL</label>
          <input required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input required name="image" type="text" />
          <label>Publisher</label>
          <input required name="publisher" type="text" />
          <label>Prep time</label>
          <input required name="cookingTime" type="number" />
          <label>Servings</label>
          <input required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>`;
    }

    _generateMarkup() {  
    }
};
export default new AddRecipeView();