import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {COLORS, DESCRIPTIONS, maxDaysGap} from '../constants.js';

const generateDate = () => {

  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);
  return new Date(currentDate);
};

const generateDueDate = () => getRandomInteger(0, 1) ? generateDate() : null;

const generateRepeating = (dueDate) => {
  const week = {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  };

  if (!dueDate) {
    week.we = Boolean(getRandomInteger(0, 1));
    week.fr = Boolean(getRandomInteger(0, 1));
  }
  return week;
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

const generateTasks = (count = 1) => new Array(count).fill().map(generateTask);

export {generateTasks};
