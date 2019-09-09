// pages
import signIn from './src/pages/signIn.js';
import logIn from './src/pages/login.js';
import main from './src/pages/main.js';
import error404 from './src/pages/err404.js';
import Header from './src/components/header.js';
import Footer from './src/components/footer.js';

// utils
import Utils from './src/utils/parseURL.js';

const routes = {
  '/': main,
  '/signin': signIn,
  '/login': logIn,
};

const router = async () => {
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');

  header.innerHTML = await Header.render();
  await Header.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  const request = Utils.parseRequestURL();
  const parsedURL = request.resource ? `/${request.resource}` : '/';

  let user;
  await checkSession('/api/users/login')
    .then((data) => {
      user = data;
    })
    .catch((error) => {
      user = undefined;
    });

  const page = routes[parsedURL] ? routes[parsedURL] : error404;
  content.innerHTML = await page.render(user);
  await page.after_render(user);
};

const checkSession = async (url = '') => {
  const options = {
    method: 'GET',
    cache: 'no-cache',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options).then((res) => res.json());
  return response;
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// inspired from vanillajs-spa Copyright 2018, Rishav Sharan
