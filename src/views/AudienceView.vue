<template>
    <section>
        <div class="!bg-[#000000] !h-[300px]">
            <Header />
        </div>
    </section>

    <!-- Página por público (FUNC-03): argumento del cliente y formulario con el segmento ya elegido -->
    <section
        class="!flex !flex-wrap !justify-center !items-start !gap-[32px] !relative !z-[5] !mt-[-120px]
        !px-[16px] !pb-[80px]"
    >
        <article
            class="audience-content !bg-[#FFFFFF] !rounded-[16px] !shadow-xl !w-full !max-w-[640px]
            !p-[clamp(1.5rem,4vw,3rem)]"
        >
            <div v-if="isLoading" class="!flex !justify-center !py-[40px]">
                <v-progress-circular indeterminate color="#FF4338" />
            </div>
            <p v-else-if="error">{{ $t('legal.error') }}</p>
            <!-- HTML generado por el backend a partir del Markdown del cliente -->
            <div v-else v-html="content.html" />
        </article>

        <aside
            class="!bg-[#FFFFFF] !rounded-[16px] !shadow-xl !w-full !max-w-[440px]
            !p-[clamp(1.5rem,3vw,2.5rem)]"
        >
            <h2 class="!font-poppins !font-bold !text-[22px] !mb-[16px]">
                {{ $t('contact.title') }}
            </h2>
            <ContactForm :segment="segment" />
        </aside>
    </section>

    <Footer />
</template>

<script setup>
import { onMounted, ref } from 'vue'

import Header from '../components/sections/Header.vue'
import Footer from '../components/sections/Footer.vue'
import ContactForm from '../components/ContactForm.vue'
import { api } from '../services/api'
import { trackEvent } from '../services/analytics'
import { clientConfig, clientId } from '../services/config'

const props = defineProps({
    // fabricantes, distribuidores o talleres
    page: {
        type: String,
        required: true
    },
    // fabricante, distribuidor o taller
    segment: {
        type: String,
        required: true
    }
})

const content = ref(null)
const isLoading = ref(true)
const error = ref(false)

onMounted(async () => {
    // Medición propia de cada público
    trackEvent('view_audience', { segment: props.segment })

    try {
        const response = await api.get(`/audiences/${clientId()}/${props.page}`)
        content.value = response.data
        document.title = `${response.data.title} | ${clientConfig.name}`
    } catch (e) {
        console.log(e)
        error.value = true
    } finally {
        isLoading.value = false
    }
})
</script>

<style scoped>
.audience-content {
    font-family: "Public Sans", sans-serif;
    color: #1A1A1A;
    line-height: 1.6;
}
.audience-content :deep(h1) {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    margin-bottom: 1rem;
}
.audience-content :deep(h2) {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    font-weight: 600;
    margin: 1.5rem 0 0.5rem;
}
.audience-content :deep(p),
.audience-content :deep(ul) {
    margin-bottom: 0.75rem;
}
.audience-content :deep(ul) {
    list-style: disc;
    padding-left: 1.5rem;
}
.audience-content :deep(blockquote) {
    border-left: 4px solid #FF4338;
    background: #FFF4F3;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
}
</style>
