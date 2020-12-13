<template>
  <div class="admin">
            <div class="conContainer">
        <div class="css-typing">
          <p>宠物救助网，管理员登录</p>
          
        </div>
      </div>
    <div class="login">



      <div class="loginInput">
        <div class="text">宠物领养系统后台</div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="loginfrom"
        >
          <el-form-item
            prop="email"
            :rules="[
              { message: '请输入邮箱地址', trigger: 'blur' },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input
              placeholder="请输入邮箱"
              prefix-icon="el-icon-user"
              v-model="loginForm.email"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="button" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {adminLogin} from "../api/login"
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      console.log(this.loginForm.email, this.loginForm.password);
      adminLogin({ email: this.loginForm.email, password: this.loginForm.password });
      // console.log(this.$qs.stringify(this.loginForm));
      // console.log(JSON.stringify(this.loginForm));
      //传递信息
        this.$store
          .dispatch("adminLogin",{ email: this.loginForm.email, password: this.loginForm.password })
          .then(() => {
            this.$router.push({ path: "/home" });
            this.$message.success("登录成功!");
          })
          .catch(() => {
            this.$message.error("登录失败");
          });
      // 清空表单
      //   let input = document.querySelectorAll(".demo-input-suffix input");
      //   input[0].value = "";
      //   input[1].value = "";
    },
    // toSignin() {
    //   //   this.$router.push({ path: "signin" });
    // },
  },
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginfrom {
  margin: 15px;
  padding: 15px;
}
.loginInput {
  margin: 10%;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.22);

  width: 40%;
  padding: 10px;
  margin-top: 15%;
}
.text {
  margin: 25px;

  margin: 0px 20px 30px;
}

.el-button--primary {
  width: 60%;
}

// 打字效果
.css-typing {
  box-shadow: 6px 0 5px -5px rgba(180, 160, 120, 0.6),
    -6px 0 5px -5px rgba(180, 160, 120, 0.6);
  width: 100%;
}
.css-typing p {
  border-right: 0.15em solid orange;
  font-family: "Courier";
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px;
}
.css-typing p:nth-child(1) {
  width: 100%;
  animation: type 4s steps(40, end);
  animation-fill-mode: forwards;
}

.css-typing p:nth-child(2) {
  width: 100%;
  opacity: 0;
  animation: type2 4s steps(40, end);
  animation-delay: 4s;
  animation-fill-mode: forwards;
}

@keyframes type {
  0% {
    width: 0;
  }
  99.9% {
    border-right: 0.15em solid orange;
  }
  100% {
    border: none;
  }
}

@-webkit-keyframes type {
  0% {
    width: 0;
  }
  99.9% {
    border-right: 0.15em solid orange;
  }
  100% {
    border: none;
  }
}

@keyframes type2 {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  99.9% {
    border-right: 0.15em solid orange;
  }
  100% {
    opacity: 1;
    border: none;
  }
}

@-webkit-keyframes type2 {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  99.9% {
    border-right: 0.15em solid orange;
  }
  100% {
    opacity: 1;
    border: none;
  }
}

@keyframes type3 {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes type3 {
  0% {
    width: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
@-webkit-keyframes blink {
  50% {
    border-color: tranparent;
  }
}
</style>
