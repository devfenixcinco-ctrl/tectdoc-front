<template>
  <!-- Botón de navegación lateral -->
  <v-btn
    :class="customClassButton"
    elevation="0"
  >
    <!-- Icono -->
    <component v-if="icon_img" :is="icon_img" class="icon-svg" :class="customClassIcon" />
    <!-- Texto del botón -->
    <span :class="customClassSpan">{{ label }}</span>
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'

// Propiedades que se le comparten al componente
const props = defineProps({
    customClassButton: {
        type: String
    },
    customClassIcon: {
        type: String
    },
    customClassSpan: {
        type: String
    },
    label: {
        type: String
    },
    icon_img: {
        type: [Object, Function], 
        required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    colorBlack: {
      type: Boolean
    }
})

// Clase personalizada para el botón
const customClassButton = computed(() => {
  return ['btn-busqueda', props.active !== true ? '' : props.colorBlack === true ? 'active-black' : 'active' , '!font-poppins', '!text-[#000000]', '2xl:!text-[12px]', 'xl:!text-[10px]', 'md:!text-[8px]', '!bg-opacity-[63%]', '!rounded-2xl', '!p-[10px]', '!backdrop-blur-sm', ...(props.customClassButton?.split(' ') ?? [])]
})

// Clase personalizada para el icono
const customClassIcon = computed(() => {
  return [...(props.customClassIcon?.split(' ') ?? [])]
})

// Clase personalizada para el span del texto
const customClassSpan = computed(() => {
  return ['!text-wrap', '!normal-case', ...(props.customClassSpan?.split(' ') ?? [])]
})
</script>

<style scoped>
/* Estilos personalizados para el botón */
.btn-busqueda :deep(.v-btn__content) {
    flex-direction: column !important;
    gap: 5px;
}

.active :deep(.v-btn__underlay) {
    border: 2px solid rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0px 0px 15px 3px rgba(255, 255, 255, 0.5);
}
.active-black :deep(.v-btn__underlay) {
    border: 2px solid rgba(0, 0, 0, 0.781);
    border-radius: 15px;
    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.329);
}

.icon-svg :deep(*) { fill: currentColor !important; stroke: currentColor !important; }
</style>
