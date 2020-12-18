<template>
  <div>
    <Head />
    <div class="petTable">
      <el-form ref="form" class="petForm">
        <!-- <el-form-item>
          <el-input placeholder="请输入用户名称"></el-input>
        </el-form-item> -->
        <el-form-item>
          <!-- <el-button type="primary" @click="searchUser()"
            ><i class="el-icon-search"></i>查询</el-button
          > -->
          <el-button @click="handel_EditUserInfo(false, '')"
            ><i class="el-icon-circle-plus-outline"></i>新增用户</el-button
          >
        </el-form-item>
      </el-form>

      <div class="table">
        <el-table
          :data="
            tableData.data.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column
            v-for="(item, index) in tableData.head"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          >
            <template slot-scope="scope">
              {{ scope.row[item.prop] }}
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="250"
            class-name="small-padding fixed-width"
          >
            <template slot="header">
              <el-input
                v-model="search"
                placeholder="输入关键字搜索"
                size="mini"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="handel_EditUserInfo(true, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                icon="el-icon-delete"
                type="danger"
                size="mini"
                @click="handle_DelPetInfo(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <userEdit ref="userEdit" @isUpdate="fetchData" />
  </div>
</template>

<script>
import Head from "../components/module";
import { getUserList, delUser } from "../api/user";
import userEdit from "../components/user-edit"; //编辑添加页

export default {
  components: {
    Head,
    userEdit
  },
  data () {
    return {
      search: '',
      dialogFormVisible: false,
      listLoading: false,

      tableData: {
        data: [],
        head: [
          { label: '用户名称', prop: 'name' }, { label: '邮箱', prop: 'email' }, { label: '登录密码', prop: 'password' }
        ]
      },
    };
  },
  created () {
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      getUserList().then((result) => {
        debugger
        this.$set(this.tableData, 'data', result.data.data)
        console.log(this.tableData.data, '获取用户列表')
      });
    },
    // 编辑
    handel_EditUserInfo (isEdit, info) {
      //添加、编辑事件
      this.$refs.userEdit.info = info
      this.$refs.userEdit.isEdit = isEdit
      this.$refs.userEdit.dialogFormVisible = true
    },
    //删除
    handle_DelPetInfo (id) {
      delUser({ id: id }).then(rest => {
        if (rest.data.code == '200') {
          this.fetchData()
          this.$message.success("删除成功!");
        }
        else
          this.$message.success("删除失败!");
      })
    },
    // 用户查询
    searchUser () {

    },

  }
};
</script>

<style lang="scss" scoped>
.petForm {
  display: flex;
  justify-content: center;
  padding: 20px;

  margin: 20px 20px 0px;
}
.el-form-item {
  padding: 2%;
}

.petTable {
}

.petTable::after {
  display: block;
  content: "";
  clear: both;
}

.table {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.22);
  padding: 22px;
  margin: 20px;
}
</style>
