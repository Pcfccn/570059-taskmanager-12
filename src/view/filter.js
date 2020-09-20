import Abstract from "./abstract";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${type === currentFilterType ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
      value="${type}"
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join(``);

  return (
    `<section class="main__filter filter container">
      ${filterItemsTemplate}
    </section>`
  );
};

export default class FilterView extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
