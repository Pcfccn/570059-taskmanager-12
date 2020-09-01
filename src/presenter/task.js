import TaskView from "../view/task";
import TaskEditView from "../view/task-edit";
import {replace, render} from "../utils/render";

export default class TaskPresenter {
  constructor(taskListContainer) {

    this._taskListContainer = taskListContainer;
    this._taskComponent = null;
    this._taskEditComponent = null;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(task) {
    this._task = task;
    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._taskComponent.setEditClickHandler(this._editClickHandler);
    this._taskEditComponent.setFormSubmitHandler(this._formSubmitHandler);

    render(this._taskListContainer, this._taskComponent);
  }


  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _editClickHandler() {
    this._replaceCardToForm();
  }

  _formSubmitHandler() {
    this._replaceFormToCard();
  }
}
