![fisdascms-logo-64](https://user-images.githubusercontent.com/49353967/178111182-c7974bb8-1a5d-44ba-b78d-837132385e87.png)
# Fisdas CMS
Website CMS (Content Management System) Lab Fisika Dasar Telkom University, website ini berfungsi untuk mengatur konten yang ada pada website utama Lab Fisika Dasar Telkom University

## Daftar isi
1. [Yang diperlukan](#yang-diperlukan)
2. [Menjalankan aplikasi](#menjalankan-aplikasi)
3. [Struktur folder](#struktur-folder)


## Yang diperlukan
Sebelum menjalankan aplikasi ini, install tools dibawah ini:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

## Menjalankan aplikasi
Untuk menjalankan aplikasi ini di laptop / PC kamu, jalankan perintah-perintah di bawah ini pada terminal / cmd:
1. Clone repository
```
git clone https://github.com/izzuzantyaf/fisdascms
cd fisdascms
```
2. Install dependencies
```
yarn install
```
3. Sesuaikan environment variables
### Menjalankan aplikasi server (backend)
```
yarn dev:server
```
### Menjalankan aplikasi client (frontend)
```
yarn dev:client
```

## Struktur folder
```
|_ apps
|__ fisdascms-client -> (aplikasi frontend)
|___ components -> (berisi komponen-komponen UI. contoh: button, navbar, card)
|___ core
|____ lib
|____ services
|____ types
|__ fisdascms-server -> (aplikasi backend)
```
