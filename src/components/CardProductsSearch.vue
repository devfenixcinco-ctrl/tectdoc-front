<template>
    <!-- Tarjeta de producto  -->
    <v-card 
        class="!bg-[#D9D9D9] !rounded-[6px] !flex !flex-col
        2xl:!w-[400px]
        xl:!w-[340px]
        md:!w-[300px]
        max-sm:!w-[300px]"
        elevation="2"
        @click="goToProduct(id)"
    >
        <!-- Carrousel de imagenes -->
        <div
            class="!flex !flex-col !items-center !justify-center !m-[15px]"
        >
            <v-carousel
                v-model="activeSlide"
                widht="372"
                height="300"
                :show-arrows="images.length > 1 ? 'hover' : false"
                hide-delimiter-background
                class="!rounded-[6px] !bg-[#FFFFFF]"
                @click.stop
            >
                <v-carousel-item
                    v-for="(img, i) in images"
                    :key="i"
                    :src="img"
                    class="!p-[50px] !relative !bottom-[20px]
                    max-[1024px]:!p-[20px]"
                    transition="fade-transition"
                    reverse-transition="fade-transition"
                    @click="goToProduct(id)"
                ></v-carousel-item>
            </v-carousel>
        </div>

        <!-- Info del producto -->
        <div
            class="!flex !flex-col !mt-auto !gap-[5px] !m-[15px] !pt-[10px]
            2xl:!pl-[17px] 
            xl:!pl-[12px] xl:!items-start"
        >
            <!-- Nombre del producto -->
            <h1
                class="!font-poppins !text-[#000000] !font-semibold !cursor-pointer
                2xl:!text-[20px]
                xl:!text-[18px]
                md:!text-[16px] md:!pl-[8px]
                max-sm:!text-[14px] max-sm:!pl-[8px]"
            >
                {{ fabri }} | {{ id }}
            </h1>

            <!-- Grupo -->
            <h3
                class="!font-poppins !text-[#000000]/50 !font-regular !cursor-pointer
                2xl:!text-[16px]
                xl:!text-[14px]
                md:!text-[14px] md:!pl-[8px]
                max-sm:!text-[14px] max-sm:!pl-[8px]"
            >
                {{ group.split(' ').length > 3 ? group.split(' ').slice(0, 3).join(' ') + '...' : group }}
            </h3>

            <!-- Precio -->
            <h3
                class="!font-poppins !text-[#FF4338] !font-regular !cursor-pointer
                2xl:!text-[16px]
                xl:!text-[14px]
                md:!text-[14px] md:!pl-[8px]
                max-sm:!text-[14px] max-sm:!pl-[8px]"
            >
                {{ price }}
            </h3>

            <!-- Seleccion de cantidad y boton agregar al carrito -->
            <div
                class="!flex !justify-end !gap-[25px] !mt-[20px] !mb-[20px]
                xl:!flex-row xl:!items-center 
                md:!flex-col md:!items-center
                max-sm:!flex-col max-sm:!items-center"
            >
                <!-- Componente de seleccion de cantidad -->
                <SelectNumber @click.stop />   

                <!-- Boton agregar al carrito -->
                <ButtonGeneral 
                    variante="tonal"
                    class="!font-poppins !font-medium !h-[35px] !rounded-[4px] !normal-case !bg-[#FF4338] !text-white
                    2xl:!text-[16px] 2xl:!w-[155px]
                    xl:!text-[14px] xl:!w-[135px]
                    md:!w-[250px]
                    max-sm:!w-[250px]"
                    :label="$t('catalogo.button')"
                    @click.stop
                />
            </div>
        </div>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'
import ButtonGeneral from '../components/ButtonGeneral.vue';
import SelectNumber from '../components/SelectNumber.vue';

import { useRouter } from 'vue-router';
const router = useRouter()

const activeSlide = ref(0)

// Propiedades que se le comparten al componente
const props = defineProps({
    images: {
        type: Array
    },
    name: {
        type: String
    },
    fabri: {
        type: String
    },
    group: {
        type: String
    },
    price: {
        type: String,
        default: '$ 0'
    },
    id: {
        type: String
    }
})

// Función para ir al producto
function goToProduct(id) {
    router.push({ name: 'product-one', params: { id: id } })
}
</script>

<style scoped>
/* Estilos para el carrousel */
::v-deep(.v-carousel--hide-delimiter-background .v-carousel__controls) {
    background: #00000069 !important;
    color: #FF4338 !important;
}
</style>