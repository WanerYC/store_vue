<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>

    <!-- 添加按钮 -->
    <el-row>
      <el-col :span="24">
        <el-button plain class="addBtn">添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      height="650px"
      v-loading="loadding"
      border
      stripe
      :data="list"
      style="width: 100%">
      <!-- 展开列 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 当前角色的权限列表 -->

          <el-row
            class="level1"
            v-for="item1 in scope.row.children"
            :key="item1.id">
            <!-- 一级权限 -->
            <el-col :span="4">
              <el-tag @close="handleClose(scope.row, item1.id)" closable>{{ item1.authName }}</el-tag>
              <i class="el-icon el-icon-arrow-right"></i>
            </el-col>
            <!-- 二/三级权限 -->
            <el-col :span="20">
              <el-row
                v-for="item2 in item1.children"
                :key="item2.id">
                <!-- 二级权限 -->
                <el-col :span="4">
                  <el-tag @close="handleClose(scope.row, item2.id)" type="success" closable>{{ item2.authName }}</el-tag>
                  <i class="el-icon el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="20">
                  <el-tag type="warning" closable
                    @close="handleClose(scope.row, item3.id)"
                    class="level3"
                    v-for="item3 in item2.children"
                    :key="item3.id">{{ item3.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- 没有权限的时候显示的内容 -->
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">暂时没有权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" @click="dialogVisible = true" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loadding: true,
      // 控制分配权限的弹出框
      dialogVisible: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loadding = true;
      const res = await this.$http.get('roles');
      this.loadding = false;
      // console.log(res);
      const data = res.data;
      console.log(data);
      this.list = data.data;
    },
    async handleClose(role, rightsId) {
      // console.log('关闭');
      // roleId 角色id
      const { data: resData } = await this.$http.delete(`roles/${role.id}/rights/${rightsId}`);
      console.log(resData);
      const { data, meta: { status, msg }} = resData;
      if (status === 200) {
        // 删除成功
        this.$message.success(msg);
        // 重新绑定当前角色的children权限
        role.children = data;
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

.addBtn {
  margin: 10px 0;
}

.level3 {
  margin-right: 5px;
  margin-bottom: 5px;
}

.level1 {
  margin-bottom: 10px;
}
</style>
