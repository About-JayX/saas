<template>
  <!--  -->
  <el-dialog
    :title="form.id ? '修改部门' : '新增部门'"
    :visible="addShow"
    @close="close"
  >
    <el-form :rules="rules" :model="form" label-width="100px" ref="form">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" placeholder="请选择">
          <el-option
            v-for="(item, index) in managerList"
            :key="index"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button @click="sumbit" type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getSimpleListApi,
  getDeptListAPI,
  addDeptAPI,
  getDeptDetailAPI,
  updateDeptAPI,
} from "@/api";

export default {
  // 页面加载时调用
  created() {
    // 加载负责人列表
    this.getSimpleList();
  },
  // addShow：控制面板的显示与隐藏
  props: ["addShow", "pid"],
  data() {
    return {
      // 当前表单中的数据源
      form: {
        code: "", // 部门编码
        introduce: "", // 部门介绍
        manager: "", // 部门负责人的名称
        name: "", // 部门名称
        pid: "",
      },
      //   负责人列表
      managerList: [],
      // 表单的校验规则
      rules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { min: 1, max: 50, message: "长度必须为1~50个字符", trigger: "blur" },
          //   自定义校验规则：同级部门名称不能相同
          {
            validator: async (rule, value, callback) => {
              let res = await getDeptListAPI();
              if (this.form.id) {
                res.data.depts.some(
                  (item) =>
                    item.pid == this.pid &&
                    item.name == value &&
                    item.id !== this.form.id
                )
                  ? callback(new Error("该部门已存在！"))
                  : callback();
              } else {
                res.data.depts.some(
                  (item) => item.pid == this.pid && item.name == value
                )
                  ? callback(new Error("该部门已存在！"))
                  : callback();
              }
            },
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入部门编码", trigger: "blur" },
          { min: 1, max: 50, message: "长度必须为1~50个字符", trigger: "blur" },
          //   自定义效验规则，编码不能重复
          {
            validator: async (rule, value, callback) => {
              let res = await getDeptListAPI();
              if (this.form.id) {
                res.data.depts.some(
                  (item) => item.code == value && item.id !== this.form.id
                )
                  ? callback(new Error("该部门编码已存在！"))
                  : callback();
              } else {
                res.data.depts.some((item) => item.code == value)
                  ? callback(new Error("该部门编码已存在！"))
                  : callback();
              }
            },
            trigger: "blur",
          },
        ],
        manager: [
          { required: true, message: "请选择部门负责人", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "请输入部门介绍", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "长度必须为1~300个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 关闭面板
    close() {
      // 重置表单
      this.$emit("update:addShow", false);
      this.form = {
        code: "", // 部门编码
        introduce: "", // 部门介绍
        manager: "", // 部门负责人的名称
        name: "", // 部门名称
        pid: "",
      };
      this.$refs.form.resetFields();
    },
    // 获取负责人列表
    async getSimpleList() {
      let res = await getSimpleListApi();
      this.managerList = res.data;
    },
    // 提交
    async sumbit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 效验通过
          if (!this.form.id) {
            let res = await addDeptAPI({
              ...this.form,
              pid: this.pid ? this.pid : "",
            });
          } else {
            let res = await updateDeptAPI(this.form);
          }
          this.$message.success(
            this.form.id ? "修改部门成功！" : "新增部门成功！"
          );
          //   通知父组件重新发送请求渲染页面
          this.$emit("updatedata");
          //   调用关闭对话框
          this.close();
        } else {
          return false;
        }
      });
    },
    // 获取部门详情
    async getDeptDetail(id) {
      let res = await getDeptDetailAPI(id);
      this.form = res.data;
    },
  },
};
</script>
