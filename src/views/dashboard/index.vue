<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div class="title">工作日历</div>
          <div class="line"></div>
          <workcalendar></workcalendar>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card> 右侧 </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import workcalendar from "./components/workcalendar.vue";
export default {
  components: {
    workcalendar,
  },
};
</script>

<style lang="scss">
.dashboard {
  margin: 20px;
  .title {
    font-size: 24px;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin-top: 20px;
  }
}
</style>
