import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { FormControl, Select, MenuItem, Typography } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'

import { employeeStatuses } from '@/types'

const statusOptions = ['All', ...employeeStatuses] as const

const labelMap: Record<(typeof statusOptions)[number], string> = {
  All: 'All',
  Working: 'Working',
  OnVacation: 'On Vacation',
  LunchTime: 'Lunch Time',
  BusinessTrip: 'Business Trip',
}

type StatusFilterValue = (typeof statusOptions)[number] | ''

interface StatusFilterProps {
  statusFilter: StatusFilterValue
  setStatusFilter: (status: StatusFilterValue) => void
}

const StatusFilter = ({ statusFilter, setStatusFilter }: StatusFilterProps) => {
  const handleChange = (event: SelectChangeEvent<StatusFilterValue>) => {
    setStatusFilter(event.target.value)
  }

  return (
    <FormControl variant="standard" size="small" sx={{ minWidth: 200 }}>
      <Select
        value={statusFilter}
        onChange={handleChange}
        displayEmpty
        IconComponent={KeyboardArrowDownIcon}
        renderValue={selected =>
          selected ? (
            labelMap[selected]
          ) : (
            <Typography color="textSecondary">Filter by status</Typography>
          )
        }
        disableUnderline
        sx={{
          '& .MuiSelect-select': {
            padding: '8px 12px',
          },
        }}
        inputProps={{ 'aria-label': 'Filter employees by status' }}
      >
        {statusOptions.map(key => (
          <MenuItem key={key} value={key}>
            {labelMap[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default StatusFilter
