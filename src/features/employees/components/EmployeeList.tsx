import Grid from '@mui/material/Grid'

import EmptyState from '@/components/common/EmptyState'
import SkeletonCard from '@/components/common/SkeletonCard'
import { Employee, EmployeeStatus } from '@/types'

import EmployeeCard from './EmployeeCard'

interface EmployeeListProps {
  employees: Employee[]
  updateEmployeeStatus: (id: number, status: EmployeeStatus) => void
  loading: boolean
}

const EmployeeList = ({ employees, updateEmployeeStatus, loading }: EmployeeListProps) => {
  if (loading) {
    return (
      <Grid container columnSpacing={4} rowSpacing={5} size={12}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (!employees.length) {
    return <EmptyState message="Employees not found" />
  }

  return (
    <Grid container columnSpacing={4} rowSpacing={5} size={12}>
      {employees.map(employee => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={employee.id}>
          <EmployeeCard employee={employee} updateEmployeeStatus={updateEmployeeStatus} />
        </Grid>
      ))}
    </Grid>
  )
}

export default EmployeeList
