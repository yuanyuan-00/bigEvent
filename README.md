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



# 前两部分的错误总结

要注意input的type是否转换成了普通按钮类型，因为submit会直接将表单提交

form表单内的数据，在点击submit按钮的时候即便没有写action的请求地址，也会默认提交到一个请求地址，这个请求地址是当前访问的网址（form表单的数据不submit，可能是通过ajax提交）

怎样解决这个默认提交：在form表单内的提交按钮<button>处添加onclick = 'return false',点击按钮时就不会再提交了，因为这个请求就是通过onclick事件提交的，若果使用ajax的方式提交form表单的数据，写一个点击出发的函数，其返回值为false，即onclick = 'submitForAjax()';悠哥说的解决方式是：将submit属性改成button，或者在jQuery中使用preventDefault属性，去除submit的默认属性。

```javascript
<button onclick="return validateLogin()">登录</button>
<script>
	function validateLogin() {
    	var data = $("form").serialize)();
    	$.post(
              "${pageContext.request.contextPath}/login",data,funciton (data) {
            if (data == 'success') {
            alert('successful');
        } else {
            alert('you are error');
        }
            }
        );
}    
</script>
```

# 个人中心信息展示

### 功能简介

- 页面加载中请求用户的详细信息
- 将数据展示到对应元素中（用户的头像在img中展示，而不是文件域，文件域只是用来进行选择文件）
  - 为了方便进行元素获取和数据设置，可以将input的id设置为与res.data的属性名相同
    - img需要设置src，user_pic属性需要进行单独操作
    - 为了后续使用formData提交数据时可以正常提交，顺便给每个表单元素设置了name属性
- 点击修改按钮
  + 检测内容是否填写完整（模态框）
- 将数据通过formData形式发送给服务端保存(生成临时图片地址：URL.createObjectURL(this.files[0]))
- 保存完毕更新即可

```javascript
 //请求用户的详情信息
    $.ajax({
      url: 'http://localhost:8000/admin/userinfo_get',
      success: function(res) {
        //检测响应状态
        if (res.code === 200) {
          // 遍历响应得到的对象data
          var data = res.data;
          $.each(data, function(k, value) {
            // console.log(k);
            //检测如果是user_pic，进行单独的src设置，否则同意进行val()设置即可
            if (k !== 'user_pic') {
              $('#' + k).val(value);
            } else {
              //给文件域前面的img设置图片
              $('#avatar').prop('src', value);
            }
          });
        }
      }
    });

    //将修改按钮更改为普通button
    $('#submit').on('click', function() {
      //获取表单数据，检测是否填写完毕
      var fd = new FormData($('form')[0]); //传入DOM对象形式标签
      //观察后发现，文件域如果没有选择文件，size为0，name为‘’
      if (
        fd.get('username').trim() === '' ||
        fd.get('password').trim() === '' ||
        fd.get('nickname').trim() === '' ||
        fd.get('email').trim() === '' ||
        fd.get('user_pic').size === 0
      ) {
        $('#myModal').modal('show');
        return;
      }

      //发送请求
      $.ajax({
        type: 'post',
        url: 'http://localhost:8000/admin/userinfo_edit',
        data: fd,
        contentType: false,
        processData: false,
        success: function(res) {
          if (res.code === 200) {
            //成功的修改了用户信息，让用户重新登录，跳转到login.html页面
            //获取父页面的parent对象
            parent.location.href = './index.html';
          }
        }
      });
    });
    //发送请求
    //进行更新


    //本地图片预览
    $('#user_pic').on('change', function() {
      //获取文件域中的文件信息
      var tempFile = this.files[0];
      //生成临时图片地址
      var tempSrc = URL.createObjectURL(tempFile);
      //将临时图片地址设置给#avatar
      $('#avatar').prop('src', tempSrc);
    });
```

