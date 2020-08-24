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
import {renderElement} from './utils.js';
import TaskList from './view/task-list.js';
import NoTaskView from './view/no-task.js';

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (container, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);
  const taskComponentElement = taskComponent.getElement();
  const taskEditComponentElement = taskEditComponent.getElement();

  const replaceCardToForm = () => {
    container.replaceChild(taskEditComponentElement, taskComponentElement);
  };

  const replaceFormToCard = () => {
    container.replaceChild(taskComponentElement, taskEditComponentElement);
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

  renderElement(container, taskComponentElement);
};


const renderBoard = () => {
  renderElement(siteHeaderElement, new SiteMenuView().getElement());
  renderElement(siteMainElement, new FilterView(filters).getElement());

  const siteBoardElement = new BoardView().getElement();
  renderElement(siteMainElement, siteBoardElement);
  if (tasks.every((task) => task.isArchive)) {
    renderElement(siteBoardElement, new NoTaskView().getElement());
  } else {

    renderElement(siteMainElement, siteBoardElement);
    renderElement(siteBoardElement, new SortView().getElement());

    const siteBoardTaskElement = new TaskList().getElement();
    renderElement(siteBoardElement, siteBoardTaskElement);

    for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
      renderTask(siteBoardTaskElement, tasks[i]);
    }

    let renderedTaskCount = TASK_COUNT_PER_STEP;
    if (tasks.length > TASK_COUNT_PER_STEP) {
      const loadMoreButton = new LoadMoreButtonView();
      const loadMoreButtonElement = loadMoreButton.getElement();
      renderElement(siteBoardElement, loadMoreButtonElement);

      loadMoreButton.setClickHandler(() => {
        tasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(siteBoardTaskElement, task));
        renderedTaskCount += TASK_COUNT_PER_STEP;
        if (renderedTaskCount >= tasks.length) {
          loadMoreButtonElement.remove();
          loadMoreButton.removeElement();
        }
      });
    }
  }
};

renderBoard();
