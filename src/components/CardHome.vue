<template> 
    <div class="!flex !justify-center">
        <!-- Tarjeta -->
        <v-card
            variant="outlined"
            class="card-home"
            :class="colorCard"
        >
            <!-- Texto de la card si no es una lista -->
            <v-card-text 
                v-if="!list"
                class="!text-center"
                :class="colorText"
            >
                <p v-html="customText"></p>
            </v-card-text>

            <!-- Texto de la card si es una lista -->
            <v-card-text 
                v-else
                :class="colorText"
            >
                <ul
                    class="!flex !flex-col !gap-[10px] !text-[16px]"
                >
                    <li>
                        <i class="mdi mdi-check-decagram !pr-[10px] !text-[#FF4338]" />{{ textOption1 }}
                    </li>
                    <li>
                        <i class="mdi mdi-check-decagram !pr-[10px] !text-[#FF4338]" />{{ textOption2 }}
                    </li>
                    <li>
                        <i class="mdi mdi-check-decagram !pr-[10px] !text-[#FF4338]" />{{ textOption3 }}
                    </li>
                    <li>
                        <i class="mdi mdi-check-decagram !pr-[10px] !text-[#FF4338]" />{{ textOption4 }}
                    </li>
                    <li>
                        <i class="mdi mdi-check-decagram !pr-[10px] !text-[#FF4338]" />{{ textOption5 }}
                    </li>
                    <li>
                        <i class="mdi mdi-check-decagram !pr-[10px] !text-[#FF4338]" />{{ textOption6 }}
                    </li>
                    <li>
                        <i class="mdi mdi-check-decagram !pr-[10px] !text-[#FF4338]" />{{ textOption7 }}
                    </li>
                </ul>
            </v-card-text>

            <!-- Boton de la card si lo tiene -->
            <div
                class="!flex !justify-center"
            >
                <ButtonGeneral 
                    v-show="haveButton"
                    :customClass="classButton"
                    :label="labelButton"
                    :variante="varianteButton"
                    @click="searchPart"
                />
            </div>

            <!-- Valoraciones si las tiene -->
            <div
                v-if="valoraciones"
                class="!flex !flex-col !items-center !gap-4 !mb-[20px] transition-all
                max-[1024px]:!px-[20px]"
            >
                <!-- Transiciones de entrada y salida -->
                <TransitionGroup
                    name="fade"
                    tag="div"
                    class="!flex !flex-col !items-center !gap-4"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                >
                    <!-- Elementos que se muestran -->
                    <div v-for="item in visibles" :key="item.id" class="list-item w-full">
                        <!-- Componente de reseñas -->
                        <ResenasGeneral :resena="item" />
                    </div>
                </TransitionGroup>

            </div>
        </v-card>
        <div class="!flex !flex-col !items-center !relative !z-999 !bottom-[60px]"> 
            <!-- Imagen personalizada si la tiene -->
            <img 
                :src="customImage"
                alt="customImage"
                class="!w-[400px] !h-[200px] !relative !top-[-50px]"
                :class="mostrarImagen"
                loading="lazy"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import ButtonGeneral from './ButtonGeneral.vue'

import ResenasGeneral from '../components/ResenasGeneral.vue'

// Propiedades que se le comparten al componente
const props = defineProps({
    customImage: {
        type: String,
    },
    customText: {
        type: String,
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et erat eget enim'
    },
    textOption1: {
        type: String
    },
    textOption2: {
        type: String
    },
    textOption3: {
        type: String
    },
    textOption4: {
        type: String
    },
    textOption5: {
        type: String
    },
    textOption6: {
        type: String
    },
    textOption7: {
        type: String
    },
    colorCard: {
        type: String
    },
    colorText:{
        type: String
    },
    haveButton: {
        type: Boolean,
        default: false
    },
    classButton: {
        type: String,
        default: ''
    },
    labelButton: {
        type: String,
        default: 'Botón'
    },
    varianteButton: {
        type: String,
        default: 'tonal'
    },
    mostrarImagen: {
        type: String
    },
    list: {
        type: Boolean,
        default: false
    },
    valoraciones: {
        type: Boolean,
        default: false
    }
})

// Clase personalizada para el card
const colorCard = computed(() => {
    return ['!absolute', '!px-[12px]', '!rounded-[10px]', props.colorCard, props.haveButton ? '!pb-[20px]' : '!pb-[0px]']
})

