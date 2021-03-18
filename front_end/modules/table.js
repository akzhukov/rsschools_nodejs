
import { getUsers } from './service.js';
import { PAGE_SIZE } from '../config.js';
import { tableHeaderTemplate, tableBodyTemplate } from '../templates.js'


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
  records.forEach(element => element.index = i++);
  return bodyTemplate({ records });
}

export async function createTable() {
  const tableObj = $('#users-table'); //rename

  const tableData = await getUsers(0, PAGE_SIZE,"");

  const tableHeader = createTableHeader(tableData);
  const tableBody = createTableBody(tableData);

  tableObj.append(tableHeader);
  tableObj.append(tableBody);
}

export function updateTable(data, pageNum = 1) {
  const tableBody = createTableBody(data, (pageNum - 1) * PAGE_SIZE + 1); //вынести 3 фукнции
  $('#table-body').replaceWith(tableBody);
}
