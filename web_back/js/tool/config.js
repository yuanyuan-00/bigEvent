//config : 配置
//我们可以将项目中使用的接口地址同意保存在这个文件中

//  基地址
var baseUrl = 'http://localhost:8000';

var USER_LOGIN = baseUrl + '/admin/login'; //登录接口
var USER_LOGOUT = baseUrl + '/admin/logout'; //退出接口
var USER_INFO = baseUrl + '/admin/getuser'; //获取用户信息


var USER_INFO_GET = baseUrl + '/admin/userinfo_get'; //用户详细信息获取接口
var USER_INFO_EDIT = baseUrl + '/admin/userinfo_edit'; //用户信息编辑接口