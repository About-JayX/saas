<template>
  <div class="mypanel">
    <el-dialog
      title="新增员工"
      :visible="addShow"
      @close="close"
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.timeOfEntry"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="form.formOfEmployment" placeholder="请选择">
            <el-option
              v-for="item in hireType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="form.workNumber"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <div class="dept">
            <el-input
              @focus="treeShow = true"
              v-model="form.departmentName"
            ></el-input>
            <el-tree
              v-if="treeShow"
              class="mytree"
              default-expand-all
              :data="treeData"
            >
              <template slot-scope="{ data }">
                <el-button type="text" @click="getData(data.name)">
                  {{ data.name }}
                </el-button>
              </template>
            </el-tree>
          </div>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.correctionTime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sumbit">提 交</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import employees from "@/api/constant/employees";
import { getDeptListAPI, addEmpAPI } from "@/api";
export default {
  props: ["addShow", "total", "pagesize"],

  data() {
    return {
      form: {
        username: "", // 姓名
        mobile: "", // 手机
        formOfEmployment: "", // 聘用形式
        workNumber: "", // 工号
        departmentName: "", // 部门名称
        timeOfEntry: "", // 入职时间
        correctionTime: "", // 转正时间
      },
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 30, message: "1-30个字符", trigger: "blur" },
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        timeOfEntry: [
          { required: true, message: "入职时间不能为空", trigger: "blur" },
        ],
        formOfEmployment: [
          { required: true, message: "聘用形式不能为空", trigger: "blur" },
        ],
        workNumber: [
          { required: true, message: "工号不能为空", trigger: "blur" },
        ],
        departmentName: [
          { required: true, message: "部门名称不能为空", trigger: "change" },
        ],
        correctionTime: [
          { required: true, message: "转正时间不能为空", trigger: "blur" },
        ],
      },
      hireType: employees.hireType,
      //   树状结构数据源
      treeData: [
        { label: "北京" },
        {
          label: "深圳",
          children: [{ label: "南山" }, { label: "宝安" }],
        },
        { label: "广州" },
      ],
      //   控制部门显示隐藏
      treeShow: false,
    };
  },
  methods: {
    // 提交新增员工
    async sumbit() {
      this.$refs.form.validate(async (v) => {
        if (v) {
          let res = await addEmpAPI(this.form);
          this.close();
          this.$emit("addEmp", (this.total + 1) / this.pagesize);
          this.$message.success("新增成功！");
        } else {
          return false;
        }
      });
    },
    // 获取树状结构span的值
    getData(name) {
      this.form.departmentName = name;
      this.treeShow = false;
    },
    // 发送获取部门列表请求
    async getDeptList() {
      let res = await getDeptListAPI();
      this.treeData = this.turnData(res.data.depts, "");
    },
    // 关闭新增修改面板
    close() {
      this.$emit("update:addShow", false);
      this.form = {
        username: "", // 姓名
        mobile: "", // 手机
        formOfEmployment: "", // 聘用形式
        workNumber: "", // 工号
        departmentName: "", // 部门名称
        timeOfEntry: "", // 入职时间
        correctionTime: "", // 转正时间
      };
      // 重置表单验证
      this.$refs.form.resetFields();
    },
    turnData(arr, pid) {
      let newArr = [];
      arr.forEach((item) => {
        if (item.pid == pid) {
          let children = this.turnData(arr, item.id);
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
    this.getDeptList();
  },
};
</script>

<style lang="scss">
.mypanel {
  .dept {
    width: 300px;
    position: relative;
    .mytree {
      height: 150px;
      overflow: auto;
      position: absolute;
      bottom: -6px;
      left: 0;
      transform: translateY(100%);
      z-index: 999;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 6px;
      .el-tree-node__content {
        height: 36px;
      }
      .el-button {
        width: 100%;
        height: 100%;
        color: #000;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
