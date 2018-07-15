export default {
  data() {
    return {
      list: [],
      loading: true,
      // 分页部分
      // 当前页数
      pagenum: 1,
      // 每页显示条目个数
      pagesize: 6,
      total: 0,
      searchUse: '',
      // 添加用户板块数据
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 控制弹出框的显示隐藏
      addUserDialogVisible: false,
      // 表单的验证规则
      formRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ]
      },
      // 控制编辑框的显示隐藏
      editUserDialogVisible: false,
      // 控制角色分类框的显示隐藏
      setRoleDialogVisible: false,
      // 分配角色需要的数据
      currentUserName: '',
      currentUserId: -1,
      currentRoleId: -1,
      roles: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 渲染数据列表 发送异步请求
    async loadData() {
      this.loading = true;
      // // 获取token
      // const token = sessionStorage.getItem('token');
      // // 请求头中设置token
      // this.$http.defaults.headers.common['Authorization'] = token;

      // const res = await this.$http.get('users?pagenum=1&pagesize=10');
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchUse}`);
      // console.log(res);
      this.loading = false;
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        // 成功
        const { data: { users, total } } = data;
        this.list = users;
        // 获取总共多少条数据
        this.total = total;
      } else {
        this.$message.error(msg);
      }
    },
    // 切换每页显示多少条时触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 每页条数该表的时候
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 页码改变时
      this.pagenum = val;
      this.loadData();
    },
    // 搜索
    handleSearch() {
      this.loadData();
    },
    // 当开关的状态改变 修改用户状态
    async handleUserStatus(user) {
      console.log(user);
      console.log(user.mg_state);
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}}`);
      console.log(res);
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        // 成功
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 删除功能
    async handleDelete(user) {
      // alert('323');
      // console.log(user);
      // console.log(user.id);
      const res = await this.$http.delete(`users/${user.id}`);
      // console.log(res);
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        // 删除成功
        this.$message.success(msg);
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    // 添加用户的确认按钮
    async handleAdd() {
      this.$refs.myform.validate(async (valid) => {
        if (!valid) {
          // 表单验证失败
          return this.$message.error('请完整输入内容');
        };
        // 表单验证成功
        // 异步操作
        const res = await this.$http.post('users', this.formData);
        console.log(res);
        const data = res.data;
        const { meta: { msg, status } } = data;
        if (status === 201) {
          // 添加成功提醒
          this.$message.success(msg);
          // 隐藏文本框
          this.addUserDialogVisible = false;
          // 重新加载此页面
          this.loadData();
          // // 清空文本框
          // // this.formData.resetFields();
          // for (let key in this.formData) {
          //   this.formData[key] = '';
          // }
        } else {
          this.$message.error(msg);
        }
      });
    },
    // 通过id查找用户,展现在页面上
    async handleShowEditDialog (user) {
      this.editUserDialogVisible = true;
      // console.log(user);
      this.formData.username = user.username;
      this.formData.email = user.email;
      this.formData.mobile = user.mobile;
      this.formData.id = user.id;
    },
    // 编辑用户的确认按钮
    async handleEdit() {
      // alert('asdas');
      // console.log(this.formData);
      const res = await this.$http.put(`users/${this.formData.id}`, this.formData);
      console.log(res);
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        // 修改成功
        this.$message.success(msg);
        this.editUserDialogVisible = false;
        // 刷新页面
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    // 表单弹出框关闭事件 -- 清除表单数据
    handleClosed () {
      // 清空文本框
      // this.formData.resetFields();
      for (let key in this.formData) {
        this.formData[key] = '';
      }
    },
    // 点击分配权限按钮,打开分配权限的对话框
    async handleShowSetRoleDialog(user) {
      // console.log(user);
      this.setRoleDialogVisible = true;
      // 获取所有的角色
      const res = await this.$http.get('roles');
      this.roles = res.data.data;
      this.currentUserName = user.username;
      this.currentUserId = user.id;

      // 根据用户id查询用户对象 得到角色id
      const res1 = await this.$http.get(`users/${user.id}`);
      // console.log(res1);
      this.currentRoleId = res1.data.data.rid;
      // console.log(this.currentRoleId);
    },
    // 分配角色确定按钮
    async handleSetRole() {
      this.setRoleDialogVisible = false;
      // 发送请求 分配角色
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {
        rid: this.currentRoleId
      });
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 200) {
        // 分配角色成功
        this.$message.success(msg);
        // 关闭对话框
        this.setRoleDialogVisible = false;
        // 重置数据
        this.currentUserName = '';
        this.currentUserId = '';
        this.currentRoleId = '';
      } else {
        this.$message.error(msg);
      }
    }
  }
};
