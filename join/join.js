const showMsg = {
    registerEvent(field, validateObj){
        const target = document.querySelector(`.${field} .inputBox input`);
        target.addEventListener("change", () => {
            const msg = document.querySelector(`.${field} .error`);
            msg.innerHTML = validateObj.validate(target.value);
        })
    }
}

const validateID = {
    regExpId: /^[0-9a-z_-]{5,20}$/,
    msg:{
        taken:'이미 사용중인 아이디입니다.',
        wrong:'5-20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.',
        good: '사용가능한 아이디입니다.'
    },
    validate(id){
        if(!/^[0-9a-z_-]{5,20}$/.test(id)){ return this.msg.wrong; }
        else if(this.checkDuplication(id)){ return this.msg.taken; }
        else return this.msg.good;
    },
    checkDuplication(id){
        const data = ['boostcamp','boost'];
        return data.includes(id);
    }
}

//TODO: 반복되는 구문 너무 많다. 개선하자!
const validatePW = {
    regExpPw:{
        capitalErr:/(?=.*[A-Z])/,
        numberErr: /(?=.*[0-9])/,
        spcErr:/(?=.*?[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"])/,
        completeErr:/^[A-Za-z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,16}$/,
    },
    msg:{
        lengthErr:'8자 이상 16자 이하로 입력해주세요.',
        capitalErr:'영문 대문자를 최소 1자 이상 포함해주세요.',
        numberErr: '숫자를 최소 1자 이상 포함해주세요.',
        spcErr:'특수문자를 최소 1자 이상 포함해주세요.',
        completeErr:'8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
        good: '안전한 비밀번호입니다.',
    },
    validate(pw){
        triggerEvent(document.querySelector('.input-pw-reconfirm'),'change');
        if(pw.length < 8 || pw.length > 16){return this.msg.lengthErr}
        else if(!this.regExpPw.capitalErr.test(pw)){return this.msg.capitalErr}
        else if(!this.regExpPw.numberErr.test(pw)){return this.msg.numberErr}
        else if(!this.regExpPw.spcErr.test(pw)){return this.msg.spcErr}
        else if(!this.regExpPw.completeErr.test(pw)){return this.msg.completeErr}
        else {return this.msg.good};
    },
}

const reconfirmPW = {
    msg:{
        wrong:'비밀번호가 일치하지 않습니다.',
        good: '비밀번호가 일치합니다.'
    },
    validate(confirmpw, pw = document.querySelector('.input-pw')){
        if(pw.value === confirmpw ){return this.msg.good}
        else return this.msg.wrong;
    }
}

showMsg.registerEvent('id', validateID );
showMsg.registerEvent('pw', validatePW );
showMsg.registerEvent('pw-reconfirm', reconfirmPW );

function triggerEvent(el, type){
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, false, true);
    el.dispatchEvent(e);
 }