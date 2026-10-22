<template>
    <!-- Contenedor de la reseña general -->
    <div
        class="!bg-[#000000] !shadow-xl !h-[80px] !w-[300px] !p-[12px] !flex !gap-[10px]
        !rounded-tl-[40px] !rounded-tr-[10px] !rounded-br-[40px] !rounded-bl-[10px]
        max-[1024px]:!h-[80px] max-[1024px]:!w-[250px] max-[1024px]:!p-[12px]"
    >
        <!-- Imagen de usuario -->
        <img 
            :src="UserImage" 
            alt="user"
            class="!w-[40px] !h-[40px]"
            loading="lazy"
        >
        <!-- Contenedor de la información de la reseña -->
        <div
            class="!flex !flex-col !h-[80px] !transition-all !relative"
        >
            <!-- Nombre de la persona que hace la reseña -->
            <h1
                class="!font-poppins !text-[#FFFFFF] !font-bold !text-[16px]
                max-[1024px]:!text-[14px]"
            >
                {{ resena.nombre }}
            </h1>

            <!-- Contenedor de las estrellas -->
            <div
                class="!flex !flex-row"
            >
                <i class="mdi mdi-star !text-[#FF4338] !text-[15px]"/>
                <i class="mdi mdi-star !text-[#FF4338] !text-[15px]"/>
                <i class="mdi mdi-star !text-[#FF4338] !text-[15px]"/>
                <i class="mdi mdi-star !text-[#FF4338] !text-[15px]"/>
                <i class="mdi mdi-star !text-[#FF4338] !text-[15px]"/>
            </div>

            <!-- Fecha y ubicación de la reseña -->
            <h3
                class="!font-poppins !text-[#C5C5C5] !font-normal !text-[8px] !mt-[6px] !ml-[-40px]
                max-[1024px]:!mt-[7px]"
            >
                {{ day }}-{{ month }}-{{ year }} {{ city }}, {{ state }}, Colombia
            </h3>
        </div>
    </div>
</template>

<script setup>
import UserImage from '../assets/images/user.png?w=1920&format=webp&quality=80'

import CiudadesColombia from '../assets/javascript/colombia.js'

// Varible global para la fecha actual
const date = new Date()

// Obtener el año, mes y día actual - 2 días
const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = date.getDate() - 2

// Obtener una ciudad y un estado aleatorio de Colombia
const city = CiudadesColombia[Math.floor(Math.random() * 1102)].name
const state = CiudadesColombia[Math.floor(Math.random() * 1102)].state_name

// Definir las props que recibe el componente
defineProps({
    resena: {
        type: Object
    }
})

</script>