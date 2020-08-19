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

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

renderElement(siteHeaderElement, new SiteMenuView().getElement());
renderElement(siteMainElement, new FilterView(filters).getElement());

const siteBoardElement = new BoardView().getElement();
renderElement(siteMainElement, siteBoardElement);
renderElement(siteBoardElement, new SortView().getElement());

const siteBoardTaskElement = new TaskList().getElement();
renderElement(siteBoardElement, siteBoardTaskElement);

const renderTask = (task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);
  const taskComponentElement = taskComponent.getElement();
  const taskEditComponentElement = taskEditComponent.getElement();

  const replaceCardToForm = () => {
    siteBoardTaskElement.replaceChild(taskEditComponentElement, taskComponentElement);
  };

  const replaceFormToCard = () => {
    siteBoardTaskElement.replaceChild(taskComponentElement, taskEditComponentElement);
  };

  taskComponentElement.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponentElement.querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  renderElement(siteBoardTaskElement, taskComponentElement);
};

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTask(tasks[i]);
}

let renderedTaskCount = TASK_COUNT_PER_STEP;
if (tasks.length > TASK_COUNT_PER_STEP) {
  const loadMoreButton = new LoadMoreButtonView();
  const loadMoreButtonElement = loadMoreButton.getElement();
  renderElement(siteBoardElement, loadMoreButtonElement);

  loadMoreButtonElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderTask(task));
    renderedTaskCount += TASK_COUNT_PER_STEP;
    if (renderedTaskCount >= tasks.length) {
      loadMoreButtonElement.remove();
      loadMoreButton.removeElement();
    }
  });
}
