// Memastikan semua elemen dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // Membuat Timeline GSAP. Timeline memungkinkan kita mengurutkan animasi
    // dan mengatur timing antar animasi agar terlihat terkoordinasi.
    const tl = gsap.timeline({
        defaults: {
            duration: 1.5, // Durasi default untuk setiap animasi
            ease: "power2.out", // Easing yang lebih halus, memberikan nuansa premium
            stagger: 0.3 // Penundaan halus antar objek, jika berlaku
        },
        repeat: 0 // Tidak mengulang
    });

    // --- Animasi Premium Daun ---

    // 1. Animasi Daun 1: Jatuh perlahan dengan sedikit goyangan
    tl.from("#leaf1", {
        y: -150, // Mulai 150px dari atas
        rotation: -45, // Rotasi awal
        opacity: 0,
        duration: 2, // Durasi lebih lama untuk kesan jatuh pelan
        delay: 0.5 // Mulai setelah jeda singkat
    })
    .to("#leaf1", {
        rotation: 45, // Goyangan halus
        yoyo: true, // Kembali ke posisi awal rotasi
        repeat: -1, // Goyangan tak terbatas setelah masuk
        duration: 5,
        ease: "none" // Gerakan goyang yang konstan
    }, "<0.5") // Mulai goyangan sedikit setelah masuk

    // 2. Animasi Daun 2: Muncul dari samping dengan putaran cepat
    // '<' berarti animasi ini dimulai bersamaan dengan animasi sebelumnya (atau setelah yang sebelumnya berakhir, tergantung konteks)
    // '+0.2' berarti memulai 0.2 detik setelah animasi sebelumnya berakhir (lebih tepatnya, setelah titik penambahan timeline terakhir)
    tl.from("#leaf2", {
        x: 100, // Mulai 100px dari kanan
        scale: 0.5, // Ukuran kecil
        rotation: 360, // Rotasi penuh
        opacity: 0,
        duration: 1.2,
    }, "<0.3") // Mulai sedikit lebih cepat daripada Daun 1 selesai

    // 3. Animasi Daun 3: Zoom-in dan Fade-in halus
    tl.from("#leaf3", {
        scale: 0, // Mulai dari ukuran nol
        opacity: 0,
        duration: 1.8,
        ease: "back.out(1.7)" // Easing 'back' memberikan efek pantulan premium
    }, "<0.5") // Mulai sebelum Daun 2 selesai untuk kesan 'simultan'

    // --- Animasi Teks/CTA ---

    // Animasi Headline
    tl.from("h1", {
        y: 20,
        opacity: 0,
        duration: 1
    }, "<0.8") // Hampir bersamaan dengan Daun 3

    // Animasi Paragraf dan Tombol CTA
    tl.from([".content-area p", ".cta-button"], {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2 // Teks dan tombol muncul bergantian
    }, "<0.5"); // Setelah headline

    // Opsional: Animasi Parallax kecil saat scroll (jika ingin lebih canggih,
    // memerlukan GSAP ScrollTrigger, tapi ini dasar saja)
    gsap.to(".hero-section", {
        y: -50,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

});
