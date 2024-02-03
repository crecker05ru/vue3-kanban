<template>
  <div class="task-details">
    <h1>{{kanbanStore.taskDetails.name}}</h1>
    <button @click="kanbanStore.clearTaskDetails">Back</button>
  </div>
</template>
<script setup>
import { useKanbanStore } from '@/stores/kanban';
const kanbanStore = useKanbanStore()
</script>
<style >
 .task-details {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
 } 
</style>