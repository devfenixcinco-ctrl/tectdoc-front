<template>
    <v-btn
        :class="customClass"
    >
        <img
            :src="icon_img"
            :alt="label"
            :class="customClassIcon"
            loading="lazy"
        />

        {{ label }}
    </v-btn>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    customClass: {
        type: String,
        default: ""
    },

    customClassIcon: {
        type: String,
        default: ""
    },

    label: {
        type: String,
        default: ""
    },

    icon_img: {
        type: String,
        default: "../../assets/icons/header-icon.svg?w=1920&format=webp&quality=80"
    }
});

const customClass = computed(() => [
    "!font-poppins",
    "!font-light",
    "!normal-case",

    "!text-white",

    "!text-[clamp(.85rem,1vw,1.1rem)]",

    "!px-[clamp(.9rem,1.5vw,1.4rem)]",
    "!py-[clamp(.45rem,.8vw,.8rem)]",

    "!rounded-[clamp(.5rem,.8vw,.9rem)]",

    "!bg-[#696969]",

    "!bg-opacity-40",

    "!backdrop-blur-lg",

    "!shadow-none",

    "!gap-[clamp(.4rem,.8vw,.75rem)]",

    "!min-h-[clamp(42px,4vw,52px)]",

    props.customClass
]);

const customClassIcon = computed(() => [
    "!w-[clamp(16px,1.3vw,24px)]",
    "!h-[clamp(16px,1.3vw,24px)]",
    "!object-contain",

    props.customClassIcon
]);
</script>