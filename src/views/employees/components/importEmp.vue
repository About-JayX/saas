<template>
  <div class="importEmp">
    <el-card>
      <el-button
        class="backbtn"
        type="primary "
        size="small"
        @click="$router.back()"
        >返回</el-button
      >
      <span class="EmpTitle">员工导入</span>
      <el-card shadow="never" class="title-card"
        ><i class="el-icon-warning"></i>
        <span
          >每次导入仅可添加1000名员工，姓名、手机、入职时间、聘用形式为必填项</span
        ></el-card
      >
      <excel
        style="margin-top: -30px"
        :beforeUpload="beforeUpload"
        :onSuccess="onSuccess"
      ></excel>
    </el-card>
  </div>
</template>

<script>
import { importEmplAPI } from "@/api";
export default {
  data() {
    return {
      total: this.$route.query.total,
      pagesize: this.$route.query.pagesize,
    };
  },
  methods: {
    beforeUpload(file) {
      if (file.size < 2 * 1024 * 1024) {
        return true;
      } else {
        this.$message.error("对不起，文件过大！");
        return false;
      }
    },
    async onSuccess({ results }) {
      // 简历中英对照字典
      // const obj = {
      //   入职日期: "timeOfEntry",
      //   姓名: "username",
      //   工号: "workNumber",
      //   手机号: "mobile",
      //   转正日期: "correctionTime",
      // };

      let newSults = results.map((item) => {
        return {
          timeOfEntry: this.$options.filters.Timeformat(item["入职日期"]),
          username: item["姓名"],
          workNumber: item["工号"],
          mobile: item["手机号"],
          correctionTime: this.$options.filters.Timeformat(item["转正日期"]),
        };
        // const keyArr = Object.keys(item);
        // const newObj = {};
        // keyArr.forEach((key) => {
        //   const mykey = obj[key];
        //   let myval;
        //   if (key == "入职日期" || key == "转正日期") {
        //     myval = this.turnday(item[key]);
        //   } else {
        //     myval = item[key];
        //   }
        //   newObj[mykey] = myval;
        // });
        // this.total++;
        // return newObj;
      });
      await importEmplAPI(newSults);
      this.$message.success("批量导入员工成功！");
      this.$router.push({
        name: "employees",
        query: { addEmpList: true, total: this.total, pagesize: this.pagesize },
      });
    },
    // 转化时间
    turnday(days) {
      // 转为时间戳
      let tsp = (days - 1) * 24 * 60 * 60 * 1000;
      // 转为js时间
      let newTime = new Date(tsp);
      newTime.setFullYear(newTime.getFullYear() - 70);
      return newTime;
    },
  },
};
</script>

<style lang="scss" scope>
.importEmp {
  margin: 20px;
  .el-card {
    padding: 180px 40px 120px;
    position: relative;
    .backbtn {
      position: absolute;
      left: 30px;
      top: 30px;
    }
    .EmpTitle {
      top: 40px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 24px;
      font-weight: 700;
      position: absolute;
    }
    .title-card {
      background-color: #fdf6ec;
      display: flex;
      font-size: 14px;
      align-items: center;
      padding: 0;
      border: 0;
      color: #e6a23c;
      width: 100%;
      top: -100px;
      height: 30px;
    }
  }
}
</style>
