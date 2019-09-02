//pages
import signIn from './src/pages/signIn.js';
import logIn from './src/pages/login.js';
import main from './src/pages/main.js';
import error404 from './src/pages/err404.js';

//utils
import Utils from './src/utils/parseURL.js';

"use strict";

const routes = {
    '/': main,
    '/signin': signIn,
    '/login': logIn
};

const router = async () => {
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    
    // header.innerHTML = await Navbar.render();
    // await Navbar.after_render();
    // footer.innerHTML = await Bottombar.render();
    // await Bottombar.after_render();

    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/');

    let page = routes[parsedURL] ? routes[parsedURL] : error404
    content.innerHTML = await page.render();
    await page.init();
    await page.after_render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);


// inspired from vanillajs-spa Copyright 2018, Rishav Sharan