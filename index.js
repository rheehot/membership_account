//view components
import { signIn } from './src/signIn/signIn.js';
import { logIn } from './src/login/login.js';
import { main } from './src/main/main.js';

//utils
import {validator} from './src/utils/validate.js';
import { tag } from './src/utils/tag.js';
import { agreement } from './src/utils/agree.js';
import { reset } from './src/utils/reset.js';
import { join } from './src/utils/join.js';

//TODO:
//1.메인페이지 띄우기
//2.메인페이지의 로그인, 회원가입 버튼 누르면 innerHTML로 갈아끼우기
//3.회원가입 이후 메인페이지로 이동시 로그인 회원가입 버튼 지우기 
//TODO: 화면갈아끼울때 이벤트도 제거해주자

const signInPage = {
    init(){
        document.querySelector('body').innerHTML = signIn;
        tag.init();
        agreement.init();   
        reset.init();
        join.init(validator);
        validator.init(tag);
    },
}

const mainPage = {
    init(){

    }
}

const logInPage = {
    init(){

    }
}

signInPage.init();


const routes = {
    '/': Main,
    '/SignIn': SingIn,
    '/LogIn': LogIn
};

const router = async () => {
    // Lazy load view element:
    const content = null || document.getElementById('page_container');
    let request = parseRequestURL();

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

}
parseRequestURL = () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    let request = {
        resource    : null,
        id          : null,
        verb        : null
    }
    request.resource    = r[1]
    request.id          = r[2]
    request.verb        = r[3]
    return request
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);