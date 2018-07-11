<template>
<el-card class="box-card">
	<!-- 面包屑 -->
	<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
	</el-breadcrumb>

	<!-- 搜索区域 -->
	<el-row class="searchArea">
		<el-col :span="24">
			<el-input placeholder="请输入内容" v-model="searchUse" clearable class="searchInput">
				<el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
			</el-input>
			<el-button type="success" @click="addUserDialogVisible = true" plain>添加用户</el-button>
		</el-col>
	</el-row>

	<!-- 表格 -->
	<el-table
		v-loading="loading"
		:data="list"
		stripe
		border
		style="width: 100%">
		<el-table-column
		type="index"
		width="50">
		</el-table-column>
		<el-table-column
					prop="username"
					label="姓名"
					width="180">
		</el-table-column>
		<el-table-column
				prop="email"
				label="邮箱"
				width="180">
		</el-table-column>
		<el-table-column
				prop="mobile"
				label="电话">
		</el-table-column>
		<el-table-column
			label="创建日期">
			<template slot-scope="scope">
				{{ scope.row.create_time | fmData('YYYY-MM-DD') }}
			</template>
		</el-table-column>
		<el-table-column label="用户状态" width="100" prop="mg_state">
			<template slot-scope="scope">
				<!-- scope.row 就是当前行绑定数据对象 -->
				<el-switch
          @change="handleUserStatus(scope.row)"
					v-model="scope.row.mg_state"
					active-color="#13ce66"
					inactive-color="#ff4949">
				</el-switch>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button type="primary" icon="el-icon-edit" size="mini" @click="handleShowEditDialog(scope.row)" plain></el-button>
				<el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)" plain></el-button>
				<el-button type="success" icon="el-icon-check" size="mini" @click="handleShowSetRoleDialog(scope.row)" plain></el-button>
			</template>
		</el-table-column>
	</el-table>

	<!-- 分页板块 -->
	<el-pagination
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="pagenum"
		:page-sizes="[2, 4, 6, 8]"
		:page-size="pagesize"
		layout="total, sizes, prev, pager, next, jumper"
		:total=total>
  </el-pagination>

  <!-- 添加用户弹出框 -->
  <el-dialog @closed="handleClosed" title="添加用户" :visible.sync="addUserDialogVisible">
    <el-form :model="formData" label-width="100px" :rules="formRules" ref="myform">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formData.mobile" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addUserDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 编辑用户弹出框 -->
  <el-dialog @closed="handleClosed" title="编辑用户" :visible.sync="editUserDialogVisible">
    <el-form :model="formData" label-width="100px" :rules="formRules" ref="myform">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" disabled auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formData.mobile" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editUserDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
  </el-dialog>

  <!-- 分配用户角色的弹出框 -->
  <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible">
    <el-form label-width="100px">
      <el-form-item label="用户名" prop="">
        {{ currentUserName }}
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="currentRoleId">
          <el-option disabled label="请选择" :value="-1"></el-option>
          <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="setRoleDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSetRole">确 定</el-button>
    </div>
  </el-dialog>

</el-card>
</template>

<script>
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
      // 获取token
      const token = sessionStorage.getItem('token');
      // 请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;

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
</script>

<style>
.box-card {
    height: 100%;
}

.searchArea {
    margin: 10px 0;
}

.searchArea .searchInput {
  width: 350px;
}
</style>
