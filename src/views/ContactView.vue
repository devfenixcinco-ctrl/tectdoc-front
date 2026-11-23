<template>
    <section>
        <div class="!bg-[#000000] !h-[300px]">
            <Header />
        </div>
    </section>

    <!-- Formulario de contacto (CRM-01) -->
    <section class="!flex !justify-center !relative !z-[5] !mt-[-120px] !px-[16px] !pb-[80px]">
        <article
            class="!bg-[#FFFFFF] !rounded-[16px] !shadow-xl !w-full !max-w-[640px]
            !p-[clamp(1.5rem,4vw,3rem)]"
        >
            <h1 class="!font-poppins !font-bold !text-[clamp(1.6rem,3vw,2.2rem)] !mb-[8px]">
                {{ $t('contact.title') }}
            </h1>
            <p class="!font-sans !text-[#444444] !mb-[24px]">
                {{ $t('contact.intro') }}
            </p>

            <ContactForm />
        </article>
    </section>

    <Footer />
</template>

<script setup>
import Header from '../components/sections/Header.vue'
import Footer from '../components/sections/Footer.vue'
import ContactForm from '../components/ContactForm.vue'
</script>
