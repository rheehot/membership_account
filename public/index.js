// pages
import signIn from './src/pages/signIn.js';
import logIn from './src/pages/login.js';
import main from './src/pages/main.js';
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
 * checks session by fetching api
 *
 * @param {string} url string
 * @return {object} response from server
 */
const checkSession = async (url) => {
  const user = await getData(url)
    .then((data) => {
      return data;
    })
    .catch(() => {
      return undefined;
    });
  return user;
};

/**
 * Calls page component passing check session result.
 *
 * @param {} No param
 * @return {} No return.
 */
const router = async () => {
  const content = null || document.getElementById('page_container');

  const request = parseURL();
  const parsedURL = request ? `/${request}` : '/';
  const page = routes[parsedURL];

  const user = await checkSession('/api/users/login');
  content.innerHTML = await page.render(user);
  await page.afterRender(user);
};

/**
 * Renders common components like header and footer
 *
 * @param {} No param
 * @return {} No return.
 */
const commonView = async () => {
  const header = null || document.getElementById('header_container');
  const footer = null || document.getElementById('footer_container');

  header.innerHTML = await Header.render();
  await Header.afterRender();

  footer.innerHTML = await Footer.render();
};

commonView();
window.addEventListener('routing', router);
window.addEventListener('popstate', router);
window.addEventListener('load', router);
