"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("web.serdargoleli@gmail.com");
  const [password, setPassword] = useState("vk$allcgij7RHy6FVbAoC%Tc&WDk4K");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    } else {
      router.push("/collections"); // Başarılıysa yönlendir
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 80 }}>
      <h1>Giriş Yap</h1>
      <form onSubmit={handleSubmit}>
        <label>
          E-posta
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Şifre
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
