import {renderPosition} from "./constants";

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

const renderElement = (container, element, place = renderPosition.BEFORE_END) => {
  switch (place) {
    case renderPosition.AFTER_BEGIN:
      container.prepand(element);
      break;
    case renderPosition.BEFORE_END:
      container.append(element);
  }
};

const renderTemplate = (container, template, place = renderPosition.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {getRandomInteger, getRandomArrayElement, formateDate, isExpired, isRepeating, isTaskExpiringToday, renderElement, renderTemplate, createElement};
