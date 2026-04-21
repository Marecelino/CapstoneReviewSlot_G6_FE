import { Box, CircularProgress } from '@mui/material';

interface LoadingOverlayProps {
  fullPage?: boolean;
}

export function LoadingOverlay({ fullPage = false }: LoadingOverlayProps) {
  if (fullPage) {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255,255,255,0.7)',
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <CircularProgress size={40} />
    </Box>
  );
}
