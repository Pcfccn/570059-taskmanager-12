import {renderPositions} from "../constants";
import Abstract from "../view/abstract";

const render = (container, element, place = renderPositions.BEFORE_END) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case renderPositions.AFTER_BEGIN:
      container.prepend(element);
      break;
    case renderPositions.BEFORE_END:
      container.append(element);
  }
};

const renderTemplate = (container, template, place = renderPositions.BEFORE_END) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export {render, renderTemplate, createElement, replace, remove};
