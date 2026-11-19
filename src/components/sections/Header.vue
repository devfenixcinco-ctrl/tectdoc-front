<template>
    <header
        class="!flex !flex-col !items-center !justify-center !gap-[0px] !pt-[20px] !z-[3] !relative"
    >
        <div
            class="
                flex
                items-center
                w-[min(96%,1800px)]
                min-h-[clamp(35px,5vw,55px)]
                px-[clamp(1rem,2vw,2rem)]
                rounded-[clamp(.8rem,1vw,1rem)]
                backdrop-blur-0
            "
            :class="oscuro
                ? '!bg-black/35'
                : '!bg-white/35'"
        >
            <!-- Logo de fenix -->
            <img 
                :src="LogoAMostrar" 
                alt="logo" 
                :class="[
                    'logo-base',
                    isEntering ? 'logo-entrando' : 'logo-saliendo'
                ]"
                class="
                cursor-pointer
                w-[clamp(70px,6vw,100px)]
                shrink-0
                "
                loading="lazy"
                @click="router.push('/')"
            />

            <div
                class="
                    flex
                    flex-1
                    items-center
                    justify-center
                    min-w-0
                    max-[1024px]:hidden
                "
            >
                <!-- Banderas de países - Cambio de Pais -->
                <Flags 
                    v-model="country"
                    class="
                    ml-[clamp(.5rem,1vw,1.2rem)]
                    shrink-0
                    max-[1024px]:!hidden
                    "
                    :countriesFlags="countriesFlags"
                    type="country"
                />

                <!-- Campo de búsqueda -->
                <Search
                    v-model="searchQuery"
                    customClassContainer="
                    !w-full
                    max-[1024px]:!hidden"
                    customClassField="
                    !w-full
                    max-[1024px]:!hidden"
                    customClassSelect="max-[1024px]:!hidden"
                    :labelSelect="$t('header.select_search')"
                    :labelSearch="translateSearchLabel"
                    :items="critersSelect"
                    :oscuro="oscuro"
                    @update:selectedCriter="searchinQuery"
                />

                <!-- Boton de navegación - Catálogo de Autopartes -->
                <ButtonsHeader
                    customClass="
                    ml-[clamp(.7rem,1vw,1rem)]
                    shrink-0
                    max-[1024px]:!hidden
                    "
                    customClassIcon="2xl:!pr-[8px] 2xl:!w-[30px]
                    xl:!w-[22px] xl:!pr-[5px]
                    md:!w-[19px] md:!pr-[3px]
                    max-[1024px]:!hidden
                    max-sm:!hidden"
                    :label="$t('header.button_parts')"
                    :icon_img="Catalogo"
                    @click="router.push('/catalogo')"
                />

                <!-- Boton de navegación - Proveedores -->
                <ButtonsHeader
                    customClass="
                    ml-[clamp(.7rem,1vw,1rem)]
                    shrink-0
                    max-[1024px]:!hidden
                    "
                    customClassIcon="2xl:!pr-[8px] 2xl:!w-[30px] 
                    xl:!w-[22px] xl:!pr-[5px]
                    md:!w-[19px] md:!pr-[3px]
                    max-[1024px]:!hidden
                    max-sm:!hidden"
                    :label="$t('header.button_providers')"
                    :icon_img="Catalogo"
                />
                <!-- Banderas de países - Cambio de Idioma -->
                <Flags 
                    class="
                    ml-[clamp(.5rem,.8vw,.8rem)]
                    shrink-0
                    "
                    :countriesFlags="countriesFlagsLanguage"
                    type="language"
                />
            </div>

            <div
                class="
                    hidden
                    max-[1024px]:flex
                    items-center
                    ml-auto
                    gap-[clamp(.1rem,1vw,.4rem)]
                "
            >
                <!-- Banderas de países - Cambio de Idioma -->
                <Flags 
                    class="
                    ml-[clamp(.5rem,.8vw,.8rem)]
                    shrink-0
                    "
                    :countriesFlags="countriesFlagsLanguage"
                    type="language"
                />
                <!-- Hamburger Menu para MOBILE -->
                <img 
                    :src="Hamburger" 
                    alt="hamburger" 
                    class="
                        hidden
                        max-[1024px]:block
                        w-[clamp(26px,3vw,30px)]
                        shrink-0
                        cursor-pointer
                    "
                    loading="lazy"
                    @click="menu = !menu"
                />
            </div>

            <!-- Boton de navegación - Carrito de compra -->
            <!-- <ButtonsHeader
                customClass="!bg-opacity-50
                2xl:!min-w-[45px] 2xl:!min-h-[45px] 2xl:!rounded-[200px] 2xl:!absolute 2xl:!right-[40px] 2xl:!p-[0px]
                xl:!min-w-[38px] xl:!min-h-[38px] xl:!rounded-[200px] xl:!absolute xl:!right-[30px] xl:!p-[0px]
                md:!min-w-[35px] md:!min-h-[29px] md:!rounded-[500px] md:!absolute md:!right-[30px] md:!p-[0px]
                max-[1024px]:!hidden
                max-sm:!hidden"
                customClassIcon="2xl:!w-[19px]
                xl:!w-[16px]
                md:!w-[14px]
                max-sm:!hidden"
                :icon_img="Cart"
            /> -->

        </div>
    </header>

    <!-- Navigation Drawer Menu - MOBILE -->
    <v-navigation-drawer
        v-model="menu"
        temporary
        location="end"
        scrim
        class="!bg-[#C7C7C7] !bg-opacity-80 !backdrop-blur-[5px]
        2xl:!hidden
        xl:!hidden
        max-[1024px]:!w-[500px] max-[1024px]:!h-[100vh] max-[1024px]:!rounded-[12px, 0, 0, 12px] max-[1024px]:!right-0 max-[1024px]:!top-0
        min-[400px]:!w-[250px] min-[400px]:!h-[100vh] min-[400px]:!rounded-[12px, 0, 0, 12px] min-[400px]:!right-0 min-[400px]:!top-0
        min-[350px]:!w-[250px] min-[350px]:!h-[100vh] min-[350px]:!rounded-[12px, 0, 0, 12px] min-[350px]:!right-0 min-[350px]:!top-0
        min-[200px]:!w-[240px] min-[200px]:!h-[100vh] min-[200px]:!rounded-[12px, 0, 0, 12px] min-[200px]:!right-0 min-[200px]:!top-0"
    >
        <template v-slot:default>
            <div class="!flex !justify-end !pr-[5px] !pt-[8px]">
                <v-btn icon="mdi-close" variant="text" @click="menu = false"></v-btn>
            </div>

            <v-list>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :title="item.title"
                :prepend-icon="item.icon"
                :to="item.route"
                link
                @click="menu = false"
            />
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()    

