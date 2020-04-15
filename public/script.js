/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header li a');

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('active');
  }
}
