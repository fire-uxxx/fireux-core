export default defineAppConfig({
  icon: {
    // Set the default size for icons (e.g., '24px', '1.5rem', etc.)
    size: '22px'
  },
  ui: {
    colors: {
      primary: 'yellow',
      neutral: 'zinc'
    },
    card: {
      slots: {
        root: 'flex flex-col h-full',
        body: 'flex-grow'
      }
    }
  }
})
