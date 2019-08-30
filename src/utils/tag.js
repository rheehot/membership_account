const tag = {
    tagList:[],
    init(input){
        const target = document.querySelector(input);
        target.addEventListener("input", (e)=>this.createTag(e, target))
        target.addEventListener("keyup", (e)=>this.updateTag(e, target))
    },
    createTagHTML(value){
        return `<span class="tag">${value}<div class="close-btn">X</div></span>`
    },
    createTag(event, target){
        if(event.data === ',' ){
            const tagArr = target.value.split(',');  
            target.value = '';
            if(tagArr[0] !== ""){
                this.tagList.push(tagArr[0]);
                target.insertAdjacentHTML("beforebegin", this.createTagHTML(tagArr[0]));
            }else return;
        }else return;
    },
    updateTag(event,target){
        if(this.tagList.length !== 0 ){
            if(event.key === 'Backspace' && target.value === ''){ 
                target.value = this.tagList.pop();
                const tags = document.querySelectorAll('.tag');
                tags[tags.length-1].parentNode.removeChild(tags[tags.length-1]);
            }else return;
        }else return;
    },
    //TODO: removetag
    removeTag(){
        document.querySelector('.tag .close-btn');
    },
}
export { tag };