import { createPinia } from 'pinia'

const pinia = createPinia()

export function useStore() {
  return pinia
}

export function installPinia(app) {
  app.use(pinia)
}
