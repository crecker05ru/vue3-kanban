<template>
<section class="kanban">
  <AppModal :isModalOpened="isModalOpened" @close-modal="onCloseModal">
    <TableForm :isEditMode="isEditMode" :editTable="editableTable" @table-updated="onTableUpdated" @table-added="onTableAdded"/>
  </AppModal>
  <AppModal :isModalOpened="kanbanStore.isTaskModalOpened" @close-modal="kanbanStore.switchTaskModalOpened">
    <TaskForm/>
  </AppModal>
  <div class="kanban__inner flex space-x-4" v-if="!kanbanStore.taskDetails">
    <KanbanTable v-for="(table,index) in kanbanStore.tables" 
    :key="table.id" 
    :tableId="table.id" 
    :title="table.name" 
    :tasks="kanbanStore.tasks.filter(task => table.tasksIds.includes(task.id) )"
    @move-end="onMoveEnd"
    @drop-end="onDropEnd"
    @edit-table="onEditTable"
    @create-task="onCreateTask"
    />
    <button @click="onNewTable">New Table</button>

  </div>
  <div v-else>
    <TaskDetils/>
  </div>

</section>
</template>
<script setup>
import {ref} from "vue"
import KanbanTable from "./KanbanTable.vue";
import { useKanbanStore } from '@/stores/kanban'
import AppModal from "./AppModal.vue";
import TableForm from "./TableForm.vue";
import TaskForm from "./TaskForm.vue";
import TaskDetils from "./TaskDetails.vue"
const kanbanStore = useKanbanStore()

const chosenTableId = ref()
const currentTableId = ref()
const selectedTaskId = ref()
const isModalOpened = ref(false)
const isTaskModalOpened = ref(false)
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
const onCreateTask = () => {
  isTaskModalOpened.value = true
}
const onCloseModal = () => {
  isModalOpened.value = false
}
const onCloseTaskModal = () => {
  isTaskModalOpened.value = false
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


