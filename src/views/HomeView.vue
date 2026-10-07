<script setup>
import HomeHero from '@/components/HomeHero.vue'
import HomeBrands from '@/components/HomeBrands.vue'
import HomeServices from '@/components/HomeServices.vue'
import HomeCases from '@/components/HomeCases.vue'
import HomeMetrics from '@/components/HomeMetrics.vue'
import HomeTestimonials from '@/components/HomeTestimonials.vue'
import HomeContact from '@/components/HomeContact.vue'
</script>

<template>
  <div class="home-view">
    <HomeHero />
    <HomeBrands />
    <HomeServices />
    <HomeCases />
    <HomeMetrics />
    <HomeTestimonials />
    <HomeContact />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
}
</style>