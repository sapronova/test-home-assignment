import { Card, CardContent, Box, Skeleton } from '@mui/material'

const SkeletonCard = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '2px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        p: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '120px', md: '140px' },
          width: '100%',
          pr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: '1 / 1',
        }}
      >
        <Skeleton
          variant="circular"
          sx={{
            width: '100%',
            height: '100%',
            aspectRatio: '1 / 1',
          }}
        />
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: 0,
          ':last-child': { p: 0 },
        }}
      >
        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Skeleton variant="circular" width={12} height={12} sx={{ mr: 1.2 }} />
          <Skeleton variant="text" width="50%" height={20} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default SkeletonCard
