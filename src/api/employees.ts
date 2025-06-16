import type { Employee, EmployeeStatus } from '../types'

import apiClient from './axios'

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get<Employee[]>('/users')
  return response.data
}

export const updateEmployeeStatus = async (
  id: number,
  status: EmployeeStatus
): Promise<Employee[]> => {
  const response = await apiClient.post<Employee[]>(`/users/${id}`, { status })
  return response.data
}

export const createEmployee = async (name: string, status: EmployeeStatus): Promise<Employee[]> => {
  const response = await apiClient.post<Employee[]>('/users', { name, status })
  return response.data
}
