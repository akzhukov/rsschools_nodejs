import { getFilterText, updatePageNum } from "../utils/DOM.js";
import { deleteUser, getUsers } from "./service.js"
import { updateTable } from "./table.js"
import { renderPage } from "./pagination.js"
import { PAGE_SIZE } from '../config.js';
import { openForm } from "./userDataForm.js";
import { createUser, updateUser } from "./service.js"
import { changeCurrentSort, getCurrentPageNum, setCurrentPageNum, setFilterValue } from "../utils/sessionStorageUtils.js";

const clickHandlers = {
  applyFilter(event) {
    setCurrentPageNum(1);
    updatePageNum(1);
    setFilterValue(getFilterText());
    updateTable();
  },
  updateUser(event) {
    const userId = event.target.getAttribute("data-id");
    openForm((values) => { updateUser(userId, values) });
  },
  deleteUser(event) {
    const userId = event.target.getAttribute("data-id");
    deleteUser(userId);
  },
  createUser(event) {
    openForm((values) => { createUser(values) });
  },
  nextPage(event) {
    const currentPage = getCurrentPageNum();
    renderPage(currentPage + 1);
  },
  prevPage(event) {
    const currentPage = getCurrentPageNum();
    renderPage(currentPage - 1);
  },
  changeSorting(event){
    // setCurrentPageNum(1); //если надо при смене сортировки перезодить на первую страницу
    // updatePageNum(1);
    changeCurrentSort();
    updateTable();
  },
  doNothing(event) {
    return;
  }
};

export const addClickHadlers = async () => {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("click-handled")) {
      clickHandlers[event.target.dataset.action](event);
    }
  });
}

