<template>
  <div>
    <el-row>
      <el-col :span="20" :class="{ title: data.isRoot }">
        <i :class="{ 'el-icon-s-home': data.isRoot }"></i>
        {{ data.name }}</el-col
      >
      <el-col :span="4"
        >{{ data.manager }}
        <!-- 绑定点击指令 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="!data.isRoot" command="check"
              >查看部门</el-dropdown-item
            >
            <el-dropdown-item v-if="!data.isRoot" command="del"
              >删除部门</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { delDeptAPI } from "@/api";
export default {
  props: {
    data: {
      required: true,
    },
  },
  methods: {
    handleCommand(command) {
      // 删除部门
      if (command == "del") {
        this.$confirm("是否删除该部门？", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await delDeptAPI(this.data.id);
            // 父级重新发送请求刷新页面
            this.$emit("updatedata");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            return false;
          });
      }
      //   增加部门
      else if (command == "add") {
        this.$emit("open", this.data.id);
      } else {
        this.$emit("openEdit", this.data.id);
      }
    },
  },
};
</script>

<style lang="scss">
.title {
  font-weight: 700;
}
</style>
