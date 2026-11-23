<template>
    <!-- Formulario de contacto (CRM-01): el backend registra el consentimiento y envía el lead a HubSpot -->
    <v-form
        ref="form"
        class="contact-form !flex !flex-col !gap-[6px]"
        @submit.prevent="submit"
    >
        <v-text-field
            v-model="fields.name"
            :label="$t('contact.name')"
            :rules="[required, max(120)]"
            autocomplete="name"
            variant="outlined"
            density="comfortable"
        />
        <v-text-field
            v-model="fields.company"
            :label="$t('contact.company')"
            :rules="[max(150)]"
            autocomplete="organization"
            variant="outlined"
            density="comfortable"
        />
        <v-select
            v-model="fields.segment"
            :label="$t('contact.segment')"
            :items="segments"
            :rules="[required]"
            variant="outlined"
            density="comfortable"
        />
        <v-text-field
            v-model="fields.email"
            :label="$t('contact.email')"
            :rules="[required, email]"
            type="email"
            autocomplete="email"
            variant="outlined"
            density="comfortable"
        />
        <v-text-field
            v-model="fields.phone"
            :label="$t('contact.phone')"
            :rules="[max(40)]"
            type="tel"
            autocomplete="tel"
            variant="outlined"
            density="comfortable"
        />

        <!-- Trampa para robots: oculta para las personas, el backend rechaza el envío si viene llena -->
        <input
            v-model="fields.website"
            class="contact-form__trap"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
        >

        <ConsentCheckbox v-model="fields.accepted" />

        <p v-if="error" class="!text-[#D32F2F] !text-[14px]" role="alert">{{ error }}</p>

        <v-btn
            type="submit"
            :loading="sending"
            color="#FF4338"
            class="!text-white !normal-case !font-poppins !mt-[8px]"
            size="large"
        >
            {{ $t('contact.submit') }}
        </v-btn>
    </v-form>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import ConsentCheckbox from './ConsentCheckbox.vue'
import { api } from '../services/api'
import { getAttribution } from '../services/attribution'
import { clientConfig, clientId } from '../services/config'

const props = defineProps({
    // Segmento preseleccionado (páginas por público): fabricante, distribuidor o taller
    segment: {
        type: String,
        default: null
    }
})

const { t } = useI18n()
const router = useRouter()

const form = ref(null)
const sending = ref(false)
const error = ref('')

const fields = reactive({
    name: '',
    company: '',
    segment: props.segment,
    email: '',
    phone: '',
    website: '',
    accepted: false
})

const segments = computed(() => ['fabricante', 'distribuidor', 'taller'].map(value => ({
    value,
    title: t(`contact.segments.${value}`)
})))

// Reglas de validación de los campos
const required = value => !!value || t('contact.required')
const max = length => value => !value || value.length <= length || t('contact.too_long', { length })
const email = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '') || t('contact.invalid_email')

async function submit() {
    error.value = ''
    const { valid } = await form.value.validate()

    if (!valid) {
        return
    }

    sending.value = true

    try {
        const company = clientConfig.footer?.company || clientConfig.name
        const response = await api.post(`/leads/${clientId()}`, {
            ...fields,
            // Texto exacto de la casilla que aceptó el usuario
            consent_text: `${t('consent.label', { company })} ${t('consent.policy_link')}.`,
            ...getAttribution(),
            page_uri: window.location.href,
            page_name: document.title
        })

        // La página de agradecimiento mide la conversión una sola vez por envío
        sessionStorage.setItem('fenix_last_lead', JSON.stringify({ id: response.data.id, segment: response.data.segment }))
        router.push({ name: 'thanks' })
    } catch (e) {
        console.log(e)
        error.value = e.response?.status === 429 ? t('contact.too_many') : t('contact.error')
    } finally {
        sending.value = false
    }
}
</script>

<style scoped>
.contact-form__trap {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    opacity: 0;
}
</style>
