import { debounce } from 'lodash' // ✅ Ensure debounce is imported

export function useEditHandler(updateFunction, options = {}) {
  const toast = useToast()
  const saveStatus = ref('')

  // Debounced save function for fields that require delayed updates
  const debouncedSave = debounce(async (label, field, value) => {
    try {
      saveStatus.value = 'saving'
      if (typeof updateFunction !== 'function') {
        throw new Error('updateFunction is not a valid function.')
      }
      await updateFunction({ [field]: value })
      saveStatus.value = 'saved'

      // Success toast with label
      toast.success(`${label} updated successfully`, { timeout: 3000 })

      setTimeout(() => {
        if (saveStatus.value === 'saved') {
          saveStatus.value = ''
        }
      }, options.delay || 2000)
    } catch (error) {
      console.error(`Error saving ${label}:`, error)
      saveStatus.value = 'error'

      // Error toast
      toast.error(`Failed to update ${label}`, { timeout: 3000 })
    }
  }, options.debounceTime || 800)

  // Immediate save function (non-debounced)
  async function saveField(label, field, newValue) {
    try {
      saveStatus.value = 'saving'
      if (typeof updateFunction !== 'function') {
        throw new Error('updateFunction is not a valid function.')
      }
      await updateFunction({ [field]: newValue })
      saveStatus.value = 'saved'

      toast.add({
        title: 'Success',
        description: `${label} updated successfully.`,
        color: 'success'
      })
    } catch (error) {
      toast.add({
        title: 'Error',
        description: `Failed to update ${label}.`,
        color: 'error'
      })
      throw error
    }
  }

  // Wrapper for debounced save
  function autoSave(label, field, value) {
    debouncedSave(label, field, value)
  }

  return { saveField, autoSave, saveStatus }
}
