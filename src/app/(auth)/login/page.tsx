"use client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { NAVIGATION } from "@/core/constants/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("web.serdargoleli@gmail.com");
  const [password, setPassword] = useState("vk$allcgij7RHy6FVbAoC%Tc&WDk4K");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setError(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      username: email,
      password,
    });

    setLoading(false);
    if (res?.error) {
      setError(res.error);
    } else {
      router.push(NAVIGATION.HOME);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-card">
        <div className="card-header">
          <h1 className="card-header-title">Koleksiyon Yönetim Paneli Giriş</h1>
          <p className="card-header-subtitle">Lütfen hesabınıza giriş yaparak koleksiyonlarınızı yönetmeye başlayın.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <TextField label="E-Posta" variant="standard" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />

          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="password-input">Şifre *</InputLabel>
            <Input
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button type="submit" loading={loading} variant="contained" fullWidth={true}>
            Giriş Yap
          </Button>
        </form>
        {error && (
          <Alert className="mt-4" severity="error">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
