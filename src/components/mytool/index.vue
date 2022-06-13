<template>
  <div>
    <el-card>
      <div class="content">
        <div class="left" v-if="hideLeft">
          <slot name="left">
            <i class="el-icon-info"></i> 本月：社保在缴 公积金在缴 增员 减员
            入职 离职</slot
          >
        </div>
        <div class="right">
          <slot name="right">
            <el-button size="mini" type="primary">历史归档</el-button>
            <el-button size="mini" type="primary">导出</el-button></slot
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["hideLeft"],
};
</script>

<style lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    border: 1px solid #c1e8ff;
    background-color: #e7f7ff;
    padding: 8px;
    font-size: 14px;
    i {
      color: #429fff;
    }
  }
  .right{
    flex: 1;
    text-align: right;
  }
}
</style>
