import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate, createBoardTasksTemplate} from './view/board.js';
import {createSortTemplate} from './view/sort.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/task-edit.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';
import {generateTasks} from './mock/task.js';
import {generateFilter} from './mock/filter.js';

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;
const tasks = generateTasks(TASK_COUNT);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place = `beforEend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);

render(siteBoardElement, createSortTemplate());
render(siteBoardElement, createBoardTasksTemplate());

const siteBoardTaskElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTaskElement, createTaskEditTemplate(tasks[0]));

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(siteBoardTaskElement, createTaskTemplate(tasks[i]));
}

let renderedTaskCount = TASK_COUNT_PER_STEP;
if (tasks.length > TASK_COUNT_PER_STEP) {
  render(siteBoardElement, createLoadMoreButtonTemplate());

  const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => render(siteBoardTaskElement, createTaskTemplate(task)));
    renderedTaskCount += TASK_COUNT_PER_STEP;
    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
