// pages
import signIn from './src/pages/signIn.js';
import logIn from './src/pages/login.js';
import main from './src/pages/main.js';
import error404 from './src/pages/err404.js';
import Header from './src/components/header.js';
import Footer from './src/components/footer.js';

// utils
import parseURL from './src/utils/parseURL.js';
import { getData } from './src/utils/dataExchange.js';

const routes = {
  '/': main,
  '/signin': signIn,
  '/login': logIn,
};

/**
 * inspired from vanillajs-spa Copyright 2018, Rishav Sharan
 * Calls page component passing session.
 *
 * @param {} No param
 * @return {} No return.
 */
const router = async () => {
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');

  header.innerHTML = await Header.render();
  footer.innerHTML = await Footer.render();

  const request = parseURL();
  const parsedURL = request ? `/${request}` : '/';

  const user = await getData('/api/users/login')
    .then((data) => {
      return data;
    })
    .catch(() => {
      return undefined;
    });

  const page = routes[parsedURL] ? routes[parsedURL] : error404;

  content.innerHTML = await page.render(user);
  await page.afterRender(user);
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