import { useRouter } from 'vue-router'
const router = useRouter()

import Logo from '../../assets/icons/logo.svg';
import LogoNextMobi from '../../assets/images/next_mobi_2.png?w=400&format=webp&quality=80';
import Hamburger from '../../assets/icons/hamburger.svg';

import Flags from '../Header/Flags.vue';
import ColombiaFlag from '../../assets/icons/flags/colombia.svg?w=100&format=webp&quality=80';
import EcuadorFlag from '../../assets/icons/flags/ecuador.svg?w=100&format=webp&quality=80';
import CostaRicaFlag from '../../assets/icons/flags/costa-rica.svg?w=100&format=webp&quality=80';
import MexicoFlag from '../../assets/icons/flags/mexico.svg?w=100&format=webp&quality=80';
import SpainFlag from '../../assets/icons/flags/spain.svg?w=100&format=webp&quality=80';
import USAFlag from '../../assets/icons/flags/usa.svg?w=100&format=webp&quality=80';

import Search from '../Header/Search.vue';

import ButtonsHeader from '../Header/ButtonsHeaders.vue';
import Catalogo from '../../assets/icons/header-icon.svg';
import Cart from '../../assets/icons/header-cart.svg';

// Variable reactiva para el menú lateral
const menu = ref(false)

// Variable reactiva para el logo de Mostrar
const LogoAMostrar = ref(LogoNextMobi)

// Items para el menu lateral
const items = [
    { title: 'Home', icon: 'mdi-home', route: { name: 'home' } },
    { title: 'Cátalogo de autopartes', icon: 'mdi-file-document-outline', route: { name: 'catalogo' } }
]

// Lista de criterios de búsqueda
const critersSelect = computed(() => [
    { value: 'group', title: t('header.search_label_group') },
    { value: 'number', title: t('header.search_label_number') },
    { value: 'name', title: t('header.search_label_name') }
])

// Variable reactiva para el grupo de la búsqueda
const group = ref(null)

// Cuando cambia el grupo, se cierra el menú
watch(group, () => {
    menu.value = false
})

// Variable reactiva para el valor de la búsqueda
const translateSearchLabel = computed(() => {
    switch (criteria.value) {
        case 'group':
            return t("header.search_label_group")
        case 'number':
            return t("header.search_label_number")
        case 'name':
            return t("header.search_label_name")
        default:
            return t("header.search_label_name")
    }
})

// Propiedades que se le comparten al componente
const props = defineProps({
    oscuro: {
        type: Boolean
    },
    mobileMostrar: {
        type: Boolean,
        default: true
    }
})

// Lista de países para cambio de pais
const countriesFlags = [
    { code: "CO", name: "Colombia", flag: ColombiaFlag },
    { code: "EC", name: "Ecuador", flag: EcuadorFlag },
    { code: "CR", name: "Costa Rica", flag: CostaRicaFlag },
    { code: "MX", name: "Mexico", flag: MexicoFlag }
];

// Lista de países para cambio de idioma
const countriesFlagsLanguage = [
    { code: "ES", name: "Español", flag: SpainFlag },
    { code: "EN", name: "Ingles", flag: USAFlag }
];

const isEntering = ref(true)

// Variable reactiva para el valor de la búsqueda
const searchQuery = ref('')

const criteria = ref("Nombre de articulo")

// Funcion para guardar el valor de la búsqueda
function searchinQuery(value) {
    criteria.value = value
}

const country = ref(localStorage.getItem('country') || 'CO')

if (!localStorage.getItem('country')) {
    localStorage.setItem('country', country.value)
}

watch(country, (newValue, oldValue) => {
    localStorage.setItem('country', newValue)
    window.location.reload()
})

// Función para obtener las marcas desde la API al montar el componente
onMounted(() => {
    setInterval(() => {
        // primero sale
        isEntering.value = false

        setTimeout(() => {
            LogoAMostrar.value =
                LogoAMostrar.value === LogoNextMobi
                    ? Logo
                    : LogoNextMobi

            // luego entra
            isEntering.value = true
        }, 400)
    }, 2700)
})

</script>

<style>
.logo-base {
    transition: opacity 0.4s ease, transform 0.4s ease;
}

.logo-saliendo {
    opacity: 0;
    transform: scale(0.95);
}

.logo-entrando {
    opacity: 1;
    transform: scale(1);
}
</style>