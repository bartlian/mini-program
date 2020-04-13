/**
 * 将微信小程序异步接口转成Promise对象
 * 引用自https://github.com/youngjuning/wxPromise
 */

//将转换为Promise对象的api挂载在该对象下
wx.pro = {}
//微信api请求失败标识
wx.WX_API_FAIL = Symbol('微信API请求失败');

/**
 * 将函数变成Promise对象，并添加finally，意为无论success还是fail都会执行的操作
 * fail时返回Symbol对象,方便catch捕获后明确错误原因
 * @param {String} api 微信小程序api名称
 */
const promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: (res) => reject({
          errCode: wx.WX_API_FAIL,
          errData: res
        })
      }), ...params)
    })
  }
}
/**
 * 将Promise化的api挂载在wx.pro对象下，你仍然可以使用wx.api调用源生api
 * 即对于同步操作，wx.pro.api 与 wx.api 相同
 * 同步操作包括：(没有success、fail和complete属性的api)
 * 1、...Sync【√】
 * 2、on...【√】
 * 3、create... 除了 createBLEConnection【√】
 * 4、...Manager【√】
 * 5、pause...【√】
 * 6、stopRecord、stopVoice、stopBackgroundAudio、stopPullDownRefresh【√】
 * 7、hideKeyboard、hideToast、hideLoading、showNavigationBarLoading、hideNavigationBarLoading【√】
 * 8、canIUse、navigateBack、closeSocket、pageScrollTo、drawCanvas【√】
 */
const wxPromise = () => {
  // 将 promise 方法挂载到 wx.pro 对象上
  for (let key in wx) {
    if (wx.hasOwnProperty(key)) {
      if (/^on|^create|Sync$|Manager$|^pause/.test(key) && key !== 'createBLEConnection' || key === 'stopRecord' || key === 'stopVoice' || key === 'stopBackgroundAudio' || key === 'stopPullDownRefresh' || key === 'hideKeyboard' || key === 'hideToast' || key === 'hideLoading' || key === 'showNavigationBarLoading' || key === 'hideNavigationBarLoading' || key === 'canIUse' || key === 'navigateBack' || key === 'closeSocket' || key === 'closeSocket' || key === 'pageScrollTo' || key === 'drawCanvas') {
        wx.pro[key] = wx[key]
      } else {
        wx.pro[key] = promisify(wx[key])
      }
    }
  }
}

// FileSystemManager转为Promise对象，实现链式调用
const fs = wx.getFileSystemManager();
let fsPro = {};
// 将 promise 方法挂载到 fs 对象上
for (let key in fs) {
  fsPro[key] = promisify(fs[key])
}
wx.fsPro = fsPro;

wxPromise();