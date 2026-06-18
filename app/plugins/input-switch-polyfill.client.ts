export default defineNuxtPlugin(async () => {
  if (!('switch' in HTMLInputElement.prototype)) {
    await import('input-switch-polyfill')
  }
})
