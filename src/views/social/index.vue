<template>
  <div>
    <imgupload :imgUrl.sync="imgUrl"></imgupload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F22%2F20200322110516_mytyz.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658022900&t=0e274081003130019149b4e57e8d1cd9",
    };
  },
};
</script>

<style></style>
