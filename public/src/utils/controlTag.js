import { validFavorite, showMsg } from './validate.js';

const tag = {
  tagList: [],
  init() {
    const target = document.querySelector('.input-favorite');
    target.addEventListener('keyup', (e) => this.createTag(e, target));
    target.addEventListener('keyup', (e) => this.updateTag(e, target));
  },
  createTagHTML(value, index) {
    return `<span class="tag tag${index}"><span>${value}</span><div class="close-btn">X</div></span>`;
  },
  createTag(event, target) {
    const keycode = event.which ? event.which : event.keyCode;
    if (keycode === 188) {
      const tagArr = target.value.split(',');
      target.value = '';
      if (tagArr[0] !== '') {
        const index = this.tagList.length;
        this.tagList.push(tagArr[0]);
        target.insertAdjacentHTML(
          'beforebegin',
          this.createTagHTML(tagArr[0], index),
        );
        this.removeTag(index);
      }
    }
  },
  updateTag(event, target) {
    if (this.tagList.length !== 0) {
      if (event.key === 'Backspace' && target.value === '') {
        target.value = this.tagList.pop();
        const tags = document.querySelectorAll('.tag');
        tags[tags.length - 1].parentNode.removeChild(tags[tags.length - 1]);
      }
    }
  },
  removeTag(index) {
    const target = document.querySelector(`.tag.tag${index}`);
    target.addEventListener('click', (e) => {
      const clickedTag = e.target.parentNode;
      clickedTag.parentNode.removeChild(clickedTag);
      this.tagList.splice(index, 1);
      const valid = validFavorite.validate(this.tagList.length);
      showMsg(validFavorite, valid);
    });
  },
};
export default tag;
