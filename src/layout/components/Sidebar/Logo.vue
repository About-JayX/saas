<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" class="sidebar-logo-link">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
      </div>
      <div v-else class="sidebar-logo-link">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      logo: require("@/assets/common/logo.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  margin: 8px 0px;
  position: relative;
  width: 100%;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      object-fit: contain;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      width: 80%;
      height: 30px;
    }
  }
}
</style>
