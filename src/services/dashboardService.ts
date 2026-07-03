import type { DashboardData } from '../types'
import { apiFetch } from './api'

export const fetchDashboardData = async (): Promise<DashboardData> => {
  return apiFetch<DashboardData>('/dashboard')
}
