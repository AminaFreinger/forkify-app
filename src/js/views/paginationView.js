import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerBtnClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const gotToPage = +btn.dataset.goto;
            handler(gotToPage);
        });
      }

    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        //Page 1, and there are other pages
        if(curPage === 1 && numPages > 1) {
            return this._generateMarkupBtn('next', curPage);
        }
        //Last page
        if(curPage === numPages && numPages > 1) {
            return this._generateMarkupBtn('prev', curPage)
        }
        //Other page
        if(curPage < numPages) {
            return this._generateMarkupBtn('prev', curPage) + this._generateMarkupBtn('next', curPage);
        }
        //Page 1, and there are no other pages
        return ``;
    }

    _generateMarkupBtn(type, cur) {
        return `<button data-goto="${type === 'prev' ? cur - 1 : cur + 1}" class="btn--inline pagination__btn--${type}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? cur - 1 : cur + 1}</span>
         </button>`;
    }
};

export default new PaginationView();