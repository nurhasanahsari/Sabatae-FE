import { useState } from 'react';

// material ui
import { Stack, TextField, Button, IconButton, InputAdornment, Typography, Alert, FormHelperText, CircularProgress } from '@mui/material';

// project imports
import useAuth from '@/hooks/useAuth';
import useScriptRef from '@/hooks/useScriptRef';
import AnimateButton from '@/ui-component/extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Markup } from 'interweave';

// assets
import { IconChevronRight } from '@tabler/icons-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = ({ ...others }) => {
  const scriptedRef = useScriptRef();
  const { submitLogin } = useAuth();

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Format email tidak valid').max(255).required('Email wajib diisi'),
        password: Yup.string().max(255).required('Password wajib diisi'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        setLoadingLogin(true);
        await submitLogin(values.email, values.password).then((res) => {
          try {
            if (res && res.status !== 201) {
              setStatus({ success: false });
              setErrors({ code: res.status, submit: res.data.message });
              setSubmitting(false);
              setLoadingLogin(false);
            }
          } catch (error) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: 'Terjadi kesalahan, silahkan hubungi admin' });
              setSubmitting(false);
              setLoadingLogin(false);
            }
          }
        });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <>
          {errors.submit && (
            <Alert severity="error">
              <Markup content={errors.submit} />
            </Alert>
          )}
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Stack gap={3}>
              <Stack gap={1}>
                <Typography>Email</Typography>
                <TextField placeholder="Tuliskan Email" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Stack>
              <Stack gap={1}>
                <Typography>Password</Typography>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  placeholder="Tuliskan Password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
              <Stack alignItems="center">
                {loadingLogin ? (
                  <CircularProgress />
                ) : (
                  <AnimateButton>
                    <Button type="submit" variant="contained" endIcon={<IconChevronRight />} disabled={loadingLogin}>
                      Masuk
                    </Button>
                  </AnimateButton>
                )}
              </Stack>
            </Stack>
          </form>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
