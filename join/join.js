const showMsg = {
    registerEvent(field, inputType, validateObj){
        const targets = document.querySelectorAll(`.${field} .inputBox ${inputType}`);
        targets.forEach(target => {
            target.addEventListener("change", () => {
                const msgField = document.querySelector(`.${field} .error`);
                const msgObj = validateObj.validate(target.value);
                msgField.innerHTML = msgObj.msg;
                msgField.style.color = msgObj.status !== 'good' ? '#f00': '#37b24d'; 
            })
        })
    }
}

const validateID = {
    regExpId: /^[0-9a-z_-]{5,20}$/,
    msg:{
        taken: {status:'taken', msg:'이미 사용중인 아이디입니다.'},
        wrong: {status:'wrong', msg:'5-20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.'},
        good:  {status:'good', msg:'사용가능한 아이디입니다.'}
    },
    validate(id){
        if(!this.regExpId.test(id)) return this.msg.wrong; 
        else if(this.checkDuplication(id)) return this.msg.taken; 
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
        lengthErr: {status:'lengthErr', msg:'8자 이상 16자 이하로 입력해주세요.'},
        capitalErr: {status:'capitalErr', msg:'영문 대문자를 최소 1자 이상 포함해주세요.'},
        numberErr: {status:'numberErr', msg:'숫자를 최소 1자 이상 포함해주세요.'},
        spcErr: {status:'spcErr', msg:'특수문자를 최소 1자 이상 포함해주세요.'},
        completeErr: {status:'completeErr', msg:'8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'},
        good: {status:'good', msg:'안전한 비밀번호입니다.'},
    },
    validate(pw){
        triggerEvent(document.querySelector('.input-pw-reconfirm'),'change');
        if(pw.length < 8 || pw.length > 16) return this.msg.lengthErr;
        else if(!this.regExpPw.capitalErr.test(pw)) return this.msg.capitalErr;
        else if(!this.regExpPw.numberErr.test(pw)) return this.msg.numberErr;
        else if(!this.regExpPw.spcErr.test(pw)) return this.msg.spcErr;
        else if(!this.regExpPw.completeErr.test(pw)) return this.msg.completeErr;
        else return this.msg.good;
    },
}

const reconfirmPW = {
    msg:{
        wrong:{status:'wrong', msg:'비밀번호가 일치하지 않습니다.'},
        good: {status:'good', msg:'비밀번호가 일치합니다.'}
    },
    validate(confirmpw, pw = document.querySelector('.input-pw')){
        return pw.value === confirmpw? this.msg.good : this.msg.wrong;
    }
}

const validateBirth = {
    regExpYear: /^[0-9]{4}$/,
    regExpDate: /^[0-9]{1,2}$/,
    msg: { 
        yearErr: { status:'yearErr', msg:'태어난 년도 4자리를 정확하게 입력하세요.' },
        ageErr: { status:'ageErr', msg:'만 14세 이상만 가입 가능합니다.' },
        monthErr: { status:'monthErr', msg:'태어난 월을 다시 확인해주세요.' },
        dateErr: { status:'dateErr', msg:'태어난 날짜를 다시 확인해주세요.' },
        good: {status:'good', msg:''}
    },
    validate(){
        const year = document.querySelector('.input-year').value;
        const month = document.querySelector('.input-month').value;
        const date = document.querySelector('.input-date').value;
        const lastdate = this.getDateRange(year,month)

        const minYear = new Date().getFullYear()-99;
        const maxYear = new Date().getFullYear()-15;

        if(!this.regExpYear.test(year)) return this.msg.yearErr;
        else if(+year < minYear || +year > maxYear ) return this.msg.ageErr;
        else if(month === '') return this.msg.monthErr;
        else if( !this.regExpDate.test(date) || +date < 1 || +date > lastdate ) return this.msg.dateErr;
        else return this.msg.good;
    },
    getDateRange(year, month){
        return new Date(year,month+1,0).getDate();
    }
}

showMsg.registerEvent('id', 'input', validateID );
showMsg.registerEvent('pw', 'input', validatePW );
showMsg.registerEvent('pw-reconfirm', 'input', reconfirmPW );
showMsg.registerEvent('birthform', 'input', validateBirth);
showMsg.registerEvent('birthform', 'select', validateBirth);


function triggerEvent(el, type){
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, false, true);
    el.dispatchEvent(e);
 }