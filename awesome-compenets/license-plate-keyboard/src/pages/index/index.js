//index.js

Page({
  data: {
    showKeyboard: false,
    licenseArr: ['', '', '', '', '', '', ''],
    activeIndex: -1,
  },

  handleActiveItem(e) {
    const activeIndex = Number(e.currentTarget.dataset.index);

    this.setData({
      activeIndex,
      showKeyboard: true,
    });
  },

  input(e) {
    const data = this.data;
    const activeIndex = data.activeIndex;
    const str = `licenseArr[${activeIndex}]`;
    
    this.setData({
      [str]: e.detail.key,
      activeIndex: activeIndex < 6 ? (activeIndex + 1) : 6,
    });
  },

  delete() {
    const data = this.data;
    const activeIndex = data.activeIndex;
    const str = `licenseArr[${activeIndex}]`;

    this.setData({
      [str]: '',
      activeIndex: activeIndex - 1,
    });
  },
})
