import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginSchema, type LoginFormData } from '@/utils/validators';
import { useAuthStore } from '@/store/authStore';
import { authRepository } from '@/data/repositories/AuthRepository';
import { ROUTES, ROLE_DASHBOARD } from '@/utils/constants';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    try {
      const response = await authRepository.login(data);
      setAuth(response.accessToken, response.user);
      const target = ROLE_DASHBOARD[response.user.role] ?? ROUTES.LOGIN;
      navigate(target, { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Email hoặc mật khẩu không chính xác.';
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        p: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 440 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Capstone Review
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Hệ thống lập lịch đánh giá capstone
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              {...register('email')}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              autoComplete="email"
              autoFocus
            />

            <TextField
              {...register('password')}
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>

            <Typography variant="body2" textAlign="center" color="text.secondary">
              Chưa có tài khoản?{' '}
              <Link component={RouterLink} to={ROUTES.REGISTER}>
                Đăng ký ngay
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
