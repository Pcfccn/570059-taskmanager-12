import Abstract from "./abstract";
import {sortTypes, targetTags} from "../constants";

const createSortTemplate = (currentSortType) => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter ${currentSortType === sortTypes.DEFAULT ? `board__filter--active` : ``}" data-sort-type="${sortTypes.DEFAULT}">SORT BY DEFAULT</a>
      <a href="#" class="board__filter ${currentSortType === sortTypes.DATE_UP ? `board__filter--active` : ``}" data-sort-type="${sortTypes.DATE_UP}">SORT BY DATE up</a>
      <a href="#" class="board__filter ${currentSortType === sortTypes.DATE_DOWN ? `board__filter--active` : ``}" data-sort-type="${sortTypes.DATE_DOWN}">SORT BY DATE down</a>
    </div>`
  );
};

export default class SortView extends Abstract {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== targetTags.link) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
