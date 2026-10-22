<template>
    <!-- Seccion Inicial -->
    <section 
    >
        <div 
            class="!bg-[#000000] !h-[500px]"
        >
            <!-- Header -->
            <Header />
            
            <!-- Formas decorativas -->
            <img 
                :src="Formas" 
                alt="Formas"
                class="!absolute !top-[-90px] !z-[1]
                xl:!w-[250px]
                md:!w-[200px]
                max-sm:!w-[200px]"
                loading="lazy"
                style="transform: scaleX(-1) rotate(180deg);"
            >
        </div>
    </section>

    <!-- Seccion de Titulo y Marcas -->
    <section
        class="!flex !flex-col !items-center !justify-center !gap-[40px] 
        !relative 
        2xl:!top-[-250px]
        xl:!top-[-300px]
        max-[1024px]:!top-[-300px]
        max-[500px]:!top-[-330px] max-[500px]:!gap-[100px]"
    >
        <!-- Titulo -->
        <h1
            class="!font-poppins !text-[#FFFFFF] !font-bold !text-[60px]
            !uppercase !text-center !leading-10 !relative !z-[80]
            max-[500px]:!text-[40px]"
        >
            {{ $t('catalogo.name') }}
        </h1>

        <v-btn-toggle
            v-model="typeVehicle"
            color="#FF4338"
            rounded="10"
            group
            class="!bg-transparent"
        >
            <v-btn value="V">
              Automóvil
            </v-btn>

            <v-btn value="O">
              Vehículos comerciales pesados
            </v-btn>

            <v-btn value="L">
              Vehículos comerciales ligeros
            </v-btn>

            <v-btn value="B">
              Motocicletas
            </v-btn>
        </v-btn-toggle>

        <SearchFiltros 
            class="search-filtros"
            customClass="2xl:!w-[300px] xl:!w-[270px] md:!w-[240px] max-sm:!w-[200px]"
            :label="$t('search-card.label-catalog')"
            :onChange="filterItemsQuery"
            v-model="searchQuery"
        />

        <!-- Marcas disponibles -->
        <CatalogoBrands
            :search="searchQuery"
            :filter="typeVehicle"
        />
    </section>

    <!-- Footer -->
    <Footer 
        class="!mt-[-150px]"
    />
</template>

<script setup>
import { ref, watch } from 'vue'

import Header from '../components/sections/Header.vue'
import Formas from '../assets/images/formas-home.svg?w=1920&format=webp&quality=80'

import SearchFiltros from '../components/SearchFiltros.vue'

import CatalogoBrands from '../components/CatalogoBrands.vue';

import Footer from '../components/sections/Footer.vue'

// Variable reactiva para el filtro de búsqueda
const searchQuery = ref('')
let typeVehicle = ref('V')
watch(typeVehicle, () => {
  typeVehicle.value = typeVehicle.value
})
</script>

<style scoped>
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