const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const formateDate = (date) => {
  return date !== null
    ? date.toLocaleString(`en-US`, {day: `numeric`, month: `long`})
    : ``;
};

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  return new Date(currentDate);
};


const isExpired = (dueDate) => (!dueDate) ? false : getCurrentDate().getTime() > dueDate.getTime();

const isRepeating = (repeating) => Object.values(repeating).some(Boolean);

const isTaskExpiringToday = (dueDate) => (!dueDate) ? false : getCurrentDate().getTime() === dueDate.getTime();

export {getRandomInteger, getRandomArrayElement, formateDate, isExpired, isRepeating, isTaskExpiringToday};
