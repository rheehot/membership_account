//pages
import signIn from './src/pages/signIn.js';
import logIn from './src/pages/login.js';
import main from './src/pages/main.js';
import error404 from './src/pages/err404.js';
import Header from './src/components/header.js'
import Footer from './src/components/footer.js'

//utils
import Utils from './src/utils/parseURL.js';

"use strict";

const routes = {
    '/': main,
    '/home':main,
    '/signin': signIn,
    '/login': logIn
};


const router = async () => {
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');
    
    header.innerHTML = await Header.render();
    await Header.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    const request = Utils.parseRequestURL()
    const parsedURL = (request.resource ? '/' + request.resource : '/');

    const page = routes[parsedURL] ? routes[parsedURL] : error404
    content.innerHTML = await page.render();
    await page.after_render();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);


// inspired from vanillajs-spa Copyright 2018, Rishav Sharan