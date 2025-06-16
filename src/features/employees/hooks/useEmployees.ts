import { useState, useEffect, useCallback, useMemo } from 'react'

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
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | 'All' | ''>('')

  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = searchTerm
        ? employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true

      const matchesStatus =
        statusFilter && statusFilter !== 'All' ? employee.status === statusFilter : true

      return matchesSearch && matchesStatus
    })
  }, [employees, searchTerm, statusFilter])

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/users')

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = (await response.json()) as Employee[]
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

      const response = await fetch(`/users/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        setEmployees(prev =>
          prev.map(emp => (emp.id === id ? { ...emp, status: emp.status } : emp))
        )
        throw new Error('Update failed')
      }
    } catch (err) {
      console.error('Update error:', err)
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
