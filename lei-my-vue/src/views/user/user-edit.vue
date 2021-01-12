<template>
    <div>
<el-form  :model="user" label-width="80px">
  <el-form-item label="用户名称">
    <el-input v-model="user.userName" style="width:200px"></el-input>
  </el-form-item>
  <el-form-item label="性别">
      <el-radio-group v-model="user.userSex">
       <el-radio :label="1">男</el-radio>
       <el-radio :label="2">女</el-radio>
   </el-radio-group>
  </el-form-item>
 <el-form-item label="年龄" >
    <el-input v-model="user.userAge" style="width:200px"></el-input>
  </el-form-item>
 <el-form-item label="生日">
      <el-date-picker
      v-model="user.userBirthday"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
     placeholder="选择生日" 
     style="width:200px">
    </el-date-picker>
  </el-form-item>
   <el-form-item label="部门">
    <el-select v-model="user.userDepartment" placeholder="请选择" clearable>
    <el-option
      v-for="item in departmentList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    
    <el-button type="primary" @click="updateUser">确 定</el-button>
  </div>
    </div>
</template>
<script>
import userApi from "../../api/userApi.js";
import departmentApi from '../../api/api.js'
export default {
  data() {
    return {
      departmentList:[],
    };
  },
  props:{
      user:{
         type:Object,
         default:{} 
      },

  },
  methods: {
   
     getDepartmentList(){
            departmentApi.departmentList().then(res=>{
                this.departmentList=res.data
            })
        }
    ,
      updateUser(){
        userApi.update(this.user).then(res=>{
          this.$message.success(res.msg)
           this.dialogFormVisible=false
            this.$emit('cloesDialog')
             this.$emit('getUserList')
        })
      }
  },
  created() {
   
    this.getDepartmentList()
  },
};
</script>