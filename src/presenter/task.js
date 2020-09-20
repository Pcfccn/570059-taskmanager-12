import TaskView from "../view/task";
import TaskEditView from "../view/task-edit";
import {replace, render, remove} from "../utils/render";
import {mode, keyboardKey, userActions, updateTypes} from "../constants";
import {isDatesEqual, isTaskRepeating} from "../utils/task";

export default class TaskPresenter {
  constructor(taskListContainer, changeData, changeMode) {

    this._taskListContainer = taskListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._mode = mode.DEFAULT;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._archiveClickHandler = this._archiveClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(task) {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._taskComponent.setEditClickHandler(this._editClickHandler);
    this._taskComponent.setFavoriteClickHandler(this._favoriteClickHandler);
    this._taskComponent.setArchiveClickHandler(this._archiveClickHandler);
    this._taskEditComponent.setFormSubmitHandler(this._formSubmitHandler);
    this._taskEditComponent.setDeleteClickHandler(this._deleteClickHandler);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this._taskListContainer, this._taskComponent);
      return;
    }

    if (this._mode === mode.DEFAULT) {
      replace(this._taskComponent, prevTaskComponent);
    }

    if (this._mode === mode.EDITING) {
      replace(this._taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }

  resetView() {
    if (this._mode !== mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }


  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === keyboardKey.ESCAPE || evt.key === keyboardKey.ESC) {
      evt.preventDefault();
      this._taskEditComponent.reset(this._task);
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _editClickHandler() {
    this._replaceCardToForm();
  }

  _formSubmitHandler(update) {
    const isMinorUpdate =
      !isDatesEqual(this._task.dueDate, update.dueDate) ||
      isTaskRepeating(this._task.repeating) !== isTaskRepeating(update.repeating);

    this._changeData(
        userActions.UPDATE_TASK,
        isMinorUpdate ? updateTypes.MINOR : updateTypes.PATCH,
        update
    );
    this._replaceFormToCard();
  }

  _deleteClickHandler(task) {
    this._changeData(
        userActions.DELETE_TASK,
        updateTypes.MINOR,
        task
    );
  }

  _favoriteClickHandler() {
    this._changeData(
        userActions.UPDATE_TASK,
        updateTypes.MINOR,
        Object.assign({}, this._task, {isFavorite: !this._task.isFavorite}));
  }

  _archiveClickHandler() {
    this._changeData(
        userActions.UPDATE_TASK,
        updateTypes.MINOR,
        Object.assign({}, this._task, {isArchive: !this._task.isArchive}));
  }
}
