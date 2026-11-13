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
        class=" !relative !z-[10] !flex !flex-col !gap-y-[40px] !items-center
        2xl:!top-[-280px]
        xl:!top-[-280px]
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
            {{ $t('products.autoparts') }}
        </h1>

        <!-- <SearchFiltros 
            class="search-filtros"
            customClass="2xl:!w-[300px] xl:!w-[270px] md:!w-[240px] max-sm:!w-[200px]"
            :label="$t('search-card.label-name')"
            :onChange="filterItemsQuery"
            v-model="searchQuery"
        /> -->

        <!-- Contenedor filtros -->
        <div
            class="!flex !flex-row !items-center !justify-center !bg-[#FFFFFF] !bg-opacity-30 !backdrop-blur-sm !rounded-[12px]
            2xl:!w-[70%] 2xl:!h-[100px] 2xl:!px-[80px] 2xl:!gap-[60px]
            xl:!w-[85%] xl:!h-[100px] xl:!px-[70px] xl:!gap-[50px]
            md:!w-[80%] md:!h-[70px] md:!px-[40px] md:!gap-[30px]
            max-[500px]:!w-[90%] max-[500px]:!h-[250px] max-[500px]:!px-[40px] max-[500px]:!gap-[10px]
            max-[500px]:!grid max-[500px]:!grid-cols-2 max-[500px]:!relative max-[500px]:!top-[-20px] !max-[500px]:!place-items-center"
        >
            <!-- Filtro por Marca -->
            <SelectFiltros 
                v-model="brand"
                customClass="2xl:!w-[100px] 2xl:!h-[58px]
                xl:!w-[100px] xl:!h-[58px]
                md:!w-[90px] md:!h-[40px]
                max-[500px]:!w-[140px] max-[500px]:!h-[40px]"
                :outlinedBorder="false"
                :label="$t('filters.brand')"
                :itemsSelect="brandsArray"
                @update:model-value="filterItems"
            />

            <!-- Filtro por Modelo -->
            <SelectFiltros 
                v-model="model"
                customClass="2xl:!w-[100px] 2xl:!h-[58px]
                xl:!w-[100px] xl:!h-[58px]
                md:!w-[90px] md:!h-[40px]
                max-[500px]:!w-[140px] max-[500px]:!h-[40px]"
                :outlinedBorder="false"
                :label="$t('filters.model')"
                :itemsSelect="modelsArray"
                @update:model-value="filterItems"
                :disabled="disabledModel"
            />

            <!-- Filtro por Versión -->
            <SelectFiltros 
                v-model="version"
                customClass="2xl:!w-[100px] 2xl:!h-[58px]
                xl:!w-[100px] xl:!h-[58px]
                md:!w-[90px] md:!h-[40px]
                max-[500px]:!w-[140px] max-[500px]:!h-[40px]"
                :outlinedBorder="false"
                :label="$t('filters.model-specific')"
                :itemsSelect="versionsArray"
                @update:model-value="filterItems"
                :disabled="disabled"
            />

            <!-- Filtro por Producto -->
            <SelectFiltros 
                ref="fabriSelect"
                v-model = "fabriProduct"
                customClass="2xl:!w-[100px] 2xl:!h-[58px]
                xl:!w-[100px] xl:!h-[58px]
                md:!w-[90px] md:!h-[40px]
                max-[500px]:!w-[140px] max-[500px]:!h-[40px]"
                :outlinedBorder="false"
                :label="$t('filters.product')"
                :itemsSelect="fabricantes"
                @update:model-value="filterItems"
            />

            <!-- Filtro por Grupo -->
            <SelectFiltros 
                ref="groupSelect"
                v-model="group"
                customClass="2xl:!w-[100px] 2xl:!h-[58px]
                xl:!w-[100px] xl:!h-[58px]
                md:!w-[40px] md:!h-[40px]
                max-[500px]:!w-[140px] max-[500px]:!h-[40px]"
                :outlinedBorder="false"
                :label="$t('filters.group')"
                :itemsSelect="assemblyGroups"
                itemText="group"
                itemValue="idGroup"
                @update:model-value="filterItems"
            />
        </div>

        <!-- Contenedor de productos -->
        <div 
            v-if="totalPages > 0"
            v-for="(row, rowIndex) in paginatedRows" 
            :key="'row-' + rowIndex" 
            class="!flex !flex-row !justify-center !gap-[90px]"
        >
            <!-- Componente card de productos -->
            <CardProductsSearch 
                v-for="(filterArticles) in row" 
                :key="filterArticles.id" 
                :images="filterArticles.img"
                :name="filterArticles.name"
                :fabri="filterArticles.fabriName"
                :group="filterArticles.group"
                :id="filterArticles.id"
            />
        </div>

        <!-- Paginacion -->
        <div class="text-center">
            <v-pagination
                v-if="totalPages > 1"
                v-model="page"
                :length="totalPages"
                :total-visible="6"
                class="!font-poppins"
                rounded="circle"
                next-icon="mdi-menu-right"
                prev-icon="mdi-menu-left"
            />
        </div>

        <!-- Mensaje de no hay productos -->
        <h1
            v-if="totalPages === 0"
            class="!font-poppins !text-center !text-[20px] !font-bold !uppercase !text-[#000000] !leading-20 mt-[100px]
            "
        >
            {{ $t('products.empty') }}
        </h1>
    </section>

    <!-- Footer -->
    <Footer
        class="!mt-[-200px]"
    />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick  } from 'vue'
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
const text = ref(route.params.text)
const brand = ref(null)
const model = ref(null)
const version = ref(null)

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

