<template>
    <!-- Select de filtros -->
    <v-autocomplete 
        ref="fieldRef"
        :class="customClass" 
        :label="label"
        :items="itemsSelect"
        :item-title="itemText"
        :item-value="itemValue"
        
        variant="solo"
        clearable
        menu-icon="mdi-chevron-down"
        :menu-props="{
            offsetY: true,
            maxHeight: 200,
            closeOnContentClick: false,
            contentClass: 'select-filtros',
            contentProps: { style: menuStyle }
        }"
        return-object
        autocomplete="off"
        @update:menu="onMenuToggle"
    >
        <template #item="{ item, props }">
            <v-list-item
                v-bind="props"
                :title="item.raw[itemText]"
            >
                <template #append>
                    <span class="text-caption text-grey">{{ item.raw[itemValue] }}</span>
                </template>
            </v-list-item>
        </template>
    </v-autocomplete>
</template>

<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'

// Propiedades que se le comparten al componente
const props = defineProps({
    customClass: {
        type: String
    },
    outlinedBorder: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: 'Seleccionar'
    },
    itemsSelect: {
        type: Array,
        default: () => ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
    },
    itemValue: {
        type: String,
        default: 'id'
    },
    itemText: {
        type: String,
        default: 'name'
    }
})

// Clase personalizada para el select
const customClass = computed(() => {  
    if (props.outlinedBorder === true) {
        return ['!font-poppins', 'filtros-categorias', props.customClass]
    } else {
        return ['!font-poppins', 'filtros', props.customClass]
    }
})

// --- Posicionamiento dinámico del menú respecto al contenedor ---
const fieldRef = ref(null)
const menuStyle = ref({})
let resizeObserver = null

function calculateMenuGeometry() {
    const fieldEl = fieldRef.value?.$el
    if (!fieldEl) return

    const container = fieldEl.closest('[data-filtros-container]')
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const fieldRect = fieldEl.getBoundingClientRect()

    menuStyle.value = {
        position: 'absolute',
        left: `${containerRect.left}px`,
        top: `${fieldRect.bottom}px`,
        width: `${containerRect.width}px`,
        maxWidth: 'none'
    }
}

function onMenuToggle(isOpen) {
    if (!isOpen) return
    calculateMenuGeometry()

    // Recalcular si el contenedor cambia de tamaño mientras el menú está abierto
    const fieldEl = fieldRef.value?.$el
    const container = fieldEl?.closest('[data-filtros-container]')
    if (container && !resizeObserver) {
        resizeObserver = new ResizeObserver(calculateMenuGeometry)
        resizeObserver.observe(container)
    }
}

onBeforeUnmount(() => {
    resizeObserver?.disconnect()
})
</script>

<style>
/* Customizar la lista de elementos del select */
.select-filtros .v-list {
    background-color: #ffffffb7 !important;
    border-radius: 8px;
    backdrop-filter: blur(4px);
    min-height: 300px !important;
}

.select-filtros .v-list-item {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    padding: 8px 16px;
    color: #000;
}

.select-filtros .v-list-item:hover .v-list-item-title {
    color: #FF4338;
}

.select-filtros .v-list-item--active .v-list-item-title {
    color: #0080BB !important;
}
</style>

<style scoped>
/* Cambiar color del label flotante - Filtros Home */
.filtros :deep(.v-field),
.filtros :deep(.v-field-label) {
    color: #000000 !important;
    font-size: 20px !important;
    font-weight: 400 !important;
}

@media (max-width: 1150px) {
    .filtros :deep(.v-field),
    .filtros :deep(.v-field-label),
    .filtros :deep(.v-field__append-inner) {
        font-size: 15px !important;
        height: 38px !important;
    }

    .filtros :deep(.v-field.v-field--focused .v-field-label),
    .filtros :deep(.v-field.v-field--dirty .v-field-label) {
        display: none !important;
    }

    .filtros :deep(.v-field__clearable) {
        position: relative !important;
        bottom: 9px !important;
        font-size: 12px !important;
    }

    .filtros :deep(.v-field__input) {
        position: relative !important;
        bottom: 18px !important;
        font-size: 15px !important;
    }
}

.filtros :deep(.v-field.v-field--focused .v-field-label),
.filtros :deep(.v-field.v-field--dirty .v-field-label) {
    font-size: 12px !important;
}

.filtros :deep(.v-field) {
    background-color: #dbdbdbc0 !important;
    backdrop-filter: blur(20%);
    border-radius: 7px;
    box-shadow: none !important;
}

.filtros :deep(.v-field__outline) {
    border-radius: 7px;
}

/* Cambiar color del label flotante - Filtros Categorias */
.filtros-categorias :deep(.v-field),
.filtros-categorias :deep(.v-field-label) {
    color: #000000 !important;
    font-size: 20px !important;
    font-weight: 400 !important;
}

.filtros-categorias :deep(.v-field.v-field--focused .v-field-label),
.filtros-categorias :deep(.v-field.v-field--dirty .v-field-label) {
  font-size: 12px !important;
}

.filtros-categorias :deep(.v-field) {
    background-color: #FFFFFF !important;
    border: 1px solid #000000 !important;
    border-radius: 7px;
    box-shadow: none !important;
}

.filtros-categorias :deep(.v-field__outline) {
    border-radius: 7px;
}
</style>

<style scoped>
/* Cambiar color del label flotante - Filtros Home */
.filtros :deep(.v-field),
.filtros :deep(.v-field-label) {
    color: #000000 !important;
    font-size: 20px !important;
    font-weight: 400 !important;
}

@media (max-width: 1150px) {
    .filtros :deep(.v-field),
    .filtros :deep(.v-field-label),
    .filtros :deep(.v-field__append-inner) {
        font-size: 15px !important;
        height: 38px !important;
    }

    .filtros :deep(.v-field.v-field--focused .v-field-label),
    .filtros :deep(.v-field.v-field--dirty .v-field-label) {
        display: none !important;
    }

    .filtros :deep(.v-field__clearable) {
        position: relative !important;
        bottom: 9px !important;
        font-size: 12px !important;
    }

    .filtros :deep(.v-field__input) {
        position: relative !important;
        bottom: 18px !important;
        font-size: 15px !important;
    }
}

.filtros :deep(.v-field.v-field--focused .v-field-label),
.filtros :deep(.v-field.v-field--dirty .v-field-label) {
    font-size: 12px !important;
}

.filtros :deep(.v-field) {
    background-color: #dbdbdbc0 !important;
    backdrop-filter: blur(20%);
    border-radius: 7px;
    box-shadow: none !important;
}

.filtros :deep(.v-field__outline) {
    border-radius: 7px;
}

/* Cambiar color del label flotante - Filtros Categorias */
.filtros-categorias :deep(.v-field),
.filtros-categorias :deep(.v-field-label) {
    color: #000000 !important;
    font-size: 20px !important;
    font-weight: 400 !important;
}

.filtros-categorias :deep(.v-field.v-field--focused .v-field-label),
.filtros-categorias :deep(.v-field.v-field--dirty .v-field-label) {
  font-size: 12px !important;
}

.filtros-categorias :deep(.v-field) {
    background-color: #FFFFFF !important;
    border: 1px solid #000000 !important;
    border-radius: 7px;
    box-shadow: none !important;
}

.filtros-categorias :deep(.v-field__outline) {
    border-radius: 7px;
}
</style>