import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

import type { Employee, EmployeeStatus } from '@/types'

interface EmployeeCardProps {
  employee: Employee
  updateEmployeeStatus: (id: number, status: EmployeeStatus) => void
}

const EmployeeCard = ({ employee, updateEmployeeStatus }: EmployeeCardProps) => {
  const theme = useTheme()
  const [status, setStatus] = useState<EmployeeStatus>(employee.status ?? '')
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value as EmployeeStatus
    setStatus(newStatus)
    updateEmployeeStatus(employee.id, newStatus)
  }

  const statusColorMap: Record<EmployeeStatus, string> = {
    Working: theme.palette.success.main,
    OnVacation: theme.palette.warning.main,
    LunchTime: theme.palette.info.main,
    BusinessTrip: theme.palette.secondary.main,
  }

  const getStatusColor = (status: EmployeeStatus) =>
    statusColorMap[status] ?? theme.palette.grey[500]

  return (
    <Card
      sx={{
        display: 'flex',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        transition: 'all 0.2s ease',
        p: 2,
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 6px 12px rgba(25, 118, 210, 0.25)',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '120px', md: '140px' },
          alignItems: 'center',
          justifyContent: 'center',
          pr: 2,
        }}
      >
        <Avatar
          src={employee.img}
          alt={employee.name}
          sx={{
            height: '100%',
            width: '100%',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            aspectRatio: 1,
          }}
        />
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          p: 0,
          ':last-child': {
            p: 0,
          },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '0.9375rem',
          }}
        >
          {employee.name}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid black',
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              border: '3px solid',
              borderColor: getStatusColor(status),
              bgcolor: 'white',
              mr: 1.2,
              flexShrink: 0,
            }}
          />

          <Select
            value={status}
            onChange={handleStatusChange}
            size="small"
            open={isSelectOpen}
            onClose={() => setIsSelectOpen(false)}
            onOpen={() => setIsSelectOpen(true)}
            sx={{
              minWidth: 120,
              width: '100%',
              '& .MuiSelect-select': {
                py: 0.5,
                pr: '24px !important',
                fontSize: '0.875rem',
              },
              '&:before': {
                borderBottom: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.12)',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottom: '1px solid',
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              '&:after': {
                borderBottom: 'none',
              },
            }}
            variant="standard"
            disableUnderline
          >
            <MenuItem value="Working" sx={{ fontSize: '0.875rem' }}>
              Working
            </MenuItem>
            <MenuItem value="OnVacation" sx={{ fontSize: '0.875rem' }}>
              On Vacation
            </MenuItem>
            <MenuItem value="LunchTime" sx={{ fontSize: '0.875rem' }}>
              Lunch Time
            </MenuItem>
            <MenuItem value="BusinessTrip" sx={{ fontSize: '0.875rem' }}>
              Business Trip
            </MenuItem>
          </Select>
        </Box>
      </CardContent>
    </Card>
  )
}

export default EmployeeCard
