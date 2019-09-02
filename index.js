import { signIn } from './src/signIn/signIn.js';
import { agree } from './src/signIn/agree.js';
import { main } from './src/main/main.js';
import { logIn } from './src/logIn/logIn.js';
import * as validate from './src/utils/validate.js';
import { tag } from './src/utils/tag.js';
import { agreement } from './src/utils/agree.js'


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

        validate.showMsg.init('id', 'input', validate.validID );
        validate.showMsg.init('pw', 'input', validate.validPW );
        validate.showMsg.init('pw-reconfirm', 'input', validate.reconfirmPW );
        validate.showMsg.init('birth', 'input', validate.validBirth);
        validate.showMsg.init('birth', 'select', validate.validBirth);
        validate.showMsg.init('email', 'input', validate.validEmail);
        validate.showMsg.init('number', 'input', validate.validNumber);
        validate.showMsg.init('favorite', 'input', validate.validTag, 'keyup',tag.tagList);

    },
}
signInPage.init();