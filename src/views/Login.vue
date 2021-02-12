<template>
  <div>
    <el-container>
      <el-header>
        <img class="boliLogo" src="https://cdn.jsdelivr.net/gh/bolitao/PicRepository/img/favicon.png" alt="icon">
      </el-header>

      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// TODO
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'bolitao',
        password: '111111'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 50, message: '密码长度需大于 6', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios.post('/auth/login', this.ruleForm).then(resp => {
            const jwt = resp.headers['authorization'];
            const userInfo = resp.data.data;

            // 设置
            _this.$store.commit('SET_TOKEN', jwt)
            _this.$store.commit('SET_USER_INFO', userInfo)

            // 获取
            console.log(_this.$store.getters.getUser)

            _this.$router.push('/')
          })
        } else {
          // console.log('error submit!!');
          alert("?")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.boliLogo {
  margin-top: 10px;
  height: 80%;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;

}
</style>
