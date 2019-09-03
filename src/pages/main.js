import Utils from './../utils/parseURL.js'

const main = {
    render : async () => {
        const request = Utils.parseRequestURL()
        const user = await request.userId;
        const userId = user || 'There';

        let view =  /*html*/`
            <div class="wrap-main">
                <h1>Hello ${userId}!</h1>
                <div class="btnBox login">
                    <a href="#/signin" class="btn signin-btn">회원가입</a>
                    <a href="#/login" class="btn login-btn">로그인</a>
                </div>
                <div class="btnBox logout">
                    <a href="#/login" class="btn logout-btn">로그아웃</a>
                </div>
            </div>
        `
        return view;
    },
    after_render: async () => {
        const request = Utils.parseRequestURL()
        const user = await request.userId;
        if(user!==undefined){
            document.querySelector('.btnBox.login').style.display = 'none';
            document.querySelector('.btnBox.logout').style.display = 'flex';
        }else{
            document.querySelector('.btnBox.login').style.display = 'flex';
            document.querySelector('.btnBox.logout').style.display = 'none';
        }
    }
}
export default main;
