import TaskEditView from "../view/task-edit.js";
import {generateId} from "../mock/task.js";
import {remove, render} from "../utils/render.js";
import {renderPositions, updateTypes, userActions} from "../constants.js";

export default class TaskNewPresenter {
  constructor(taskListContainer, changeData) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;

    this._taskEditComponent = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._taskEditComponent !== null) {
      return;
    }

    this._taskEditComponent = new TaskEditView();
    this._taskEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._taskEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    render(this._taskListContainer, this._taskEditComponent, renderPositions.AFTER_BEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._taskEditComponent === null) {
      return;
    }

    remove(this._taskEditComponent);
    this._taskEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _formSubmitHandler(task) {
    this._changeData(
        userActions.ADD_TASK,
        updateTypes.MINOR,
        Object.assign({id: generateId()}, task)
    );
    this.destroy();
  }

  _deleteClickHandler() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
