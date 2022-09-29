<template>
  <div class="departments-container">

    <el-card>
      <tree-tools :isRoot="false" :tree-node="company" />
    </el-card>

    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
    </el-tree>

  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      defaultProps: {
        label: 'name'
      },
      departs: [{ name: '总裁办', manager: '张凯旋', children: [{ name: '董事会', manager: '小朱' }] },
        { name: '行政部', manager: '小陈' },
        { name: '人事部', manager: '小余' }]
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      await getDepartments()
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
