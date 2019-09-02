import { triggerEvent } from './eventTrigger.js';
//TODO: magic number 제거
//TODO: 선택자 의존성 없게 바꾸자 .${field} .inputBox ${inputType}
const showMsg = {
    init(field, inputType, validateObj, event, option ){
        const targets = document.querySelectorAll(`.${field} .inputBox ${inputType}`);
        targets.forEach(target =>this.registerEvent(target, validateObj, field, event, option ))
    },
    registerEvent(target, validateObj, field, event='change', option ){
        target.addEventListener(event, (e) => {
            const arg = option !== undefined ? option.length : target.value;
            const msgObj = validateObj.validate(arg);
            const msgField = document.querySelector(`.${field} .error`);
            msgField.innerHTML = msgObj.msg;
            msgField.style.color = msgObj.status !== 'good' ? '#f00': '#37b24d'; 
        })
    }
}

const validID = {
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

//TODO: if else 안쓸수 있을 것 같은데 어렵다. 고민하자.
const validPW = {
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

const validBirth = {
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

        const lastdate = this.getDateRange(year,month);
        const minYear = new Date().getFullYear()-99;
        const maxYear = new Date().getFullYear()-15;

        if(!this.regExpYear.test(year)) return this.msg.yearErr;
        else if(+year < minYear || +year > maxYear ) return this.msg.ageErr;
        else if(month === '') return this.msg.monthErr;
        else if( !this.regExpDate.test(date) || +date < 1 || +date > lastdate ) return this.msg.dateErr;
        else return this.msg.good;
    },
    getDateRange(year, month){
        return new Date(year,month,0).getDate();
    }
}

const validEmail = {
    regExpEmail:/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    msg:{
        wrong: { status:'wrong', msg:'이메일 주소를 다시 확인해주세요.' },
        good: {status:'good', msg:''}
    },
    validate(email){
        if(!this.regExpEmail.test(email)) return this.msg.wrong;
        else return this.msg.good;
    }
}

const validNumber = {
    regExpNumber: /^(010)\d{3,4}\d{4}$/,
    msg:{
        wrong: { status:'wrong', msg:'형식에 맞지 않는 번호입니다.' },
        good: {status:'good', msg:''}
    },
    validate(number){
        if(!this.regExpNumber.test(number)) return this.msg.wrong;
        else return this.msg.good;
    }
}

const validTag = {
    msg:{
        wrong: { status:'wrong', msg:'3개 이상의 관심사를 입력하세요.' },
        good: {status:'good', msg:''}
    },
    validate(length){
        if(length >= 3) return this.msg.good; 
        else return this.msg.wrong;
    }
}
export { showMsg, validID, validPW, reconfirmPW, validBirth, validEmail, validNumber, validTag };