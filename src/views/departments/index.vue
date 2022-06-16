<template>
  <div class="departments">
    <!-- 组织架构布局 -->
    <el-card class="box-card">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="用户管理" name="userManage"></el-tab-pane>
        <div class="content">
          <TreeTool :data="comData" @open="open($event)"    style="width:100%"/>
          <el-divider style="width: 50%"></el-divider>
          <!-- 部门列表 -->
          <el-tree :data="deptList" style="width:100%">
            <TreeTool
              @open="open($event)"
              @openEdit="openEdit($event)"
              :data="data"
              slot-scope="{ data }"
              style="width: 100%"
              @updatedata="getDepList"
            />
          </el-tree>
        </div>
      </el-tabs>
    </el-card>
    <!-- v-model: @input="value=$event" -->
    <!-- <adddept :addShow="showAdd" @update:addShow="showAdd = $event"></adddept> -->
    <AddDept
   
      :addShow.sync="addShow"
      :pid="pid"
      @updatedata="getDepList"
      ref="adddept"
    />
  </div>
</template>

<script>
import TreeTool from "./components/treetool.vue";
import AddDept from "./components/adddept.vue";
import { getDeptListAPI } from "@/api";
export default {
  components: { TreeTool, AddDept },
  data() {
    return {
      // 标题数据
      comData: {
        name: "江苏传智播客教育科技股份有限公司",
        manager: "负责人",
        isRoot: true,
      },
      // 获取的部门数据
      deptList: [],
      // 控制面板显示隐藏
      addShow: false,
      activeTab: "userManage",
      // 部门id
      pid: "",
    };
  },
  methods: {
    // 获取部门列表
    async getDepList() {
      try {
        let res = await getDeptListAPI();
        this.deptList = this.trunData(res.data.depts, "");
      } catch (err) {
        console.log(err);
      }
    },
    // 处理树状结构数据
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
    // 树状组件添加事件控制显示隐藏
    open(id) {
      this.addShow = true;
      // 从树状结构组件传出id使用$event接受传参到函数
      this.pid = id;
    },
    // 打开编辑页面
    openEdit(id) {
      this.addShow = true;
      // 编辑页面打开是调用组件内的方法
      this.$refs.adddept.getDeptDetail(id);
    },
  },
  created() {
    // 页面加载时调用获取部门列表
    this.getDepList();
  },
};
</script>
<style lang="scss">
.departments {
  margin: 20px;
  .box-card {
    padding: 20px 40px;
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 30px 80px 10px;
      .el-divider {
        width: 100%;
        margin: 5px auto 10px;
      }
      .el-row {
        font-size: 14px;
        .el-col:nth-child(2) {
          text-align: right;
        }
        .el-dropdown {
          margin-left: 30px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
