<template>
  <div id="app">
    <el-table :data="departmentList" style="width: 100%">
      <el-table-column prop="id" label="编号" > </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import departmentApi from '../../api/api.js'
export default {
     data() {
        return {
         departmentList:[]
      }
}
    ,methods:{
        getDepartmentList(){
            departmentApi.departmentList().then(res=>{
                this.departmentList=res.data
            })
        }
    }
    ,
created(){
        this.getDepartmentList();
    }
};
</script>