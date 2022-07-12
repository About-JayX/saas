<template>
  <div class="employees">
    <mytool>
      <template #right>
        <el-button
          type="primary"
          size="mini"
          @click="importEmp"
          :class="{ control: changeBtn('epls-imp') }"
          >导入</el-button
        >
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="addShow = true"
          >新增员工</el-button
        >
      </template>
    </mytool>
    <el-card shadow="never" style="margin-top: 15px">
      <!-- 表格区域 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="100">
        </el-table-column>
        <el-table-column label="头像" width="100">
          <template v-slot="{ row }">
            <img
              :src="row.staffPhoto"
              @click="imgLook(row.staffPhoto)"
              v-imgerr="imgUrl"
              alt=""
              class="myimgs"
            />
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="200">
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" width="150">
        </el-table-column>
        <el-table-column label="聘用形势" width="100">
          <template v-slot="scope">
            {{ scope.row.formOfEmployment | numberToWord }}
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="部门" width="100">
        </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间" width="200">
          <template v-slot="{ row }">
            {{ row.timeOfEntry | Timeformat }}
          </template>
        </el-table-column>
        <el-table-column label="是否在职" width="100"> </el-table-column>
        <el-table-column label="状态" width="100"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="text"
              @click="detailEmp(scope.row.id)"
              :class="{ control: changeBtn('epls-ck') }"
              >查看</el-button
            >
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button @click="openRole(scope.row)" type="text">角色</el-button>
            <el-button type="text" @click="delEmp(scope.row.id)"
              >删除</el-button
            >
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
    </el-card>
    <mypanel
      :addShow.sync="addShow"
      @addEmp="addEmp($event)"
      :page="page"
      :pagesize="pagesize"
      :total="total"
    ></mypanel>
    <el-dialog
      title="头像预览"
      :visible.sync="lookImgShow"
      :destroy-on-close="true"
    >
      <div class="imgLook">
        <!-- <img :src="lookURL" alt="" /> -->
        <canvas ref="myCanvas"></canvas>
      </div>
    </el-dialog>
    <!-- 分配角色面板 -->
    <el-dialog title="分配角色" :visible.sync="roleShow">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="(item, index) in roleList"
          :key="index"
          :label="item.id"
          >{{ item.name }}</el-checkbox
        >
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sumbitRole" type="primary">提交</el-button>
        <el-button @click="roleShow = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRcode from "qrcode";
import {
  getEmplistAPI,
  delEmpAPI,
  getRoleListAPI,
  getStaffUserInfoAPI,
  setUserAPI,
} from "@/api";
import mypanel from "./components/mypanel.vue";
export default {
  components: {
    mypanel,
  },
  data() {
    return {
      userId: "",
      // 控制角色面板的显示与隐藏
      roleShow: false,
      checkList: [],
      // 选中的元素的集合
      roleList: [],
      // lookURL: "",
      lookImgShow: false,
      imgUrl: require("@/assets/common/bigUserHeader.png"),
      addShow: false,
      tableData: [],
      page: 1,
      total: 0,
      pagesize: 10,
    };
  },
  methods: {
    changeBtn(val) {
      return this.$options.filters.controlBtn(val);
    },
    // 提交分配角色请求
    async sumbitRole() {
      let res = await setUserAPI({
        id: this.userId,
        roleIds: this.checkList,
      });
      this.$message.success("分配角色成功！");
      this.roleShow = false;
    },
    async openRole(row) {
      this.roleShow = true;
      this.userId = row.id;
      let res = await getStaffUserInfoAPI(row.id);
      this.checkList = res.data.roleIds;
    },
    imgLook(url) {
      this.lookImgShow = true;
      // this.lookURL = url;
      this.$nextTick(() => {
        QRcode.toCanvas(this.$refs.myCanvas, url, {
          width: 200,
          height: 200,
        });
      });
    },
    // 查看员工详情
    detailEmp(id) {
      this.$router.push(`/employees/detail?id=${id}`);
      localStorage.setItem("chenckId", id);
    },
    // 导入员工面板
    importEmp() {
      this.$router.push({
        name: "importEmp",
        query: { total: this.total, pagesize: this.pagesize },
      });
    },
    pageChange(v) {
      this.page = v;
      this.getEmplist();
    },
    // 获取员工列表
    async getEmplist() {
      if (this.$route.query.addEmpList) {
        this.page = Math.ceil(
          this.$route.query.total / this.$route.query.pagesize
        );
        let res = await getEmplistAPI({
          page: this.page,
          size: this.$route.query.pagesize,
        });
        this.total = res.data.total;
        this.tableData = res.data.rows;
      } else {
        let res = await getEmplistAPI({ page: this.page, size: this.pagesize });
        this.total = res.data.total;
        this.tableData = res.data.rows;
      }
    },
    // 删除员工
    async delEmp(v) {
      if (this.tableData.length === 1) {
        this.page--;
      }
      let res = await delEmpAPI(v);
      this.$message.success("删除员工成功！");
      this.getEmplist();
    },
    // 新增调优
    addEmp(v) {
      this.page = Math.ceil(v);
      this.getEmplist();
    },
    async gerRoleList() {
      let res = await getRoleListAPI();
      this.roleList = res.data.rows;
    },
  },
  created() {
    this.getEmplist();
    this.gerRoleList();
  },
};
</script>

<style lang="scss">
.employees {
  margin: 20px;
  .el-table {
    margin: 20px 0px;
    .cell {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
    }
  }
  .myimgs {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .imgLook {
    text-align: center;
    img {
      width: 80%;
    }
  }
}
.control {
  display: none !important;
}
</style>
