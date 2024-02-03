<template>
  <div ref="taskElement" class="kanban-task" draggable="true" @dragstart.self="onDragStart" @dragend.self="onDragEnd($event)">
  <a draggable="false" :href="'tasks/'+title">{{ title }}</a>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useKanbanStore } from '@/stores/kanban'
const kanbanStore = useKanbanStore()
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  taskId: {
    type: Number,
    required: true
  },  tableId: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['task-move-end']) 

const taskElement = ref()
const onDragStart = (e) => {
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  taskElement.value?.classList.add('selected-task')
  // e.dataTransfer.setData('title',taskTitle)
  console.log('dragstart e',e)
  kanbanStore.setDraggedTaskId(props.taskId)
  kanbanStore.setFromTableId(props.tableId)
}

const onDragEnd = (e) => {
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  taskElement.value?.classList?.remove('selected-task')
  emits('task-move-end',props.taskId)
  console.log('dragstart e',e)
}
</script>
<style>
.kanban-task {
  min-height: 40px;
  width: 100%;
  background-color: azure;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 12px;
  cursor: move;
}
.kanban-task a {
  cursor: move;
}
.selected-task {
  opacity: 0.6;
}
.selected-task:active {
  /* background-color: #000; */
}
</style>