<template>
  <div
    class="task-details relative bg-white p-4 pt-7 shadow-xl rounded-md w-full ml-auto mr-auto"
  >
    <button class="absolute left-2 top-1" @click="kanbanStore.clearTaskDetails">
      Back
    </button>
    <h1>{{ kanbanStore.taskDetails.name }}</h1>
  </div>
</template>
<script setup>
import { useKanbanStore } from "@/stores/kanban";
const kanbanStore = useKanbanStore();
</script>
<style>
.task-details {
  max-width: 800px;
  min-height: 200px;
}
</style>
