// COMMENT: app/composables/app/effects/useStarfield.js
export function useStarfield() {
  const initializeStars = () => {
    const stars = document.querySelectorAll('.star')

    stars.forEach(star => {
      // ✅ Random horizontal position only
      star.style.left = `${Math.random() * 100}%`

      // ✅ Start at random positions in the animation cycle
      const startingPoint = Math.random() * 100
      star.style.top = `${startingPoint}%`

      // ✅ Initial transform to sync animation
      const initialYPos = 100 - startingPoint
      star.style.transform = `translateY(${initialYPos}vh)`

      // ✅ Random size
      const size = Math.random() * 1.5 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // ✅ Random initial opacity (0.1 to 0.5)
      const initialOpacity = Math.random() * 0.4 + 0.1
      star.style.opacity = initialOpacity

      // ✅ Random durations
      const twinkleDuration = Math.random() * 3 + 3
      const moveDuration = Math.random() * 340 + 340 // ⭐ Controls speed of movement upwards

      // ✅ Use negative delay to start at different animation points
      const moveDelay = -(moveDuration * (startingPoint / 100))
      const twinkleDelay = Math.random() * 2

      star.style.animationDelay = `${twinkleDelay}s, ${moveDelay}s`
      star.style.animationDuration = `${twinkleDuration}s, ${moveDuration}s`

      // ✅ Listen for animation end and reset star position
      star.addEventListener('animationiteration', () => {
        star.style.top = '100%' // Move back to bottom
        star.style.transform = `translateY(-100vh)` // Start moving up again
      })
    })
  }

  return {
    initializeStars
  }
}
