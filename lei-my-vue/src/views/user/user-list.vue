<template>
  <div>
    <div>
        <el-form :inline="true" :model="page.params" class="demo-form-inline">
  <el-form-item label="姓名">
    <el-input v-model="page.params.userName" placeholder="姓名"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="page.params.userSex" placeholder="请选择" clearable="">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="2"></el-option>
    </el-select>
  </el-form-item>
  
 <el-form-item label="部门">
    <el-select v-model="page.params.userDepartment" placeholder="请选择" clearable>
    <el-option
      v-for="item in departmentList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</el-form-item>

<el-form-item label="创建时间">
   <el-date-picker
      v-model="createdTime"
      type="daterange"
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="changCreatedTime">
    </el-date-picker>
</el-form-item>

<el-form-item label="生日">
   <el-date-picker
      v-model="birthday"
      type="daterange"
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="changbirthday">
    </el-date-picker>
</el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getUserList">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <el-table :data="page.list" style="width: 100%" @sort-change="sortChange">
      <el-table-column prop="userId" label="用户编号" sortable="custom"> </el-table-column>
      <el-table-column prop="userName" label="用户姓名" sortable="custom"> </el-table-column>
      <el-table-column prop="userSex" label="性别" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.userSex === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userAge" label="年龄" sortable="custom"> </el-table-column>
       <el-table-column prop="userBirthday" label="生日" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.userBirthday | handlerNullTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="department.name" label="部门" sortable="custom"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | handlerNullTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatTime" label="更新时间" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | handlerNullTime }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作" > 
         <template slot-scope="scope">
         <el-button type="primary" icon="el-icon-edit" circle @click="toUpdate(scope.row.userId)"></el-button>
         <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.row.userId)"></el-button>
          </template>
      </el-table-column>
    </el-table>


    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNumber"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount">
    </el-pagination>
  </div>

  <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
  <user-edit :user="user" @cloesDialog="cloesDialog" @getUserList="getUserList"></user-edit>
</el-dialog>
  </div>
</template>
<script>
import userApi from "../../api/userApi.js";
import departmentApi from '../../api/api.js'
import UserEdit from './user-edit.vue'
export default {
  data() {
    return {
      userList: [],
      departmentList:[],
      page: {
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        totalCount: 0,
        list: [],
        params: {},
        sortColumn: "",
        sortMethod: "",
      },
      createdTime: null,
      birthday:null,

       dialogFormVisible: false,
       user:{}
    };
  },
  components:{
    UserEdit
  },
  methods: {
    getUserList() {
      userApi.userList(this.page).then((res) => {
        this.page = res.data;
      });
    },
     getDepartmentList(){
            departmentApi.departmentList().then(res=>{
                this.departmentList=res.data
            })
        }
    ,
    changCreatedTime(val){
      if(val){
        this.page.params.userCreatedTimeStart=this.createdTime[0]
        this.page.params.userCreatedTimeEnd=this.createdTime[1]
        console.log()
      }else{
         this.page.params.userCreatedTimeStart=null
        this.page.params.userCreatedTimeEnd=null
      }
    },
    changbirthday(val){
       if(val){
        this.page.params.userBirthdayStart=this.birthday[0]
        this.page.params.userBirthdayEnd=this.birthday[1]
        console.log()
      }else{
         this.page.params.userBirthdayStart=null
        this.page.params.userBirthdayEnd=null
      }
    },
    sortChange(column,prop,order){
      this.page.sortColumn=column.prop
      this.page.sortMethod=column.order
      this.getUserList()
    },
     handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.page.pageSize=val
         this.getUserList();
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.page.pageNumber=val
         this.getUserList();
      },
      toUpdate(userId){
        userApi.getById(userId).then(res=>{
          this.user=res.data
          this.dialogFormVisible=true
        });
      },
      cloesDialog(){
        this.dialogFormVisible=false
      },
      deleteById(userId){
 this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         userApi.deleteById(userId).then(res=>{
          this.$message.success(res.msg)
          this.getUserList()
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
      }
  },
  filters: {
    handlerNullTime(time) {
      if (!time) {
        return "该数据未被修改";
      }
      return time;
    },
  },
  created() {
    this.getUserList();
    this.getDepartmentList()
  },
};
</script>