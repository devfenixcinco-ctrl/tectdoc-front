<template>
    <PageLoader 
        :loading="isLoading"
        :minDuration="1000"
        messages="Cargando articulos..."
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
        
            <!-- Formas Decorativas -->
            <img 
                :src="Formas" 
                alt="Formas"
                class="!absolute !top-[-90px] !z-[1]
                xl:!w-[200px]
                max-[1024px]:!w-[200px]
                max-[500px]:!w-[170px]"
                style="transform: scaleX(-1) rotate(180deg);"
            >
        </div>
    </section>
    
    <!-- Seccion Titulo y Miga de Pan -->
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
                { title: model, href: '/vehicles/' + brand + '/' + idBrand + '/' + model + '/' + idModel },
                { title: car }
            ]"
            class="!text-[#FFFFFF] !text-center !font-poppins !font-bold !uppercase !text-[20px]
            xl:!text-[18px]
            max-[500px]:!text-[13px] !relative !z-[80]
            max-[400px]:!text-[13px] !relative !z-[80]"
        ></v-breadcrumbs>

        <SearchFiltros 
            class="search-filtros"
            customClass="2xl:!w-[300px] xl:!w-[270px] md:!w-[240px] max-sm:!w-[200px]"
            :label="$t('header.search_label_name')"
            :onChange="filterItemsQuery"
            v-model="searchQuery"
            :vehicleArticles="true"
        />

        <div
            class="!flex !flex-row !gap-[30px]"
        >
            <!-- Filtro por Grupo -->
            <SelectFiltros 
                ref="groupSelect"
                v-model="group"
                customClass="2xl:!w-[300px] 2xl:!h-[58px]
                xl:!w-[300px] xl:!h-[58px]
                md:!w-[200px] md:!h-[40px]
                max-[500px]:!w-[200px] max-[500px]:!h-[40px]"
                :outlinedBorder="false"
                :label="$t('filters.group')"
                :itemsSelect="assemblyGroups"
                itemText="group"
                itemValue="idGroup"
            />

            <!-- Filtro por Producto -->
            <SelectFiltros 
                ref="fabriSelect"
                v-model = "fabriProduct"
                customClass="2xl:!w-[300px] 2xl:!h-[58px]
                xl:!w-[300px] xl:!h-[58px]
                md:!w-[200px] md:!h-[40px]
                max-[500px]:!w-[200px] max-[500px]:!h-[40px]"
                :outlinedBorder="false"
                :label="$t('filters.product')"
                :itemsSelect="fabricantes"
            />
        </div>
    </section>

    <!-- Seccion de articulos de vehiculo especifico -->
    <section
        class="!px-[50px] !relative !top-[-220px] !flex !flex-col !gap-[70px]
        max-[1024px]:!px-[30px]
        max-[820px]:!px-[30px] max-[820px]:!top-[-200px]
        max-[500px]:!px-[20px] max-[500px]:!top-[-120px]"
    >
        <!-- Contenedor de las card de articulos -->
        <div 
            v-if="totalPages > 0"
            v-for="(row, rowIndex) in paginatedRows" 
            :key="'row-' + rowIndex" 
            class="!flex !flex-row !justify-center !gap-[70px]"
        >
            <!-- Componente card de articulos -->
            <CardProductsSearch 
                v-for="(filterArticles) in row" 
                :key="`${filterArticles.id}-${filterArticles.idGroup}`" 
                :images="filterArticles.img"
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

        <!-- Mensaje de no hay articulos -->
        <h1
            v-if="totalPages === 0 && !loading"
            class="!font-poppins !text-center !text-[20px] !font-bold !uppercase !text-[#000000] !relative !top-[20px]
            "
        >
            {{ $t('products.empty') }}
        </h1>
    </section>

    <!-- Footer -->
    <Footer 
        class="!mt-[-80px]"
    />
</template>

<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue'
import { tecdoc } from '../services/tecdoc'

import SelectFiltros from '../components/SelectFiltros.vue'
import SearchFiltros from '../components/SearchFiltros.vue'

import PageLoader from '../components/PageLoader.vue'

import Header from '../components/sections/Header.vue'
import Formas from '../assets/images/formas-home.svg'

import NotAvailable from '../assets/images/not_available.png?w=800&format=webp&quality=80'

import CardProductsSearch from '../components/CardProductsSearch.vue';

import Footer from '../components/sections/Footer.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

