
import BoardView from "../view/board.js";
import SortView from "../view/sort.js";
import TaskListView from "../view/task-list.js";
import NoTaskView from "../view/no-task.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import {render, remove} from "../utils/render.js";
import {TASK_COUNT_PER_STEP, renderPositions, sortTypes, userActions, updateTypes} from "../constants.js";
import {sortTaskUp, sortTaskDown} from "../utils/task.js";
import TaskPresenter from "./task.js";

export default class BoardPresenter {
  constructor(boardContainer, tasksModel) {
    this._boardContainer = boardContainer;
    this._currentSortType = sortTypes.DEFAULT;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._tasksModel = tasksModel;

    this._loadMoreButtonComponent = null;
    this._sortComponent = null;
    this._taskPresenter = {};

    this._boardComponent = new BoardView();
    this._noTaskComponent = new NoTaskView();
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

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const taskCount = this._getTasks().length;

    Object.values(this._taskPresenter).forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};

    remove(this._sortComponent);
    remove(this._noTaskComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedTaskCount) {
      this._renderedTaskCount = TASK_COUNT_PER_STEP;
    } else {
      this._renderedTaskCount = Math.min(taskCount, this._renderedTaskCount);
    }

    if (resetSortType) {
      this._currentSortType = sortTypes.DEFAULT;
    }
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

  _modelEventHandler(updateType, data) {
    switch (updateType) {
      case updateTypes.PATCH:
        this._taskPresenter[data.id].init(data);
        break;
      case updateTypes.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case updateTypes.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    render(this._boardComponent, this._sortComponent, renderPositions.AFTER_BEGIN);
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
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._loadMoreButtonClickHandler);
    render(this._boardComponent, this._loadMoreButtonComponent);
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
    const tasks = this._getTasks();
    const taskCount = tasks.length;

    if (!taskCount) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();
    this._renderTasks(tasks.slice(0, Math.min(taskCount, this._renderedTaskCount)));

    if (taskCount > this._renderedTaskCount) {
      this._renderLoadMoreButton();
    }
  }

  _viewActionHandler(actionType, updateType, update) {
    switch (actionType) {
      case userActions.UPDATE_TASK:
        this._tasksModel.updateTask(updateType, update);
        break;
      case userActions.ADD_TASK:
        this._tasksModel.addTask(updateType, update);
        break;
      case userActions.DELETE_TASK:
        this._tasksModel.deleteTask(updateType, update);
        break;
    }
  }
}