// Variable reactiva para los articulos paginados
const paginatedArticles = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filterArticles.value.slice(start, start + perPage.value)
})

// Variable reactiva para los articulos paginados por fila
const paginatedRows = computed(() => {
  const rows = []
  for (let i = 0; i < paginatedArticles.value.length; i += perRow.value) {
    rows.push(paginatedArticles.value.slice(i, i + perRow.value))
  }
  return rows
})

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
const articles = ref([])
const assemblyGroups = ref([])

// Funcion para obtener los articulos
async function getArticles() {
    try {
        let response = await tecdoc({
            "getArticles": { 
                "articleCountry": localStorage.getItem('country'), 
                "assemblyGroupNodeIds": [
                    search.value
                ],
                "includeAll": true,
                "linkageTargetCountry": localStorage.getItem('country'),
                "linkageTargetId": 0,
                "linkageTargetType": "U",
                "perPage": 1000,
                "page": 1
            } 
        });
        articles.value = response.data.articles.map(article => {
                return {
                    id: article.articleNumber,
                    name: article.genericArticles.map(item => item.genericArticleDescription).join(', ') || "",
                    group: article.genericArticles.map(item => item.assemblyGroupName).join(', ') || "",
                    group: article.genericArticles.map(item => item.assemblyGroupName).join(', ') || "",
                    idGroup: article.genericArticles.map(item => item.assemblyGroupNodeId).join(', ') || "",
                    fabriName: article.mfrName,
                    img: article.images.length > 0
                    ? article.images.map(image => image.imageURL3200)
                    : [NotAvailable],
                    brands: article.oemNumbers.map(item => item.mfrName + "-" + item.mfrId).join(', ') || ""
                }
                }).sort((a, b) => a.name.localeCompare(b.name))

        assemblyGroups.value = Object.values(
            response.data.articles
            .flatMap(item =>
                (item.genericArticles || []).map(article => ({
                    group: article.assemblyGroupName || "",
                    idGroup: article.assemblyGroupNodeId || "",
                }))
            )
            .reduce((acc, curr) => {
                acc[curr.idGroup] = curr; 
                return acc;
            }, {})
        );
        const searchText = text.value?.toLowerCase();

        function matchScore(groupName, search) {
            const gWords = groupName.split(/[\s,\/]+/).filter(w => w.length > 3);
            const sWords = search.split(/[\s,\/]+/).filter(w => w.length > 3);
            
            const forwardMatches = sWords.filter(w => groupName.includes(w)).length;
            const backwardMatches = gWords.filter(w => search.includes(w)).length;

            const forwardScore = sWords.length ? forwardMatches / sWords.length : 0;
            const backwardScore = gWords.length ? backwardMatches / gWords.length : 0;

            return Math.max(forwardScore, backwardScore);
        }

        const matchedGroup = assemblyGroups.value
            .filter(g => {
                const gText = g.group.toLowerCase();
                return gText.includes(searchText) ||
                    searchText.includes(gText) ||
                    matchScore(gText, searchText) >= 0.5 
            })
            .sort((a, b) => {
                const aText = a.group.toLowerCase();
                const bText = b.group.toLowerCase();

                if (aText === searchText) return -1;
                if (bText === searchText) return 1;

                const aContains = aText.includes(searchText);
                const bContains = bText.includes(searchText);
                if (aContains && !bContains) return -1;
                if (!aContains && bContains) return 1;

                // Desempate por score de palabras
                const scoreA = matchScore(aText, searchText);
                const scoreB = matchScore(bText, searchText);
                if (scoreA !== scoreB) return scoreB - scoreA;

                return Math.abs(aText.length - searchText.length) - Math.abs(bText.length - searchText.length);
            })
            [0] ?? null;

        group.value = null;

        await nextTick();

        group.value = matchedGroup ?? null;
    } catch (error) {
        console.log(error);
    }
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

// Funcion para filtrar los articulos
const filterArticles = computed(() => {
  let result = articles.value
  let idBrand = ''
  let idModel = ''

  // Marca
  if (brand.value) {
    result = result.filter(item =>
      item.brands?.toLowerCase().includes(brand.value.toLowerCase())
    )

    idBrand = result[0].brands.split(',')[0].split('-')[1]

    getModels(idBrand)
    disabledModel.value = false
  }

  // Marca
  if (model.value) {
    idModel = model.value.id
    getSpecificModels(idBrand, idModel)
    disabled.value = false
  }

  // Versión
  if (version.value) {
    router.push({ name: 'vehicles-articles-query', params: {query: search.value, brand: brand.value, idBrand: idBrand, model: model.value.name, idModel: idModel, car: version.value.name, idCar: version.value.id } })
  }

  // Fabricante
  if (fabriProduct.value) {
    result = result.filter(a => a.fabriName === fabriProduct.value)
  }

  // Grupo
  if (group.value) {
    result = result.filter(item => item.idGroup.includes(group.value.idGroup))
  }

  return result
})

// Manejo del tamaño de la ventana
const windowWidth = ref(window.innerWidth)

// Funcion para actualizar el ancho de la ventana
const handler = () => (windowWidth.value = window.innerWidth)

// Funcion para obtener los modelos al montar el componente
onMounted(async () => {
    await getFabricantes();
    await getArticles();
    filterArticles.value = articles.value

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