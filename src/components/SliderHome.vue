<template>
    <!-- Slider de logos -->
    <div class="!w-full !h-[130px] !overflow-hidden !bg-[#a7a7a7] !py-6 !relative !z-[10]
    !flex !items-center"
    >
      <div
      class="!flex !items-center !gap-12 !w-[150px]"
      :style="{ transform: `translateX(${offset}px)` }"
      ref="sliderRef"
      >
        <!-- Logos de las marcas disponibles -->
        <img
            v-for="(logo, index) in logos"
            :key="index"
            :src="logo"
            loading="lazy"
            class="!h-[70px] !w-[70px] !rounded-full object-contain !shadow-lg !bg-[#FFFFFF] !bg-opacity-80 !p-1"
            alt="logo"
        />
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Obtener los logos de las marcas disponibles
const logos = ref(
  Object.values(
    import.meta.glob('../assets/svg/small/*.svg', { eager: true, query: '?url', import: 'default' })
  )
)

// Variables y referencias para la animación del slider
const sliderRef = ref(null)
const offset = ref(0)
let speed = 0.5
let animationId = null

// Función para animar el slider
const animate = () => {
  offset.value -= speed

  const firstEl = sliderRef.value.children[0]
  if (firstEl && firstEl.getBoundingClientRect().right < 0) {
    logos.value.push(logos.value.shift())
    offset.value += firstEl.offsetWidth + 48
  }

  animationId = requestAnimationFrame(animate)
}

// Iniciar animación del slider
onMounted(() => {
  animationId = requestAnimationFrame(animate)
})

// Limpiar la animación al desmontar el componente
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
/* Estilos para el slider */
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll 20s linear infinite;
  width: max-content;
}
</style>