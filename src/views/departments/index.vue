<template>
  <div class="departments-container">

    <el-card>
      <tree-tools :isRoot="false" :tree-node="company" />
    </el-card>

    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <tree-tools slot-scope="{data}" :tree-node="data" @addDept='handCommand' />
    </el-tree>
    <HrsaasAddDept :dialog-visible.sync="dialogVisible" :tree-node='currentNode' />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import HrsaasAddDept from './components/add-depts.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    HrsaasAddDept
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name'
      },
      departs: [],
      dialogVisible: false,
      currentNode: {}
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const { depts, companyMange, companyName } = await getDepartments()
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyMange }
    },
    handCommand(node) {
      // console.log(node)
      this.dialogVisible = true
      this.currentNode = node
    }
  }
}
</script>

<style lang='scss'>
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      // padding-right: 20px;
    }
  }
}
</style>
