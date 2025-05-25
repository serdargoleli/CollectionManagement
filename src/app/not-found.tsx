// src/app/not-found.tsx
"use client";

import NextLink from "next/link";
import { NAVIGATION } from "@/core/constants/navigation";

export default function NotFound() {
  return (
    <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-7xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-gray-900">Aradığınız Sayfa Bulunamadı</h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          <a href="https://wwww.serdargoleli.com" target="_blank">
            @serdargoleli
          </a>
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NextLink
            href={NAVIGATION.HOME}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Anasayfaya Dön
          </NextLink>
        </div>
      </div>
    </main>
  );
}
