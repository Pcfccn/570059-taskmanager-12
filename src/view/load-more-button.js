import Abstract from "./abstract";

const createLoadMoreButtonTemplate = () => {
  return (`<button class="load-more" type="button">load more</button>`);
};

export default class LoadMoreButtonView extends Abstract {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
}
