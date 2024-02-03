<template>
<section class="kanban">
  <AppModal :isModalOpened="isModalOpened" @close-modal="onCloseModal">
    <AddTableForm :isEditMode="isEditMode" :editTable="editableTable" @table-updated="onTableUpdated" @table-added="onTableAdded"/>
  </AppModal>
  <div class="kanban__inner flex space-x-4">
    <KanbanTable v-for="(table,index) in kanbanStore.tables" 
    :key="table.id" 
    :tableId="table.id" 
    :title="table.name" 
    :tasks="tasks.filter(task => table.tasksIds.includes(task.id) )"
    @move-end="onMoveEnd"
    @drop-end="onDropEnd"
    @edit-table="onEditTable"
    />
    <button @click="onNewTable">New Table</button>

  </div>

</section>
</template>
<script setup>
import {ref} from "vue"
import KanbanTable from "./KanbanTable.vue";
import { useKanbanStore } from '@/stores/kanban'
import AppModal from "./AppModal.vue";
import AddTableForm from "./AddTableForm.vue";
const kanbanStore = useKanbanStore()

// const tasks = ref(['Прочитать книгу','Продумать архитекутру','Создать переиспользуемый модуль'])
// const tables = ref(['Todo','In progress','Done'])
// const tasks = ref([
//   {
//   id: 21,
//   name: 'Прочитать книгу'
// },
// {
//   id: 22,
//   name: 'Продумать архитекутру'
// },
// {
//   id: 23,
//   name: 'Создать переиспользуемый модуль'
// },
// {
//   id: 24,
//   name: 'Написать антифрауд'
// }
// ]
// )
// const tables = ref([
// {
//   id: 1,
//   name: 'Todo',
//   tasksIds: [21,22]
// },
// {
//   id: 2,
//   name: 'In progress',
//   tasksIds: [23,24]
// },
// {
//   id: 3,
//   name: 'Done',
//   tasksIds: []
// },

// ])
const tasks = kanbanStore.tasks
const chosenTableId = ref()
const currentTableId = ref()
const selectedTaskId = ref()
const isModalOpened = ref(false)
const isEditMode = ref(false)
const editableTable = ref()

const onMoveEnd = (tableId,taskId) => {
  currentTableId.value = tableId
  selectedTaskId.value = taskId

  console.log('tableId,taskId',tableId,taskId)
}
const onDropEnd = (targetTableId) => {
  chosenTableId.value = targetTableId
  console.log('targetTableId',targetTableId)
  // moveTask(selectedTaskId.value,currentTableId.value,targetTableId)

}
const onNewTable = () => {
  isModalOpened.value = true
  isEditMode.value = false
  editableTable.value = null
}
const onEditTable = (tableId) => {
  isModalOpened.value = true
  isEditMode.value = true
  editableTable.value = kanbanStore.tables.find((table) => table.id === tableId)
}
const onCloseModal = () => {
  isModalOpened.value = false
}
const cleanEdit = () => {
  isEditMode.value = false
  editableTable.value = null
}
const onTableUpdated = () => {
  isModalOpened.value = false
  cleanEdit()
}
const onTableAdded = () => {
  isModalOpened.value = false
}
</script>
<style>
.kanban__inner {
  max-width: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>


