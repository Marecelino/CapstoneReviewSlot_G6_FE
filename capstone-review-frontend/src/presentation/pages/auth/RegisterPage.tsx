import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerSchema, type RegisterFormData } from '@/utils/validators';
import { authRepository } from '@/data/repositories/AuthRepository';
import { ROUTES } from '@/utils/constants';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    try {
      await authRepository.register({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate(ROUTES.LOGIN);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Đăng ký thất bại. Vui lòng thử lại.';
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
            <Typography variant="h4" fontWeight={700} color="primary">
              Đăng ký
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Tạo tài khoản mới
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
            />

            <TextField
              {...register('fullName')}
              label="Họ và tên"
              type="text"
              fullWidth
              margin="normal"
              error={Boolean(errors.fullName)}
              helperText={errors.fullName?.message}
              autoComplete="name"
            />

            <TextField
              {...register('password')}
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
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
              }}
            />

            <TextField
              {...register('confirmPassword')}
              label="Xác nhận mật khẩu"
              type={showConfirm ? 'text' : 'password'}
              fullWidth
              margin="normal"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm(!showConfirm)}
                      edge="end"
                      size="small"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
              {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>

            <Typography variant="body2" textAlign="center" color="text.secondary">
              Đã có tài khoản?{' '}
              <Link component={RouterLink} to={ROUTES.LOGIN}>
                Đăng nhập
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
