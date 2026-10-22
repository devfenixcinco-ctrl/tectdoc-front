<template>
    <v-container :class="containerClasses">

        <div class="flex items-center w-full gap-[clamp(.5rem,1vw,1rem)]">

            <v-text-field
                v-model="searchQuery"
                class="flex-1"
                :class="textFieldClasses"
                prepend-inner-icon="mdi-magnify"
                variant="underlined"
                :label="labelSearch"
                hide-details
                @click:prepend-inner="onPrependClick"
                @keydown.enter="onPrependClick"
            />

            <v-select
                :key="selectKey"
                :class="selectClasses"
                class="w-[clamp(130px,15vw,180px)] shrink-0"
                :items="items"
                :label="labelSelect"
                variant="plain"
                density="compact"
                clearable
                hide-details
                :menu-props="{
                    offsetY: true,
                    maxHeight: 200,
                    closeOnContentClick: false,
                    contentClass: 'custom-select-menu'
                }"
                return-object
                @update:modelValue="onSelect"
            />

        </div>
    </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SelectFiltros from '../SelectFiltros.vue'

const router = useRouter()
const searchQuery = ref('')
const selected = ref(null)
const selectKey = ref(0)
const emit = defineEmits(['update:selectedCriter'])
const selectedCriter = ref('Nombre de articulo') 

function onSelect(val) {
    selectedCriter.value = val
    if (val) {
        emit('update:selectedCriter', val)
        selectKey.value++ 
    }
}

// Propiedades que se le comparten al componente
const props = defineProps({
    items: {
        type: Array,
        default: () => [
            "Todos"
        ]
    },
    customClassContainer: {
        type: String
    },
    customClassField: {
        type: String
    },
    customClassSelect: {
        type: String
    },
    oscuro: {
        type: Boolean,
        default: false
    },
    labelSelect: {
        type: String,
        default: '$t("header.select_search")'
    }, 
    labelSearch: {
        type: String,
        default: '$t("header.search_label_name")'
    },
})

// Clase personalizada para el container
const containerClasses = computed(() => [
    "relative",
    props.customClassContainer
]);

const selectClasses = computed(() => [
    '!text-white',
    '!font-poppins',
    '!text-[clamp(.8rem,.9vw,.95rem)]',
    'no-border',
    'translate-y-[-5px]',
    props.customClassSelect
]);

// Clase personalizada para el text-field
const textFieldClasses = computed(() => [
    '!font-poppins',
    'translate-y-[-10px]',
    props.oscuro
        ? '!text-black'
        : '!text-white',
    props.customClassField
]);

function onPrependClick() {
    if (searchQuery.value !== '' && selectedCriter.value !== 'Búsqueda por grupo') {
        router.push({ name: 'products', params: { search: searchQuery.value, type: selectedCriter.value } })
    } else if (searchQuery.value !== '' && selectedCriter.value === 'Búsqueda por grupo') {
        router.push({ name: 'products-group', params: { search: searchQuery.value } })
    }
}
</script>

<style>
.custom-select-menu{

    max-height:500px!important;

    width:clamp(180px,20vw,300px);

    overflow-y:auto;

}

.custom-select-menu .v-list{

    min-width:100%!important;

    background:#ffffffb7!important;

    border-radius:12px;

    backdrop-filter:blur(4px);

    box-shadow:0 4px 12px rgba(0,0,0,.25);

}

.custom-select-menu .v-list-item{

    font-family:Poppins,sans-serif;

    font-size:clamp(.78rem,.9vw,.9rem);

    padding:clamp(.45rem,.7vw,.75rem)
            clamp(.8rem,1vw,1rem);

    color:#000;

}

.custom-select-menu .v-list-item:hover
.v-list-item-title{

    color:#FF4338;

}

.custom-select-menu
.v-list-item--active
.v-list-item-title{

    color:#0080BB!important;

}
</style>

<style scoped>
.search-select{

    position:absolute;

    right:0;

    top:50%;

    transform:translateY(-50%);

}

:deep(.no-border .v-field__outline::before){

    border-bottom:none!important;

}

:deep(.v-select .v-field__append-inner .v-icon),

:deep(.v-select .v-field__clearable .v-icon){

    transform:translateY(clamp(-2px,-.3vw,-4px));

}

:deep(.v-field__input){

    padding-right:clamp(140px,16vw,190px);

}
</style>
