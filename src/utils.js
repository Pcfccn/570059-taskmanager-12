const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const formateDate = (date) => {
  return date !== null
    ? date.toLocaleString(`en-US`, {day: `numeric`, month: `long`})
    : ``;
};

const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  let currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate = new Date(currentDate);
  return currentDate.getTime() > dueDate.getTime();
};

const isRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return new Date(currentDate);
};

const isTaskExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }
  return getCurrentDate().getTime() > dueDate.getTime();
};

const isTaskExpiringToday = (dueDate) => {
  if (dueDate === null) {
    return false;
  }
  return getCurrentDate().getTime() === dueDate.getTime();
};


export {getRandomInteger, getRandomArrayElement, formateDate, isExpired, isRepeating, isTaskExpired, isTaskExpiringToday};
