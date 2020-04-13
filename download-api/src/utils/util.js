const downloadFile = function(url, data, path) {
  let filePath = '';
  wx.showLoading({
    title: '下载中...',
    mask: true,
  });
    
  return new Promise((resolve, reject) => {
    wx.pro.request({
      url,
      data,
      responseType: 'arraybuffer',
    }).then(res => {
      console.log(res);
      const contentType = res.header['Content-Type'];
      // 根据content-type: application/json 来判断成功，还是后台的错误提示
      const isErrTips = contentType.includes('application/json');

      if (isErrTips) {
        // 将arraybuffer转为字符串
        const tips = ab2Str(res.data);
        reject(JSON.parse(tips));
      }

      // 没有指定保存路径时，使用时间戳生成
      const fileFormat = contentType.includes('application/octet-stream') ? 'bin' : contentType.split('application/')[1].split(';')[0];
      filePath = path || (wx.env.USER_DATA_PATH + '/' + Date.now() + '.' + fileFormat);

      // 保存文件
      return wx.fsPro.writeFile({
        filePath: filePath,
        data: res.data,
        encoding: 'binary',
      });
    }).then(() => {
      wx.hideLoading();
      // 成功后，返回保存的文件路径
      resolve(filePath);
    }).catch(err => {
      console.log(err);
      wx.hideLoading();
    });
  });

};

// 返回响应只有英文符号时
// ArrayBuffer转为字符串，参数为ArrayBuffer对象, 字符串编码为一个字节
// function ab2Str(buff) {
//   // return String.fromCharCode.apply(null, new Uint8Array(buff));
//   const uint8Arr = new Uint8Array(buff);
//   uint8Arr.forEach(i => {
//     console.log(i);
//     console.log(String.fromCharCode(i))
//   })
// };

// 返回数据包含中文时 微信环境现不支持TextDecoder,参考地址 https://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript/22373197
function ab2Str(buff) {
  const array = new Uint8Array(buff);
  let out, i, len, c;
  let char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
    c = array[i++];
    switch(c >> 4) { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
        break;
    }
  }
  return out;
}

module.exports = {
  downloadFile,
}
