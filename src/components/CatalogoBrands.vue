<template>
    <PageLoader 
        :loading="isLoading"
        :minDuration="500"
        messages="Cargando marcas..."
    >
    </PageLoader>

    <!-- Mensaje cuando no hay resultados -->
    <div 
        v-if="!isLoading && filteredBrands.length === 0"
        class="!flex !flex-col !items-center !justify-center !gap-[10px] !py-[60px]"
    >
        <p class="!font-poppins !text-[#000000] !text-[18px] !text-center">
            <template v-if="props.search">
                No se encontraron marcas que coincidan con "{{ props.search }}"
            </template>
            <template v-else>
                No hay marcas disponibles para este tipo de vehículo
            </template>
        </p>
    </div>

    <div 
        v-else
        class="!grid template !justify-center !justify-items-center
        2xl:!gap-[80px]
        xl:!gap-[50px]
        max-[1024px]:!gap-[50px]"
    >
        <!-- Container del logo de la marca -->
        <v-tooltip
            v-for="(brand, i) in filteredBrands"
            :key="i"
            :text="brand.name"
        >
            <template v-slot:activator="{ props: tooltipProps }">
                <div
                    v-bind="tooltipProps"
                    class="!flex !flex-col !items-center !justify-center !justify-self-center !cursor-pointer
                    !bg-[#D9D9D9] !rounded-[10px] !shadow-md !shadow-[#0000001A]
                    2xl:!w-[300px] 2xl:!h-[300px]
                    xl:!w-[300px] xl:!h-[300px]
                    max-[1024px]:!w-[250px] max-[1024px]:!h-[250px]"
                    @click="goToModel(brand.name)"
                >
                    <img 
                        :src="brand.image" 
                        alt="brand" 
                        loading="lazy"
                        class="2xl:!max-w-[230px] 2xl:!max-h-[230px]
                        xl:!max-w-[230px] xl:!max-h-[230px]
                        max-[1024px]:!max-w-[200px] max-[1024px]:!max-h-[200px]"
                    />
                    <h1
                        v-if="brand.image === 'https://cdn.iconscout.com/icon/free/png-256/free-car-icon-svg-download-png-7930436.png?f=webp&w=128'"
                        class="!text-[#000000] !font-poppins !font-bold !uppercase !text-center !leading-10"
                    >
                        {{ brand.name }}
                    </h1>
                </div>
            </template>
        </v-tooltip>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, computed, ref, watch } from 'vue';
import PageLoader from '../components/PageLoader.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
    search: {
        type: String,
        default: ''
    },
    filter: {
        type: String,
        default: ''
    }
})

let brandsArray = ref([])
const isLoading = ref(true)

let brandsArrayAll = ref([])

async function getManufacturers() {
    try {
        let response = await axios.post(
        'https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js',
            {
                "getManufacturers2": { 
                    "country": localStorage.getItem('country'),
                    "lang": "es", 
                    "linkingTargetType": props.filter || 'VOLB',
                    "provider": 25100,
                }
            },
            {
                headers: {
                'X-Api-Key' : '2BeBXg6QnEsEd55snsUcjnfBBhiQ28ttQfNDxhVJLqGxrx7dJ2Af',
                'Content-Type' : 'application/json'
                }
            }
        );
        brandsArrayAll.value = response.data.data.array.map(item => item.manuId)
    } catch (error) {
        console.log(error);
    }
}

// Obtener marcas de la API
async function getBrand() {
    try {
        const responses = await axios.get('https://manufacturers.pruebasfenix.com/public/api/manufacturers')
        brandsArray.value = responses.data
    } catch (error) {
        console.log(error);
    }
}

const filteredBrands = computed(() => {
  let result = brandsArray.value;

  if (props.filter) {
    result = result.filter(brand => brand.linkingType === props.filter);
  }

  if (props.search) {
    result = result.filter(brand => brand.name.toLowerCase().includes(props.search.toLowerCase()));
  }

  return [...result].sort((a, b) => a.name.localeCompare(b.name));
})

// Función para redirigir a la página del modelo con la marca seleccionada
function goToModel(brandName) {
    const brand = brandsArray.value.find(b => b.name === brandName)
    if (brand) {
        router.push({ name: 'catalogo-model', params: { brand: brand.name, id: brand.id } })
    }
}

// Refetch cuando cambia el tipo de vehículo seleccionado
watch(() => props.filter, async () => {
    isLoading.value = true
    await getManufacturers();
    isLoading.value = false
})

onMounted(async () => {
    await getManufacturers();
    await getBrand();
    isLoading.value = false
});
</script>

<style scoped>
/* Estilos para el contenedor de las marcas */
.template {
    grid-template-columns: repeat(4, minmax(0, 320px)) !important;
}

@media (min-width: 1280px) and (max-width: 1535px) {
    .template {
        grid-template-columns: repeat(3, minmax(0, 300px)) !important;
    }
}

@media (min-width: 1024px) and (max-width: 1279px) {
    .template {
        grid-template-columns: repeat(3, minmax(0, 250px)) !important;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .template {
        grid-template-columns: repeat(2, minmax(0, 250px)) !important;
    }
}

@media (min-width: 300px) and (max-width: 767px) {
    .template {
        grid-template-columns: repeat(1, minmax(0, 250px)) !important;
    }
}
</style>