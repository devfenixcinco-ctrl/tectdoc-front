<template>
    <!-- Imagen de la Red Social -->
    <img 
        :class="customClass"
        :src="redSocial" 
        alt="Social Media"
        loading="lazy"
    >
</template>

<script setup>
import { computed } from 'vue';

// Propiedades que se le comparten
const props = defineProps({
    customClass: {
        type: String,
        default: '!w-[50px]'
    },
    redSocial: {
        type: String
    }
})

// Se le agrega la clase pesonalizada
const customClass = computed(() => {
    return ['red-social', props.customClass]
})

</script>

<style scoped>
/* Animación de hover */
.red-social:hover {
    cursor: pointer;
    
    transform: scale(1.1);
}
.red-social {
    transition: all 0.3s ease-in-out;
}
</style>