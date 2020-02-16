// components/license-plate-keyboard/license-plate-keyboard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    show: {
      type: Boolean,
      valve: false,
    },
    // 点击是否震动
    isTriggerVibratation: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    lettersArr: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], ['Z', 'X', 'C', 'V', 'B', 'N', 'M']],
    proArr: [['京', '津', '沪', '渝', '冀', '晋', '辽', '吉', '黑', '苏'], ['浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼'], ['川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新'], ['藏', '港', '澳', '使', '领', '警', '学']],
    mode: 'pro',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 切换
    toggleMode() {
      const data = this.data;

      data.isTriggerVibratation && wx.vibrateShort();

      this.setData({
        mode: data.mode === 'pro' ? 'abc' : 'pro',
      });
    },

    // 选择
    handleTouch(e) {
      const key = e.currentTarget.dataset.key;
      this.data.isTriggerVibratation && wx.vibrateShort();
      
      this.triggerEvent('handleinput', {key});
    },

    // 删除
    delete() {
      this.data.isTriggerVibratation && wx.vibrateShort();

      this.triggerEvent('handledelete');
    },

    // 完成
    complete() {
      this.setData({
        show: false,
      });
    },
  }
})
