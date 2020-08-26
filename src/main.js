import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import {generateTasks} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {TASK_COUNT} from './constants.js';
import {render} from './utils/render.js';
import BoardPresenter from './presenter/board';

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView());
render(siteMainElement, new FilterView(filters));

boardPresenter.init(tasks);
