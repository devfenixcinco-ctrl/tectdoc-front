<template> 
    <div
        class="!flex !flex-col !items-center !justify-center !bg-[#FFFFFF] !bg-opacity-50 !backdrop-blur-sm !rounded-[20px]
        2xl:!w-[400px] 2xl:!gap-[20px] 2xl:!px-[60px] 2xl:!pb-[15px] 2xl:!pt-[30px]
        xl:!w-[350px] xl:!gap-[20px] xl:!px-[40px] xl:!pb-[10px] xl:!pt-[30px]
        md:!w-[300px] md:!gap-[15px] md:!px-[20px] md:!pb-[10px] md:!pt-[30px]
        max-sm:!w-[270px] max-sm:!gap-[15px] max-sm:!px-[20px] max-sm:!pb-[5px] max-sm:!pt-[20px]"
    >
        <!-- Texto de la card -->
        <h1
            class="!text-[#000000] !font-poppins !font-bold !text-center !uppercase
            2xl:!text-[20px]
            xl:!text-[20px]
            md:!text-[17px]
            max-sm:!text-[13px]"
        >   
            {{ customText }}
        </h1>

        <!-- Componente de busqueda y filtros -->
        <SearchFiltros 
            class="search-filtros"
            :customClass="customClassSearch"
            :label="searchLabel"
        />
    </div>
</template>

<script setup>
import SearchFiltros from './SearchFiltros.vue'

// Propiedades que se le comparten al componente
defineProps({
    customText: {
        type: String,
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et erat eget enim'
    },
    customClassSearch: {
        type: String
    },
    searchLabel: {
        type: String
    }
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
</style>