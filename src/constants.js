const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
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

export {COLORS, DESCRIPTIONS, TASK_COUNT, TASK_COUNT_PER_STEP, maxDaysGap, renderPosition, sortTypes};
