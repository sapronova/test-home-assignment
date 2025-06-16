import { Box } from '@mui/material'

import SearchBar from '@/components/common/SearchBar'

import { useEmployees } from '../hooks/useEmployees'

import EmployeeList from './EmployeeList'
import StatusFilter from './EmployeeStatusFilter'

const EmployeeListContainer = () => {
  const {
    filteredEmployees,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateStatus,
  } = useEmployees()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          mb: 3,
          gap: 2,
        }}
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </Box>

      <EmployeeList
        employees={filteredEmployees}
        updateEmployeeStatus={updateStatus}
        loading={loading}
      />
    </>
  )
}

export default EmployeeListContainer
