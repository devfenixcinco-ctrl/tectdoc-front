<template> 
    <!-- Select Number para los productos -->
    <v-number-input 
        class="!h-[34px] text-base text-center !rounded-[5px]
        2xl:!w-[155px]
        xl:!w-[125px]
        md:!w-[250px]
        max-sm:!w-[250px]" 
        :class="oscuro"
        :reverse="false" 
        :min="1" 
        :model-value="1"
        :label="null" 
        controlVariant="split" 
        :hideInput="false" 
        inset 
        variant="outlined" >
    </v-number-input>
</template>

<script setup>
import { computed } from 'vue'

// Propiedades del componente
const props = defineProps({
    oscuro: {
        type: Boolean,
        default: false
    }
})

// Computed para cambiar el color del input segun la prop oscuro
const oscuro = computed(() => {
    if (props.oscuro === true) {
        return 'input-number-dark'
    } else {
        return 'input-number'
    }
})

</script>

<style>
/* Estilos para el input de los productos */
.input-number-dark {
  background: #D9D9D9 !important;
}

.input-number {
  background: #FFFFFF !important;
}
</style>

<style scoped>
/* Estilos para el input de los productos */
::v-deep(.v-input__control),
::v-deep(.v-field__field),
::v-deep(.v-field__prepend-inner),
::v-deep(.v-field__append-inner) {
  height: 35px !important;
}

::v-deep(.v-input__control),
::v-deep(.v-field__field),
::v-deep(.v-field__prepend-inner),
::v-deep(.v-field__append-inner) {
  height: 35px !important;
}

::v-deep(.v-field__input) {
  padding-top: 0px !important;
  padding-bottom: 20px !important;
  
}

::v-deep(.v-field.v-field--active) {
  box-shadow: none !important;
  border-color: transparent !important;
}

::v-deep(.v-btn--disabled.v-btn--variant-elevated .v-btn__overlay) {
  opacity: 0 !important;
}
</style>
