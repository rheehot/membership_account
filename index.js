//view components
import { signIn } from './src/signIn/signIn.js';
import { agree } from './src/signIn/agree.js';
import { main } from './src/main/main.js';
import { logIn } from './src/logIn/logIn.js';
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
    // validation = {
    // },
    init(){
        document.querySelector('body').innerHTML = signIn;
        tag.init();
        agreement.init();   
        reset.init();
        join.init(validator);
        validator.init(tag);
    },
    // validate(){
        // TOTO: 객체 만들어서 이터레이터
    // }
}

signInPage.init();
