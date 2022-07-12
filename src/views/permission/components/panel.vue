<template>
  <div class="panel">
    <el-dialog
      :title="ruleForm.id ? '编辑权限' : '新增权限'"
      :visible="panelShow"
      @close="close"
    >
      <div class="myform" style="width: 85%">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item label="权限名称">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
          <el-form-item label="企业可见">
            <el-switch
              v-model="ruleForm.enVisible"
              active-color="#13ce66"
              active-value="1"
              inactive-value="0"
              active-text="企业可见"
              inactive-text="企业不可见"
            >
            </el-switch>
          </el-form-item>

          <el-form-item>
            <div class="panelbtn">
              <el-button @click="close">取消</el-button>
              <el-button type="primary" @click="submit">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPerByIdApi, updatePerByIdApi, addPerApi } from "@/api/permission";
export default {
  props: ["panelShow"],
  data() {
    return {
      ruleForm: {},
    };
  },
  methods: {
    savData(type, pid) {
      this.ruleForm.type = type;
      this.ruleForm.pid = pid;
    },
    close() {
      this.$emit("update:panelShow", false);
      setTimeout(() => {
        this.$refs.ruleForm.resetFields();
        this.ruleForm = {};
      }, 500);
    },
    async submit() {
      if (this.ruleForm.id) {
        let res = await updatePerByIdApi(this.ruleForm);
      } else {
        let res = await addPerApi(this.ruleForm);
      }
      this.$message.success(
        this.ruleForm.id ? "修改权限成功！" : "新增权限成功！"
      );
      await this.$emit("updatedata");
      this.close();
    },
    async getPerById(id) {
      let res = await getPerByIdApi(id);
      this.ruleForm = res.data;
    },
  },
  created() {},
};
</script>

<style lang="scss">
.panelbtn {
  display: flex;
  justify-content: center;
}
</style>
