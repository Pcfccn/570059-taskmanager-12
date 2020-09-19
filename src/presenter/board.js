
import BoardView from "../view/board.js";
import SortView from "../view/sort.js";
import TaskListView from "../view/task-list.js";
import NoTaskView from "../view/no-task.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import {render, remove} from "../utils/render.js";
import {TASK_COUNT_PER_STEP, renderPosition, sortTypes} from "../constants.js";
import {sortTaskUp, sortTaskDown} from "../utils/task.js";
import TaskPresenter from "./task.js";

export default class BoardPresenter {
  constructor(boardContainer, tasksModel) {
    this._boardContainer = boardContainer;
    this._tasksModel = tasksModel;
    this._currentSortType = sortTypes.DEFAULT;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._taskPresenter = {};

    this._boardComponent = new BoardView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._noTaskComponent = new NoTaskView();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();

    this._loadMoreButtonClickHandler = this._loadMoreButtonClickHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
    this._modelEventHandler = this._modelEventHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._viewActionHandler = this._viewActionHandler.bind(this);

    this._tasksModel.addObserver(this._modelEventHandler);
  }

  init() {
    render(this._boardContainer, this._boardComponent);
    render(this._boardComponent, this._taskListComponent);

    this._renderBoard();
  }

  _getTasks() {
    switch (this._currentSortType) {
      case sortTypes.DATE_UP:
        return this._tasksModel.getTasks().slice().sort(sortTaskUp);
      case sortTypes.DATE_DOWN:
        return this._tasksModel.getTasks().slice().sort(sortTaskDown);
    }

    return this._tasksModel.getTasks();
  }

  _modeChangeHandler() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTaskList();
    this._renderTaskList();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, renderPosition.AFTER_BEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }


  _renderTask(task) {
    const taskPresenter = new TaskPresenter(this._taskListComponent, this._viewActionHandler, this._modeChangeHandler);
    taskPresenter.init(task);
    this._taskPresenter[task.id] = taskPresenter;
  }

  _renderTasks(tasks) {
    tasks.forEach((task) => this._renderTask(task));
  }

  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent);
  }

  _loadMoreButtonClickHandler() {
    const taskCount = this._getTasks().length;
    const newRenderedTaskCount = Math.min(taskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);
    const tasks = this._getTasks().slice(this._renderedTaskCount, newRenderedTaskCount);

    this._renderTasks(tasks);
    this._renderedTaskCount = newRenderedTaskCount;

    if (this._renderedTaskCount >= taskCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._boardComponent, this._loadMoreButtonComponent);
    this._loadMoreButtonComponent.setClickHandler(this._loadMoreButtonClickHandler);
  }

  _clearTaskList() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  _renderTaskList() {
    const taskCount = this._getTasks().length;
    const tasks = this._getTasks().slice(0, Math.min(taskCount, TASK_COUNT_PER_STEP));

    this._renderTasks(tasks);
    if (taskCount > this._renderedTaskCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._getTasks().every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();
    this._renderTaskList();
  }

  // _taskChangeHandler(updatedTask) {
  //   this._boardTasks = updateItem(this._boardTasks, updatedTask);
  //   this._sourcedBoardTasks = updateItem(this._sourcedBoardTasks, updatedTask);
  //   this._taskPresenter[updatedTask.id].init(updatedTask);
  // }

  _viewActionHandler(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _modelEventHandler(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }
}
