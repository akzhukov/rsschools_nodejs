import { BASE_URL } from "../config.js";
import { updateTable } from "./table.js";

function getUrl(baseUrl, queryParams) {
  let url = new URL(baseUrl);
  Object.entries(queryParams).forEach(([name, value]) => url.searchParams.append(name, value));
  return url;
}

export async function getUsers(queryParams) {
  const url = getUrl(`${BASE_URL}/users`, queryParams);
  const response = await fetch(url);
  const users = await response.json();

  return users;
}

export async function createUser(user) {
  const url = `${BASE_URL}/users`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
}

export async function deleteUser(userId) {
  const url = `${BASE_URL}/users/${userId}`;
  await fetch(url, { method: 'DELETE' });
  await updateTable();
}

export async function updateUser(userId, user) {
  const url = `${BASE_URL}/users/${userId}`;
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
}
