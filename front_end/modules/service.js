export async function getUsers(skip, limit, filter) {
  const url = `http://localhost:4000/users?skip=${skip}&limit=${limit}&filter=${filter}`;
  const options = {
      method: 'GET',
  };
  const response = await fetch(url);
  const tableData = await response.json();

  return tableData;
}