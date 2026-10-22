<template>
  <!-- Seccion de buscar auto parte -->
  <section
    id="buscar-auto-parte"
  >
    <!-- Imagen de fondo -->
    <div 
      class="
        relative

        bg-cover
        bg-no-repeat
        bg-center

        min-h-[clamp(90vh,100vw,80vh)]

        max-[1024px]:h-[750px]
        max-sm:bg-[position:68%_100%]
        max-sm:min-h-screen
      "
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <!-- Header -->
      <Header 
        :mobileMostrar="false"
      />

      <!-- Contenedor de título -->
      <div
        class="
          flex
          flex-row

          px-[clamp(2rem,10vw,17.8125rem)]
          pt-[clamp(2.5rem,5vw,6.25rem)]
          pb-[clamp(1.25rem,2vw,1.875rem)]
        "
      >
        <!-- Título -->
        <h1
          class="
            font-poppins
            font-bold
            uppercase
            whitespace-pre-line
            text-white

            text-[clamp(1.875rem,2.8vw,2.8125rem)]
            leading-[1.1]
          "
        >
          {{ $t('home.initial-text') }}
        </h1>
      </div>

      <!-- Contenedor de filtros y tarjetas de busqueda -->
      <div
        class="!flex !flex-col !items-center !justify-center
        2xl:!gap-[50px]
        xl:!gap-[40px]
        md:!gap-[30px]"
      >
        <div
          class="
          w-[min(90%,1400px)]
          flex
          flex-col
          items-center
          justify-center
          z-10

          pt-[clamp(1rem,2vw,1.25rem)]
          px-[clamp(1rem,2vw,2rem)]
          pb-[clamp(1rem,2vw,1.5rem)]

          bg-white/30
          backdrop-blur-sm
          rounded-[clamp(.75rem,1vw,1rem)]
          "
        >
          <v-btn-toggle
            v-model="typeVehicle"
            color="#FF4338"
            rounded="10"
            group
            class="!bg-transparent"
          >
            <v-btn value="V">
              Automóvil
            </v-btn>

            <v-btn value="O">
              Vehículos comerciales pesados
            </v-btn>

            <v-btn value="L">
              Vehículos comerciales ligeros
            </v-btn>

            <v-btn value="B">
              Motocicletas
            </v-btn>
          </v-btn-toggle>
          <!-- Contenedor de filtros -->
          <div
            data-filtros-container
            class="
              flex
              flex-wrap
              items-center
              justify-center

              w-full

              min-h-[clamp(70px,8vw,100px)]

              px-[clamp(1rem,4vw,5rem)]

              py-[clamp(.5rem,1vw,1rem)]

              gap-[clamp(1rem,3vw,3.5rem)]

              relative
              z-10

              max-sm:flex-col
            "
          >
            <!-- Filtro de marca -->
            <SelectFiltros 
              ref="brandSelect"
              v-model="brand"
              customClass="
              !w-[clamp(90px,8vw,120px)]
              !h-[clamp(40px,4vw,58px)]

              max-sm:!w-[90%]
              "
              :outlinedBorder="false"
              :label="$t('filters.brand')"
              :itemsSelect="brandsArray"
              @update:modelValue="activateModel"
            />
  
            <!-- Filtro de modelo -->
            <SelectFiltros 
              v-model="model"
              customClass="
              !w-[clamp(90px,8vw,120px)]
              !h-[clamp(40px,4vw,58px)]

              max-sm:!w-[90%]
              "
              :outlinedBorder="false"
              :label="$t('filters.model')"
              :itemsSelect="modelsArray"
              @update:modelValue="activateSpecificVehicle"
              :disabled="disabledModel"
            />
  
            <!-- Filtro de vehiculo especifico -->
            <SelectFiltros 
              v-model="modelSpecific"
              customClass="
              !w-[clamp(90px,8vw,120px)]
              !h-[clamp(40px,4vw,58px)]

              max-sm:!w-[90%]
              "
              :outlinedBorder="false"
              :label="$t('filters.model-specific')"
              :itemsSelect="modelsSpecificArray"
              @update:modelValue="navigate"
              :disabled="disabled"
            />
  
            <!-- Filtro de producto -->
            <SelectFiltros 
              ref="fabriSelect"
              v-model = "fabriProduct"
              customClass="
              !w-[clamp(90px,8vw,120px)]
              !h-[clamp(40px,4vw,58px)]

              max-sm:!w-[90%]
              "
              :outlinedBorder="false"
              :label="$t('filters.product')"
              :itemsSelect="fabricantes"
            />
  
            <!-- Filtro de grupo -->
            <SelectFiltros 
              ref="groupSelect"
              v-model="group"
              customClass="
              !w-[clamp(90px,8vw,120px)]
              !h-[clamp(40px,4vw,58px)]

              max-sm:!w-[90%]
              "
              :outlinedBorder="false"
              :label="$t('filters.group')"
              :itemsSelect="assemblyGroups"
              itemText="group"
              itemValue="idGroup"
            />
          </div>
        </div>

        <!-- Contenedor de tarjetas de busqueda -->
        <!-- <div
          class="!flex !items-center !justify-center !relative !z-[10]
          2xl:!gap-[70px] 2xl:!flex-row
          xl:!gap-[70px] xl:!mb-[160px] xl:!flex-row
          md:!gap-[20px] md:!mb-[100px] md:!flex-row
          max-sm:!pt-[60px] max-sm:!pb-[150px] max-sm:!gap-[40px] max-sm:!flex-col" 
        >
          Tarjeta de busqueda por nombre de auto parte
          <CardSearch 
            :customText="$t('search-card.text-name')"
            customClassSearch="2xl:!w-[300px] xl:!w-[270px] md:!w-[240px] max-sm:!w-[200px]"
            :searchLabel="$t('search-card.label-name')"
          />

          Tarjeta de busqueda por VIN
          <CardSearch 
            :customText="$t('search-card.text-vin')"
            customClassSearch="2xl:!w-[300px] xl:!w-[270px] md:!w-[240px] max-sm:!w-[200px]"
            :searchLabel="$t('search-card.label-vin')"
          />
        </div> -->

      </div>
      
      <!-- Imagen formas decorativas -->
      <img 
        :src="Formas" 
        alt="Formas"
        loading="lazy"
        class="
          absolute

          left-0

          -bottom-[clamp(2rem,8vw,12rem)]

          w-[clamp(160px,calc(120px+10vw),330px)]

          z-[2]
        "
      >
    </div>
  </section>

  <!-- Navegacion lateral -->
  <div
    class="
      fixed
      z-50

      hidden
      lg:flex

      flex-col

      right-[clamp(1rem,4vw,4rem)]
      top-[clamp(10rem,18vh,16rem)]

      gap-[clamp(.8rem,1.5vw,1.25rem)]
    "
  >
    <!-- Boton de navegacion - Buscar auto parte -->
    <ButtonsNav      
      :customClassButton="activeSection === 'why-fenix' || activeSection === 'oportunities'
        ? '!bg-black !text-white !w-[clamp(95px,6vw,120px)] !h-[clamp(95px,6vw,120px)]'
        : '!bg-white !text-black !w-[clamp(95px,6vw,120px)] !h-[clamp(95px,6vw,120px)]'"
      :customClassIcon="activeSection === 'why-fenix' || activeSection === 'oportunities'
        ? '!fill-white !text-white !w-[clamp(2rem,3vw,3.25rem)] !h-[clamp(2rem,3vw,3.25rem)]'
        : '!fill-black !text-black !w-[clamp(2rem,3vw,3.25rem)] !h-[clamp(2rem,3vw,3.25rem)]'"
      :label="$t('home.nav.search-auto-part')"
      :active="activeSection === 'buscar-auto-parte'"
      :icon_img="BuscarAutoparte"
      @click="scrollToSection('buscar-auto-parte')"
    />

    <!-- Boton de navegacion - Porque Fenix -->
    <ButtonsNav
      :customClassButton="activeSection === 'why-fenix' || activeSection === 'oportunities'
        ? '!bg-black !text-white !w-[clamp(95px,6vw,120px)] !h-[clamp(95px,6vw,120px)]'
        : '!bg-white !text-black !w-[clamp(95px,6vw,120px)] !h-[clamp(95px,6vw,120px)]'"
      :customClassIcon="activeSection === 'why-fenix' || activeSection === 'oportunities'
        ? '!fill-white !text-white !w-[clamp(2rem,3vw,3.25rem)] !h-[clamp(2rem,3vw,3.25rem)]'
        : '!fill-black !text-black !w-[clamp(2rem,3vw,3.25rem)] !h-[clamp(2rem,3vw,3.25rem)]'"
      :label="$t('home.nav.why-fenix')"
      :active="activeSection === 'why-fenix'"
      :colorBlack="activeSection === 'why-fenix' ? true : false"
      :icon_img="WhyFenix"
      @click="scrollToSection('why-fenix')"
    />

    <!-- Boton de navegacion - Oportunidades de venta -->
    <ButtonsNav
      :customClassButton="activeSection === 'why-fenix' || activeSection === 'oportunities'
        ? '!bg-black !text-white !w-[clamp(95px,6vw,120px)] !h-[clamp(95px,6vw,120px)]'
        : '!bg-white !text-black !w-[clamp(95px,6vw,120px)] !h-[clamp(95px,6vw,120px)]'"
      :customClassIcon="activeSection === 'why-fenix' || activeSection === 'oportunities'
        ? '!fill-white !text-white !w-[clamp(2rem,3vw,3.25rem)] !h-[clamp(2rem,3vw,3.25rem)]'
        : '!fill-black !text-black !w-[clamp(2rem,3vw,3.25rem)] !h-[clamp(2rem,3vw,3.25rem)]'"
      :label="$t('home.nav.sell-oportunities')"
      :active="activeSection === 'oportunities'"
      :colorBlack="activeSection === 'oportunities' ? true : false"
      :icon_img="Oportunidades"
      @click="scrollToSection('oportunities')"
    />
  </div>

  <!-- Slider de logos -->
  <SliderHome />
  
  <!-- Seccion de porque Fenix -->
  <section
    id="why-fenix"
  >
    <div 
      class="!bg-[#FFFFFF] !relative !z-[10]"
    >
      <!-- Contenedor de titulo y subtítulo -->
      <div
        class="!flex !flex-col !items-center !justify-center !gap-[10px]
        2xl:!pt-[80px] 2xl:!pb-[40px]
        xl:!pt-[35px]
        md:!pt-[30px]
        max-sm:!pt-[30px]"
      >
        <!-- Subtitulo -->
        <h2
          class="!font-poppins !text-[#000000] !text-[16px] !font-regular !normal-case"
        >
          {{ $t('home.spare-parts') }}
        </h2>

        <!-- Titulo -->
        <h1
          class="!font-poppins !text-[#000000] !text-[30px] !font-bold !uppercase
          max-sm:!text-[20px]"
        >
          {{ $t('home.why-fenix') }}
        </h1>
      </div>

      <!-- Contenedor de tarjetas -->
      <div
        class="!flex !justify-center 
        2xl:!gap-[220px] 2xl:!mt-[180px] 2xl:!mb-[350px] 2xl:!flex-row
        xl:!gap-[180px] xl:!mt-[100px] xl:!mb-[300px] xl:!flex-row
        max-[1024px]:!gap-[120px] max-[1024px]:!mt-[120px] max-[1024px]:!mb-[330px] max-[1024px]:!flex-row
        max-[820px]:!gap-[700px] max-[820px]:!mt-[70px] max-[820px]:!mb-[-400px] max-[820px]:!flex-col
        max-[500px]:!gap-[700px] max-[500px]:!mt-[50px] max-[500px]:!mb-[-400px] max-[500px]:!flex-col"
      >
        <!-- Tarjeta 1 - Lista  -->
        <Card
          colorCard="!text-[#000000]  
          2xl:!w-[350px] 2xl:!pt-[0px]
          xl:!w-[350px] xl:!pt-[0px]
          md:!w-[300px] md:!pt-[0px]
          max-[500px]:!w-[290px] max-[500px]:!pt-[0px]"
          :textOption1="$t('home.why-fenix-cards.cardText1')"
          :textOption2="$t('home.why-fenix-cards.cardText2')"
          :textOption3="$t('home.why-fenix-cards.cardText3')"
          :textOption4="$t('home.why-fenix-cards.cardText4')"
          :textOption5="$t('home.why-fenix-cards.cardText5')"
          :textOption6="$t('home.why-fenix-cards.cardText6')"
          :textOption7="$t('home.why-fenix-cards.cardText7')"
          :haveButton="true"
          varianteButton="outlined"
          classButton="!font-poppins !font-normal !text-md !w-[300px]
          !h-[35px] !rounded-[8px] !normal-case !text-[#FF4338]"
          mostrarImagen="!hidden"
          :list="true"
          :labelButton="$t('buttons.why-fenix')"
        />

        <!-- Tarjeta 2 - Imagen -->
        <Card 
          :customText="$t('home.why-fenix-cards.card2')"
          colorCard="!text-[#000000]  
          2xl:!w-[350px] 2xl:!pt-[100px]
          xl:!w-[350px] xl:!pt-[100px]
          md:!w-[300px] md:!pt-[100px]
          max-[500px]:!w-[290px] max-[500px]:!pt-[100px]"
          :customImage="$i18n.locale === 'es' ? TacometroEspañol : TacometroIngles"
        />

        <!-- Tarjeta 3 - Valoraciones -->
        <Card 
          colorCard="!text-[#000000]  
          2xl:!w-[350px] 2xl:!pt-[0px]
          xl:!w-[350px] xl:!pt-[0px]
          md:!w-[300px] md:!pt-[0px]
          max-[820px]:!relative max-[820px]:!top-[-580px]
          max-[500px]:!w-[290px] max-[500px]:!pt-[0px]"
          :customText="$t('home.why-fenix-cards.card3')"
          :valoraciones="true"
          mostrarImagen="!hidden"
        />
      </div>
    </div>
  </section>

  <!-- Seccion intermedia -->
  <section
    id="intermadiate-section"
  >
    <!-- Imagen de fondo -->
    <div
      class="!bg-cover !bg-no-repeat !bg-center !z-[10] !relative
      2xl:!min-h-[50vh]
      xl:!min-h-[50vh]
      max-[1024px]:!min-h-[35vh]
      max-sm:!min-h-[40vh]"
      :style="{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${bgImage2})`
      }"
    >
      <!-- Contenedor de contenido -->
      <div
        class="!flex !flex-row !justify-center !items-center
        2xl:!gap-[100px] 2xl:!py-[80px]
        xl:!gap-[0px] xl:!py-[80px]
        md:!gap-[70px] md:!py-[40px]
        max-sm:!py-[40px] max-sm:!flex-col"
      >
        <!-- Imagen -->
        <img 
          :src="CarHome" 
          alt="Car Image"
          class="!rounded-[20px]
          2xl:!w-[600px] 2xl:!h-[600px]
          xl:!w-[500px] xl:!h-[500px]
          md:!w-[280px] md:!h-[380px]
          max-[1024px]:!hidden
          max-[820px]:!hidden
          max-[500px]:!hidden
          max-[350px]:!hidden
          max-sm:!hidden"
        >

        <!-- Contenedor de texto -->
        <div
          class="!flex !flex-col
          max-[820px]:!justify-start max-[820px]:!items-center
          max-sm:!px-[20px]
          max-sm:!items-center max-sm:!justify-start max-sm:!text-center"
        >
          <!-- Contenedor de titulo -->
          <div
            class="!flex !flex-row !mt-[40px]
            max-sm:!mt-[0px]"
          >
            <!-- Titulo -->
            <h1
              class="!font-poppins !text-[#FFFFFF] !font-regular !normal-case
              2xl:!text-[50px]
              xl:!text-[50px]
              md:!text-[40px]
              max-sm:!text-[20px]"
              v-html="$t('home.intermediate-section.title')"
            >
            </h1>
          </div>

          <!-- Texto -->
          <p
            class="!font-poppins !text-[#FFFFFF] !font-regular !normal-case !mt-[20px]
            2xl:!text-[18px]
            xl:!text-[18px]
            md:!text-[16px]
            max-sm:!text-[12px]"
            v-html="$t('home.intermediate-section.subtitle')"
          >
          </p>

          <br>
          
          <!-- Lista de elementos -->
          <ul
            class="!font-poppins !text-[#FFFFFF] !flex !flex-col !gap-[10px]
            max-[820px]: !items-center max-[820px]:!text-[15px]
            max-[768px]:!text-[13px]"
          >
            <!-- Elemento 1 - Costos -->
            <li
              class="mdi mdi-list-box-outline !flex !flex-row !gap-[10px]"
              v-html="$t('home.intermediate-section.list.costs')"
            >
            </li>

            <!-- Elemento 2 - Gestión -->
            <li
              class="mdi mdi-laptop !flex !flex-row !gap-[10px]"
              v-html="$t('home.intermediate-section.list.gestion')"
            >
            </li>

            <!-- Elemento 3 - Recepción -->
            <li
              class="mdi mdi-car-hatchback !flex !flex-row !gap-[10px]"
              v-html="$t('home.intermediate-section.list.recepcion')"
            >
            </li>

            <!-- Elemento 4 - Diagnóstico -->
            <li
              class="mdi mdi-magnify !flex !flex-row !gap-[10px]"
              v-html="$t('home.intermediate-section.list.diagnostico')"
            >
            </li>

            <!-- Elemento 5 - Repuestos -->
            <li
              class="mdi mdi-cog-outline !flex !flex-row !gap-[10px]"
              v-html="$t('home.intermediate-section.list.repuestos')"
            >
            </li>

            <!-- Elemento 6 - Cotización -->
            <li
              class="mdi mdi-cash-multiple !flex !flex-row !gap-[10px]"
              v-html="$t('home.intermediate-section.list.cotizacion')"
            >
            </li>

            <!-- Elemento 7 - Seguimiento -->
            <li
              class="mdi mdi-wrench-outline !flex !flex-row !gap-[10px]"
              v-html="$t('home.intermediate-section.list.seguimiento')"
            >
            </li>

            <!-- Elemento 8 - Control -->
            <li
              class="mdi mdi-clipboard-list-outline !flex !flex-row !gap-[10px]"
              v-html="$t('home.intermediate-section.list.control')"
            >
            </li>
          </ul>

          <!-- Botones -->
          <div
            class="!flex !flex-row !gap-[50px] 
            2xl:!mt-[50px]
            xl:!mt-[50px]
            md:!mt-[35px]
            max-sm:!mt-[30px] max-sm:!flex-col max-sm:!gap-[30px] max-sm:!items-center"
          >
            <!-- Botón 1 -->
            <ButtonGeneral 
              variante="outlined"
              class="!font-poppins !font-normal !text-[15px] !w-[280px]
              !h-[55px] !rounded-[8px] !normal-case !text-[#FFFFFF]
              max-sm:!text-[12px] max-sm:!w-[230px] max-sm:!h-[45px]"
              :label="$t('home.button')"
            />

            <!-- Botón 2 -->
            <ButtonGeneral 
              variante="tonal"
              class="!font-poppins !font-normal !text-[15px] !w-[280px]
              !h-[55px] !rounded-[8px] !normal-case !bg-[#FF4338] !text-[#000000]
              max-sm:!text-[12px] max-sm:!w-[230px] max-sm:!h-[45px]"
              :label="$t('home.button')"
              />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion Oportunidades -->
  <section
    id="oportunities"
  >
    <!-- Contenedor de contenido -->
    <div
      class="!bg-[#FFFFFF]
      !flex !flex-col !items-center !justify-center !gap-[20px] 
      2xl:!px-[500px] 2xl:!py-[200px] 2xl:!h-[600px] 
      xl:!px-[250px] xl:!py-[200px] xl:!h-[600px] 
      md:!px-[150px] md:!py-[20px] md:!h-[550px] 
      max-sm:!px-[20px] max-sm:!py-[20px] max-sm:!h-[500px]"
    >
      <!-- Formas decorativas -->
      <img 
        :src="Formas" 
        alt="Formas"
        loading="lazy"
        class="!absolute !z-[2] scale-x-[-1]
        2xl:!top-[2582px] 2xl:!left-[1550px]
        xl:!top-[2025px] xl:!left-[995px]
        max-[1024px]:!top-[2165px] max-[1024px]:!left-[725px] max-[1024px]:!w-[300px]
        max-[820px]:!top-[3205px] max-[820px]:!left-[554px] max-[820px]:!w-[250px]
        max-[768px]:!top-[3200px] max-[768px]:!left-[520px] max-[768px]:!w-[250px]
        max-[500px]:!top-[3500px] max-[500px]:!left-[225px] max-[500px]:!w-[210px]
        max-[400px]:!top-[2760px] max-[400px]:!left-[160px] max-[400px]:!w-[200px]
        max-[350px]:!top-[2850px] max-[350px]:!left-[140px] max-[350px]:!w-[180px]"
      >

      <!-- Subtitulo -->
      <h2
        class="!font-poppins !text-[#FF4338] !text-[18px] !font-regular !normal-case
        max-sm:!text-[16px]"
      >
        ¡{{ $t('home.last-section.spare-parts') }}!
      </h2>

      <!-- Titulo -->
      <h1
        class="!font-poppins !text-[#000000] !text-[40px] !font-bold !uppercase !text-center !leading-10
        max-sm:!text-[20px] max-sm:!leading-6"
        style="white-space: pre-line;"
      >
        ¡{{ $t('home.last-section.sells') }}!
      </h1>

      <!-- Texto -->
      <p
        class="!font-poppins !text-[#000000] !text-[16px] 
        !font-regular !normal-case !text-center !relative !z-[10]
        max-sm:!text-[12px]"
        style="white-space: pre-line;"
        v-html="$t('home.last-section.text')"
      >
      </p>

      <!-- Boton -->
      <ButtonGeneral 
        variante="outlined"
        class="!font-poppins !font-normal !text-[15px] !w-[280px] !mt-[30px] !relative !z-[10]
        !h-[55px] !rounded-[8px] !normal-case !text-[#FF4338]
        max-sm:!text-[12px] max-sm:!w-[230px] max-sm:!h-[45px]"
        :label="$t('home.button')"
        @click="router.push('/products')"
      />
    </div>
  </section>

  <!-- Footer -->
  <Footer />

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import axios from 'axios';

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

import Formas from '../assets/images/formas-home.svg?w=1920&format=webp&quality=80'
import Header from '../components/sections/Header.vue'

import SelectFiltros from '../components/SelectFiltros.vue'

import CardSearch from '../components/CardSearch.vue'

import ButtonsNav from '../components/ButtonNavLateral.vue'
import BuscarAutoparte from '../assets/icons/search-autopart.svg?component'
import Oportunidades from '../assets/icons/oportunidades.svg?component'
import WhyFenix from '../assets/icons/why-fenix.svg?component'

import SliderHome from '../components/SliderHome.vue'

import Card from '../components/CardHome.vue'

import TacometroEspañol from '../assets/images/tacometro_espanol.svg?w=1920&format=webp&quality=80'
import TacometroIngles from '../assets/images/tacometro_ingles.svg?w=1920&format=webp&quality=80'

import ButtonGeneral from '../components/ButtonGeneral.vue'

import Footer from '../components/sections/Footer.vue'

import bgImage from '../assets/images/background.png?w=1920&format=webp&quality=80'
import bgImage2 from '../assets/images/background-2.svg?w=1920&format=webp&quality=80'
import CarHome from '../assets/images/car_home.png?w=1920&format=webp&quality=80'
const activeSection = ref('buscar-auto-parte')

// Función para ir al contenido de la sección
const scrollToSection = (id) => {
  const section = document.getElementById(id)
  if (section) {
    const rect = section.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    let valorDivision = id === 'why-fenix' ? window.innerHeight / 3.2 : id === 'oportunities' ? window.innerHeight / 2 : window.innerHeight

    const target = rect.top + scrollTop - (valorDivision) + (rect.height / 2)

    window.scrollTo({
      top: target,
      behavior: 'smooth'
    })
  }
}

// Variables globales y desde la ruta
const brand = ref(route.params.search || null)
const model = ref(null)
const modelSpecific = ref(null)
let disabled = ref(true)
let disabledModel = ref(true)
let typeVehicle = ref('V')
watch(typeVehicle, () => {
  brandsArray.value = []
  models.value = []
  getManufacturers();
  localStorage.setItem('typeVehicle', typeVehicle.value);
})

// Lista de marcas disponibles
let brandsArray = ref([])

// Lista de fabricantes
const fabricantes = ref([])

// Lista de grupos de articulos
const assemblyGroups = ref([])

// Variable reactiva para el grupo de la búsqueda
const group = ref(null)

// Variable reactiva para el fabricante seleccionado
const fabriProduct = ref(null)

watch(fabriProduct, () => {
    if (fabriProduct.value) {
      localStorage.setItem('fabricante', fabriProduct.value)
    }
})

watch(group, () => {
    if (group.value) {
      localStorage.setItem('grupo', group.value.group)
    }
})

// Función para obtener las marcas desde la API
async function getManufacturers() {
    try {
        let response = await axios.post(
        'https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js',
            {
                "getManufacturers2": { 
                    "country": localStorage.getItem('country'),
                    "lang": "es", 
                    "linkingTargetType": typeVehicle.value,
                    "provider": 25100,
                }
            },
            {
                headers: {
                'X-Api-Key' : '2BeBXg6QnEsEd55snsUcjnfBBhiQ28ttQfNDxhVJLqGxrx7dJ2Af',
                'Content-Type' : 'application/json'
                }
            }
        );
        brandsArray.value = response.data.data.array.map(item => ({ name: item.manuName, id: item.manuId }))
    } catch (error) {
        console.log(error);
    }
}

// Variable reactivas para el modelo
const models = ref([])
const modelsSpecific = ref([])
const modelsArray = ref([])
const modelsSpecificArray = ref([])

// Función para obtener los modelos desde la API
async function getModels(id = null) {
  if (id === null) {
    id = brandsArray.value.find(item => item.name === brand.value).id
  }
  
  try {
    let response = await axios.post(
    'https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js',
        {
          "getLinkageTargets": {
            "provider": 25100,
            "linkageTargetCountry": localStorage.getItem('country'),
            "lang": "es",
            "linkageTargetType": localStorage.getItem('typeVehicle'),
            "mfrIds": id,
            "perPage": 0,
            "page": 1,
            "includeVehicleModelSeriesFacets": true
          }
        },
        {
            headers: {
            'X-Api-Key' : '2BeBXg6QnEsEd55snsUcjnfBBhiQ28ttQfNDxhVJLqGxrx7dJ2Af',
            'Content-Type' : 'application/json'
            }
        }
    );

    modelsArray.value = response.data.vehicleModelSeriesFacets.counts
      .map(item => {
        let displayName = item.endYearMonth === undefined && item.beginYearMonth === undefined
          ? item.name
          : item.endYearMonth === undefined 
          ? item.name + ' ' + formatDate(item.beginYearMonth) + ' |' 
          : item.name + ' ' + formatDate(item.beginYearMonth) + ' | ' + formatDate(item.endYearMonth)

        return { name: displayName, id: item.id }
      })
      .sort((a, b) => a.name.localeCompare(b.name))

    models.value = response.data.vehicleModelSeriesFacets.counts
    idBrand = id
  } catch (error) {
      console.log(error);
  }
}

function formatDate(date) {
  let dateString = String(date)
  let dateParse = dateString.slice(0,4) + '-' + dateString.slice(4)
  return dateParse
}

async function getVehicleSpecific(idModel = null, idBrand = null) {
  if (idModel === null) {
    idModel = model.value.id
  }
  if (idBrand === null) {
    idBrand = brand.value.id
  }
  
  try {
    let response = await axios.post(
    'https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js',
        {
          "getLinkageTargets": {
              "provider": 25100,
              "linkageTargetCountry": localStorage.getItem('country'),
              "lang": "es",
              "linkageTargetType": typeVehicle.value,
              "perPage": 100,
              "page": 1,
              "mfrIds": idBrand,
              "vehicleModelSeriesIds": idModel
          }
        },
        {
            headers: {
            'X-Api-Key' : '2BeBXg6QnEsEd55snsUcjnfBBhiQ28ttQfNDxhVJLqGxrx7dJ2Af',
            'Content-Type' : 'application/json'
            }
        }
    );

    modelsSpecificArray.value = response.data.linkageTargets
      .map(item => {
        const hasValue = (val) => val !== undefined && val !== null && val !== '';

        const parts = [];

        if (hasValue(item.capacityLiters)) {
          parts.push(item.capacityLiters + ' L');
        }

        if (hasValue(item.kiloWattsTo)) {
          parts.push(item.kiloWattsTo + ' kW');
        }

        if (hasValue(item.horsePowerTo)) {
          parts.push(item.horsePowerTo + 'hp');
        }

        if (hasValue(item.description)) {
          parts.push(item.description);
        }

        if (hasValue(item.bodyStyle)) {
          parts.push(item.bodyStyle);
        }

        if (hasValue(item.driveType)) {
          parts.push(item.driveType);
        }

        // Cilindros y combustible son mutuamente relevantes según el tipo de motor
        if (item.fuelType === 'Eléctrico') {
          if (hasValue(item.fuelType)) {
            parts.push(item.fuelType);
          }
        } else if (hasValue(item.cylinders)) {
          parts.push(item.cylinders + ' cilindros');
        }

        if (hasValue(item.beginYearMonth) || hasValue(item.endYearMonth)) {
          parts.push(
            (hasValue(item.beginYearMonth) ? item.beginYearMonth : '?') +
            ' - ' +
            (hasValue(item.endYearMonth) ? item.endYearMonth : '?')
          );
        }

        const displayName = parts.join(' | ');

        return { name: displayName, id: item.linkageTargetId };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    modelsSpecific.value = response.data.linkageTargets
  } catch (error) {
      console.log(error);
  }
}

// Funcion para obtener los fabricantes
async function getFabricantes() {
    try {
        let response = await axios.post(
        'https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js',
            {
                "getBrands": {
                    "provider": 25100,
                    "articleCountry": localStorage.getItem('country'),
                    "lang": "es"
                }
            },
            {
                headers: {
                'X-Api-Key' : '2BeBXg6QnEsEd55snsUcjnfBBhiQ28ttQfNDxhVJLqGxrx7dJ2Af',
                'Content-Type' : 'application/json'
                }
            }
        );
        fabricantes.value = response.data.data.array
        .map(item => ({ name: item.mfrName, id: item.dataSupplierId }))
        .sort((a, b) => a.name.localeCompare(b.name))
    } catch (error) {
        console.log(error);
    }
}

// Funcion para obtener los groups
async function getGroups() {
    try {
        let response = await axios.post(
        'https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?js',
            {
                "getArticles": {
                    "provider": 25100,
                    "articleCountry": localStorage.getItem('country'),
                    "includeGenericArticleFacets": true,
                    "lang": "es"
                }
            },
            {
                headers: {
                'X-Api-Key' : '2BeBXg6QnEsEd55snsUcjnfBBhiQ28ttQfNDxhVJLqGxrx7dJ2Af',
                'Content-Type' : 'application/json'
                }
            }
        );

        assemblyGroups.value = response.data.genericArticleFacets.counts.map(
          item => ({
            group: item.genericArticleDescription,
            idGroup: item.genericArticleId
          })
        );
    } catch (error) {
        console.log(error);
    }
}

// Variable reactiva para el selector de marca
let idBrand
let idModel
const brandSelect = ref(null)
const modelSelect = ref(null)

// Función para activar el modelo
function activateModel() {
  if (brand.value === null) {
    disabledModel = true
    if (brandSelect.value && brandSelect.value.$el) {
      const input = brandSelect.value.$el.querySelector('input');
      if (input) input.blur();
    }
    return
  }
  idBrand = brandsArray.value.find(item => item.name === brand.value.name).id
  disabledModel = false
  getModels(idBrand);
}

function activateSpecificVehicle() {
  if (model.value === null) {
    disabled = true
    if (modelSelect.value && modelSelect.value.$el) {
      const input = modelSelect.value.$el.querySelector('input');
      if (input) input.blur();
    }
    return
  }

  idModel = model.value.id
  disabled = false
  getVehicleSpecific(idModel, idBrand);
}

// Funcion para ir al producto seleccionado
function navigate() {
  let idModelToUse = model.value.id
  let idVersion = modelSpecific.value.id

  router.push({ 
    name: 'vehicles-articles', 
    params: { 
      brand: brand.value.name, 
      idBrand: idBrand, 
      model: model.value.name, 
      idModel: idModelToUse, 
      car: modelSpecific.value.name, 
      idCar: idVersion 
    } 
  })
}

// Observer de intersección
let observer = null

// Función para obtener las marcas y modelos al montar el componente
onMounted(async () => {
  await getGroups();
  await getFabricantes();
  await getManufacturers();
  if (localStorage.getItem('typeVehicle') === null) {
    localStorage.setItem('typeVehicle', typeVehicle.value)
  } else {
    typeVehicle.value = localStorage.getItem('typeVehicle')
  }
  if (brand.value !== null) {
    disabled.value = false
    await getModels();
  }
  const sections = document.querySelectorAll('section')
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, {
    threshold: 0.5
  })

  sections.forEach(section => observer.observe(section))
})

// Función para eliminar el observer al desmontar el componente
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

</script>

<style>
.v-btn-group {
  border-radius: 20px !important;
}
.v-btn-group .v-btn--variant-elevated, .v-btn--variant-flat {
  background: transparent;
  color: white !important;
  border-top: 1px solid #FF4338 !important;
  border-bottom: 1px solid #FF4338 !important;
  height: 40px !important;
}

/* Media query */
@media (max-width: 500px) {
  .v-btn-group .v-btn--variant-elevated, .v-btn--variant-flat {
    height: 40px !important;
    font-size: 12px !important;
  }
}
</style>