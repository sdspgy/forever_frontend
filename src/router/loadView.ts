export const view = (url: string) => () => import(`@/views/${url}.vue`)
export const template = (url: string) => () => import(`@/components/${url}.vue`)
