# PLNC Works — Yakında

Animasyonlu açılış sayfası. HTML, CSS, JavaScript ve logo hazırdır.
Ek yazılım, paket kurulumu veya derleme gerektirmez.

## GitHub’a yükleme

1. GitHub’da bir repo oluşturun (ücretsiz GitHub hesabında Public).
2. ZIP’i bilgisayarınızda çıkarın.
3. Repo sayfasında **Add file → Upload files** seçin.
4. Bu klasörün içindeki `index.html`, `assets`, `CNAME` ve diğer dosyaları yükleyin.
   `index.html` reponun ana dizininde olmalı; dış klasörü veya ZIP’i yüklemeyin.
5. **Commit changes** ile kaydedin.
6. **Settings → Pages → Build and deployment** bölümünde:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
7. **Save** seçin. Yayın bağlantısı aynı sayfada görüntülenir.

## plncworks.com bağlantısı

`CNAME` dosyası `plncworks.com` için hazırdır.
**Settings → Pages → Custom domain** alanına `plncworks.com` yazın.
Domain sağlayıcınızda GitHub Pages’in istediği DNS kayıtlarını tanımlayın.
DNS ve sertifika hazır olduğunda **Enforce HTTPS** seçeneğini etkinleştirin.
Domaini henüz bağlamayacaksanız `CNAME` dosyasını kaldırın.

Güncel resmi talimatlar:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Dosyalar

- `index.html`: Sayfanın metni ve yapısı
- `assets/style.css`: Tasarım ve açılış animasyonu
- `assets/main.js`: Çizgi hareketleri, + imleç ve logo etkileşimi
- `assets/plnc-logo.png`: PLNC logosu ve favicon
- `CNAME`: Domain adı
- `.nojekyll`: Statik dosyalar için GitHub Pages ayarı

## Önizleme

`index.html` dosyasını çift tıklayın. `assets` klasörü yanında kalmalıdır.
Tüm bağlantılar göreli olduğu için repo alt dizininde de çalışır.
Harici font, kütüphane veya görsel servisi kullanılmaz.
