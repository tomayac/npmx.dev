<script setup lang="ts">
const props = defineProps<{
  packageName: string
  description?: string | null
}>()

const canShare = 'share' in navigator

async function share() {
  await navigator.share({
    title: props.packageName,
    text: props.description ?? props.packageName,
    url: window.location.href,
  }).catch(() => {})
}
</script>

<template>
  <ButtonBase
    v-if="canShare"
    variant="secondary"
    classicon="i-lucide:share-2"
    :aria-label="$t('package.share_aria_label', { package: packageName })"
    @click="share"
  >
    <span class="max-sm:sr-only">{{ $t('package.links.share') }}</span>
  </ButtonBase>
</template>
