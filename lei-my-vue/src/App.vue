<template>
  <div id="app">

<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true" >
  <el-menu-item index="1" :route="'/departmentList'">部门管理</el-menu-item>
  <el-submenu index="2">
    <template slot="title">用户管理</template>
    <el-menu-item index="2-1" :route="'/userList'">用户列表</el-menu-item>
    <el-menu-item index="2-2" :route="'/userAdd'">添加用户</el-menu-item>    
  </el-submenu>

</el-menu>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    }
  
  }
</script>