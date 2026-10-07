<script setup>
defineProps({
  size: { type: [Number, String], default: 34 },
  accent: { type: String, default: 'var(--color-accent-vibrant)' },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 36 36"
    fill="none"
    role="img"
    aria-hidden="true"
  >
    <circle cx="18" cy="6.5" r="2.6" :fill="accent" />
    <circle cx="7" cy="28.5" r="2.6" fill="var(--color-accent)" />
    <circle cx="29" cy="28.5" r="2.6" fill="var(--color-accent)" />
    <line
      x1="17"
      y1="8.6"
      x2="8.2"
      y2="26.5"
      stroke="var(--color-text-muted)"
      stroke-opacity="0.35"
      stroke-width="1.4"
    />
    <line
      x1="19"
      y1="8.6"
      x2="27.8"
      y2="26.5"
      stroke="var(--color-text-muted)"
      stroke-opacity="0.35"
      stroke-width="1.4"
    />
    <line
      x1="9.8"
      y1="28.5"
      x2="26.2"
      y2="28.5"
      stroke="var(--color-text-muted)"
      stroke-opacity="0.18"
      stroke-width="1.4"
    />
  </svg>
</template>