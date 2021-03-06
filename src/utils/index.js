const baseUrl = "https://m.yaojunrong.com";

export const fetch = {
  get(url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token');
      let header = {
        "content-type": "application/json"
      }
      if (token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        method: "GET",
        data,
        header,
        success(res) {
          resolve(res.data);
          if (res.header.Token) {
            wx.setStorageSync('token', res.header.Token)
          }
        },
        fail(err) {
          reject(err);
        }
      });
    });
  },
  post(url, data, method='POST') {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }

      wx.request({
        url: baseUrl + url,
        method,
        data,
        header,
        success(res) {
          resolve(res.data);
          if (res.header.Token) {
            wx.setStorageSync('token', res.header.Token)
          }
        },
        fail(err) {
          reject(err);
        }
      });
    });
  },
  del(url, data) {
    return this.post(url,data,'DELETE')
  }
};
