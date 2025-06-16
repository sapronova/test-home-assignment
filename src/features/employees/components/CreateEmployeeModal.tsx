import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Divider,
  useTheme,
} from '@mui/material'
import type { SelectChangeEvent, Theme } from '@mui/material'
import { useState, useCallback } from 'react'

import type { EmployeeStatus } from '@/types'

interface CreateEmployeeModalProps {
  open: boolean
  handleClose: () => void
  onEmployeeCreated: () => Promise<void>
}

const inputStyles = (theme: Theme) => ({
  mb: 2,
  '& .MuiInputLabel-root': {
    color: theme.palette.grey[500],
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.grey[500],
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.palette.grey[500],
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: theme.palette.grey[500],
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.grey[500],
  },
})

const CreateEmployeeModal = ({
  open,
  handleClose,
  onEmployeeCreated,
}: CreateEmployeeModalProps) => {
  const theme = useTheme()

  const [name, setName] = useState('')
  const [status, setStatus] = useState<EmployeeStatus>('Working')
  const [nameError, setNameError] = useState('')

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
      if (nameError) setNameError('')
    },
    [nameError]
  )

  const handleStatusChange = useCallback((event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as EmployeeStatus)
  }, [])

  const validateName = (value: string) => value.replace(/\s/g, '').length >= 2

  const handleSubmit = async () => {
    if (!validateName(name)) {
      setNameError('Name must be at least 2 non-space characters')
      return
    }

    await onEmployeeCreated()

    setName('')
    setStatus('Working')
    setNameError('')
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 0 }}>
        <Box sx={{ py: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="User name:"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={handleNameChange}
            error={!!nameError}
            helperText={nameError}
            sx={inputStyles(theme)}
          />

          <FormControl fullWidth margin="dense" variant="standard" sx={inputStyles(theme)}>
            <InputLabel>Status:</InputLabel>
            <Select value={status} onChange={handleStatusChange} label="Status">
              <MenuItem value="Working">Working</MenuItem>
              <MenuItem value="OnVacation">On Vacation</MenuItem>
              <MenuItem value="LunchTime">Lunch Time</MenuItem>
              <MenuItem value="BusinessTrip">Business Trip</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start', px: 3, pb: 4 }}>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            textTransform: 'none',
            '&:hover': { bgcolor: 'primary.dark' },
            py: 0.5,
            px: 2.5,
          }}
        >
          Create
        </Button>
        <Button
          onClick={handleClose}
          sx={{ textTransform: 'none', color: theme.palette.grey[900] }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateEmployeeModal
