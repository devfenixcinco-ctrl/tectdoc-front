<template>
    <div class="!sticky !top-[100vh] !bg-[#000000] !text-white !flex !items-center !justify-between !z-[10] !relative
    !py-[24px] !gap-[20px]
    max-md:!pb-[96px]
    2xl:!min-h-[250px] 2xl:!px-[200px] 
    xl:!min-h-[200px] xl:!px-[100px] 
    md:!min-h-[190px] md:!px-[80px] 
    max-sm:!min-h-[190px] max-sm:!px-[30px] 
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
                <!-- Botones de redes sociales: solo las que el cliente configuró -->
                <a
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.href"
                    target="_blank"
                    rel="noopener"
                    :aria-label="social.name"
                >
                    <SocialMedia 
                        customClass="
                        2xl:!w-[30px]
                        xl:!w-[25px]
                        md:!w-[18px]
                        max-sm:!w-[13px]"
                        :redSocial="social.icon"
                    />
                </a>
            </div>

            <!-- Datos de la empresa (FUNC-04), configurados por cliente -->
            <address
                v-if="footer.company || footer.address || footer.phone || footer.email"
                class="!not-italic !font-sans !text-[#C5C5C5] !leading-relaxed
                2xl:!text-[14px] xl:!text-[13px] md:!text-[11px] max-sm:!text-[10px]"
            >
                <p v-if="footer.company">
                    <strong class="!text-[#FFFFFF]">{{ footer.company }}</strong>
                    <span v-if="footer.tax_id"> · NIT {{ footer.tax_id }}</span>
                </p>
                <p v-if="footer.address">{{ footer.address }}</p>
                <p v-if="footer.phone">
                    <a :href="`tel:${footer.phone.replace(/[^\d+]/g, '')}`" class="hover:!text-[#FF4338]">{{ footer.phone }}</a>
                </p>
                <p v-if="footer.email">
                    <a :href="`mailto:${footer.email}`" class="hover:!text-[#FF4338]">{{ footer.email }}</a>
                </p>
            </address>
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

            <!-- Enlaces de navegación - Contacto -->
            <RouterLink
                to="/contacto"
                class="!text-[#FFFFFF] !font-poppins 
                !transition !duration-300 !ease-in-out 
                2xl:!text-[18px]
                xl:!text-[15px]
                md:!text-[12px]
                max-sm:!text-[10px]"
                :class="{ 
                    '!font-bold !text-[#0080BB] 2xl:!text-[22px] xl:!text-[18px] md:!text-[15px] max-sm:!text-[12px]': $route.path === '/contacto' 
                }, { 
                    'hover:!text-[#FF4338] hover:!scale-105' : $route.path !== '/contacto' 
                }"
            >
                {{ $t('footer.pages.contact') }}
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

import Logo from '../../assets/icons/logo.svg';
import LogoNextMobi from '../../assets/images/next_mobi_3.png?w=400&format=webp&quality=80';

import SocialMedia from '../Footer/SocialButtons.vue';
import SocialFacebook from '../../assets/icons/social-media/facebook.svg';
import SocialInstagram from '../../assets/icons/social-media/instagram.svg';
import SocialWhatsapp from '../../assets/icons/social-media/whatsapp.svg';
import { computed, onMounted, ref } from 'vue';
import { hasConsentManager, openConsentSettings } from '../../services/cookieConsent';
import { clientConfig } from '../../services/config';

// Datos del pie de página configurados para el cliente (razón social, NIT, contacto, redes)
const footer = computed(() => clientConfig.footer || {})

const socialLinks = computed(() => {
    const whatsapp = String(clientConfig.whatsapp || '').replace(/\D/g, '')

    return [
        { name: 'Facebook', icon: SocialFacebook, href: footer.value.facebook },
        { name: 'Instagram', icon: SocialInstagram, href: footer.value.instagram },
        { name: 'WhatsApp', icon: SocialWhatsapp, href: whatsapp ? `https://wa.me/${whatsapp}` : null }
    ].filter(social => social.href)
})

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