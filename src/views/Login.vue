<template>
    <div class="login-wrap">
        <el-form
        class="login-form"
        label-position="top"
        label-width="80px"
        :model="formdata">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="formdata.password"></el-input>
            </el-form-item>
            <el-button @click="handleLogin" class="login-button" type="primary">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 绑定数据
      formdata: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 新语法
    async handleLogin() {
      const res = await this.$http.post('login', this.formdata);
      // 相当于在回调函数中书写的代码
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 200) {
        this.$message.success(msg);
        const { data: { token } } = data;
        console.log(data);
        sessionStorage.setItem('token', token);
      } else {
        this.$message.error(msg);
      }
    }

    // 旧语法
    // handleLogin () {
    //   // alert('ewe');
    //   this.$http
    //     .post('login', this.formdata)
    //     .then((res) => {
    //       console.log(res);
    //       // res -> {status:200, data:{data:{}, meta:{}}}
    //       const data = res.data;
    //       const { meta: { status, msg } } = data;
    //       if (status === 200) {
    //         // 登录成功
    //         const token = data.data.token;
    //         console.log(token);
    //         // 跳转到后台首页, 记录token sesstionStorage
    //         sessionStorage.setItem('token', token);
    //         // 成功提示
    //         this.$message.success(msg);
    //       } else {
    //         // 失败
    //         this.$message.error(msg);
    //       }
    //     });
    // }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-button {
  width: 100%;
}
</style>
