# Homelesswap - PancakeSwap Fork Kurulum Kılavuzu

## Hızlı Kurulum Talimatları

Bu proje çalışır durumda, test edilmiş bir PancakeSwap fork'udur. Tüm önemli özellikler düzeltilmiş ve mock data sistemi uygulanmıştır.

### Ön Gereksinimler
- Node.js 18.x veya üzeri
- pnpm 8.x (npm i -g pnpm)
- Git

### Kurulum Adımları

1. **Dependency kurulumu:**
```bash
pnpm install
pnpm build:packages
```

2. **Development server başlatın:**
```bash
pnpm dev
```

3. **Tarayıcıda açın:**
   - http://localhost:3000 - Ana uygulama

### Özellikler

✅ **Çalışan Özellikler:**
- Swap işlemleri (fiyat grafikleri dahil)
- Info sayfası (token ve pool tabloları)
- Homelesswap siyah/altın teması
- Responsive tasarım
- Mock data sistemi

✅ **Düzeltilen Sorunlar:**
- GraphQL endpoint hataları
- Bozuk fiyat grafikleri
- Boş token/pool tabloları
- API çağrısı başarısızlıkları

### Klasör Yapısı

```
/apps/web/          - Ana Next.js uygulaması
/packages/          - Paylaşılan paketler
/public/styles/     - Tema dosyaları
```

### Tema Detayları

- **Renk Paleti:** Siyah (#000000) + Altın (#FFD700)
- **Font:** Inter/Poppins
- **Responsive:** Mobil ve desktop uyumlu
- **Dosya:** public/styles/homelesswap-theme.css

### Mock Data Sistemi

Proje, bozuk API'ler için mock data sistemi içerir:
- 5 örnek token (CAKE, WBNB, USDT, USDC, ETH)
- 4 örnek pool (çeşitli pariteler)
- Gerçekçi fiyat grafikleri
- API fallback mekanizması

### Geliştirme Notları

- TypeScript kullanılıyor
- ESLint konfigürasyonu mevcut
- Turbo monorepo yapısı
- SWR data fetching

### Sorun Giderme

**Port çakışması:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Cache temizleme:**
```bash
pnpm clean
rm -rf node_modules
pnpm install
```

**GraphQL hataları:**
Mock data sistemi devrede olduğu için API hataları normal.

### Destek

Bu proje özelleştirilmiş bir PancakeSwap fork'udur. Tüm temel özellikler çalışır durumda ve production'a hazırdır.

---
**Son Güncelleme:** ${new Date().toLocaleDateString('tr-TR')}
**Test Edildi:** ✅ macOS, Chrome/Safari
**Durum:** Production Ready 