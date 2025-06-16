import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Divider, Typography, CircularProgress } from '@mui/material'
import { useState, lazy, Suspense } from 'react'

import SearchBar from '@/components/common/SearchBar'

import EmployeeList from '../components/EmployeeList'
import StatusFilter from '../components/EmployeeStatusFilter'
import { useEmployees } from '../hooks/useEmployees'

const CreateEmployeeModal = lazy(() => import('../components/CreateEmployeeModal'))

export function EmployeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    filteredEmployees,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateStatus,
    refetch,
  } = useEmployees()

  return (
    <Box sx={{ maxWidth: '1200px', px: 3, py: 4, margin: '0 auto' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 8,
          gap: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
          endIcon={<AddIcon sx={{ fontSize: 28 }} />}
          sx={{
            flexShrink: 0,
            bgcolor: 'primary.main',
            textTransform: 'none',
            px: 4,
            py: 1.5,
            fontSize: '1.125rem',
            fontWeight: 500,
            '& .MuiButton-endIcon': {
              '& > *:nth-of-type(1)': {
                fontSize: 28,
              },
            },
          }}
        >
          Create
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            border: '1px solid',
            borderColor: theme => theme.palette.grey[100],
            borderRadius: 2,
            px: 2,
            py: 1,

            bgcolor: 'white',
            transition: 'border-color 0.2s ease',
            '&:focus-within': {
              borderColor: theme => theme.palette.primary.main,
            },
          }}
        >
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />
          <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
        </Box>
      </Box>

      {error && (
        <Box sx={{ textAlign: 'center', py: 2, color: 'error.main' }}>
          <Typography>{error}</Typography>
        </Box>
      )}

      <EmployeeList
        employees={filteredEmployees}
        updateEmployeeStatus={updateStatus}
        loading={loading}
      />

      {isModalOpen && (
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          <CreateEmployeeModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
            onEmployeeCreated={refetch}
          />
        </Suspense>
      )}
    </Box>
  )
}
