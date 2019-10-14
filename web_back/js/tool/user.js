//这个user.js用来管理用户进行的所有接口请求操作
var user = {
  //login方法用来管理用户登录接口的操作方式
  //  - 将页面中的功能提取到user.js后需要区别哪部分是与接口有关，哪部分是与页面有关的
  //  - 与接口有关的要留下，与页面有关的再放回到页面中，并通过传参方式传入
  // login: function(options) {
  //   $.ajax({
  //     type: 'post',
  //     // url: 'http://localhost:8000/admin/login',
  //     url: USER_LOGIN,
  //     data: options.data,
  //     success: options.callback
  //   });
  // },
  login: function(options) {
    $.ajax({
      type: 'post',
      url: USER_LOGIN,
      data: options.data,
      success: options.callback
        /* 
        // 上面的写法是当前写法的简化形式：
        success: function (res) {
          options.callback(res);
        }
        */
    });
  },
  logout: function(options) {
    $.ajax({
      type: 'post',
      url: USER_LOGOUT,
      success: options.callback
    });
  },

  //用来管理用户的简单信息获取接口的操作方式
  getInfo: function(options) {
    $.ajax({
      url: USER_INFO,
      success: options.callback
    });
  },

  //getAllInfo用来管理用户的详细信息接口的操作方式
  getAllInfo: function(options) {
    $.ajax({
      url: USER_INFO_GET,
      success: options.callback
    });
  },

  //edit方法用来管理用户的编辑接口
  edit: function(options) {
    $.ajax({
      type: 'post',
      url: USER_INFO_EDIT,
      data: options.data, //获取options中的数据
      contentType: false,
      processData: false,
      success: options.callback //获取options中的回调函数
    });
  }
}