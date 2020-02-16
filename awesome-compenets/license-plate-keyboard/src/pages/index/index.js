//index.js

Page({
  data: {
    showKeyboard: false,
    str: '',
  },

  handleShow() {
    this.setData({
      showKeyboard: !this.data.showKeyboard,
    });
  },

  input(e) {
    const data = this.data;
    const str = data.str + e.detail.key;
    
    this.setData({
      str,
    });
  },

  delete() {
    const str = this.data.str;
    const newStr = str.substring(0, str.length - 1);
    
    this.setData({
      str: newStr,
    });
  },
})
