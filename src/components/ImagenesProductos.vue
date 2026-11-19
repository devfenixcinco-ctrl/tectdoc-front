<template>
    <!-- Contenedor de las imagenes - DESKTOP -->
    <div
        class="!flex !flex-row !gap-[10px]
        max-[500px]:!hidden
        max-[400px]:!hidden"
    >
        <!-- Imagenes LATERALES del producto -->
        <div
            class="!flex !flex-col !gap-[10px]"
        >
            <!-- Imagen 1 -->
            <img 
                v-if="cantidadImagenes >= 2"
                :src="imagenes[1]" 
                alt="Default"
                loading="lazy"
                class="!cursor-pointer !px-[10px] !py-[15px] !bg-[#FFFFFF] !object-contain
                2xl:!w-[163px] 2xl:!h-[163px] 2xl:!rounded-[5px]
                xl:!w-[130px] xl:!h-[130px] xl:!rounded-[5px]
                max-[1024px]:!w-[142.5px] max-[1024px]:!h-[142.5px] max-[1024px]:!rounded-[5px]
                max-[820px]:!w-[130px] max-[820px]:!h-[130px] max-[820px]:!rounded-[5px]
                max-[768px]:!w-[113px] max-[768px]:!h-[113px] max-[768px]:!rounded-[5px]"
                @click="swapImage(1)"
            >

            <!-- Imagen 2 -->
            <img 
                v-if="cantidadImagenes >= 3"
                :src="imagenes[2]" 
                alt="Default"
                loading="lazy"
                class="!cursor-pointer !px-[10px] !py-[15px] !bg-[#FFFFFF] !object-contain
                2xl:!w-[163px] 2xl:!h-[163px] 2xl:!rounded-[5px]
                xl:!w-[130px] xl:!h-[130px] xl:!rounded-[5px]
                max-[1024px]:!w-[142.5px] max-[1024px]:!h-[142.5px] max-[1024px]:!rounded-[5px]
                max-[820px]:!w-[130px] max-[820px]:!h-[130px] max-[820px]:!rounded-[5px]
                max-[768px]:!w-[113px] max-[768px]:!h-[113px] max-[768px]:!rounded-[5px]"
                @click="swapImage(2)"
            >

            <!-- Imagen 3 -->
            <img 
                v-if="cantidadImagenes >= 4"
                :src="imagenes[3]" 
                alt="Default"
                loading="lazy"
                class="!cursor-pointer !px-[10px] !py-[15px] !bg-[#FFFFFF] !object-contain
                2xl:!w-[163px] 2xl:!h-[163px] 2xl:!rounded-[5px]
                xl:!w-[130px] xl:!h-[130px] xl:!rounded-[5px]
                max-[1024px]:!w-[142.5px] max-[1024px]:!h-[142.5px] max-[1024px]:!rounded-[5px]
                max-[820px]:!w-[130px] max-[820px]:!h-[130px] max-[820px]:!rounded-[5px]
                max-[768px]:!w-[113px] max-[768px]:!h-[113px] max-[768px]:!rounded-[5px]"
                @click="swapImage(3)"
            >

            <!-- Imagen 4 -->
            <img 
                v-if="cantidadImagenes >= 5"
                :src="imagenes[4]" 
                alt="Default"
                loading="lazy"
                class="!cursor-pointer !px-[10px] !py-[15px] !bg-[#FFFFFF] !object-contain
                2xl:!w-[163px] 2xl:!h-[163px] 2xl:!rounded-[5px]
                xl:!w-[130px] xl:!h-[130px] xl:!rounded-[5px]
                max-[1024px]:!w-[142.5px] max-[1024px]:!h-[142.5px] max-[1024px]:!rounded-[5px]
                max-[820px]:!w-[130px] max-[820px]:!h-[130px] max-[820px]:!rounded-[5px]
                max-[768px]:!w-[113px] max-[768px]:!h-[113px] max-[768px]:!rounded-[5px]"
                @click="swapImage(4)"
            >
        </div>
        <!-- Imagen PRINCIPAL del producto -->
        <img 
            v-if="cantidadImagenes >= 1"
            :src="imagenes[0]" 
            alt="Default"
            fetchpriority="high"
            class="!px-[20px] !py-[30px] !bg-[#FFFFFF] !object-contain
            2xl:!w-[680px] 2xl:!h-[680px] 2xl:!rounded-[5px]
            xl:!w-[550px] xl:!h-[550px] xl:!rounded-[5px]
            max-[1024px]:!w-[600px] max-[1024px]:!h-[600px] max-[1024px]:!rounded-[5px]
            max-[820px]:!w-[550px] max-[820px]:!h-[550px] max-[820px]:!rounded-[5px]
            max-[768px]:!w-[480px] max-[768px]:!h-[480px] max-[768px]:!rounded-[5px]"
        >
    </div>

    <!-- Contenedor de las imagenes - MOBILE -->
    <div
        class="2xl:!hidden
        xl:!hidden
        max-[1024px]:!hidden
        max-[820px]:!hidden
        max-[768px]:!hidden
        max-[500px]:!flex max-[500px]:!flex-col max-[500px]:!gap-[10px]
        max-[400px]:!flex max-[400px]:!flex-col max-[400px]:!gap-[10px]
        max-[350px]:!flex max-[350px]:!flex-col max-[350px]:!gap-[10px]"
    >
        <!-- Imagen PRINCIPAL del producto -->
        <img 
            v-if="cantidadImagenes >= 1"
            :src="imagenes[0]" 
            alt="Default"
            fetchpriority="high"
            class="!px-[20px] !py-[30px] !bg-[#FFFFFF] !object-contain
            max-[500px]:!w-[350px] max-[500px]:!h-[350px] max-[500px]:!rounded-[5px]
            max-[400px]:!w-[300px] max-[400px]:!h-[300px] max-[400px]:!rounded-[5px]
            max-[350px]:!w-[270px] max-[350px]:!h-[270px] max-[350px]:!rounded-[5px]"
        >

        <!-- Imagenes LATERALES del producto -->
        <div
            class="!flex !flex-row !gap-[10px]"
        >
            <!-- Imagen 1 -->
            <img 
                v-if="cantidadImagenes >= 2"
                :src="imagenes[1]" 
                alt="Default"
                loading="lazy"
                class="!px-[10px] !py-[15px] !bg-[#FFFFFF] !object-contain
                max-[500px]:!w-[80px] max-[500px]:!h-[80px] max-[500px]:!rounded-[5px]
                max-[400px]:!w-[67.5px] max-[400px]:!h-[67.5px] max-[400px]:!rounded-[5px]
                max-[350px]:!w-[58.5px] max-[350px]:!h-[58.5px] max-[350px]:!rounded-[5px]"
                @click="swapImage(1)"
            >

            <!-- Imagen 2 -->
            <img 
                v-if="cantidadImagenes >= 3"
                :src="imagenes[2]" 
                alt="Default"
                loading="lazy"
                class="!px-[10px] !py-[15px] !bg-[#FFFFFF] !object-contain
                max-[500px]:!w-[80px] max-[500px]:!h-[80px] max-[500px]:!rounded-[5px]
                max-[400px]:!w-[67.5px] max-[400px]:!h-[67.5px] max-[400px]:!rounded-[5px]
                max-[350px]:!w-[58.5px] max-[350px]:!h-[58.5px] max-[350px]:!rounded-[5px]"
                @click="swapImage(2)"
            >

            <!-- Imagen 3 -->
            <img 
                v-if="cantidadImagenes >= 4"
                :src="imagenes[3]" 
                alt="Default"
                loading="lazy"
                class="!px-[10px] !py-[15px] !bg-[#FFFFFF] !object-contain
                max-[500px]:!w-[80px] max-[500px]:h-[80px] max-[500px]:!rounded-[5px]
                max-[400px]:!w-[67.5px] max-[400px]:!h-[67.5px] max-[400px]:!rounded-[5px]
                max-[350px]:!w-[58.5px] max-[350px]:!h-[58.5px] max-[350px]:!rounded-[5px]"
                @click="swapImage(3)"
            >

            <!-- Imagen 4 -->
            <img 
                v-if="cantidadImagenes >= 5"
                :src="imagenes[4]" 
                alt="Default"
                loading="lazy"                
                class="!px-[10px] !py-[15px] !bg-[#FFFFFF] !object-contain
                max-[500px]:!w-[80px] max-[500px]:!h-[80px] max-[500px]:!rounded-[5px]
                max-[400px]:!w-[67.5px] max-[400px]:!h-[67.5px] max-[400px]:!rounded-[5px]
                max-[350px]:!w-[58.5px] max-[350px]:!h-[58.5px] max-[350px]:!rounded-[5px]"
                @click="swapImage(4)"
            >
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Propiedades que se le comparten al componente
const props = defineProps({
    imagenPrincipal: {
        type: String
    },
    imagenAlt1: {
        type: String
    },
    imagenAlt2: {
        type: String
    },
    imagenAlt3: {
        type: String
    },
    imagenAlt4: {
        type: String
    },
    cantidadImagenes: {
        type: Number
    },
    imagenes: {
        type: Array
    }
})

// Variable reactiva para las imagenes
const imagenes = ref([])

// Función para intercambiar las imagenes
watch(() => props.imagenes, (newVal) => {
  if (Array.isArray(newVal)) {
    imagenes.value = [...newVal]
  }
}, { immediate: true })

function swapImage(idx) {
  if (imagenes.value.length > idx) {
    const temp = imagenes.value[0]
    imagenes.value[0] = imagenes.value[idx]
    imagenes.value[idx] = temp
  }
}

</script>