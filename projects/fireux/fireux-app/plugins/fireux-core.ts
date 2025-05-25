import { defineNuxtPlugin } from '#app'
import * as fireuxCore from '@fireux/core'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('fireuxCore', fireuxCore)
})
