import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createBoardTemplate, createBoardTasksTemplate} from './view/board.js';
import {createSortTemplate} from './view/sort.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/task-edit.js';
import {createLoadMoreButtonTemplate} from './view/load-more-button.js';

const TASK_COUNT = 3;
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const render = (container, template, place = `beforEend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);

render(siteBoardElement, createSortTemplate());
render(siteBoardElement, createBoardTasksTemplate());

const siteBoardTaskElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTaskElement, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteBoardTaskElement, createTaskTemplate());
}

render(siteBoardElement, createLoadMoreButtonTemplate());
