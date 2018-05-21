<template>
    <v-data-table
      :header="header"
      :items="tableData"
      hide-actions
      class="elevation-1"> <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.xid }}</td>
        <td class="text-xs-center">{{ props.item.tablexid }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.mobile }}</td>
        <td class="text-xs-center">{{ props.item.city }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="text-xs-center">
          <v-btn icon  @click="editItem(props.item)"><v-icon color="teal">edit</v-icon></v-btn>
          <v-btn icon  @click="deleteItem(props.item)"><v-icon color="pink">delete</v-icon></v-btn>
        </td>
      </template>
    </v-data-table>
</template>
<script>
import { fetchList } from '@/api/members'
export default {
    props: ['tablexid'],
    data() {
        return {
            tableData:[],
            header: [
                { text:'ID',value:"xid"},
                { text:'表索引',value:'tablexid'},
                { text:'姓名',value:"name"},
                { text:'电话',value:'mobile'},
                { text: '城市',value:'city'},
                { text: '状态',value:'status'},
                { text:'操作',value:"xid"}
            ]
        }
    },
    mounted: function(){
        this.getData()
    },
    methods:{
        getData(){
            var that = this
            fetchList(that.tablexid).then(function(res){
                that.tableData = res.data
            }).catch(function(err){
                console.log(err)
            })
        },
        editItem(item){

        },
        deleteItem(item){

        }
    }
}
</script>
