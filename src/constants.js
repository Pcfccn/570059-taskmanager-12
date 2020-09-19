const listOfColors = {
  BLACK_DEFAULT: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const DESCRIPTIONS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;
const maxDaysGap = 7;

const renderPosition = {
  AFTER_BEGIN: `afterBegin`,
  BEFORE_END: `beforeEnd`,
};

const sortTypes = {
  DEFAULT: `default`,
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`
};

const noRepitingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};

const BLANK_TASK = {
  color: listOfColors.BLACK_DEFAULT,
  description: ``,
  dueDate: null,
  repeating: noRepitingDays,
  isArchive: false,
  isFavorite: false
};

const mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

const keyboardKey = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

const userActions = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};

const updateTypes = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export {listOfColors, DESCRIPTIONS, TASK_COUNT, TASK_COUNT_PER_STEP, maxDaysGap,
  renderPosition, sortTypes, BLANK_TASK, mode, keyboardKey, noRepitingDays, userActions, updateTypes};
