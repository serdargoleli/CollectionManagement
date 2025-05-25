import React from "react";
import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const image =
    "https://media.licdn.com/dms/image/v2/D4D03AQEFjkWc-8TmVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725376242541?e=1753920000&v=beta&t=XfzCOyfw0jyRo_0UijFP0FEBLAWMzYOoQz_FZCX4hg0";
  const { data: session, status } = useSession();
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">Koleksiyon </h1>
      </div>
      <div className="header-right">
        <img className="h-10 w-10 rounded-full object-cover" src={image} alt="Serdar GÖLELİ" loading="lazy" />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-800 sm:text-base">Hoşgeldin,</p>
          <p className="max-w-xs truncate text-xs text-gray-600 sm:text-sm">{session?.user.email}</p>
        </div>
        <Button onClick={() => signOut()} variant="outlined" color="primary" size="small" className="ml-auto">
          Çıkış Yap
        </Button>
      </div>
    </header>
  );
};

export default Header;
