<template>
  <div class="kanban-table"  @drop="onDrop" @dragenter.prevent @dragover.prevent>
<div class="kanban-table__header">
  <p>{{ title }}</p>
  <button @click="handleEditClick">Edit</button>
  <button @click="handleRemoveClick">Remove</button>
  <button @click="handleCreateTask">Create task</button>
</div>
<div class="kanban-table__body">
  <KanbanTask v-if="tasks && tasks.length" v-for="task in tasks" :title="task.name" :taskId="task.id" @task-move-end="onTaskMove" :tableId="tableId" />
</div>
  </div>
</template>
<script setup>
import {ref,computed } from "vue"
import KanbanTask from './KanbanTask.vue';
import { useKanbanStore } from '@/stores/kanban';
import AppModal from "./AppModal.vue";
const kanbanStore = useKanbanStore()
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  tableId: {
    type: Number,
    required: true
  },
  tasks: {
    type: Array,
    required: false
  }
})

const emits = defineEmits(['move-end','drop-end','edit-table','create-task'])
// const tasksName = ref('')
// const tableTasks = computed(() => kanbanStore.taskByTable(props.tableId))
const handleEditClick = () => {
emits('edit-table',props.tableId)
}
const handleRemoveClick = () => {
  kanbanStore.removeTable(props.tableId)
}
const onDrop = (e) => {
  console.log('drop e',e)
  emits('drop-end',props.tableId)
  kanbanStore.setTargetTableId(props.tableId)
  kanbanStore.moveTask(props.tableId)
}
const onTaskMove = (taskId) => {
  // kanbanStore.setFromTableId(props.tableId)
  // emits('move-end',props.tableId,taskId)
}
const handleCreateTask = () => {
  kanbanStore.switchTaskModalOpened()
  kanbanStore.fromTableId = props.tableId
  // const newTask = {
  //   id: Date.now(),
  //   name: tasksName.value
  // }

  // kanbanStore.addTask(newTask,props.tableId)
  // emits('create-task',props.tableId)
}
</script>
<style>
.kanban-table {
  width: 320px;
  min-width: 300px;
  min-height: 300px;
  max-width: 100%;
  background-color: antiquewhite;
  padding: 16px;
  border-radius: 5px;
}
</style>