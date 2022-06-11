<template>
  <div class="navbar">
    <div class="left-box">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <div class="title">
        <div>江苏传智博客教育科技股份有限公司</div>
        <span>体验版</span>
      </div>
    </div>
    <div class="right-box">
      <img
        style="width: 25px; height: 25px; border-radius: 50%; margin-right: 5px"
        :src="staffPhoto"
        v-imgerr="defaultImg"
        fit="cover"
      />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.username
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="dashboard">首页</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "userInfo", "staffPhoto"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    handleCommand(command) {
      if (command === "logout") {
        console.log(this.staffPhoto);
      }
    },
  },
  data() {
    return {
      defaultImg: require("@/assets/common/bigUserHeader.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background-image: linear-gradient(to right, #5b8cff, #3d6df8);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .left-box {
    display: flex;
    align-items: center;
    .title {
      color: #fff;
      display: flex;
      align-items: center;
      div {
        font-size: 18px;
        margin-right: 10px;
      }
      span {
        display: inline-block;
        padding: 6px 8px;
        border-radius: 8px;
        background: rgba($color: #fff, $alpha: 0.4);
        font-size: 14px;
      }
    }
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba($color: #5db1ff, $alpha: 0.5);
      }
    }
  }
  .right-box {
    display: flex;
    align-items: center;
    margin-right: 10px;
    .el-dropdown-link {
      cursor: pointer;
      color: #000;
    }
    .el-icon-arrow-down {
      font-size: 16px;
      color: #fff;
      font-weight: 700;
    }
  }
}
</style>
