import { createPagination } from './modules/pagination.js';
import { createTable } from './modules/table.js';


function loadDocument() {
  createTable();
  createPagination();
}

$(document).ready(loadDocument);