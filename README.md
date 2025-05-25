## 📁 Ana Klasörü Yapısı

# [@serdargoleli](https://www.serdargoleli.com) SecilStore Colelction Management Case Proje Structured.

```plaintext
public/
src/                        # Uygulama kaynak kodları
├── app/                    # Uygulama yapısı ve sayfaları
├──── api/                  # API endpoint'leri (NextAuth)
├──── (auth)                # Login sayfası
├──── (main)                # collection ve collection edit sayfalarını içerir
├──── layout.tsx            # Uygulama genel layout'u
├──── global.css            # Global CSS stilleri
├──── not-found.tsx         # Bulunamadı sayfası
├── assest/                 # Uygulama varlıkları  (sadece scss dosyası mevcut) 
├── componenets/            # Uygulama bileşenleri
├── core/                   # Uygulama çekirdek yapısı – Detaylı Bilgi (src/core/README.md)
└── middleware/             # Middleware dosyası auth ve route guard kontrolü için

```

## 🐳 Docker ile Çalıştırma

### Kurulum ve Çalıştırma

1. **Deploy klasörüne gidin:**
    ```bash
      cd deploy
    ```
2. **Run**
    ```bash
      docker-compose up
    ```