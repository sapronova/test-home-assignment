import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

const Header = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      <Box
        sx={{
          maxWidth: '100%',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Toolbar sx={{ paddingX: 2, paddingY: 0 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography fontWeight={700} fontSize={32} sx={{ color: 'customBlue.main' }}>
              Employees
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                textTransform: 'none',
                py: 0.5,
                px: 4,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.50',
                  borderColor: 'primary.600',
                  color: 'primary.600',
                },
              }}
            >
              Log Out
            </Button>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default Header
