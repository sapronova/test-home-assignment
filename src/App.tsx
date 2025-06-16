import { Container, ThemeProvider } from '@mui/material'

import Header from './components/layout/Header'
import { EmployeesPage } from './features/employees/pages/EmployeesPage'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: '100vh',
          width: '100vw',
          backgroundColor: 'grey.100',
          overflowX: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        <Header />

        <EmployeesPage />
      </Container>
    </ThemeProvider>
  )
}

export default App
