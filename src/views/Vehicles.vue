<template>
    <PageLoader 
        :loading="isLoading"
        :minDuration="500"
        messages="Cargando modelos especificos..."
    >
    </PageLoader>
    <!-- Seccion de inicio -->
    <section 
    >
        <!-- Contenedor de la imagen y la informacion del producto -->
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
    
    <!-- Seccion de titulo y marcas -->
    <section
        class="!flex !flex-col !items-center !justify-center !gap-[5px] 
        !relative 
        2xl:!top-[-290px]
        xl:!top-[-250px]
        max-[1024px]:!top-[-265px]
        max-[500px]:!top-[-170px] max-[500px]:!gap-[0px]"
    >
        <!-- Titulo -->
        <h1
            class="!font-poppins !text-[#FFFFFF] !font-bold !text-[60px]
            !uppercase !text-center !leading-10 !relative !z-[80]
            xl:!text-[50px]
            max-[500px]:!text-[40px]"
        >
            {{ $t('catalogo.name') }}
        </h1>

        <!-- Miga de pan -->
        <v-breadcrumbs 
            :items="[
                { title: $t('catalogo.name'), href: '/catalogo', link: true },
                { title: brand, href: '/catalogo/model/' + brand + '/' + idBrand },
                { title: model }
            ]"
            class="!text-[#FFFFFF] !text-center !font-poppins !font-bold !uppercase !text-[20px]
            xl:!text-[18px]
            max-[500px]:!text-[16px] !relative !z-[80]
            max-[400px]:!text-[13px] !relative !z-[80]"
        ></v-breadcrumbs>
        
        <!-- Contenedor de los filtros -->
        <div
            class="!flex !flex-row !justify-start !items-center !gap-[35px] !relative !z-[10]
            !bg-[#E3E3E3] !rounded-[5px] !px-[30px] !mt-[20px]
            2xl:!w-[1600px] 2xl:!h-[100px]
            xl:!w-[1200px] xl:!h-[80px]
            max-[1024px]:!w-[900px] max-[1024px]:!h-[80px] max-[1024px]:!gap-[15px]
            max-[820px]:!w-[750px] max-[820px]:!h-[190px] max-[820px]:!gap-[15px]
            max-[820px]:!grid max-[820px]:!grid-cols-3
            max-[768px]:!w-[700px]
            max-[500px]:!w-[380px] max-[500px]:!h-[280px] max-[500px]:!grid max-[500px]:!grid-cols-2 max-[500px]:!grid-rows-3
            max-[400px]:!w-[350px]"
        >
            <div
                class="!flex !flex-row !justify-start !items-center !gap-[50px]
                !bg-[#F3F3F3] !rounded-[5px] !px-[10px]
                2xl:!h-[60%] 2xl:!w-[250px]
                xl:!h-[70%] xl:!w-[200px]
                max-[1024px]:!h-[70%] max-[1024px]:!w-[180px] max-[1024px]:!gap-[40px]
                max-[820px]:!h-[70%] max-[820px]:!w-[200px] max-[820px]:!gap-[40px]
                max-[500px]:!h-[70%] max-[500px]:!w-[150px] max-[500px]:!gap-[20px]
                max-[400px]:!w-[140px] max-[400px]:!gap-[12px]"
            >
                <!-- Icono de filtros -->
                <i 
                    class="mdi mdi-filter 
                    2xl:!text-[40px]
                    xl:!text-[30px]
                    max-[1024px]:!text-[30px]"
                ></i>

                <!-- Titulo de filtros -->
                <h2
                    class="!font-poppins !leading-10
                    2xl:!text-[30px]
                    xl:!text-[25px]
                    max-[1024px]:!text-[25px]"
                > 
                    {{ $t('vehicles.filter') }} 
                </h2>
            </div>

            <!-- Filtro de año de inicio -->
            <SelectFiltros 
                ref="intialYearSelect"
                customClass="!relative !top-[11px]
                2xl:!w-[100px]
                xl:!w-[20px]"
                :outlinedBorder="true"
                :label="$t('vehicles.table.initialYear')"
                :itemsSelect="initialYear"
                v-model="selectedInitialYear"
                @update:modelValue="verificarFiltros('initialYear')"
            />

            <!-- Filtro de año de finalización -->
            <SelectFiltros 
                ref="finalYearSelect"
                customClass="!relative !top-[11px]
                2xl:!w-[100px]
                xl:!w-[20px]"
                :outlinedBorder="true"
                :label="$t('vehicles.table.finalYear')"
                :itemsSelect="finalYear"
                v-model="selectedFinalYear"
                @update:modelValue="verificarFiltros('finalYear')"
            />

            <!-- Filtro de tipo de tracción -->
            <SelectFiltros 
                ref="traccionSelect"
                customClass="!relative !top-[11px]
                2xl:!w-[100px]
                xl:!w-[20px]"
                :outlinedBorder="true"
                :label="$t('vehicles.table.driverType')"
                :itemsSelect="driveType"
                v-model="selectedDrive"
                @update:modelValue="verificarFiltros('traccion')"
            />

            <!-- Filtro de tipo de combustible -->
            <SelectFiltros 
                ref="combustibleSelect"
                customClass="!relative !top-[11px]
                2xl:!w-[100px]
                xl:!w-[20px]"
                :outlinedBorder="true"
                :label="$t('vehicles.table.fuel')"
                :itemsSelect="fuelTypes"
                v-model="selectedFuel"
                @update:modelValue="verificarFiltros('combustible')"
            />
        </div>
    </section>

    <!-- Seccion de tabla de vehículos -->
    <section
        class="!px-[50px] !relative !top-[-160px]
        max-[1024px]:!px-[30px]
        max-[820px]:!px-[30px] max-[820px]:!top-[-200px]
        max-[500px]:!px-[20px] max-[500px]:!top-[-120px]"
    >
        <!-- Tabla de vehículos -->
        <TableVehicle 
            :filas="filteredModels"
            :brand="brand"
            :idBrand="idBrand"
            :model="model"
            :idModel="idModel"
        />
    </section>

    <!-- Footer -->
    <Footer 
        class="!mt-[-80px]"
    />
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios';

import Header from '../components/sections/Header.vue'
import Formas from '../assets/images/formas-home.svg?w=1920&format=webp&quality=80'

import SelectFiltros from '../components/SelectFiltros.vue'
import PageLoader from '../components/PageLoader.vue'
import TableVehicle from '../components/TableVehicle.vue'

import Footer from '../components/sections/Footer.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

// Obtener variables de la URL
const brand = ref(route.params.brand)
const idBrand = ref(route.params.idBrand)
const model = ref(route.params.model)
const idModel = ref(route.params.idModel)
const loading = ref(true)

// Variables reactivas de los filtros
const models = ref([])
const fuelTypes = ref([])
const driveType = ref([])
const finalYear = ref([])
const initialYear = ref([])

// Variable reactiva para la tabla de vehículos
const selectedFuel = ref();
const selectedDrive = ref();
const selectedInitialYear = ref();
const selectedFinalYear = ref();

// Lista de modelos filtrados
const filteredModels = computed(() => {
  return models.value.filter(item => {
    return (
      (!selectedFuel.value || item.fuelType === selectedFuel.value) &&
      (!selectedDrive.value || item.driveType === selectedDrive.value) &&
      (!selectedInitialYear.value || item.beginYearMonth === selectedInitialYear.value) &&
      (!selectedFinalYear.value || item.endYearMonth === selectedFinalYear.value)
    );
  });
});

// Función para obtener los modelos disponibles
async function getSpecificModels() {
    try {
        let response = await axios.post(
        'https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js',
            {
                "getLinkageTargets": {
                    "provider": 25100,
                    "linkageTargetCountry": localStorage.getItem('country'),
                    "lang": "es",
                    "linkageTargetType": "P",
                    "mfrIds": idBrand.value,
                    "vehicleModelSeriesIds": idModel.value,
                    "perPage": 100,
                    "page": 1
                }
            },
            {
                headers: {
                'X-Api-Key' : '2BeBXg6QnEsEd55snsUcjnfBBhiQ28ttQfNDxhVJLqGxrx7dJ2Af',
                'Content-Type' : 'application/json'
                }
            }
        );

        models.value = Array.isArray(response.data?.linkageTargets)
            ? response.data.linkageTargets
            : []

        const allFuelTypes = models.value.map(item => item.fuelType);
        fuelTypes.value = [...new Set(allFuelTypes)]

        const allDriveTypes = models.value.map(item => item.driveType);
        driveType.value = [...new Set(allDriveTypes)]

        const allFinalYear = models.value.map(item => item.endYearMonth);
        finalYear.value = [...new Set(allFinalYear)].sort((a, b) => a - b);

        const allInitialYear = models.value.map(item => item.beginYearMonth);
        initialYear.value = [...new Set(allInitialYear)].sort((a, b) => a - b);

    } catch (error) {
        console.log(error);
    }
}

// Variable reactiva para los filtros
const intialYearSelect = ref(null)
const finalYearSelect = ref(null)
const traccionSelect = ref(null)
const combustibleSelect = ref(null)

// Función para activar los filtros
function verificarFiltros(filtro) {
    if (filtro === 'initialYear') {
        if (intialYearSelect.value && intialYearSelect.value.$el) {
            const input = intialYearSelect.value.$el.querySelector('input');
            if (input) input.blur();
        }
    }

    if (filtro === 'finalYear') {
        if (finalYearSelect.value && finalYearSelect.value.$el) {
            const input = finalYearSelect.value.$el.querySelector('input');
            if (input) input.blur();
        }
    }

    if (filtro === 'traccion') {
        if (traccionSelect.value && traccionSelect.value.$el) {
            const input = traccionSelect.value.$el.querySelector('input');
            if (input) input.blur();
        }
    }

    if (filtro === 'combustible') {
        if (combustibleSelect.value && combustibleSelect.value.$el) {
            const input = combustibleSelect.value.$el.querySelector('input');
            if (input) input.blur();
        }
    }
}

// Llamar a la función para obtener los modelos cuando el componente se monta
onMounted(async () => {
    await getSpecificModels();
    loading.value = false
});
</script>

<style scoped>
/* Estilos para el miga de pan */
::v-deep(.v-breadcrumbs-item:last-child) {
  color: #FF4338 !important;
  text-decoration: underline !important;
}
</style>