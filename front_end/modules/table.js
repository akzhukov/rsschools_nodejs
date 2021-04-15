import { getUsers } from './service.js';
import { PAGE_SIZE } from '../config.js';
import { tableHeaderTemplate, tableBodyTemplate } from '../templates.js';
import { getTableBody, getUsersTable, updatePageNum } from '../utils/DOM.js';
import { getCurrentPageNum, getCurrentSort, getFilterValue, setCurrentPageNum } from '../utils/sessionStorageUtils.js';

function createTableHeader(data) {
  const headerTemplate = _.template(tableHeaderTemplate);
  const items = Object.keys(data[0]);
  return headerTemplate({
    items: ['#', ...items, 'actions']
  });
}

function createTableBody(data, startIndex = 1) {
  const bodyTemplate = _.template(tableBodyTemplate);
  let i = startIndex;
  const records = Object.values(data);
  records.forEach(element => (element.index = i++));
  return bodyTemplate({ records });
}

function getStartIndex(pageNum = 1) {
  return (pageNum - 1) * PAGE_SIZE + 1;
}

function getSkip(pageNum){
  return (pageNum - 1) * PAGE_SIZE;
}

function getTableParams(){
  const pageNum = getCurrentPageNum();
  const skip = getSkip(pageNum);
  const limit = PAGE_SIZE;
  const filter = getFilterValue();
  const sort = getCurrentSort();
  return { skip, limit, filter, sort };
}

export async function createTable() {
  const table = getUsersTable();

  const params = getTableParams();
  const tableData = await getUsers(params);

  const tableHeader = createTableHeader(tableData);
  const tableBody = createTableBody(tableData);

  table.append(tableHeader);
  table.append(tableBody);
}


export async function updateTable() {
  const pageNum = getCurrentPageNum();

  const params = getTableParams();
  const tableData = await getUsers(params);

  if (tableData.length === 0) {
    setCurrentPageNum(pageNum - 1);
    updateTable();
    return;
  }

  const tableBody = createTableBody(tableData, getStartIndex(pageNum));
  getTableBody().replaceWith(tableBody);
  updatePageNum();
}
