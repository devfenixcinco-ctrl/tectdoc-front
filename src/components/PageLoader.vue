<template>
  <Transition name="loader-fade">
    <div v-if="visible" class="page-loader">
      <!-- Barra de progreso superior -->
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>

      <!-- Contenido central -->
      <div class="loader-content">
        <!-- Spinner -->
        <div class="spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring spinner-ring--delay1"></div>
          <div class="spinner-ring spinner-ring--delay2"></div>
        </div>

        <!-- Texto de estado -->
        <p class="loader-status">{{ statusText }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: null
  },
  minDuration: {
    type: Number,
    default: 600
  },
  messages: {
    type: String,
    default: 'Cargando...'
  }
})

const emit = defineEmits(['done'])

const visible = ref(true)
const progress = ref(0)
const statusText = ref(props.messages)

let messageIndex = 0
let messageInterval = null
let progressInterval = null

function startProgress() {
  // Simula progreso no lineal (rápido al inicio, lento al final)
  progressInterval = setInterval(() => {
    if (progress.value < 85) {
      progress.value += Math.random() * 8
    } else if (progress.value < 95) {
      progress.value += Math.random() * 1.5
    }
  }, 200)
}

function startMessages() {
  if (props.messages.length <= 1) return
  messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % props.messages.length
    statusText.value = props.messages[messageIndex]
  }, 1800)
}

function finish() {
  clearInterval(progressInterval)
  clearInterval(messageInterval)
  progress.value = 100
  setTimeout(() => {
    visible.value = false
    emit('done')
  }, 400)
}

// Modo auto: se oculta al montar tras minDuration
onMounted(() => {
  startProgress()
  startMessages()

  if (props.loading === null) {
    setTimeout(finish, props.minDuration)
  }
})

// Modo controlado: reacciona al prop :loading
watch(
  () => props.loading,
  (val) => {
    if (val === false) finish()
    if (val === true) {
      visible.value = true
      progress.value = 0
      startProgress()
      startMessages()
    }
  }
)
</script>

<style scoped>
/* ─── Variables ──────────────────────────────────────── */
.page-loader {
  --accent: #FF4338;
  --bg: #0a0a0aaf;
  --text: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.45);
  --ring-size: 56px;

  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ─── Barra de progreso ──────────────────────────────── */
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: #FF4338;
  transition: width 0.3s ease;
  box-shadow: 0 0 12px #FF4338;
}

/* ─── Contenido ──────────────────────────────────────── */
.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

/* ─── Logo por defecto ───────────────────────────────── */
.default-logo {
  display: flex;
  gap: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 6px;
  color: var(--text-muted);
}

.default-logo span {
  animation: letterPulse 1.6s ease-in-out infinite;
}

.default-logo span:nth-child(1) { animation-delay: 0.0s; }
.default-logo span:nth-child(2) { animation-delay: 0.1s; }
.default-logo span:nth-child(3) { animation-delay: 0.2s; }
.default-logo span:nth-child(4) { animation-delay: 0.3s; }
.default-logo span:nth-child(5) { animation-delay: 0.4s; }
.default-logo span:nth-child(6) { animation-delay: 0.5s; }
.default-logo span:nth-child(7) { animation-delay: 0.6s; }
.default-logo span:nth-child(8) { animation-delay: 0.7s; }

@keyframes letterPulse {
  0%, 100% { color: var(--text-muted); }
  50%       { color: var(--accent); }
}

/* ─── Spinner de tres anillos ────────────────────────── */
.spinner {
  position: relative;
  width: var(--ring-size);
  height: var(--ring-size);
}

.spinner-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: var(--accent);
  animation: spin 1.1s linear infinite;
}

.spinner-ring--delay1 {
  inset: 8px;
  border-top-color: #FF4338;
  animation-duration: 1.5s;
  animation-direction: reverse;
}

.spinner-ring--delay2 {
  inset: 16px;
  border-top-color: #FF4338;
  animation-duration: 2s;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Texto de estado ────────────────────────────────── */
.loader-status {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #FFFFFF;
  animation: fadeStatus 1.8s ease-in-out infinite;
  margin: 0;
}

@keyframes fadeStatus {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}

/* ─── Transición de salida ───────────────────────────── */
.loader-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.loader-fade-leave-to {
  opacity: 0;
  transform: scale(1.03);
}
</style>