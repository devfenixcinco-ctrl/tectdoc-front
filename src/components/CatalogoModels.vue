<template>
    <!-- Modelo de la marca -->
    <div
        class="!bg-[#F3F3F3] !border-[1px] !px-[20px] !cursor-pointer !h-[60px]
        !border-[#D9D9D9] !rounded-[5px] !shadow-md !flex !items-center !gap-[35px]
        2xl:!w-[500px]
        xl:!w-[400px]
        max-[820px]:!w-[350px]"
    >
        <!-- Icono de llanta -->
        <img 
            :src="Llanta" 
            alt="Llanta" 
            class="2xl:!w-[40px] 2xl:!h-[40px]
            xl:!w-[35px] xl:!h-[35px]"
            loading="lazy"
        >

        <!-- Nombre del modelo -->
        <p 
            class="!text-[#000000] !font-poppins 
            2xl:!text-[20px]
            xl:!text-[18px]"
        >
            {{ model }}
        </p>
    </div>
</template>

<script setup>
import Llanta from '../assets/icons/llanta.svg?w=1920&format=webp&quality=80'

// Propiedades que se le comparten al componente
defineProps({
    model: {
        type: String
    }
})
</script>