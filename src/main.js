import SiteMenuView from './view/site-menu.js';
import {generateTasks} from './mock/task.js';
import {TASK_COUNT} from './constants.js';
import {render} from './utils/render.js';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import TaskModel from './model/task.js';
import FilterModel from './model/filter.js';


const tasks = generateTasks(TASK_COUNT);

const tasksModel = new TaskModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuView());
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

filterPresenter.init();

boardPresenter.init();
