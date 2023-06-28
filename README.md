![fisdascms-logo-64](https://user-images.githubusercontent.com/49353967/178111182-c7974bb8-1a5d-44ba-b78d-837132385e87.png)
# Fisdas CMS
Website CMS (Content Management System) Lab Fisika Dasar Telkom University, website ini berfungsi untuk mengatur konten yang ada pada website utama Lab Fisika Dasar Telkom University

## Daftar isi
- [Fisdas CMS](#fisdas-cms)
  - [Daftar isi](#daftar-isi)
  - [Yang diperlukan](#yang-diperlukan)
  - [Struktur folder](#struktur-folder)


## Yang diperlukan
Sebelum menjalankan aplikasi ini, install tools dibawah ini:
- [Node.js](https://nodejs.org)

## Struktur folder
fisdascms-client -> (aplikasi frontend)
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
