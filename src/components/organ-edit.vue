<template>
  <div class="app-container">
    <!--模态框-->
    <el-dialog
      :title="isEdit == false ? '添加机构信息' : '编辑机构信息'"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <!-- :close-on-click-modal="false" -->
      <el-form
        ref="listInfo"
        :rules="rules"
        :model="listInfo"
        label-position="left"
        label-width="150px"
        style="width: 80%; margin-left: 50px"
      >
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="listInfo.name" />
        </el-form-item>
        <el-form-item label="登录账号" prop="account">
          <el-input v-model="listInfo.account" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="listInfo.password" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="handle_SaveButExam()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addOrgan, setOrgan } from '@/api/organ.js'

var _self
export default {
  name: "organ-edit",
  props: [],//属性
  components: {},
  computed: {
    ...mapGetters([
      // 'common',
      // 'workid'
    ])
  },
  data () {
    return {
      // 模态框
      dialogFormVisible: false,
      isEdit: false,
      rules: {
        name: [{ required: true, message: '机构名称不能为空', trigger: 'blur' }],
        account: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }],
      },
      // 添加编辑信息
      listInfo: {},
      info: {},
    }
  },
  watch: {
    dialogFormVisible (newVal) {
      _self = this
      if (newVal == true) {
        // 移除表单验证
        _self.restModelRules()
        // 重置数据
        _self.restWorkData()
      }
      if (_self.isEdit && _self.dialogFormVisible) {
        // 获取数据
        _self.fetchData()
      }
    }
  },
  created () {

  },
  methods: {
    fetchData () {
      this.listInfo = this.info
    },
    // 提交
    handle_SaveButExam () {
      this.$refs.listInfo.validate((valid) => {
        if (valid) {
          if (!_self.isEdit) {
            //添加机构信息
            addOrgan({ name: _self.listInfo.name, account: _self.listInfo.account, password: _self.listInfo.password }).then(rest => {
              if (rest.data.data == 200) {
                _self.callbackData('添加完成。')
              }
            })
          }
          else {
            //编辑机构信息
            setOrgan({ name: _self.listInfo.name, account: _self.listInfo.account, password: _self.listInfo.password, id: _self.listInfo.id }).then(rest => {
              if (rest.data.data == 200) {
                _self.callbackData('修改完成。')
              }
            })
          }
        }
      })
    },
    // 回显
    callbackData (msg) {
      _self.$emit('isUpdate')
      this.$message.success(msg);
      _self.dialogFormVisible = false
    },
    //清空数据
    restWorkData () {
      _self.listInfo = { name: '', account: '', password: '' }
    },
    //移除表单验证
    restModelRules () {
      this.$nextTick(() => {
        this.$refs['listInfo'].clearValidate()
      })
    },
  }
}

</script>


