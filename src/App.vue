<template>

  <div id="app" v-loading="loading">
    <!-- <HelloWorld />
    <h1>QUẢN LÝ NGHỆ SĨ NHÀ HÁT CỦA NHỮNG GIẤC MƠ</h1>
    

    <table border="1">
      <tr>
        <th>select</th>
        <th>id</th>
        <th>name</th>
        <th>Address</th>
        <th>age</th>
        <th><input v-model="search" type="text" placeholder="Type to search"/>
         
        
        </th>
        
      </tr>
      
      <tr v-for="(item, index) in filteredCustomers " :key="index"> 
       
        <td>
          <input type="checkbox"  @click="item.status = !item.status" :checked="item.status ">
   
        </td>
        <td >
          {{ item.id }}
         
        </td>
        <td i-if="!editing">
          
           <input v-if="editing && editingItem.id == item.id " v-model="editingItem.name" type="text">
           <span v-else>{{ item.name }}</span>
        </td>
        <td>
          <input v-if="editing && editingItem.id == item.id " v-model="editingItem.Address" type="text">
          <span v-else >{{ item.Address }}</span>
        </td>
        <td>
          <input v-if="editing && editingItem.id == item.id " v-model="editingItem.age" type="text">
          <span v-else>{{ item.age }}</span>
        </td>
        <td>  
          <button class="button" @click="deleteCourses(item)">Delete</button>

          <button  v-if="editing && editingItem.id == item.id " @click="updateTodo">update</button> 
           <button v-else  @click="editItem(item)">Edit</button>
        
          <button  @click="editing = false">Cancel</button>  
        </td>
      </tr>
    </table>
      <span>Gia nhập juvetus: {{taskComplete}}</span>
    <br>
    <span>Nghệ sĩ tự do: {{taskNotComplete}}</span><br>
    <span>Tổng Số nghệ sĩ nhân dân :{{allPlayer}}</span><br>

    name<input style="margin-left:48px" v-model="name" type="text" /><br> Address <input style="margin-left:10px"
      v-model="description"
      type="text"
    /><br>
    age<input style="margin-left:60px" v-model="age" type="text" /><br>
    <button @click="createe()">Create</button>
    <button  @click="deleteAll()">Delete All</button>
    <button  @click="deleteSelect()">Delete Select</button> -->
    
    <el-table 
      :data="filteredCustomers ">
      <el-table-column
        type="selection"
        label="Select" 
        prop="select">
      </el-table-column>
 
      <el-table-column
        label="ID" 
        prop="id">
     
      </el-table-column>

      <el-table-column
        label="Name"
        prop="name">
        <template slot-scope="scope">
        
          <el-input v-if="editing && editingItem.id == scope.row.id " v-model="editingItem.name" />
          <span v-else>{{scope.row.name}}</span>
          
        </template>
      </el-table-column>
    
     <el-table-column
        label="Address"
        prop="Address">
        <template slot-scope="scope">
        
          <el-input  v-if="editing && editingItem.id == scope.row.id " v-model="editingItem.Address" />
          <span v-else>{{scope.row.Address}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Age"
        prop="age">
       <template slot-scope="scope">
          <el-input v-if="editing && editingItem.id == scope.row.id " v-model="editingItem.age" />
          <span v-else>{{scope.row.age}}</span>
       </template>
      </el-table-column>
   
     <el-table-column
      align="right">
      <template slot="header" slot-scope="">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
          
      </template>
      <template slot-scope="scope">
        <el-button size="mini" 
          v-if="editing && editingItem.id == scope.row.id "  @click="updateTodo()">
          <i class="el-icon-loading"></i> update
        </el-button>
        <el-button v-else
          type="primary"
          size="mini"
          
          @click="editItem(scope.row)" ><i class="el-icon-edit"></i> Edit
        
        </el-button>  
        <el-button 
          size="mini"
          type="danger"
          
          @click="deleteCourses(scope.row)"><i class="el-icon-delete"></i>  Delete</el-button>
          
          
      </template>
    </el-table-column>
  </el-table>
  
    
    <!-- <button @click="courses.splice(0, allPlayer)">deleteSelect</button> -->
  
    <el-button size="mini"  type="primary" @click="deleteAll()">Delete All</el-button>
  
     <!-- <span>Gia nhập juvetus: {{taskComplete}}</span>
    <br>
    <span>Nghệ sĩ tự do: {{taskNotComplete}}</span><br>
    <span>Tổng Số nghệ sĩ nhân dân :{{allPlayer}}</span><br> -->
    
      
     



<!-- Form -->
<el-button type="primary" size="mini" @click="dialogFormVisible = true">Create</el-button>

<el-dialog top="5vh" title="Add members" :visible.sync="dialogFormVisible">

   <el-form >
    <el-form-item label="Name" :label-width="formLabelWidth">
      <el-input  v-model="name" ></el-input>at least 2 characters 
      
    </el-form-item>

    <el-form-item label="Address" :label-width="formLabelWidth">
      <el-input type="text" v-model="description" ></el-input>at least 2 characters 
    </el-form-item>

    <el-form-item label="Age" :label-width="formLabelWidth">
      <el-input type="text" v-model="age" width="100"></el-input>
must be number
    </el-form-item>
  
  </el-form> 
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="createe">Confirm</el-button>
  </span>
</el-dialog>
      
  </div>
</template>

<script>
import _ from "lodash";
import HelloWorld from "./components/HelloWorld.vue";
import { mapMutations } from 'vuex';
import {  mapState} from "vuex";
// import axios from 'axios'
export default {
  name: "App",
  data() {
    return {
     formLabelWidth:'120',
      loading:false,
       name: "",
      description: "",
      age: "",
      search:'',
      
      dialogFormVisible: false,
      editing:false,
     
      editingItem:{
      
        // name:dfsdfs,
        // address:sdfsdf,
        // age:222
      },
      
    };
  },
  methods: {
    loadData(){
      this.$store.dispatch("loadData");
    },
    createe() {

       if (!Number.isInteger(parseInt(this.age)))  {
        alert('Age must be number')
       return
        
      }
      if(this.name.length <2){
          alert('Name has at least 2 characters')
        }
        return
       this.dialogFormVisible = false
      let id=this.lastId+1
        this.loading=true
       
       setTimeout(()=>{
           this.loading =false
       },1000)
     
          
      //  axios.post('http://localhost:3000/haha', {  name: this.name,
      //   Address: this.description,
      //   age: this.age,
      //   id:id,
      //   status:false});
      
   
       this.$store.dispatch('create',{  name: this.name,
         Address: this.description,
         age: this.age,
         id:id,
         status:false}).then(() => {
           this.name = '',this.description="",this.age=""
          //  console.log(h)
         })
         .catch((err) => {

         })
    },
    
   
    deleteCourses(row) {
      let res = confirm(`Are sure you want to delete ${row.name}`)
      if(res){
       
        this.$store.dispatch('delete1',row).then(() =>{
         
          this.loadData()
        })
        .catch((err) =>{
        
        })
      }
        
    
    },
  
    updateTodo(){
    
      this.loading=true
       
       setTimeout(()=>{
           this.loading =false
       },1000)
    
       this.$store.dispatch('update_data', this.editingItem)
     .then(haha => {
         this.editing = false
      
       })
       .catch(err => {
         this.editing = false
       })
      
  
    },
    editItem(row){
     console.log(row)
      this.editingItem = JSON.parse(JSON.stringify(row))
       this.editing = true
     
      
       
    },
   
   
    

  },
  components: {
    HelloWorld,
  },
  mounted() {
    this.loadData()
    
  },
  computed: {
      filteredCustomers(){
         return this.courses.filter( item => item.name.toLowerCase().match(this.search.toLowerCase())
         || item.Address.toLowerCase().match(this.search.toLowerCase())
         || item.age.match(this.search)
         )
 
      },
      ...mapMutations(['deleteAll','deleteSelect']),
     
      ...mapState(['courses']),
      lastId(){
      let lastId=0
      let arraySort = []
      arraySort = _.orderBy(this.courses, ['id'],['desc']);
      console.log(arraySort)
      lastId=arraySort[0].id
      
      return lastId
      
    },
    taskComplete(){
        return this.courses.filter(x => x.status == true).length;
    },
    taskNotComplete(){
        return this.courses.filter(x => x.status == false).length;
      
    },
    allPlayer(){
      return this.courses.filter(item => item.id).length;
    },
  
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  text-align: center;
   border: 1px solid blue;
    border-radius: 25px;
    
}
th{
  width: 240px;
}
.button{
      color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
    cursor: pointer;
    border-radius: 3px;
   margin-right: 10px;
}
input{
  margin: 8px;
  padding: 5px;
}

</style>
