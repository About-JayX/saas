<template>
  <div class="permission">
    <el-card>
      <div class="clearfix">
        <el-button
          style="float: right"
          type="primary"
          size="small"
          icon="el-icon-edit"
          @click="addpanel(1, '0')"
          >添加菜单</el-button
        >
      </div>
      <template>
        <el-table :data="tableData" style="width: 100%" row-key="id">
          <el-table-column prop="name" label="菜单名称" width="200">
          </el-table-column>
          <el-table-column prop="code" label="权限标识" width="250">
          </el-table-column>
          <el-table-column prop="description" label="描述" width="250">
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="text"
                size="small"
                @click="addpanel(2, scope.row.id)"
                v-if="scope.row.type !== 2"
                >添加权限点</el-button
              >
              <el-button type="text" size="small">查看api权限</el-button>
              <el-button
                type="text"
                size="small"
                @click="openShow(scope.row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small" @click="del(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <panel :panelShow.sync="panelShow" ref="mypanel" @updatedata="getPerList">
    </panel>
  </div>
</template>

<script>
import { getPerListApi, delPerByIdApi } from "@/api/permission";
import panel from "./components/panel.vue";
export default {
  components: {
    panel,
  },
  data() {
    return {
      panelShow: false,
      tableData: [],
    };
  },
  methods: {
    addpanel(type, pid) {
      this.$refs.mypanel.savData(type, pid);
      this.panelShow = true;
    },
    async openShow(id) {
      await this.$refs.mypanel.getPerById(id);
      this.userId = id;
      this.panelShow = true;
    },

    async del(id) {
      try {
        await this.$confirm("是否要删除当前权限？", "提示");
        await delPerByIdApi(id);
        this.$message.success("删除成功！");
        this.getPerList();
      } catch {
        return false;
      }
    },
    async getPerList() {
      let res = await getPerListApi();
      this.tableData = this.turnData(res.data, "0");
    },
    turnData(arr, pid) {
      let newArr = [];
      arr.forEach((item) => {
        if (item.pid === pid) {
          const children = this.turnData(arr, item.id);
          if (children.length > 0) {
            item.children = children;
          }
          newArr.push(item);
        }
      });
      return newArr;
    },
  },
  created() {
    this.getPerList();
  },
};
</script>

<style lang="scss">
.permission {
  margin: 20px;
  .el-card {
    padding: 20px 40px 60px;
  }
}
</style>
