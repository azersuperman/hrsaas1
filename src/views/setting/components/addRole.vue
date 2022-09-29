<template>
  <div>
    <el-dialog
      :title="title"
      width="60%"
      :visible="dialogVisible"
      :before-close="handleClose"
    >
      <el-form
        ref="roleDialogForm"
        label-width="80px"
        :model="formDate"
      >
        <el-form-item
          prop="name"
          label="角色"
          :rules="[{
            required:true,message:'角色必填',trigger:'blur'
          }]"
        >
          <el-input v-model="formDate.name" />
        </el-form-item>
        <el-form-item label="描述" prop='description'>
          <el-input v-model="formDate.description" type="textarea" row="3" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading='loading' @click="submit">确 定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, updateRole } from '@/api/setting'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      formDate: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  computed: {
    title() {
      return this.formDate.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
      console.log(this.$refs)
      this.formDate = {
        name: '',
        description: ''
      }
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.formDate.id ? await updateRole(this.formDate) : await addRole(this.formDate)
        this.$emit('reshList')
        this.$message.success(this.formDate.id ? '编辑成功' : '新增成功')
        this.handleClose()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
