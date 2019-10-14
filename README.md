# bigEvent
 大事件项目

# 注意事项

1.表单会跳转，所以登录部分的按钮应该为普通按钮，因为希望使用ajax

2.更改的时候，将代码复制之后，再更改

# logo部分功能简介

1.点击登录按钮后，获取用户名和密码

2.检测内容是否为空

3.如果不为空，通过接口发送给服务端检测

4.根据检测结果进行对应处理

			- 成功，跳转到首页
			- 失败，提示即可

```javascript
 //给登录按钮设置点击事件
    $('.input_sub').on('click', function() {
      //获取用户名和密码
      var user_name = $('.input_txt').val();
      var password = $('.input_pass').val();

      //trim是字符串方法，去除两端空格
      if (user_name.trim() === '' || password.trim() === '') {
        alert('请填写完整表单')
        return;
      }

      //若不为空，则发送请求
      $.ajax({
        type: 'post',
        url: 'http://localhost:8000/admin/login',
        data: {
          user_name: user_name,
          password: password
        },
        success: function(res) {
          //   console.log(res);
          //根据服务端响应的状态进行对应操作
          if (res.code === 200) {
            location.href = './index.html';
          } else {
            alert('用户名或密码书写错误');
          }
        }
      });
    });
```



5.将所有的接口地址统一保存在config.js 文件中，方便后期维护

```javascript
//config : 配置
//我们可以将项目中使用的接口地址同意保存在这个文件中

//  基地址
var baseUrl = 'http://localhost:8000';

var USER_LOGIN = baseUrl + '/admin/login';
var USER_LOGOUT = baseUrl + '/admin/logout';
var USER_INFO = baseUrl + '/admin/getuser'; //获取用户信息
```

6.将每个页面中进行接口调用操作的功能同意保存到某个文件中

- 用户的相关功能： user.js
  - 设置user 对象，将每个请求的操作设置为user的方法，在页面中使用时调用方法即可（页面的具体操作和接口的操作就分开了，方便操作）

7.通过boot提供的模态框进行弹窗效果的美化（使用modal（‘show’）激活模态框，修改提示信息即可）

# 后台首页功能

### 后台首页退出登录功能

- 点击退出按钮
- 通过模态框提示用户，是否确认退出
  - 点击确认后，请求服务端对应接口

```javascript
<script>
    //退出功能
    //给退出按钮设施点击事件
    $('#logout').on('click', function() {
      //设置模态框显示
      $('#myModal').modal('show');

    });
    //确认退出按钮的点击事件
    $('#logoutYes').on('click', function() {
      //发送请求，进行退出操作
      user.logout({
        callback: function(res) {
          //退出完成，跳转到login.html 即可
          if (res.code === 200) {
            location.href = './login.html';
          }
        }
      });
    });
  </script>
```



### 后台首页用户基本信息展示功能

1.当进入index.html页面之后，直接发送ajax请求如果请求响应成功，则左侧的用户信息和右侧顶部的用户头像显示

```javascript
 $.ajax({
      url: 'http://localhost:8000/admin/getuser',
      success: function(res) {
        if (res.code == 200) {
          //2.将获取的数据渲染到页面中
          var data = res.data;
          //左侧的用户信息
          $('.user_info img').prop('src', data.user_pic).next().text(data.nickname);
          //右侧顶部的用户头像
          $('.user_center_link img').prop('src', data.user_pic);
        }
      }
    });
```





