<template>
    <!-- Consentimiento explícito para formularios (LGPD-03): desmarcado por defecto y obligatorio -->
    <v-checkbox
        v-model="accepted"
        :rules="[value => !!value || $t('consent.required')]"
        color="#FF4338"
        density="compact"
        hide-details="auto"
    >
        <template #label>
            <span class="!text-[13px] !leading-snug">
                {{ $t('consent.label', { company }) }}
                <RouterLink
                    to="/politica-de-privacidad"
                    target="_blank"
                    class="!underline !text-[#FF4338]"
                    @click.stop
                >
                    {{ $t('consent.policy_link') }}</RouterLink>.
            </span>
        </template>
    </v-checkbox>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { clientConfig } from '../services/config'

const accepted = defineModel({ type: Boolean, default: false })

const company = computed(() => clientConfig.footer?.company || clientConfig.name)
</script>
