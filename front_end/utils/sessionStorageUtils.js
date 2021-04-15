export const getCurrentPageNum = () => {
  return Number(sessionStorage.getItem("page"));
}

export const setCurrentPageNum = (pageNum) => {
  sessionStorage.setItem("page", pageNum);
}

export const getFilterValue = () => {
  return sessionStorage.getItem("filter");
}

export const setFilterValue = (value) => {
  sessionStorage.setItem("filter", value);
}

export const getCurrentSort = () => {
  return Number(sessionStorage.getItem("sort"));
}

export const changeCurrentSort = () => {
  const currentSort = getCurrentSort();
  sessionStorage.setItem("sort", -currentSort);
}