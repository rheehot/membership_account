const main = {
    render : async () => {
        let view =  /*html*/`
            <div class="wrap-main">
                <h1>Hello There!</h1>
                <div class="section">
                    <a href="#/signin" class="signin-btn">회원가입</a>
                    <a href="#/login" class="login-btn">로그인</a>
                    <a href="#/login" class="logout-btn">로그아웃</a>
                </div>
            </div>
        `
        return view
    }, 
    after_render: async () => {
    }
}
export default main;