// Obtener variables de la URL
const brand = ref(route.params.brand)
const idBrand = ref(route.params.idBrand)
const model = ref(route.params.model)
const idModel = ref(route.params.idModel)
const car = ref(route.params.car)
const idCar = ref(route.params.idCar)
const search = ref(route.params.query)
const isLoading = ref(true)

// Lista de articulos disponibles
const articles = ref([])
const assemblyGroups = ref([])

// Variable reactiva para el grupo de la búsqueda
const group = ref(localStorage.getItem('grupo') || null)

// Variable reactiva para el fabricante seleccionado
const fabriProduct = ref(localStorage.getItem('fabricante') || null)

// Lista de fabricantes
const fabricantes = ref([])

// Variable reactiva para el tamaño de la ventana
const windowWidth = ref(window.innerWidth)

// Variable reactiva para la paginación
const page = ref(1)
const perRow = computed(() => {
  if (windowWidth.value < 768) return 1
  if (windowWidth.value < 1025) return 2
  return 3
})

// Variable reactiva para el numero de articulos por pagina
const perPage = computed(() => {
  if (windowWidth.value < 768) return 5
  if (windowWidth.value < 1025) return 8
  return 9
})

// Variable reactiva para el filtro de búsqueda
const searchQuery = ref('')

// Variable reactiva para el numero de paginas
const totalPages = computed(() => {
  return Math.ceil(filterArticles.value?.length / perPage.value)
})

// Lista de articulos paginados
const paginatedArticles = computed(() => {
  const start = (page.value - 1) * perPage.value
  return filterArticles.value.slice(start, start + perPage.value)
})

// Lista de articulos paginados por fila
const paginatedRows = computed(() => {
  const rows = []
  for (let i = 0; i < paginatedArticles.value.length; i += perRow.value) {
    rows.push(paginatedArticles.value.slice(i, i + perRow.value))
  }
  return rows
})

// Función para obtener los articulos
async function searchArticles(id) {
    try {
        let response = await tecdoc({
            "getArticles": {
                "articleCountry": localStorage.getItem('country'),
                "linkageTargetType": "P",
                "linkageTargetId": id,
                "perPage": 1000,
                "page": 1,
                "includeAll": true
            }
        });

        articles.value = response.data.articles.map(article => {
                return {
                    id: article.articleNumber,
                    name: article.genericArticles.map(item => item.genericArticleDescription).join(', ') || "",
                    group: article.genericArticles.map(item => item.assemblyGroupName).join(', ') || "",
                    fabriName: article.mfrName,
                    img: (article.images.length > 0) ? (article.images).map(image => image.imageURL3200) : [NotAvailable]
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

    } catch (error) {
        console.log(error);
    }
}

// Manejo del tamaño de la ventana
const handler = () => (windowWidth.value = window.innerWidth)

const filterArticles = computed(() => {
    let result = articles.value
    
    // 🔹 Filtro por grupo
    if (group.value) {
        result = result.filter(item => item.group.includes(group.value.group || group.value))
    }

    // 🔹 Filtro por fabricante
    if (fabriProduct.value) {
        result = result.filter(item => item.fabriName === fabriProduct.value)
    }

    // 🔹 Filtro por búsqueda (nombre)
    if (searchQuery.value.trim() !== '') {
        result = result.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    }

    return result
})

async function searchQueryFunction() {
    if (!search.value?.trim()) return
    articles.value = articles.value.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))
}

// Funcion para obtener los fabricantes
async function getFabricantes() {
    try {
        let response = await tecdoc({
            "getBrands": {
                "articleCountry": localStorage.getItem('country'),
            }
        });

        fabricantes.value = response.data.data.array
        .map(item => ({ name: item.mfrName, id: item.dataSupplierId }))
        .sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
        console.log(error);
    }
}

// Llamar a la función para obtener los articulos cuando el componente se monta
onMounted(async () => {
    await searchArticles(idCar.value);
    await searchQueryFunction()
    await getFabricantes();
    filterArticles.value = articles.value
    isLoading.value = false
    window.addEventListener('resize', handler)
})

// Función para eliminar el manejador de la ventana al desmontar el componente
onUnmounted(() => {
    window.removeEventListener('resize', handler)
    localStorage.removeItem('fabricante')
    localStorage.removeItem('grupo')
})
</script>

<style scoped>
/* Estilos para el miga de pan */
::v-deep(.v-breadcrumbs-item:last-child) {
  color: #FF4338 !important;
  text-decoration: underline !important;
}

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