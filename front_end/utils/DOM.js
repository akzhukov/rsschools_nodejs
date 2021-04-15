export const getTableBody = () => {
  return $('#table-body');
}

export const getUsersTable = () => {
  return $('#users-table');
}

export const updatePageNum = () => {
  const pageNumButton = $('#page-num');
  return pageNumButton.text(sessionStorage.getItem("page"));
}

export const getPagination = () => {
  return $('#pagination');
}

export const getFilterText = () => {
  return $("#filter").val();
}

export const getCreateUserFormValues = () => {
  const name = $('#create-name').val();
  const login = $('#create-login').val();
  const password = $('#create-password').val();


  if (name == "" || login == "" || password == "")
    return null;
  return { name, login, password };
}

export const getCreateUserFormDiv = () => {
  return $("#modal-form");
}

export const getCreateUserForm = () => {
  return $("#prompt-form")[0];
}

export const getCreateUserFormContainer = () => {
  return $("#prompt-form-container")[0];
}
