<template>
    <PageLoader 
        :loading="isLoading"
        :minDuration="500"
        messages="Cargando modelos..."
    >
    </PageLoader>
    <!-- Seccion Inicial -->
    <section 
    >
        <div 
            class="!bg-[#000000] 
            2xl:!h-[500px]
            xl:!h-[400px]
            max-[1024px]:!h-[400px]
            max-[500px]:!h-[300px]"
        >
            <!-- Header -->
            <Header />
        
            <!-- Formas decorativas -->
            <img 
                :src="Formas" 
                alt="Formas"
                class="!absolute !top-[-90px] !z-[1]
                xl:!w-[200px]
                max-[1024px]:!w-[200px]
                max-[500px]:!w-[170px]"
                loading="lazy"
                style="transform: scaleX(-1) rotate(180deg);"
            >
        </div>
    </section>

    <!-- Seccion de titulo y miga de pan -->
    <section
        class="!flex !flex-col !items-center !justify-center !gap-[15px] 
        !relative 
        2xl:!top-[-250px]
        xl:!top-[-220px]
        max-[1024px]:!top-[-220px]
        max-[500px]:!top-[-170px] max-[500px]:!gap-[0px]"
    >
        <!-- Titulo -->
        <h1
            class="!font-poppins !text-[#FFFFFF] !font-bold !text-[60px]
            !uppercase !text-center !leading-10 !relative !z-[80]
            max-[500px]:!text-[40px]"
        >
            {{ $t('catalogo.name') }}
        </h1>

        <!-- Miga de pan -->
        <v-breadcrumbs 
            :items="[
                { title: $t('catalogo.name'), href: '/catalogo', link: true },
                { title: brand }
            ]"
            class="!text-[#FFFFFF] !text-center !font-poppins !font-bold !uppercase !text-[20px] !leading-10
            max-[500px]:!text-[16px] !relative !z-[80]"
        ></v-breadcrumbs>

        <SearchFiltros 
            class="search-filtros"
            customClass="2xl:!w-[300px] xl:!w-[270px] md:!w-[240px] max-sm:!w-[200px]"
            :label="$t('search-card.label-catalog')"
            v-model="searchQuery"
        />
    </section>

    <!-- Seccion de modelos -->
    <section
        class="!flex !flex-col !items-center !justify-center !mb-[200px] !relative !top-[-150px]"
    >
        <!-- Contenedor de grid de modelos -->
        <div
            class="!grid !grid-cols-3 
            2xl:!gap-[70px]
            xl:!gap-[50px]
            max-[1024px]:!grid-cols-2 max-[1024px]:!gap-[50px]
            max-[820px]:!grid-cols-2 max-[820px]:!gap-[30px]
            max-[500px]:!grid-cols-1 max-[820px]:!gap-[30px]"
        >
            <!-- Modelos -->
            <CatalogoModels 
                v-for="(model, i) in filteredModels"
                :key="i"
                :model="model.name"
                @click="goToModel(model)"
            />
        </div>
    </section>

    <!-- Footer -->
    <Footer 
        class="!mt-[-150px]"
    />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { tecdoc } from '../services/tecdoc'

import Header from '../components/sections/Header.vue'
import Formas from '../assets/images/formas-home.svg?w=1920&format=webp&quality=80'

import CatalogoModels from '../components/CatalogoModels.vue';

import SearchFiltros from '../components/SearchFiltros.vue'
import PageLoader from '../components/PageLoader.vue'

import Footer from '../components/sections/Footer.vue'

import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

// Obtener marca y id de la marca desde la ruta
const brand = ref(route.params.brand)
const id = ref(route.params.id)
const typeVehicle = ref(localStorage.getItem('typeVehicle') || 'V')
const isLoading = ref(true)

// Lista de modelos disponibles
const models = ref([])

// Variable reactiva para el filtro de búsqueda
const searchQuery = ref('')

// Función para obtener los modelos disponibles
async function getModels() {
    try {
        let response = await tecdoc({
            "getLinkageTargets": {
                "linkageTargetCountry": localStorage.getItem('country'),
                "lang": "es",
                "linkageTargetType": 'VLOB',
                "mfrIds": id.value,
                "perPage": 0,
                "page": 1,
                "includeVehicleModelSeriesFacets": true
            }
        });

        models.value = response.data.vehicleModelSeriesFacets.counts
            .map(item => {
                const begin = item.beginYearMonth
                const end = item.endYearMonth

                if (begin === undefined || end === undefined) {
                    return {
                        ...item,
                        name: item.name
                    }
                } else {
                    return {
                        ...item,
                        name: end
                            ? `${item.name} (${formatDate(begin)} | ${formatDate(end)})`
                            : `${item.name} (${formatDate(begin)})`
                    }
                }
            })
            .sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
        console.log(error);
    }
}

function formatDate(date) {
  let dateString = String(date)
  let dateParse = dateString.slice(0,4) + '-' + dateString.slice(4)
  return dateParse
}

const filteredModels = computed(() => {
  if (!searchQuery.value) return models.value

  return models.value.filter(model =>
    model.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Función para ir al modelo seleccionado
function goToModel(model) {
    router.push({ name: 'vehicles', params: { brand: brand.value, idBrand: id.value, model: model.name, idModel: model.id } })
}

// Obtener los modelos al montar el componente
onMounted(async () => {
    await getModels();
    isLoading.value = false
});
</script>

<style scoped>
/* Estilos para el miga de pan */
::v-deep(.v-breadcrumbs-item:last-child) {
  color: #FF4338 !important;
  text-decoration: underline !important;
}

@media (max-width: 768px) {
    .search-filtros :deep(.v-field-label),
    .search-filtros :deep(.v-field__append-inner) {
        font-size: 13px !important;
    }
    .search-filtros :deep(.v-field) {
        height: 45px !important;
    }
}
.search-filter :deep(.v-field),
.search-filter :deep(.v-field-label) {
    color: #FFFFFF !important;
}

.search-filter :deep(.v-field) {
    border: 2px solid #FFFFFF !important;
}
</style>