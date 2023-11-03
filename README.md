<h1 align="center">
 route-frontend
</h1>

Kullanıcıların belirledikleri konuma ve bütçeye göre özel seyahat rotaları oluşturabilecekleri, her türlü seyahat deneyimini içeren kapsamlı bir web uygulamasıdır. Bu platform, gezginlere yeme-içme yerlerinden gezilecek yerlere, tarihi ve kültürel mekanlardan alışveriş noktalarına ve eğlence-spor aktivitelerine kadar her şeyi içeren seyahat deneyimleri sunar.

> :warning: Lütfen yeni bir `branch` oluşturduktan sonra projede değişiklik yapınız. Değişiklik yaptığınız dosyalarda kod formatına uymayan yani altı kızarılı satırların bulunmadığından emin olunuz. Kodu formatlamak için dosyayı kaydedip kodu formatlayabilirsiniz Değişiklikleri `git`'e attıktan sonra `pull request` açabilirsiniz.

## Menu

- [Başlamadan Önce](#başlamadan-önce)
- [Linter Kullanımı](#linter-kullanımı)
- [Dosya Yapısı](#dosya-yapısı)
- [Kullanımlar](#kullanımlar)
- [Katkıda Bulunanlar](#katkıda-bulunanlar)
- [Lisans](#lisans)

## Başlamadan Önce

### İndirme

```bash
git clone https://github.com/create-travel-route/rota-frontend
cd route-frontend
```

### Kurulum

```bash
npm install
```

### Ortam Değişkenlerini Ayarlama

```bash
cp sample.env .env
```

### Çalıştır

```bash
npm start
```

## Linter Kullanımı

ESLint ve Prettier - Code formatter uzantılarını VSCode'a ekleyiniz. Ayarlar ikonundan `Settings > Settings.json` dosyasına alttaki kodu ekleyiniz. Kod eklendikten sonra kuraldışı kullanımların altı kızaracak. Sayfayı kaydederseniz kod otomatik olarak formatlanacaktır.

```json
{
  "eslint.validate": ["javascript"],
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnPaste": true
}
```

## Dosya Yapısı

```
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── locales
│   │   ├── en
│   │   │   └── translation.json
│   │   └── tr
│   │       └── translation.json
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── sample.env
└── src
    ├── App.css
    ├── App.js
    ├── Components
    ├── Constants
    ├── Contexts
    ├── Hooks
    ├── Pages
    ├── Schemas
    ├── Theme
    │   ├── Components.js
    │   ├── Palette.js
    │   └── index.js
    ├── Utils
    │   └── i18n.js
    └── index.js
```

## Kullanımlar

| Klasörler  | Açıklama                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Components | Komponentler bu klasörde olmalıdır. `index` dosyasında komponentleri tanımlamayı unutmayınız.                                                                |
| Constants  | Sabit değişkenler için bu klasörde dosya oluşturabilirsiniz.                                                                                                 |
| Contexts   | Contextler için bu klasörde dosya oluşturabilirsiniz.                                                                                                        |
| Hooks      | Komponentler bu klasörde olmalıdır. `index` dosyasında tanımlamayı unutmayınız.                                                                              |
| Pages      | Sayfalar bu klasörde olmalıdır. `sayfaAdı/index.jsx` klasör ve dosyalar şeklinde oluşturunuz. `Pages/index.js` dosyasında sayfaları tanımlamayı unutmayınız. |
| Schemas    | Validasyon şemaları bu klasörde olmalıdır.                                                                                                                   |
| Theme      | Material UI'daki komponentleri özelleştirmek için stilleri `Components.js`'te düzenleyebilirsiniz. `Palette.js`'te renk paletini tanımlayabilirsiniz.        |
| Utils      | Bu klasörü projede birden fazla yerde kullanılacak işlevler için kullanabilirsiniz.                                                                          |

### Dil desteği kullanımı

`/locales` içindeki dil klasörlerinde `translation.json` dosyaları içine çevirileri yazabilirsiniz.

`locales/en/translation.json`

```json
{
  "project.name": "Route",
  "[pageTitle].[variableName]": "xxxx"
}
```

`locales/tr/translation.json`

```json
{
  "project.name": "Rota",
  "[pageTitle].[variableName]": "xxxx"
}
```

## Katkıda Bulunanlar

<a href = "https://github.com/create-travel-route/rota-frontend/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=create-travel-route/rota-frontend"/>
</a>

## Lisans

[GNU GENERAL PUBLIC LICENSE Version 3](./LICENSE)