// Clase personalizada para el texto
const colorText = computed(() => {
    return ['!text-md', '!font-regular', '!font-poppins', props.colorText]
})

// Variable para el ancho de la ventana
const windowWidth = ref(window.innerWidth)

// Función para actualizar el ancho de la ventana
function updateWidth() {
  windowWidth.value = window.innerWidth
}

// Lista de nombres para las reseñas
let names = [
    { id: 1, nombre: 'Juan Camilo Restrepo' },
    { id: 2, nombre: 'Andrés Felipe Morales' },
    { id: 3, nombre: 'Santiago Jaramillo López' },
    { id: 4, nombre: 'Carlos Eduardo Patiño' },
    { id: 5, nombre: 'Mateo Ramírez Vargas' },
    { id: 6, nombre: 'Sebastián Hurtado Giraldo' },
    { id: 7, nombre: 'Alejandro Gutiérrez Silva' },
    { id: 8, nombre: 'Nicolás Herrera Castaño' },
    { id: 9, nombre: 'David Alejandro Montoya' },
    { id: 10, nombre: 'Jorge Andrés Salazar' },
    { id: 11, nombre: 'Felipe Torres Rincón' },
    { id: 12, nombre: 'Luis Fernando Arias' },
    { id: 13, nombre: 'Cristian Camilo Rodríguez' },
    { id: 14, nombre: 'Óscar Julián Cárdenas' }
]

// Lista de nombres visibles
const visibles = ref(names.slice(0, 3))
let nextIndex = 3

let intervalId

// Función para iniciar el intervalo de reseñas
onMounted(() => {
  window.addEventListener('resize', updateWidth)

  intervalId = setInterval(() => {
    const siguiente = names[nextIndex % names.length]
    visibles.value = [...visibles.value.slice(1), siguiente]
    nextIndex++
    }, 9000)
})

// Función para detener el intervalo de reseñas
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
  clearInterval(intervalId)
})

// Función para buscar la parte
function searchPart() {
    const section = document.getElementById('buscar-auto-parte')
    if (section) {
        const rect = section.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop

        let valorDivision = window.innerHeight

        const target = rect.top + scrollTop - (valorDivision) + (rect.height / 2)

        window.scrollTo({
        top: target,
        behavior: 'smooth'
        })
    }
}

// Función para realizar el efecto de entrada - BEFORE
function beforeEnter(el) {
  el.style.opacity = '0'
  el.style.maxHeight = '0px'
  el.style.overflow = 'hidden'
}

// Función para realizar el efecto de entrada - ENTER
function enter(el, done) {
  const height = el.scrollHeight + 'px'
  el.style.transition = 'max-height 1.2s ease, opacity 1.2s ease, margin 1.2s ease, padding 1.2s ease'
  requestAnimationFrame(() => {
    el.style.maxHeight = height
    el.style.opacity = '1'
  })
  setTimeout(() => {
    el.style.maxHeight = ''
    el.style.transition = ''
    el.style.overflow = ''
    done()
  }, 600)
}

// Función para realizar el efecto de entrada - AFTER
function afterEnter(el) {
  el.style.maxHeight = ''
  el.style.overflow = ''
  el.style.transition = ''
}

// Función para realizar el efecto de salida - BEFORE
function beforeLeave(el) {
  el.style.maxHeight = el.scrollHeight + 'px'
  el.style.overflow = 'hidden'
  el.style.opacity = '1'
}

// Función para realizar el efecto de salida - LEAVE
function leave(el, done) {
  el.style.transition = 'max-height 1.2s ease, opacity 1.2s ease, margin 1.2s ease, padding 1.2s ease'
  requestAnimationFrame(() => {
    el.style.maxHeight = '0px'
    el.style.opacity = '0'
    el.style.marginTop = '0px'
    el.style.marginBottom = '0px'
    el.style.paddingTop = '0px'
    el.style.paddingBottom = '0px'
  })
  setTimeout(() => {
    done()
    el.style.transition = ''
  }, 600)
}

// Función para realizar el efecto de salida - AFTER
function afterLeave(el) {
  el.style.transition = ''
  el.style.maxHeight = ''
  el.style.overflow = ''
}
</script>

<style scoped>
/* Estilos personalizados para el card */
.v-card--variant-outlined {
    border: 2px solid currentColor;
}

.list-item {
  overflow: hidden;
  display: block;
}

/* Transiciones del transition group */
.fade-move {
  transition: transform 1.2s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

</style>
