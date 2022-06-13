<template>
  <div class="setting">
    <el-card class="box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="userManage">
          <div class="userManage">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-plus"
              @click="addShow = true"
              >新增角色</el-button
            >
            <el-table
              algin="center"
              ref="mytable"
              highlight-current-row
              border
              :data="roleList"
            >
              <el-table-column label="序号" width="180" type="index">
              </el-table-column>
              <el-table-column label="角色" sortable width="180">
                <template v-slot="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column prop="describe" sortable label="描述">
                <template v-slot="scope">
                  {{ scope.row.description }}
                </template>
              </el-table-column>
              <el-table-column prop="operate" label="操作" width="180">
                <template v-slot="scope">
                  <div class="btn">
                    <button size="mini">分配权限</button>
                    <button size="mini" @click="openEdit(scope.row.id)">
                      修改
                    </button>
                    <button size="mini" @click="delRole(scope.row.id)">
                      删除
                    </button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="float: right"
              @current-change="pageChange"
              :current-page="page"
              :page-size="pagesize"
              layout="total, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="companyInfo"> 321 </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="form.id ? '修改角色' : '新增角色'"
      :visible="addShow"
      @close="close"
    >
      <el-form :model="form" style="padding: 0px 50px" ref="form">
        <el-form-item label="角色名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addManage">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleListAPI,
  addRoleAPI,
  delRoleAPI,
  RoleDetailsAPI,
  updateRoleAPI,
} from "@/api";

export default {
  data() {
    return {
      // 新增面板
      addShow: false,
      form: {
        name: "",
        description: "",
      },
      activeName: "userManage",
      // 当前页
      page: 1,
      // 每页条数
      pagesize: 10,
      roleList: [],
      total: 0,
    };
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      let res = await getRoleListAPI({
        page: this.page,
        pagesize: this.pagesize,
      });
      this.roleList = res.data.rows;
      this.total = res.data.total;
    },
    // 页数改变时触发事件
    pageChange(v) {
      this.page = v;
      this.getRoleList();
    },
    close() {
      // 清空表单数据
      this.form = {
        name: "",
        description: "",
      };
      this.$refs.form.resetFields();
      this.addShow = false;
    },
    // 新增角色
    async addManage() {
      if (!this.form.id) {
        let res = await addRoleAPI(this.form);
        this.page = Math.ceil(this.total / this.pagesize + 0.1);
      } else {
        let res = await updateRoleAPI(this.form.id, this.form);
      }
      this.getRoleList();
      this.$message.success(this.form.id ? "修改角色成功！" : "新增角色成功！");
      this.close();
    },
    // 修改角色
    async openEdit(id) {
      let res = await RoleDetailsAPI(id);
      this.form = res.data;
      this.addShow = true;
    },
    // 删除角色
    delRole(id) {
      this.$confirm("确定要删除该角色吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送删除请求
          await delRoleAPI(id);
          // 判断是否该页面只有一条数据
          if (this.roleList.length === 1) {
            this.page--;
          }
          // 重新请求列表
          this.getRoleList();
          this.$message({
            type: "success",
            message: "删除角色成功",
          });
        })
        .catch(() => {
          return false;
        });
    },
  },
  created() {
    this.getRoleList();
  },
};
</script>

<style lang="scss">
.setting {
  margin: 20px;
  .box-card {
    padding: 5px;
    .userManage {
      padding: 20px;
    }
    .el-table {
      margin: 20px 0px;
      .cell {
        text-align: center;
      }
      .btn {
        justify-content: center;
        display: flex;
        button {
          border: none;
          outline: none;
          background: transparent;
          color: #409eff;
          font-size: 12px;
          cursor: pointer;
          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }
  .el-tabs__item {
    padding: 0;
    width: 122px;
    text-align: center;
    font-size: 18px;
  }
  .el-tabs__active-bar {
    width: 122px !important;
  }
}
</style>
