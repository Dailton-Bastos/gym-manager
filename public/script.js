/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */

function activeMenu() {
  const currentPage = location.pathname;
  const menuItems = document.querySelectorAll('header li a');

  for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
      item.classList.add('active');
    }
  }
}

function initPaginate(selectedPage, totalPages) {
  const pages = [];
  let oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage += 1) {
    const firstAndLastPage = currentPage === 1 || currentPage === totalPages;
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;

    if (
      firstAndLastPage ||
      (pagesBeforeSelectedPage && pagesAfterSelectedPage)
    ) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push('...');
      }
      if (oldPage && currentPage - oldPage === 2) {
        pages.push(oldPage + 1);
      }
      pages.push(currentPage);

      oldPage = currentPage;
    }
  }
  return pages;
}

const getPagination = document.querySelector('.pagination');

function createPagination(pagination) {
  const { filter } = pagination.dataset;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;

  const pages = initPaginate(page, total);

  let elements = '';

  for (const pag of pages) {
    if (String(pag).includes('...')) {
      elements += `<span>${pag}</span>`;
    } else if (filter) {
      elements += `<a href="?page=${pag}&filter=${filter}">${pag}</a>`;
    } else {
      elements += `<a href="?page=${pag}">${pag}</a>`;
    }
  }
  getPagination.innerHTML = elements;
}

if (getPagination) {
  createPagination(getPagination);
}

activeMenu();
