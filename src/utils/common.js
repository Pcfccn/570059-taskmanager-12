const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const updateItem = (itemsArray, updatedItem) => {
  const index = itemsArray.findIndex((item) => item.id === updatedItem.id);

  if (index === -1) {
    return itemsArray;
  }

  return [
    ...itemsArray.slice(0, index),
    updatedItem,
    ...itemsArray.slice(index + 1)
  ];
};

export {getRandomInteger, getRandomArrayElement, updateItem};
