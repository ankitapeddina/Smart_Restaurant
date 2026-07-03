import type { MenuItem } from '../types'
import { featuredMenu, popularDishes } from '../constants/menu'

export const getFeaturedMenu = async (): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(featuredMenu), 300)
  })
}

export const getPopularDishes = async (): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(popularDishes), 300)
  })
}
