<template>
    <!-- Seccion Inicial -->
    <section>
        <div class="!bg-[#000000] !h-[300px]">
            <!-- Header -->
            <Header />
        </div>
    </section>

    <!-- Contenido de la política -->
    <section class="!flex !justify-center !relative !z-[5] !mt-[-120px] !px-[16px] !pb-[80px]">
        <article
            class="legal-content !bg-[#FFFFFF] !rounded-[16px] !shadow-xl !w-full !max-w-[900px]
            !p-[clamp(1.5rem,4vw,3rem)]"
        >
            <div v-if="isLoading" class="!flex !justify-center !py-[40px]">
                <v-progress-circular indeterminate color="#FF4338" />
            </div>

            <p v-else-if="error">{{ $t('legal.error') }}</p>

            <!-- HTML generado por el backend a partir del Markdown del cliente -->
            <div v-else v-html="legalDocument.html" />
        </article>
    </section>

    <!-- Footer -->
    <Footer />
</template>

<script setup>
import { onMounted, ref } from 'vue'

import Header from '../components/sections/Header.vue'
import Footer from '../components/sections/Footer.vue'
import { api } from '../services/api'
import { clientConfig, clientId } from '../services/config'

// "privacidad" o "cookies"
const props = defineProps({
    policy: {
        type: String,
        required: true
    }
})

const legalDocument = ref(null)
const isLoading = ref(true)
const error = ref(false)

onMounted(async () => {
    try {
        const response = await api.get(`/legal/${clientId()}/${props.policy}`)
        legalDocument.value = response.data
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
.legal-content {
    font-family: "Public Sans", sans-serif;
    color: #1A1A1A;
    line-height: 1.6;
}
.legal-content :deep(h1) {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    margin-bottom: 1rem;
}
.legal-content :deep(h2) {
    font-family: "Poppins", sans-serif;
    font-size: clamp(1.15rem, 2vw, 1.4rem);
    font-weight: 600;
    margin: 1.75rem 0 0.5rem;
}
.legal-content :deep(p),
.legal-content :deep(ul),
.legal-content :deep(ol) {
    margin-bottom: 0.75rem;
}
.legal-content :deep(ul) {
    list-style: disc;
    padding-left: 1.5rem;
}
.legal-content :deep(ol) {
    list-style: decimal;
    padding-left: 1.5rem;
}
.legal-content :deep(blockquote) {
    border-left: 4px solid #FF4338;
    background: #FFF4F3;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
}
.legal-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}
.legal-content :deep(th),
.legal-content :deep(td) {
    border: 1px solid #D9D9D9;
    padding: 0.5rem 0.75rem;
    text-align: left;
    vertical-align: top;
}
.legal-content :deep(th) {
    background: #F2F2F2;
}
</style>
