<template >
  <div class="table-form">
    <div class="table-form__inner">
      <div class="table-form__add" v-if="!isEditMode">
        <input v-model="tableName" placeholder="Enter title"/>
    <button @click="handleAdd">Add</button>
      </div>
      <div class="table-form__edit" v-else>
        <input v-model="tableName" placeholder="Enter title"/>
    <button @click="handleUpdate">Update</button>
</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useKanbanStore } from '@/stores/kanban'
const emits = defineEmits(['table-updated','table-added'])
const props = defineProps({
  editTable: {
    type: Object,
    required: false
  },
  isEditMode: {
    type: Boolean,
    required: false
  },
  
})
const kanbanStore = useKanbanStore()
let editableTableName = '' || props?.editTable?.name
const tableName = ref('' || editableTableName)
const handleAdd = () => {
  const newTable = {
    id: Date.now(),
    name: tableName.value,
    tasksIds: []
  }
  kanbanStore.addTable(newTable)
  tableName.value = ''
  editableTableName = ''
  emits('table-added')
}
const handleUpdate = () => {
  const {id,tasksIds} = props.editTable
  const updateTable = {
    id,
    name: tableName.value,
    tasksIds
  }
  kanbanStore.updateTable(updateTable)
  tableName.value = ''
  editableTableName = ''
  emits('table-updated')
}
</script>
<style >
  
</style>