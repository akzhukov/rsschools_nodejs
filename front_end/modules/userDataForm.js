import { createUserFormTemplate } from "../templates.js"
import {
  getCreateUserFormValues,
  getCreateUserFormDiv,
  getCreateUserFormContainer,
  getCreateUserForm
} from "../utils/DOM.js";
import { createUser } from "./service.js"

const getCoverDiv = () => {
  return $("#cover-div");
}

function showCover() {
  let coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';

  document.body.style.overflowY = 'hidden';

  document.body.append(coverDiv);
}

function hideCover() {
  getCoverDiv().remove();
  document.body.style.overflowY = '';
}

function showContainer(container) {
  container.style.display = 'block';
}

function hideContainer(container) {
  container.style.display = 'none';
}

export function openForm(queryFunction) {
  showCover();
  const formTemplate = _.template(createUserFormTemplate);
  const htmlForm = formTemplate();
  const formDiv = getCreateUserFormDiv();
  formDiv.append(htmlForm);

  let form = getCreateUserForm();
  let container = getCreateUserFormContainer();
  showContainer(container);

  
  form.onsubmit = function () {
    const values = getCreateUserFormValues();
    if (values == null) {
      return false;
    }
    queryFunction(values)
    complete();
  };
  
  form.cancel.onclick = function () {
    complete();
  };
  
  function complete() {
    hideCover();
    hideContainer(container);
  }
}