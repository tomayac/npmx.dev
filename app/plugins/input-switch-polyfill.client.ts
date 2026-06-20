export default defineNuxtPlugin(async () => {
  if (!('switch' in HTMLInputElement.prototype)) {
    await import('input-switch-polyfill')

    // The polyfill reads `accent-color` once at upgrade time and freezes the
    // resolved color as `--switch-accent` in each element's inline style.
    // Re-sync whenever the accent or color-mode changes so switches react live.
    const syncSwitchAccent = () => {
      const switches = document.querySelectorAll<HTMLInputElement>('input.switch')
      if (!switches.length) return
      // All switches share the same cascade; read from the first one.
      const color = getComputedStyle(switches[0]).getPropertyValue('accent-color').trim()
      if (!color || color === 'auto') return
      for (const el of switches) {
        el.style.setProperty('--switch-accent', color)
      }
    }

    new MutationObserver(syncSwitchAccent).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    })
  }
})
