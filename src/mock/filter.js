
import {isExpired, isRepeating, isTaskExpiringToday} from "../utils.js";

const taskToFilterMap = {
  all: (tasks) => tasks.filter((task) => !task.isArchive).length,
  overdue: (tasks) => tasks.filter((task) => !task.isArchive && isExpired(task.dueDate)).length,
  today: (tasks) => tasks.filter((task) => !task.isArchive && isTaskExpiringToday(task.dueDate)).length,
  favorites: (tasks) => tasks.filter((task) => !task.isArchive && task.isFavorite).length,
  repeating: (tasks) => tasks.filter((task) => !task.isArchive && isRepeating(task.repeating)).length,
  archive: (tasks) => tasks.filter((task) => task.isArchive).length,
};

const generateFilter = (tasks) => {
  return Object.entries(taskToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(tasks),
    };
  });
};

export {generateFilter};
