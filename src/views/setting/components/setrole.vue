<template>
  <div class="setper">
    <el-dialog
      :title="`给[${name}]分配权限`"
      :visible="perShow"
      close-on-click-modal
      @close="cancel"
    >
      <el-tree
        ref="mytree"
        :data="perList"
        default-expand-all
        show-checkbox
        :check-strictly="true"
        node-key="id"
        :props="{ label: 'name' }"
      >
      </el-tree>

      <div class="mybtn">
        <el-button @click="submit" type="primary">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPerListApi } from "@/api/permission";
import { getRoleAPI, setRolePerAPI } from "@/api";
export default {
  props: ["name", "perShow"],
  data() {
    return {
      perList: [], // 保存用户 ID
      roleId: "",
    };
  },
  methods: {
    // 提交数据
    async submit() {
      // 获取权限 ID 的集合
      const permIds = this.$refs.mytree.getCheckedKeys();
      console.log(permIds);
      let res = await setRolePerAPI({
        id: this.roleId,
        permIds: permIds,
      }); // 提示成功
      console.log(res);
      this.$message.success("修改权限成功"); // 关闭面板
      this.cancel();
    }, // 获取角色详情

    async getRole(id) {
      // 保存用户ID
      this.roleId = id; // 发请求获取角色详情
      console.log(id);
      const res = await getRoleAPI(id); // console.log(res);
      this.$refs.mytree.setCheckedKeys(res.data.permIds);
    }, // 关闭面板

    cancel() {
      this.$emit("update:perShow", false);
    }, // 获取所有的权限点

    async getPerList() {
      // 发请求获取权限
      const res = await getPerListApi(); // console.log(res);
      this.perList = this.trunData(res.data, "0");
    }, // 定义一个转换数据的方法

    trunData(arr, pid) {
      const newArr = [];
      arr.forEach((item) => {
        if (item.pid === pid) {
          const children = this.trunData(arr, item.id);
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
.setper {
  .mybtn {
    text-align: center;
  }
}
</style>
