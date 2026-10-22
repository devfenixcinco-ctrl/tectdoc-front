<template>
    <!-- Botón general -->
    <v-btn 
    :class="customClass"
    :variant="variante"
    >
        <!-- Texto del botón -->
        {{ label }}
    </v-btn>
</template>

<script setup>
// Propiedades que se le comparten al componente
defineProps({
    label: {
        type: String,
        default: 'Botón'
    },
    variante: {
        type: String,
        default: 'tonal'
    },
    customClass: {
        type: String,
        default: ''
    }
})
</script>