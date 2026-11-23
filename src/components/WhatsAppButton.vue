<template>
    <!-- Botón flotante de WhatsApp (FUNC-01): número del cliente y mensaje según la página -->
    <a
        v-if="number"
        :href="href"
        target="_blank"
        rel="noopener"
        class="whatsapp-button"
        :aria-label="$t('whatsapp.label')"
        @click="trackEvent('click_whatsapp', { page: route.name || 'otra' })"
    >
        <i class="mdi mdi-whatsapp" aria-hidden="true" />
    </a>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { trackEvent } from '../services/analytics'
import { clientConfig } from '../services/config'

const { t, te } = useI18n()
const route = useRoute()

// Solo dígitos, en formato internacional (ej.: 573001234567)
const number = computed(() => String(clientConfig.whatsapp || '').replace(/\D/g, ''))

// Mensaje predefinido por página (whatsapp.messages.<nombre de la ruta>), con los
// datos de la URL: referencia del producto, vehículo, búsqueda...
const message = computed(() => {
    const key = `whatsapp.messages.${route.name}`
    const params = route.params

    return t(te(key) ? key : 'whatsapp.messages.default', {
        id: params.id,
        brand: params.brand,
        model: params.model,
        car: params.car,
        search: params.text || params.search
    })
})

const href = computed(() => `https://wa.me/${number.value}?text=${encodeURIComponent(message.value)}`)
</script>

<style scoped>
.whatsapp-button {
    position: fixed;
    right: clamp(16px, 2vw, 28px);
    bottom: clamp(16px, 2vw, 28px);
    z-index: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #25D366;
    color: #FFFFFF;
    font-size: 34px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
}
.whatsapp-button:hover {
    transform: scale(1.08);
}
</style>
