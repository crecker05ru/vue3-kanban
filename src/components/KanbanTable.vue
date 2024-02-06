<template>
  <div
    class="kanban-table bg-gray-100 p-4 rounded-md"
    @drop="onDrop"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="kanban-table__header flex mb-4">
      <p class="text-lg">{{ title }}</p>
      <div class="ml-auto">
        <button class="add-button mx-1" @click="handleCreateTask"></button>
        <button class="edit-button mx-1" @click="handleEditClick"></button>
        <button class="remove-button mx-1" @click="handleRemoveClick"></button>
      </div>
    </div>
    <div class="kanban-table__body">
      <KanbanTask
        v-if="tasks && tasks.length"
        v-for="task in tasks"
        :title="task.name"
        :taskId="task.id"
        @task-move-end="onTaskMove"
        :tableId="tableId"
      />
    </div>
  </div>
</template>
<script setup>
import KanbanTask from "./KanbanTask.vue";
import { useKanbanStore } from "@/stores/kanban";
const kanbanStore = useKanbanStore();
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tableId: {
    type: Number,
    required: true,
  },
  tasks: {
    type: Array,
    required: false,
  },
});

const emits = defineEmits([
  "move-end",
  "drop-end",
  "edit-table",
  "create-task",
]);

const handleEditClick = () => {
  emits("edit-table", props.tableId);
};
const handleRemoveClick = () => {
  kanbanStore.removeTable(props.tableId);
};
const onDrop = (e) => {
  console.log("drop e", e);
  emits("drop-end", props.tableId);
  kanbanStore.setTargetTableId(props.tableId);
  kanbanStore.moveTask(props.tableId);
};

const handleCreateTask = () => {
  kanbanStore.switchTaskModalOpened();
  kanbanStore.fromTableId = props.tableId;
};
</script>
<style>
.kanban-table {
  width: 320px;
  min-width: 300px;
  min-height: 300px;
  max-width: 100%;
}
</style>
