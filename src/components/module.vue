<template>
  <div class="adminCard">
    <div class="bar">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-menu-item index="1" @click="toHome">
          <i class="iconfont">&#xe652;</i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="logout">
          <i class="iconfont">&#xe62e;</i>
          <span slot="title">注销</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="first">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover" @click.native="user">
            <i class="iconfont">&#xe68c;</i> 用户管理
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" @click.native="handel_Organ">
            <i class="iconfont">&#xe61f;</i> 机构管理
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover" @click.native="pet">
            <i class="iconfont">&#xe6af;</i> 宠物管理
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            <i class="iconfont">&#xe717;</i> 申请管理
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <i class="iconfont">&#xe6ea;</i> 页面管理
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card shadow="hover">
            <i class="iconfont">&#xe633;</i> 公告管理
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adminPath: "",
      isCollapse: true,
      chartData: {
        columns: ["date", "PV"],
        rows: [
          { date: "01-01", PV: 1231 },
          { date: "01-02", PV: 1223 },
          { date: "01-03", PV: 2123 },
          { date: "01-04", PV: 4123 },
          { date: "01-05", PV: 3123 },
          { date: "01-06", PV: 7123 },
        ],
      },
    };
  },
  methods: {
    user () {
      this.$router.push({ path: "user" });
    },
    pet () {
      this.$router.push({ path: "pet" });
    },
    toHome () {
      this.$router.push({ path: "/home" });
    },
    logout () {
      console.log("触发logout函数");

      this.$store
        .dispatch("logout")
        .then(() => {
          this.$message.success("注销成功");
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          this.$message.error("注销失败");

        });
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },

    handel_Organ () {
      this.$router.push({ path: "/organ" });
    }
  },
};
</script>


<style lang="scss" scoped>
.adminCard {
  padding: 3px;
  display: flex;
}

.first {
  width: 100%;
}

/deep/.el-card__body {
  margin: 30px !important;
}

.el-card {
  margin: 10px 40px;
  box-shadow: 0 0 6px rgba(180, 160, 120, 0.8);
}

// icon
@font-face {
  font-family: "iconfont"; /* project id 2255426 */
  src: url("//at.alicdn.com/t/font_2255426_7v1zb4ktapr.eot");
  src: url("//at.alicdn.com/t/font_2255426_7v1zb4ktapr.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_2255426_7v1zb4ktapr.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_2255426_7v1zb4ktapr.woff") format("woff"),
    url("//at.alicdn.com/t/font_2255426_7v1zb4ktapr.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_2255426_7v1zb4ktapr.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

// 侧边导航栏
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.bar {
  align-self: center;
}
</style>