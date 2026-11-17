<template>
    <div class="!sticky !top-[100vh] !bg-[#000000] !text-white !flex !items-center !justify-between !z-[10] !relative
    2xl:!h-[250px] 2xl:!px-[200px] 
    xl:!h-[200px] xl:!px-[100px] 
    md:!h-[190px] md:!px-[80px] 
    max-sm:!h-[190px] max-sm:!px-[30px] 
    ">
        <!-- Izquierda -->
        <div class="!flex !flex-col !justify-center !gap-[15px]"
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
                2xl:!w-[200px]
                xl:!w-[170px]
                md:!w-[130px]
                max-sm:!w-[90px]" 
                loading="lazy"
            />
            <div class="!flex !flex-row !justify-center
            2xl:!gap-[30px]
            xl:!gap-[25px]
            md:!gap-[20px]
            max-sm:!gap-[15px]"
            >
                <!-- Botones de redes sociales -->
                <SocialMedia 
                    customClass="
                    2xl:!w-[30px]
                    xl:!w-[25px]
                    md:!w-[18px]
                    max-sm:!w-[13px]"
                    :redSocial="SocialFacebook"
                />
                <SocialMedia 
                    customClass="
                    2xl:!w-[30px]
                    xl:!w-[25px]
                    md:!w-[18px]
                    max-sm:!w-[13px]"
                    :redSocial="SocialInstagram"
                />
                <SocialMedia 
                    customClass="
                    2xl:!w-[30px]
                    xl:!w-[25px]
                    md:!w-[18px]
                    max-sm:!w-[13px]"
                    :redSocial="SocialWhatsapp"
                />
            </div>
        </div>

        <!-- Derecha -->
        <div class="!flex !flex-col !items-end !gap-[8px]">
            <!-- Enlaces de navegación - Home -->
            <RouterLink
                to="/"
                class="!text-[#FFFFFF] !font-poppins 
                !transition !duration-300 !ease-in-out
                2xl:!text-[18px]
                xl:!text-[15px]
                md:!text-[12px]
                max-sm:!text-[10px]"
                :class="{ 
                    '!font-bold !text-[#0080BB] 2xl:!text-[22px] xl:!text-[18px] md:!text-[15px] max-sm:!text-[12px]': $route.path === '/' 
                }, { 
                    'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '/' 
                }"
            >
                {{ $t('footer.pages.home') }}
            </RouterLink>

            <!-- Enlaces de navegación -  -->
            <RouterLink
                to="/catalogo"
                class="!text-[#FFFFFF] !font-poppins 
                !transition !duration-300 !ease-in-out 
                2xl:!text-[18px]
                xl:!text-[15px]
                md:!text-[12px]
                max-sm:!text-[10px]"
                :class="{ 
                    '!font-bold !text-[#0080BB] 2xl:!text-[22px] xl:!text-[18px] md:!text-[15px] max-sm:!text-[12px]': $route.path === '' 
                }, { 
                    'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '' 
                }"
            >
                {{ $t('footer.pages.catalog') }}
            </RouterLink>
            
            <!-- Divider -->
            <v-divider class="border-opacity-50 !border-[#FFFFFF] !w-[100%]
                2xl:!hidden
                xl:!hidden
                md:!hidden"
            >
            </v-divider>

            <!-- Enlaces de navegación - Terminos y condiciones en MOBILE -->
            <RouterLink
                to=""
                class="!text-[#FFFFFF] !font-poppins 
                !transition !duration-300 !ease-in-out
                2xl:!hidden
                xl:!hidden
                md:!hidden
                max-sm:!text-[10px]
                max-[350px]:!text-[8px]"
                :class="{ 
                    '!font-bold !text-[#0080BB] max-sm:!text-[12px]': $route.path === '' 
                }, { 
                    'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '' 
                }"
            >
                {{ $t('footer.pages.terms') }}
            </RouterLink>

            <!-- Enlaces de navegación - Politica de privacidad y protección de datos en MOBILE -->
            <RouterLink
                to="/politica-de-privacidad"
                class="!text-[#FFFFFF] !font-poppins
                !transition !duration-300 !ease-in-out
                2xl:!hidden
                xl:!hidden
                md:!hidden
                max-sm:!text-[8px]
                max-[350px]:!text-[7px]"
                :class="{
                    '!font-bold !text-[#0080BB] max-sm:!text-[12px]': $route.path === '/politica-de-privacidad'
                }, {
                    'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '/politica-de-privacidad'
                }"
            >
                {{ $t('footer.pages.our_policy') }}
            </RouterLink>

            <!-- Enlaces de navegación - Politica de cookies en MOBILE -->
            <RouterLink
                to="/politica-de-cookies"
                class="!text-[#FFFFFF] !font-poppins
                !transition !duration-300 !ease-in-out
                2xl:!hidden
                xl:!hidden
                md:!hidden
                max-sm:!text-[8px]
                max-[350px]:!text-[7px]"
                :class="{
                    '!font-bold !text-[#0080BB] max-sm:!text-[12px]': $route.path === '/politica-de-cookies'
                }, {
                    'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '/politica-de-cookies'
                }"
            >
                {{ $t('footer.pages.cookies_policy') }}
            </RouterLink>

            <!-- Configurar cookies en MOBILE -->
            <button
                v-if="hasConsentManager()"
                type="button"
                class="cky-banner-element !text-[#FFFFFF] !font-poppins
                !transition !duration-300 !ease-in-out hover:!text-[#FF4338]
                2xl:!hidden
                xl:!hidden
                md:!hidden
                max-sm:!text-[8px]
                max-[350px]:!text-[7px]"
                @click="openConsentSettings"
            >
                {{ $t('footer.pages.cookie_settings') }}
            </button>

            <!-- Enlaces de navegación - Politica de privacidad y protección de datos Y Terminos y condiciones en DESKTOP -->
            <div class="!flex !flex-row !justify-stretch !gap-[10px]
            max-sm:!hidden"
            >
                <RouterLink
                    to=""
                    class="!text-[#FFFFFF] !font-poppins 
                    !transition !duration-300 !ease-in-out
                    2xl:!text-[18px]
                    xl:!text-[15px]
                    md:!text-[12px]
                    max-sm:!text-[10px]"
                    :class="{ 
                        '!font-bold !text-[#0080BB] 2xl:!text-[22px] xl:!text-[18px] md:!text-[15px] max-sm:!text-[12px]': $route.path === '' 
                    }, { 
                        'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '' 
                    }"
                >
                    {{ $t('footer.pages.terms') }}
                </RouterLink>
                <h1>|</h1>
                <RouterLink
                    to="/politica-de-privacidad"
                    class="!text-[#FFFFFF] !font-poppins
                    !transition !duration-300 !ease-in-out
                    2xl:!text-[18px]
                    xl:!text-[15px]
                    md:!text-[12px]
                    max-sm:!text-[10px]"
                    :class="{
                        '!font-bold !text-[#0080BB] 2xl:!text-[22px] xl:!text-[18px] md:!text-[15px] max-sm:!text-[12px]': $route.path === '/politica-de-privacidad'
                    }, {
                        'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '/politica-de-privacidad'
                    }"
                >
                    {{ $t('footer.pages.our_policy') }}
                </RouterLink>
                <h1>|</h1>
                <RouterLink
                    to="/politica-de-cookies"
                    class="!text-[#FFFFFF] !font-poppins
                    !transition !duration-300 !ease-in-out
                    2xl:!text-[18px]
                    xl:!text-[15px]
                    md:!text-[12px]
                    max-sm:!text-[10px]"
                    :class="{
                        '!font-bold !text-[#0080BB] 2xl:!text-[22px] xl:!text-[18px] md:!text-[15px] max-sm:!text-[12px]': $route.path === '/politica-de-cookies'
                    }, {
                        'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '/politica-de-cookies'
                    }"
                >
                    {{ $t('footer.pages.cookies_policy') }}
                </RouterLink>
                <template v-if="hasConsentManager()">
                    <h1>|</h1>
                    <!-- Configurar cookies: vuelve a abrir el banner del CMP -->
                    <button
                        type="button"
                        class="cky-banner-element !text-[#FFFFFF] !font-poppins
                        !transition !duration-300 !ease-in-out hover:!text-[#FF4338] hover:!scale-105
                        2xl:!text-[18px]
                        xl:!text-[15px]
                        md:!text-[12px]
                        max-sm:!text-[10px]"
                        @click="openConsentSettings"
                    >
                        {{ $t('footer.pages.cookie_settings') }}
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import Logo from '../../assets/icons/logo.svg?w=1920&format=webp&quality=80';
import LogoNextMobi from '../../assets/images/next_mobi_3.png?w=1920&format=webp&quality=80';

import SocialMedia from '../Footer/SocialButtons.vue';
import SocialFacebook from '../../assets/icons/social-media/facebook.svg?w=1920&format=webp&quality=80';
import SocialInstagram from '../../assets/icons/social-media/instagram.svg?w=1920&format=webp&quality=80';
import SocialWhatsapp from '../../assets/icons/social-media/whatsapp.svg?w=1920&format=webp&quality=80';
import { onMounted, ref } from 'vue';
import { hasConsentManager, openConsentSettings } from '../../services/cookieConsent';

// Variable reactiva para el logo de AMostrar
const LogoAMostrar = ref(LogoNextMobi)
const isEntering = ref(true)

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