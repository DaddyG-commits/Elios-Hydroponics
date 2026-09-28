'use client'

import { useEffect, useRef } from 'react'

/**
 * CryptoByt-style fluid scroll:
 * - progress bar
 * - cards fade in / out like water as they enter & leave the viewport
 * - parallax layers
 * - sticky story frames crossfade
 */
export default function ScrollFluid() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const progressEl = progressRef.current
    const fluidCards = Array.from(
      document.querySelectorAll<HTMLElement>('[data-fluid]')
    )
    const parallax = Array.from(
      document.querySelectorAll<HTMLElement>('[data-parallax]')
    )
    const frames = Array.from(
      document.querySelectorAll<HTMLElement>('[data-frame]')
    )

    let ticking = false

    function update() {
      ticking = false
      const scrollY = window.scrollY || window.pageYOffset
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const p = docH > 0 ? Math.min(1, Math.max(0, scrollY / docH)) : 0

      if (progressEl) {
        progressEl.style.transform = `scaleX(${p})`
      }

      if (prefersReduced) {
        fluidCards.forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
        return
      }

      const vh = window.innerHeight

      // Water-like: cards rise into view, peak in center, fade as they leave
      fluidCards.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const mid = rect.top + rect.height / 2
        // 0 at top edge, 1 at center, 0 at bottom edge
        const distFromCenter = (mid - vh / 2) / (vh * 0.72)
        const intensity = Math.max(0, 1 - Math.abs(distFromCenter))
        // Soft ease
        const ease = intensity * intensity * (3 - 2 * intensity)
        const y = (1 - ease) * (distFromCenter > 0 ? 48 : -28)
        const scale = 0.94 + ease * 0.06
        el.style.opacity = String(0.12 + ease * 0.88)
        el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`
        el.style.willChange = 'opacity, transform'
      })

      parallax.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.25
        const rect = el.getBoundingClientRect()
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed
        el.style.transform = `translate3d(0, ${offset * -0.12}px, 0)`
      })

      frames.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const mid = rect.top + rect.height / 2
        const dist = Math.abs(mid - vh / 2) / (vh * 0.55)
        const intensity = Math.max(0, 1 - dist)
        el.style.setProperty('--frame-intensity', String(intensity))
      })
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={progressRef} className="eh-scroll-progress" aria-hidden />
}
