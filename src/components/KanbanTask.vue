<template>
  <div
    ref="taskElement"
    class="kanban-task relative bg-white pt-3 pr-7 pb-3 pl-2 shadow"
    draggable="true"
    @dragstart.self="onDragStart"
    @dragend.self="onDragEnd($event)"
  >
    <a draggable="false" @click.prevent="handleLinkClick">{{ title }}</a>
    <div class="flex flex-col gap-1 absolute right-0 top-1">
      <button class="edit-button-sm mx-1" @click="handleEdit"></button>
      <button class="remove-button-sm mx-1" @click="handleRemove"></button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useKanbanStore } from "@/stores/kanban";
const kanbanStore = useKanbanStore();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  taskId: {
    type: Number,
    required: true,
  },
  tableId: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(["task-move-end"]);

const taskElement = ref();
const onDragStart = (e) => {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  taskElement.value?.classList.add("selected-task");
  kanbanStore.setDraggedTaskId(props.taskId);
  kanbanStore.setFromTableId(props.tableId);
};

const onDragEnd = (e) => {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  taskElement.value?.classList?.remove("selected-task");
  emits("task-move-end", props.taskId);
};
const handleEdit = () => {
  kanbanStore.switchTaskModalOpened();
  kanbanStore.switchTaskEditMode();
  kanbanStore.setEditableTask(props.taskId);
};
const handleRemove = () => {
  kanbanStore.removeTask(props.taskId);
};
const handleLinkClick = () => {
  const taskDetails = {
    id: props.taskId,
    name: props.title,
  };
  kanbanStore.setTaskDetails(taskDetails);
};
</script>
<style>
.kanban-task {
  min-height: 40px;
  width: 100%;
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
</style>
