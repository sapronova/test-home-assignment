import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    customBlue: Palette['primary']
  }

  interface PaletteOptions {
    customBlue?: PaletteOptions['primary']
  }
}
