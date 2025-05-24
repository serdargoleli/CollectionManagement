"use client";

import { signOut, useSession } from "next-auth/react";

export default function CollectionsPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Yükleniyor...</p>;

  if (!session) return <p>Giriş yapılmamış. Lütfen giriş yapınız.</p>;

  return (
    <div>
      <h1>Koleksiyonlar</h1>
      <p>Hoşgeldin, {session.user?.email}</p>
      <p>Access Token: {session?.accessToken}</p>
      <button onClick={() => signOut()}>Çıkış Yap</button>
    </div>
  );
}
