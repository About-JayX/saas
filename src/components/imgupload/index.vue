<template>
  <div>
    <!-- 图片上传组件 -->
    <div class="imgupload">
      <el-upload
        :show-file-list="false"
        v-if="!imgUrl"
        list-type="picture-card"
        action="#"
        :http-request="httpRequest"
        :before-upload="checkimg"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div class="myimg" v-else @click="imgShow = true">
        <img :src="imgUrl" alt="" />
        <i class="el-icon-close myicon" @click.stop="clearImgBox"></i>
      </div>
      <el-progress
        :show-text="false"
        class="progress"
        type="circle"
        :percentage="percentage"
        v-if="progressShow"
        status="success"
      ></el-progress>
    </div>
    <el-dialog :visible.sync="imgShow" title="头像预览" class="img-dialog">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 导入sdk
import COS from "cos-js-sdk-v5";
export default {
  props: ["imgUrl"],
  data() {
    return {
      imgShow: false,
      cos: null,
      progressShow: false,
      percentage: 0,
    };
  },
  methods: {
    httpRequest(obj) {
      this.progressShow = true;
      this.cos.putObject(
        {
          Bucket: "rz-1312526753" /* 必须 */,
          Region: "ap-nanjing" /* 存储桶所在地域，必须字段 */,
          Key: obj.file.name /* 必须 */,
          StorageClass: "STANDARD",
          Body: obj.file, // 上传文件对象
          onProgress: (progressData) => {
            this.percentage = Math.floor(progressData.percent * 100);
          },
        },
        (err, data) => {
          // data: 上传成功后的返回值
          // err: 上传出错的错误信息
          // console.log(err || data)
          // console.log(data)
          // 将图片的地址保存到 imgUrl 中
          this.$emit("update:imgUrl", `https://${data.Location}`);
          setTimeout(() => {
            this.progressShow = false;
          }, 600);
        }
      );
    },
    clearImgBox() {
      this.$emit("update:imgUrl", "");
    },
    checkimg(file) {
      let isSize = file.type == "image/png" || file.type == "image/jpeg";
      let isBig = file.size < 2 * 1024 * 1024;
      if (!isSize) {
        this.$message.error("图片格式不合法！");
        return false;
      }
      if (!isBig) {
        this.$message.error("图片过大！");
        return false;
      }
      return true;
    },
  },
  created() {
    this.cos = new COS({
      SecretId: "AKIDJUSDoHcjdeWDhz64sX2LRM7g3DLUTJzV",
      SecretKey: "OabQ4Xn3B9wXvEQVO4XouoW8av680jGb",
    });
  },
};
</script>

<style lang="scss">
.imgupload {
  display: inline-block;
  position: relative;
  .myimg {
    width: 150px;
    position: relative;
    height: 150px;
    img {
      cursor: pointer;
      width: 100%;
      height: 100%;
      vertical-align: middle;
      object-fit: contain;
      border: 1px solid #ccc;
    }
    .myicon {
      position: absolute;
      cursor: pointer;
      top: 1px;
      right: 1px;
      color: #fff;
      background: #999;
    }
  }
  .progress {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 50px;
    height: 50px;
    svg {
      width: 50px;
    }
  }
}
 .img-dialog {
    text-align: center;
    vertical-align: middle;
    img {
      height: 60%;
      width: 60%;
    }
  }
</style>
