<template>
  <div class="workcalendar">
    <!-- 下拉框 -->
    <div class="yearandmonth">
      <el-select v-model="year" placeholder="请选择" @change="changeDate">
        <el-option
          v-for="(item, index) in yearList"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option
      ></el-select>
      <el-select v-model="month" placeholder="请选择" @change="changeDate">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">
        </el-option
      ></el-select>
    </div>
    <!-- 日历组件 -->
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{ date }">
        <div class="date">
          <span> {{ date.getDate() }}</span
          ><span class="xiu" :class="{ hidden: hiddenXiu(date) }">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  props: {
    myDate: {
      type: Date,
      default: () => {
        return new Date();
      },
    },
  },
  data() {
    return {
      year: "", // 年
      month: "", // 月
      value: "", // 日历组件中的值
      yearList: [],
    };
  },
  methods: {
    hiddenXiu(date) {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return false;
      } else {
        return true;
      }
    },
    changeDate() {
      this.value = new Date(`${this.year}-${this.month}-1`);
    },
  },
  watch: {
    myDate: {
      handler: function () {
        const currentTime = new Date(this.myDate);
        let _year = currentTime.getFullYear();
        let _month = currentTime.getMonth() + 1;
        this.year = _year;
        this.month = _month;
        for (let i = _year - 5; i < _year + 5; i++) {
          this.yearList.push(i);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.workcalendar {
  .yearandmonth {
    text-align: right;
    margin-top: 20px;
    input.el-input__inner {
      width: 100px;
      margin-left: 20px;
    }
  }
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table thead th {
    font-weight: 700;
    &:nth-child(6),
    &:nth-child(7) {
      color: #fa7c4d;
    }
  }
  .el-calendar-table__row .prev,
  .el-calendar-table__row .next,
  .el-calendar-table__row .current {
    border: none;
    text-align: center;
  }
  .el-calendar-day {
    line-height: 30px;
    height: 46px;
  }
}
.date {
  display: flex;
  align-items: center;
  justify-content: center;
  .xiu {
    display: flex;
    align-items: center;
    font-weight: 700;
    justify-content: center;
    margin-left: 3px;
    text-align: center;
    font-size: 12px;
    width: 16px;
    height: 16px;
    background-color: #fa7c4d;
    border-radius: 50%;
  }
  .hidden {
    display: none;
  }
}
</style>
