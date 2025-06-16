import { useState, useEffect, useCallback, useMemo } from 'react'

import { getEmployees, updateEmployeeStatus } from '@/api/employees'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { Employee, EmployeeStatus } from '@/types'

interface UseEmployeesResult {
  employees: Employee[]
  filteredEmployees: Employee[]
  loading: boolean
  error: string | null
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: EmployeeStatus | 'All' | ''
  setStatusFilter: (status: EmployeeStatus | 'All' | '') => void
  updateStatus: (id: number, status: EmployeeStatus) => Promise<void>
  refetch: () => Promise<void>
}

export const useEmployees = (): UseEmployeesResult => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm)
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | 'All' | ''>('')

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = debouncedSearchTerm
        ? employee.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        : true

      const matchesStatus =
        statusFilter && statusFilter !== 'All' ? employee.status === statusFilter : true

      return matchesSearch && matchesStatus
    })
  }, [employees, debouncedSearchTerm, statusFilter])

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Failed to load employees')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateStatus = useCallback(async (id: number, status: EmployeeStatus) => {
    try {
      setEmployees(prev => prev.map(emp => (emp.id === id ? { ...emp, status } : emp)))
      await updateEmployeeStatus(id, status)
    } catch (err) {
      console.error('Update error:', err)
      setEmployees(prev => prev.map(emp => (emp.id === id ? { ...emp, status: emp.status } : emp)))
      throw err
    }
  }, [])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  return {
    employees,
    filteredEmployees,
    loading: isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateStatus,
    refetch: fetchEmployees,
  }
}
