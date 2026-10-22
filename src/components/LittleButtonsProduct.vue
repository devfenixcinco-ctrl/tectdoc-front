<template>
    <!-- Botón de selección -->
    <v-btn
        class="!border-[1px] !border-black !h-[25px] !min-w-[10px] !p-[0px] 
        !text-[20px] !text-[#FF4338] !text-center"
        :class="icon"
        elevation="0"
        @click="selectable === true ? selected = !selected : null"
    >
    </v-btn>
</template>

<script setup>
import { computed, ref } from 'vue'

// Propiedades que se le comparten al componente
const props = defineProps({
    icon_fill: {
        type: String
    },
    icon_line: {
        type: String
    },
    selectable: {
        type: Boolean
    }
})

// Computed que define el icono a mostrar
const icon = computed(() => {
    if (props.selectable === true) {
        return selected.value === true ? props.icon_fill : props.icon_line
    } else {
        return props.icon_fill
    }
})

// Variable reactiva que define si el botón está seleccionado o no
const selected = ref(false)

</script>