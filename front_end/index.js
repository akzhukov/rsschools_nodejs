import { createPagination } from './modules/pagination.js';
import { createTable } from './modules/table.js';
import { addClickHadlers } from "./modules/handleClicks.js";

function loadDocument() {
  sessionStorage.setItem("filter", "");
  sessionStorage.setItem("page", 1);
  sessionStorage.setItem("sort", -1);
  addClickHadlers();
  createTable();
  createPagination();
}

$(document).ready(loadDocument);
