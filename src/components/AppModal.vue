<template>
  <div
    class="modal absolute top-0 right-0 bottom-0 left-0 z-10"
    v-if="isModalOpened"
  >
    <div
      class="modal__inner relative flex h-full w-full justify-center items-center"
    >
      <div class="modal__content relative p-4 pt-7 pr-8 bg-white rounded-md">
        <button
          class="modal__close-btn close-button absolute right-1 top-1"
          @click="$emit('close-modal')"
        ></button>
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isModalOpened: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["close-modal"]);
</script>
<style>
.modal {
  background-color: rgba(0, 0, 0, 0.4);
}

.modal__content {
  max-width: 480px;
}
</style>
