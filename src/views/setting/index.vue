<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name='frist'>
          <el-row :gutter="10">
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              style="margin-left: 10px"
              @click="dialogVisible=true"
            >新增角色</el-button>
          </el-row>
          <el-table v-loading='loading' border="" :data='roleList'>
            <el-table-column label="序号" width="120" type='index' />
            <el-table-column label="角色名称" width="240" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作" width="240">
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row :gutter="10" type="flex" justify="end" align="middle" style="height:60px">
            <el-pagination
              v-if='total>0'
              background
              :total="total"
              layout="prev, pager, next, sizes"
              :current-page.sync='page.page'
              :page-size.sync='page.pagesize'
              :page-sizes=[2,5,10,15]
              @current-change='getRoleList'
              @size-change='getRoleList'
            />

          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name='second'></el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole ref="addRole" :dialog-visible.sync='dialogVisible' @reshList='getRoleList' />
  </div>
</template>

<script>
import addRole from './components/addRole.vue'
import { getRoleList } from '@/api/setting'
export default {
  name: 'HrsaasIndex',
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'frist',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      dialogVisible: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        this.total = total
        this.roleList = rows
      } finally {
        this.loading = false
      }
    },
    addRole() {
      this.dialogVisible = true
    },
    // 绑定点击事件
    // 拿到当前行这条数据
    // 回显在新增角色的组件上
    editRole(row) {
      // row直接赋值给addRole
      console.log(row)
      this.$refs.addRole.formDate = { ...row }
      this.dialogVisible = true
    }
  }

}
</script>

<style>

</style>
