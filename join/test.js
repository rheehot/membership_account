const validateID = {
    regExpId: /^[0-9a-z_-]{5,20}$/,
    msg:{
        taken:'이미 사용중인 아이디입니다.',
        wrong:'5-20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.',
        good: '사용가능한 아이디입니다.'
    },
    validate(id){
        if(!this.regExpId.test(id)){ return this.msg.wrong; }
        else if(this.checkDuplication(id)){ return this.msg.taken; }
        else return this.msg.good;
    },

    checkDuplication(id){
        const data = ['boostcamp','boost'];
        return data.includes(id);
    }
}

console.log(validateID.validate('node'))