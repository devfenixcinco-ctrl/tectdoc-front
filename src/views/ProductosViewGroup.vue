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

    <!-- Seccion Titulo y Filtros -->
    <section
        class=" !relative !z-[10] !flex !flex-col !gap-y-[220px] !items-center px-40
        2xl:!top-[-220px]
        xl:!top-[-220px]
        max-[1024px]:!top-[-280px]
        max-[500px]:!top-[-350px] max-[550px]:!gap-y-[50px]"
    >
        <!-- Titulo -->
        <h1
            class="!font-poppins !text-white !font-bold !uppercase !text-center !leading-10
            2xl:!text-[60px]
            xl:!text-[50px]
            max-[1024px]:!text-[70px]
            max-[500px]:!text-[40px]"
        >
            {{ $t('products.search_by_group') }}
        </h1>
        <!-- Contenedor de productos -->
        <div
            class="w-full"
        >
            <div 
                v-for="(group, groupIndex) in groups"
            >
                <!-- Componente card de productos -->
                <div
                    class="bg-[#FF4338] px-5 py-1"
                >
                    <h2
                        class="!font-poppins !text-white !font-bold !uppercase !leading-10 !cursor-pointer
                        hover:!text-[#000000] !transition-colors duration-300"
                        @click="searchArticlesGroup(group.assemblyGroupNodeId, group.assemblyGroupName)"
                    >{{ group.assemblyGroupName }}</h2>
                </div>
                <div
                    v-for="(child, childIndex) in group.children"
                    class="px-10 py-1 !flex !flex-col"
                >
                    <div
                        class="!flex !flex-row align-center !gap-[5px]"
                    >
                        <v-icon 
                            v-if="child.children.length > 0"
                            icon="mdi-menu-down"
                            class="!text-[23px] !text-black"
                            :style="{
                                transition: 'transform 0.3s ease',
                                transform: openChildren[`${groupIndex}-${childIndex}`] ? 'rotate(180deg)' : 'rotate(0deg)'
                            }"
                            @click="toggleChild(`${groupIndex}-${childIndex}`)"
                        ></v-icon>
                        <h2
                            class="!font-sans !text-black !font-regular !leading-10 !cursor-pointer
                            hover:!text-[#FF4338] !transition-colors duration-300"
                            @click="searchArticlesGroup(child.assemblyGroupNodeId, child.assemblyGroupName)"
                        >{{ child.assemblyGroupName }}</h2>
                    </div>
                    <div
                        v-if="openChildren[`${groupIndex}-${childIndex}`]"
                        v-for="(children, childrenIndex) in child.children"
                        class="px-10 py-1 !flex !flex-row align-center !gap-[5px]"
                    >
                        <h2
                            class="!font-sans !text-black !font-regular !leading-10 !cursor-pointer
                            hover:!text-[#FF4338] !transition-colors duration-300"
                            @click="searchArticlesGroup(children.assemblyGroupNodeId, children.assemblyGroupName)"
                        >{{ children.assemblyGroupName }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <Footer
        class="!mt-[-200px]"
    />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { tecdoc } from '../services/tecdoc'

import SelectFiltros from '../components/SelectFiltros.vue'

import CardProductsSearch from '../components/CardProductsSearch.vue'

import Formas from '../assets/images/formas-home.svg?w=1920&format=webp&quality=80'
import Header from '../components/sections/Header.vue'

import Footer from '../components/sections/Footer.vue'

import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

import NotAvailable from '../assets/images/not_available.png?w=1920&format=webp&quality=80'

// Obtener variables de la URL
const search = ref(route.params.search)
const type = ref(route.params.type)
const brand = ref(null)
const model = ref(null)
const version = ref(null)

const openChildren = ref({});

function toggleChild(key) {
    openChildren.value[key] = !openChildren.value[key];
}

// Variable reactiva para deshabilitar el filtro de grupo
let disabled = ref(true)
let disabledModel = ref(true)

// Variable reactiva para la paginacion
const page = ref(1)
const perRow = computed(() => {
  if (windowWidth.value < 768) return 1
  if (windowWidth.value < 1025) return 2
  return 3
})

// Variable reactiva para el numero de productos por pagina
const perPage = computed(() => {
  if (windowWidth.value < 768) return 5
  if (windowWidth.value < 1025) return 8
  return 9
})

// Variable reactiva para el numero de paginas
const totalPages = computed(() => {
  return Math.ceil(filterArticles.value?.length / perPage.value)
})

// Variable reactiva para el filtro de búsqueda
const searchQuery = ref('')

// Variables reactivas para los modelos
const models = ref([])
const modelsArray = ref([])

const versions = ref([])
const versionsArray = ref([])

// Funcion para obtener los modelos
async function getModels(idBrand) {
    try {
        let response = await tecdoc({
            "getLinkageTargets": {
                "linkageTargetCountry": localStorage.getItem('country'),
                "linkageTargetType": "P",
                "mfrIds": idBrand,
                "perPage": 0,
                "page": 1,
                "includeVehicleModelSeriesFacets": true
            }
        });
        modelsArray.value = response.data.vehicleModelSeriesFacets.counts.map(item => ({
            id: item.id,
            name:  item.endYearMonth === undefined &&  item.beginYearMonth === undefined ? item.name : item.endYearMonth === undefined ? item.name + ' ' + formatDate(item.beginYearMonth) + ' -' : item.name + ' ' + formatDate(item.beginYearMonth) + ' - ' + formatDate(item.endYearMonth)
        }))
        models.value = response.data.vehicleModelSeriesFacets.counts
    } catch (error) {
        console.log(error);
    }
}

// Lista de marcas disponibles
const brandsObj = import.meta.glob('../assets/svg/*.svg', { eager: true, query: '?url', import: 'default' });
const brandsArray = Object.entries(brandsObj).map(([path]) => {
    const parts = path.split('/');
    const file = parts[parts.length - 1];
    const name = file.replace('.svg', '');
    return name;
});

// Lista de articulos
const groups = ref([])
const assemblyGroups = ref([])

// Funcion para obtener los articulos
async function getArticles() {
    try {
        let response = await tecdoc({
            "getChildNodesPattern2": { 
                "articleCountry": localStorage.getItem('country'), 
                "linkingTargetType": "U",
                "searchPattern": search.value,
            } 
        });
        groups.value = buildTree(response.data.data.array);
    } catch (error) {
        console.log(error);
    }
}

async function searchArticlesGroup(idGroup, nameGroup) {
    router.push({ name: 'products-group-page', params: { search: idGroup, text: nameGroup } })
}

function buildTree(flatArray) {
    const map = {};
    const tree = [];

    flatArray.forEach(node => {
        map[node.assemblyGroupNodeId] = { ...node, children: [] };
    });

    flatArray.forEach(node => {
        if (node.parentNodeId === 0 || !map[node.parentNodeId]) {
            tree.push(map[node.assemblyGroupNodeId]);
        } else {
            map[node.parentNodeId].children.push(map[node.assemblyGroupNodeId]);
        }
    });

    return tree;
}

// Lista de fabricantes
const fabricantes = ref([])

// Funcion para obtener los fabricantes
async function getFabricantes() {
    try {
        let response = await tecdoc({
            "getBrands": {
                "articleCountry": localStorage.getItem('country'),
            }
        });

        fabricantes.value = response.data.data.array.map(item => item.mfrName)
    } catch (error) {
        console.log(error);
    }
}

// Función para obtener los modelos disponibles
async function getSpecificModels(idBrand, idModel) {
    try {
        let response = await tecdoc({
            "getLinkageTargets": {
                "linkageTargetCountry": localStorage.getItem('country'),
                "linkageTargetType": "P",
                "mfrIds": idBrand,
                "vehicleModelSeriesIds": idModel,
                "perPage": 100,
                "page": 1
            }
        });

        versionsArray.value = response.data.linkageTargets.map(item => ({
            id: item.vehicleModelSeriesId,
            name: item.beginYearMonth === undefined && item.endYearMonth === undefined ? item.vehicleModelSeriesName : item.endYearMonth === undefined ? `${item.vehicleModelSeriesName} (${item.beginYearMonth})` : `${item.vehicleModelSeriesName} (${item.beginYearMonth} / ${item.endYearMonth})`
        }))
        versions.value = response.data.linkageTargets
    } catch (error) {
        console.log(error);
    }
}

function formatDate(date) {
  let dateString = String(date)
  let dateParse = dateString.slice(0,4) + '/' + dateString.slice(4)
  return dateParse
}

// Variable reactiva para el fabricante seleccionado
const fabriProduct = ref(null)

// Variable reactiva para el grupo seleccionado
const group = ref(null)
const groupSelect = ref(null)

// Manejo del tamaño de la ventana
const windowWidth = ref(window.innerWidth)

// Funcion para actualizar el ancho de la ventana
const handler = () => (windowWidth.value = window.innerWidth)

// Funcion para obtener los modelos al montar el componente
onMounted(async () => {
    await getFabricantes();
    await getArticles();

    window.addEventListener('resize', handler)
})

// Funcion para eliminar el manejador de la ventana al desmontar el componente
onUnmounted(() => {
    window.removeEventListener('resize', handler)
})
</script>

<style scoped>
    /* Estilos responsivos para los elementos dentro del componente SearchFiltros */
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