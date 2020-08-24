import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import BoardView from './view/board.js';
import SortView from './view/sort.js';
import TaskView from './view/task.js';
import TaskEditView from './view/task-edit.js';
import LoadMoreButtonView from './view/load-more-button.js';
import {generateTasks} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {TASK_COUNT, TASK_COUNT_PER_STEP} from './constants.js';
import {render, replace, remove} from './utils/render.js';
import TaskList from './view/task-list.js';
import NoTaskView from './view/no-task.js';

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilter(tasks);

const renderTask = (container, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceFormToCard = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(container, taskComponent);
};


const renderBoard = () => {
  const siteMainElement = document.querySelector(`.main`);
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  render(siteHeaderElement, new SiteMenuView());
  render(siteMainElement, new FilterView(filters));

  const siteBoard = new BoardView();
  render(siteMainElement, siteBoard);
  if (tasks.every((task) => task.isArchive)) {
    render(siteBoard, new NoTaskView());
  } else {

    render(siteMainElement, siteBoard);
    render(siteBoard, new SortView());

    const siteBoardTaskElement = new TaskList().getElement();
    render(siteBoard, siteBoardTaskElement);

    for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
      renderTask(siteBoardTaskElement, tasks[i]);
    }

    let renderedTaskCount = TASK_COUNT_PER_STEP;
    if (tasks.length > TASK_COUNT_PER_STEP) {
      const loadMoreButton = new LoadMoreButtonView();
      render(siteBoard, loadMoreButton);

      loadMoreButton.setClickHandler(() => {
        tasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(siteBoardTaskElement, task));
        renderedTaskCount += TASK_COUNT_PER_STEP;
        if (renderedTaskCount >= tasks.length) {
          remove(loadMoreButton);
        }
      });
    }
  }
};

renderBoard();
