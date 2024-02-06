<template>
  <div class="table-form">
    <div class="table-form__inner">
      <div class="table-form__add" v-if="!kanbanStore.isTaskEditMode">
        <input v-model="taskName" placeholder="Enter title" />
        <button
          class="create-button absolute top-8 right-1"
          @click="handleCreate"
        ></button>
      </div>
      <div class="table-form__edit" v-else>
        <input v-model="updatedTaskName" placeholder="Enter title" />
        <button
          class="update-button absolute top-8 right-1"
          @click="handleUpdate"
        ></button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useKanbanStore } from "@/stores/kanban";
const emits = defineEmits(["task-updated", "task-added"]);
const props = defineProps({
  editTask: {
    type: Object,
    required: false,
  },
  isEditMode: {
    type: Boolean,
    required: false,
  },
});
const kanbanStore = useKanbanStore();
const taskName = ref("");
const updatedTaskName = ref("" || kanbanStore?.editableTask?.name);
const handleCreate = () => {
  const newTask = {
    id: Date.now(),
    name: taskName.value,
  };
  kanbanStore.addTask(newTask);
  kanbanStore.isTaskModalOpened = false;
};
const handleUpdate = () => {
  const updateTask = {
    id: kanbanStore.editableTask.id,
    name: updatedTaskName.value,
  };
  kanbanStore.updateTask(updateTask);
  kanbanStore.switchTaskEditMode();
  kanbanStore.isTaskModalOpened = false;
};
</script>
<style></style>
