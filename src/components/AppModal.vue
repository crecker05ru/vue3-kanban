<template>
  <div class="modal" v-if="isModalOpened">
    <div class="modal__inner">
      <div class="modal__content">
        <button class="modal__close-btn" @click="$emit('close-modal')">X</button>
      <slot/>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isModalOpened: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['close-modal'])
</script>
<style>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 11;
}
.modal__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.modal__content {
  position: relative;
  padding: 12px;
  /* min-width: 280px; */
  max-width: 480px;
  background-color: #fff;
  border-radius: 5px;
}

.modal__close-btn {
  position: absolute;
  right: 0;
  top: 0;
  width: 1rem;
  height: 1rem;
}
</style>