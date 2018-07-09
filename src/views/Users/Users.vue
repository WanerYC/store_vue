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
			<el-input placeholder="请输入内容" clearable class="searchInput">
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
			<el-button type="success" plain>添加用户</el-button>
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
		<el-table-column label="用户状态" width="100">
			<template slot-scope="scope">
				<!-- scope.row 就是当前行绑定数据对象 -->
				<el-switch
					v-model="scope.row.mg_state"
					active-color="#13ce66"
					inactive-color="#ff4949">
				</el-switch>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
				<el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
				<el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
			</template>
		</el-table-column>
	</el-table>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: true
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 发送异步请求
    async loadData() {
      this.loading = true;
      // 获取token
      const token = sessionStorage.getItem('token');
      // 请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;

      const res = await this.$http.get('users?pagenum=1&pagesize=10');
      this.loading = false;
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        // 成功
        const { data: { users } } = data;
        this.list = users;
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
