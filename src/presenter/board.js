
import BoardView from "../view/board.js";
import SortView from "../view/sort.js";
import TaskListView from "../view/task-list.js";
import NoTaskView from "../view/no-task.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import {render, remove} from "../utils/render.js";
import {TASK_COUNT_PER_STEP, renderPosition, sortTypes} from "../constants.js";
import {sortTaskUp, sortTaskDown} from "../utils/task.js";
import TaskPresenter from "./task.js";
import {updateItem} from "../utils/common.js";

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
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._taskChangeHandler = this._taskChangeHandler.bind(this);
    this._modeChangeHandler = this._modeChangeHandler.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    this._sourcedBoardTasks = boardTasks.slice();

    render(this._boardContainer, this._boardComponent);
    render(this._boardComponent, this._taskListComponent);

    this._renderBoard();
  }

  _getTasks() {
    return this._tasksModel.getTasks();
  }

  _modeChangeHandler() {
    Object
      .values(this._taskPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case sortTypes.DATE_UP:
        this._boardTasks.sort(sortTaskUp);
        break;
      case sortTypes.DATE_DOWN:
        this._boardTasks.sort(sortTaskDown);
        break;
      default:
        this._boardTasks = this._sourcedBoardTasks.slice();
    }

    this._currentSortType = sortType;
    this._clearTaskList();
    this._renderTaskList();
  }

  _sortTypeChangeHandler(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, renderPosition.AFTER_BEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }


  _renderTask(task) {
    const taskPresenter = new TaskPresenter(this._taskListComponent, this._taskChangeHandler, this._modeChangeHandler);
    taskPresenter.init(task);
    this._taskPresenter[task.id] = taskPresenter;
  }

  _renderTasks(from, to) {
    this._boardTasks.slice(from, to)
      .forEach((boardTask) => this._renderTask(boardTask));
  }

  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent);
  }

  _loadMoreButtonClickHandler() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);
    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
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
    this._renderTasks(0, Math.min(this._boardTasks.length, this._renderedTaskCount));

    if (this._boardTasks.length > this._renderedTaskCount) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();
    this._renderTaskList();
  }

  _taskChangeHandler(updatedTask) {
    this._boardTasks = updateItem(this._boardTasks, updatedTask);
    this._sourcedBoardTasks = updateItem(this._sourcedBoardTasks, updatedTask);
    this._taskPresenter[updatedTask.id].init(updatedTask);
  }
}
