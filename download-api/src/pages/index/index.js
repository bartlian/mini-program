//index.js
import { downloadFile } from '../../utils/util';

Page({
  data: {
    imgPath: '',
  },
  // 普通回调实现下载
  getImg() {
    const imgUrl = 'http://attach.bbs.miui.com/forum/201306/23/110328s72xxse7lfis9fnd.jpg';

    wx.request({
      url: imgUrl,
      responseType: 'arrayBuffer',
      success: (res) => {
        console.log(res);
        const data = res.data;
        const fs = wx.getFileSystemManager();
        const filePath = wx.env.USER_DATA_PATH + '/temp.jpg';

        fs.writeFile({
          filePath,
          data,
          encoding: 'binary',
          success: () => {
            this.setData({
              imgPath: filePath,
            })
          }
        });
      },
      fail: () => {},
      complete: () => {}
    });
    
  },

  download() {
    const imgUrl = 'http://attach.bbs.miui.com/forum/201306/23/110328s72xxse7lfis9fnd.jpg';
    // 测试后台返回json格式的提示
    // const imgUrl = 'https://developers.weixin.qq.com/community/ngi/batchreportdoc?nosw=1';

    downloadFile(imgUrl).then(path => {
      console.log(path);
      // 拿到保存的路径，进行业务操作
      this.setData({
        imgPath: path,
      });
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: err.msg,
        icon: 'none',
      });
    });
  }
})
