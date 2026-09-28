'use client'

import { useEffect, useRef } from 'react'

/**
 * Video-like scroll motion:
 * - soft inertia / progress bar
 * - parallax layers on hero
 * - sections fade/slide in as you scroll
 * - sticky "story frames" that pin like film frames
 */
export default function ScrollFluid() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const progressEl = progressRef.current
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
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

      if (prefersReduced) return

      const vh = window.innerHeight

      parallax.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.25
        const rect = el.getBoundingClientRect()
        const offset = (rect.top + rect.height / 2 - vh / 2) * speed
        el.style.transform = `translate3d(0, ${offset * -0.15}px, 0)`
      })

      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const visible = rect.top < vh * 0.88 && rect.bottom > vh * 0.08
        if (visible) el.classList.add('is-visible')
      })

      frames.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // Progress within viewport for opacity / scale feel
        const mid = rect.top + rect.height / 2
        const dist = Math.abs(mid - vh / 2) / (vh * 0.6)
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

  return (
    <div
      ref={progressRef}
      className="eh-scroll-progress"
      aria-hidden
    />
  )
}
