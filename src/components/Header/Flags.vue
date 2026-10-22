<template>
  <v-select
    v-model="selected"
    :items="countries"
    item-title="name"
    item-value="code"
    variant="solo"
    density="comfortable"
    hide-details
    :readonly="readonlyBool"
    :menu-props="{
      offsetY: true,
      maxHeight: 200,
      closeOnContentClick: false,
      contentClass: 'custom-select-menu'
    }"
    class="circular-select"
  >
    <!-- País seleccionado -->
    <template #selection="{ item }">
      <div
        class="flex items-center gap-[clamp(.35rem,.8vw,.65rem)]
               transition-transform duration-300
               hover:scale-[1.08]"
      >
        <img
          :src="item.raw.flag"
          alt="flag"
          class="flag-icon transition-all duration-300"
          :class="[
            { 'opacity-50 scale-110': isChanging },
            item.raw.code === 'EN'
              ? 'flag-us-icon'
              : 'flag-other'
          ]"
        />
      </div>
    </template>

    <!-- Lista -->
    <template #item="{ item, props }">
      <v-list-item
        :active="props.active"
        :value="props.value"
        @click="props.onClick"
        class="!bg-[#ffffffb7]
               !shadow-xl
               !backdrop-blur-lg
               !border-none"
      >
        <div
          class="flex items-center
                 gap-[clamp(.5rem,1vw,.85rem)]"
        >
          <img
            :src="item.raw.flag"
            alt="flag"
            class="flag-icon"
            :class="item.raw.code === 'EN'
              ? 'flag-us'
              : 'flag-other'"
          />

          <span
            class="!font-poppins
                   !font-semibold
                   !text-black
                   !text-[clamp(.78rem,.9vw,.9rem)]"
            :class="item.raw.code === 'EN'
              ? 'text-us'
              : 'text-other'"
          >
            {{ item.raw.name }}
          </span>
        </div>
      </v-list-item>
    </template>
  </v-select>
</template>

<script setup>
import ColombiaFlag from '../../assets/icons/flags/colombia.svg?w=1920&format=webp&quality=80';
import CostRicaFlag from '../../assets/icons/flags/costa-rica.svg?w=1920&format=webp&quality=80';
import EcuadorFlag from '../../assets/icons/flags/ecuador.svg?w=1920&format=webp&quality=80';

import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const isChanging = ref(false);

// Propiedades que se le comparten al componente
const props = defineProps({
    countriesFlags:{
        type: Array,
        default: () => [
            { code: localStorage.getItem('country'), name: "Colombia", flag: ColombiaFlag },
            { code: "EC", name: "Ecuador", flag: EcuadorFlag },
            { code: "CR", name: "Costa Rica", flag: CostRicaFlag }
        ]   
    },
    type: {
      type: String,
      default: 'country'
    },
    readonlyBool: {
        type: Boolean,
        default: false
    }
})


const countries = computed(() => props.countriesFlags);

// Guardar el código de los países seleccionados
const selected = ref(countries.value[0].code);

// Cuando cambia el código de los países, se cambia el idioma
watch(selected, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (props.type === 'country') {
      
    } else if (props.type === 'language') {
      locale.value = newVal.toLowerCase();
    }
  }
});
</script>

<style>
/* ==========================
   Menú
========================== */

.custom-select-menu{
    display:flex !important;
    flex-direction:row !important;
}

.custom-select-menu .v-list{
    padding:0 !important;
    border-radius:12px;
    background:transparent !important;
    box-shadow:none !important;
    backdrop-filter:none !important;
}

.custom-select-menu .v-list-item{
    background:#ffffffb7;
    border-radius:12px;
    backdrop-filter:blur(4px);
    box-shadow:0 4px 12px rgba(0,0,0,.25);

    font-family:'Poppins',sans-serif;
    font-size:clamp(.78rem,.9vw,.9rem);
    color:#000;

    transition:.25s;
}

.custom-select-menu .v-list-item:hover span{
    color:#FF4338 !important;
}

.custom-select-menu .v-list-item--active span{
    color:#0080BB !important;
}

/* ==========================
   Animaciones
========================== */

.fade-scale-enter-active,
.fade-scale-leave-active{
    transition:
        opacity .25s ease,
        transform .25s ease;
}

.fade-scale-enter-from{
    opacity:0;
    transform:scale(.88);
}

.fade-scale-leave-to{
    opacity:0;
    transform:scale(1.08);
}

.flag-icon{
    transition:
        transform .3s ease,
        opacity .3s ease;
}
</style>

<style scoped>
:deep(.v-field__input),
:deep(.v-field__field),
:deep(.v-input__control){

    width:clamp(60px,7vw,100px)!important;

}

.flag-icon{

    border-radius:50%;
    object-fit:cover;

}

.circular-select :deep(.v-field){

    background:transparent !important;
    border-radius:50% !important;
    padding:0 !important;
    box-shadow:none !important;

}

.circular-select :deep(.v-field .v-field__append-inner){

    display:none !important;

}

/* ==========================
   Flags
========================== */

.flag-us{

    width:clamp(34px,3vw,50px);

    position:relative;

    left:clamp(-2px,-.25vw,-4px);

}

.flag-us-icon{

    width:clamp(34px,3vw,50px);

    position:relative;

    right:clamp(2px,.25vw,5px);

}

.flag-other{

    width:clamp(28px,2.4vw,40px);

}

.text-us{

    position:relative;

    left:clamp(-5px,-.6vw,-10px);

}
</style>
