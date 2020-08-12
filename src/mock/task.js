import {getRandomInteger, getRandomArrayElement} from '../utils.js';
import {COLORS, DESCRIPTIONS} from '../consts.js';

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);
  return new Date(currentDate);
};

const generateDueDate = () => {
  return getRandomInteger(0, 1) ? generateDate() : null;
};

const generateRepeating = (dueDate) => {
  return dueDate === null ? {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false,
  } : {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  };
};

const generateTask = () => {
  const dueDate = generateDueDate();
  const repeating = generateRepeating(dueDate);
  return {
    description: getRandomArrayElement(DESCRIPTIONS),
    dueDate,
    repeating,
    color: getRandomArrayElement(COLORS),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

const generateTasks = (count = 1) => {
  const tasks = new Array(count).fill().map(generateTask);
  return tasks;
};

export {generateTasks};
