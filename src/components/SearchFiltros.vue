<template>
    <!-- Campo de búsqueda -->
    <v-text-field
        :class="customClass"
        :append-inner-icon="!vehicleArticles ? 'mdi-magnify' : ''"
        :label="label"
        variant="solo"
        v-model="search_filtro"
        @click:append-inner="onAppendClick"
        @change="onChange"
    >
    </v-text-field>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import router from '../router';

const { t } = useI18n();

// Variable reactiva para el valor del campo de búsqueda
const search_filtro = ref('');

// Función para ejecutar cuando se hace click en el icono de búsqueda
async function onAppendClick() {
    if (props.label === t('search-card.label-name')) {
        router.push({ name: 'products', params: { search: search_filtro.value } })
    }
};

// Propiedades que se le comparten al componente
const props = defineProps({
    customClass: {
        type: String
    },
    label: {
        type: String,
        default: 'Search Filtro'
    },
    onChange: {
        type: Function,
        default: () => {} 
    },
    vehicleArticles: {
        type: Boolean,
        default: false
    }
})

// Clase personalizada para el componente
const customClass = computed(() => {
  return ['search-filter', '!font-poppins', props.customClass]
})
</script>

<style scoped>
/* Estilos responsivos para el componente */
.search-filter :deep(.v-field) {
  height: 45px;
}

.search-filter :deep(.v-field__input) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: 40px !important;
}

.search-filter :deep(.v-field),
.search-filter :deep(.v-field-label) {
    color: #000000 !important;
    font-size: 18px !important;
    font-weight: 400 !important;
}

.search-filter :deep(.v-field.v-field--focused .v-field-label),
.search-filter :deep(.v-field.v-field--dirty .v-field-label) {
    font-size: 0px !important;
}

.search-filter :deep(.v-field) {
    background-color: transparent !important;
    border: 2px solid #45454596 !important;
    border-radius: 7px;
    box-shadow: none !important;
}

</style>