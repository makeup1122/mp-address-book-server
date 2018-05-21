<template>
    <v-data-table
      :headers="header"
      :items="tableData"
      hide-actions
      class="elevation-1"> 
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.xid }}</td>
        <td class="text-xs-center">{{ props.item.tablename }}</td>
        <td class="text-xs-center">
          <v-btn icon  @click="editItem(props.item)"><v-icon color="teal">edit</v-icon></v-btn>
          <v-btn icon  @click="members(props.item)"><v-icon color="">people</v-icon></v-btn>
          <v-btn icon  @click="deleteItem(props.item)"><v-icon color="pink">delete</v-icon></v-btn>
        </td>
      </template>
    </v-data-table>
</template>
<script>
import { fetchList } from '@/api/classes'
export default {
  data() {
    return {
      tableData: [],
      header: [
        { align:'center',text:'XID',value:"xid"},
        { align:'center',text:'名称',value:'tablename'},
        { align:'center',text:'操作',value:"xid"}
      ]
    }
  },
  created: function(){
    
  },
  mounted: function(){
    this.getData()
    // console.log('mounted')
  },
  methods: {
    getData(){
      var that = this
      fetchList().then(function(res){
        that.tableData = res.data
      }).catch(function(err){
        console.log(err)
      })
    },
    members(item) {
      this.$router.push('/web/members/' + item.xid)
    },
    editItem(item){

    },
    deleteItem(item){
      const index = this.tableData.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.tableData.splice(index, 1)
    }
  },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    // return store.dispatch('fetchClasses')
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      // return this.$store.state.classes
    }
  }
}
</script>
