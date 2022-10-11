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
- [MongoDB](https://mongodb.com)
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
- apps
  - fisdascms-client -> (aplikasi frontend)
    - components -> (berisi komponen-komponen UI. contoh: button, navbar, card)
    - core
      - lib
        - helpers -> (berisi kumpulan function pembantu)
        - constants -> (berisi kumpulan variabel yang nilai nya bersifat tetap)
      - services -> (berisi function untuk menjalankan fitur-fitur / use cases)
      - types -> (berisi tipe data entitas bisnis)
    - layouts -> (berisi template layout halaman)
    - pages -> (berisi file yang akan ditampilkan sebagai halaman di web)
    - public -> (berisi file statis. contoh: gambar, svg, favicon, dll)
    - styles -> (berisi file CSS)
  - fisdascms-server -> (aplikasi backend)
    - src -> (berisi source code aplikasi)
      - core -> (berisi core entities bussiness)
      - database -> (berisi module untuk handle database)
      - use-case -> (berisi module-module application domain)
    - test -> (berisi source code e2e testing)
