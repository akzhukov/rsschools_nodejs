import { getUsers } from './service.js';
import { updateTable } from './table.js';
import { PAGE_SIZE } from '../config.js';
import { tablePaginationTemplate } from '../templates.js';
import { getTableBody, getPagination, updatePageNum } from '../utils/DOM.js';
import { getCurrentPageNum, setCurrentPageNum } from '../utils/sessionStorageUtils.js';

const buttons = [
  {
    id: 'previous-button',
    title: 'Previous',
    action: "prevPage"
  },
  {
    id: 'page-num',
    title: '1',
    options: 'disabled="true"',
    action: "doNothing"
  },
  {
    id: 'next-button',
    title: 'Next',
    action: "nextPage"
  }
];

export function renderPage(pageNum = 1) {
  if (pageNum === 0) {
    return;
  }
  setCurrentPageNum(pageNum);
  updateTable();
}


export function createPagination() {
  const paginationTemplate = _.template(tablePaginationTemplate);
  getPagination().append(paginationTemplate({ items: buttons }));
  buttons.forEach(button => {
    if (button.onClick) {
      $(`#${button.id}`).click(button.onClick);
    }
  });
}
