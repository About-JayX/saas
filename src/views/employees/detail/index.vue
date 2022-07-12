<template>
  <div class="detail">
    <el-card>
      <el-button class="backbtn" type="primary " size="small" @click="back()"
        >返回</el-button
      >
      <el-button
        class="backbtn"
        type="primary "
        size="small"
        @click="toprint"
        v-if="activeName != 'first'"
        >打印</el-button
      >

      <el-tabs v-model="activeName" style="margin-top: 30px">
        <el-tab-pane label="登陆账户设置" name="first">
          <div class="my-form">
            <el-form
              ref="form"
              :rules="rules"
              :model="form"
              label-width="100px"
            >
              <el-form-item label="用户名:" prop="username" label-width="100px">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <div class="password">
                  <el-input v-model="form.password" :type="type" border>
                  </el-input>
                  <div @click="psShow">
                    <svg-icon v-if="passwordShow" icon-class="eye-open" />
                    <svg-icon v-else icon-class="eye" />
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button @click="updateEmp" type="primary">更新</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="second"
          ><userInfo @updateEmp="getStaffUserInfo" ref="userInfo"></userInfo
        ></el-tab-pane>
        <el-tab-pane label="岗位信息" name="third"
          ><jobInfo></jobInfo
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import userInfo from "../components/userInfo.vue";
import jobInfo from "../components/jobInfo.vue";
import { getStaffUserInfoAPI, saveEmpAPI } from "@/api";
export default {
  components: {
    userInfo,
    jobInfo,
  },
  data() {
    return {
      type: "password",
      passwordShow: true,
      activeName: "first",
      rules: {
        username: [
          { required: true, message: "请输入更改的用户名", trigger: "blur" },
          { min: 1, max: 50, message: "请输入合法的用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入更改的密码", trigger: "blur" },
          { min: 1, max: 50, message: "请输入合法的密码", trigger: "blur" },
        ],
      },
      form: {
        id: localStorage.getItem("chenckId"),
        username: "",
        password: "",
      },
    };
  },
  methods: {
    back() {
      this.$router.back();
      localStorage.removeItem("chenckId");
    },
    toprint() {
      this.$router.push(`/employees/print?active=${this.activeName}`);
    },
    async getStaffUserInfo() {
      let res = await getStaffUserInfoAPI(this.form.id);
      this.form = res.data;
    },
    async updateEmp() {
      let res = await saveEmpAPI(this.form);
      await this.$store.dispatch("user/getUserInfo");
      this.$message.success("修改信息成功！");
      this.$refs.form.resetFields();
      this.getStaffUserInfo();
      this.$refs.userInfo.getUserInfo();
    },
    psShow() {
      this.passwordShow = !this.passwordShow;
      if (this.passwordShow) {
        this.type = "password";
      } else {
        this.type = "text";
      }
    },
  },
  created() {
    this.getStaffUserInfo();
  },
};
</script>

<style lang="scss">
.detail {
  margin: 20px;
  .my-form {
    width: 400px;
    margin-top: 25px;
    margin-left: 300px;
    .password {
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
      .svg-icon {
        font-size: 12px;
        cursor: pointer;
        margin-right: 10px;
        color: #999;
      }
      .el-input__inner:nth-child(1) {
        border: none;
      }
    }
  }
}
</style>
