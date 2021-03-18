import { getUsers } from './service.js';
import { updateTable } from './table.js';
import { PAGE_SIZE } from '../config.js';
import { tablePaginationTemplate } from '../templates.js'


const buttons = [{
  id: 'previous-button',
  title: 'Previous',
  onClick: () => prevPage(),
},
{
  id: 'page-num',
  title: '1',
  options: 'disabled="true"',
},
{
  id: 'next-button',
  title: 'Next',
  onClick: () => nextPage(),
},
];

async function prevPage() {
  const pageNumButton = $('#page-num');//отделить
  const pageNum = Number.parseInt(pageNumButton.text());
  if (pageNum === 1)
    return;
  const prevPageNum = pageNum - 1;
  const tableData = await getUsers((prevPageNum - 1) * PAGE_SIZE, PAGE_SIZE,"");
  updateTable(tableData, prevPageNum);
  pageNumButton.html(prevPageNum)
}

async function nextPage() {
  const pageNumButton = $('#page-num');
  const pageNum = Number.parseInt(pageNumButton.text());
  const nextPageNum = pageNum + 1;
  const tableData = await getUsers((nextPageNum - 1) * PAGE_SIZE, PAGE_SIZE,"");
  if (tableData.length === 0)
    return;
  updateTable(tableData, nextPageNum);
  pageNumButton.html(nextPageNum)
}


export function createPagination() {
  const paginationTemplate = _.template(tablePaginationTemplate);
  $('#pagination').append(paginationTemplate({ items: buttons }));
//add event listener
  buttons.forEach(button => {
    if (button.onClick) {
      $(`#${button.id}`).click(button.onClick);
    }
  });
}