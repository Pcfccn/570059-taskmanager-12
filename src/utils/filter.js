import {filterTypes} from "../constants";
import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from "./task";

export const filter = {
  [filterTypes.ALL]: (tasks) => tasks.filter((task) => !task.isArchive),
  [filterTypes.OVERDUE]: (tasks) => tasks.filter((task) => isTaskExpired(task.dueDate)),
  [filterTypes.TODAY]: (tasks) => tasks.filter((task) => isTaskExpiringToday(task.dueDate)),
  [filterTypes.FAVORITES]: (tasks) => tasks.filter((task) => task.isFavorite),
  [filterTypes.REPEATING]: (tasks) => tasks.filter((task) => isTaskRepeating(task.repeating)),
  [filterTypes.ARCHIVE]: (tasks) => tasks.filter((task) => task.isArchive)
};
