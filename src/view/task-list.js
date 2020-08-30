import Abstract from "./abstract";

const createBoardTasksTemplate = () => {
  return (`<div class="board__tasks"></div>`);
};

export default class TaskList extends Abstract {
  getTemplate() {
    return createBoardTasksTemplate();
  }
}
