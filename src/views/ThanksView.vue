<template>
    <section>
        <div class="!bg-[#000000] !h-[300px]">
            <Header />
        </div>
    </section>

    <!-- Página de agradecimiento (FUNC-02): URL propia para medir la conversión -->
    <section class="!flex !justify-center !relative !z-[5] !mt-[-120px] !px-[16px] !pb-[80px]">
        <article
            class="!bg-[#FFFFFF] !rounded-[16px] !shadow-xl !w-full !max-w-[640px] !text-center
            !p-[clamp(1.5rem,4vw,3rem)]"
        >
            <i class="mdi mdi-check-circle !text-[#2E7D32] !text-[56px]" aria-hidden="true" />
            <h1 class="!font-poppins !font-bold !text-[clamp(1.6rem,3vw,2.2rem)] !my-[12px]">
                {{ $t('thanks.title') }}
            </h1>
            <p class="!font-sans !text-[#444444] !mb-[24px]">
                {{ $t('thanks.text') }}
            </p>
            <v-btn
                :to="{ name: 'catalogo' }"
                color="#FF4338"
                class="!text-white !normal-case !font-poppins"
            >
                {{ $t('thanks.back') }}
            </v-btn>
        </article>
    </section>

    <Footer />
</template>

<script setup>
import { onMounted } from 'vue'

import Header from '../components/sections/Header.vue'
import Footer from '../components/sections/Footer.vue'
import { trackEvent } from '../services/analytics'

// generate_lead se registra una sola vez por envío: al recargar la página o volver
// a ella no se cuenta de nuevo. Sin un envío reciente (visita directa) no se mide nada.
onMounted(() => {
    let lead = null

    try {
        lead = JSON.parse(sessionStorage.getItem('fenix_last_lead'))
    } catch {
        lead = null
    }

    const key = `fenix_lead_tracked_${lead?.id}`

    if (!lead || sessionStorage.getItem(key)) {
        return
    }

    sessionStorage.setItem(key, '1')
    trackEvent('generate_lead', { segment: lead.segment, lead_id: lead.id })
})
</script>
