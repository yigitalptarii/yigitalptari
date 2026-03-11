document.addEventListener('DOMContentLoaded', () => {

    // Welcome Modal Kodları
    const welcomeModal = document.getElementById('welcomeModal');
    const closeModal = document.getElementById('closeModal');
    const visitorCountEl = document.getElementById('visitorCount');

    if (welcomeModal) {
        // Ziyaretçi sayacını localStorage ile simüle ediyoruz (Gerçek global sayım için bir veritabanı veya API gerekir)
        let baseCount = 0; // Gerçekçi olmak adına sayaç 0'dan başlıyor
        let localVisits = localStorage.getItem('site_visits') || 0;

        localVisits = parseInt(localVisits) + 1;
        localStorage.setItem('site_visits', localVisits);

        let totalCount = baseCount + localVisits;
        if (visitorCountEl) {
            visitorCountEl.textContent = totalCount.toLocaleString('tr-TR');
        }

        // Sayfa geçiş animasyonunun tamamlanması için bekleme süresini azalttık ve scroll kodunu güvenli hale getirdik
        setTimeout(() => {
            // Modalı açmadan önce sayfanın en başına (yukarıya) güvenli şekilde kaydır
            window.scrollTo(0, 0);

            welcomeModal.classList.add('show');
            // Modal açıkken arkadaki sayfanın kaydırılmasını (scroll) tamamen kilitle
            document.body.style.overflow = 'hidden';
        }, 300);

        // Çarpı butonundan Modalı kapat
        closeModal.addEventListener('click', () => {
            welcomeModal.classList.remove('show');
            // Modal kapandığında kaydırmayı (scroll) geri aç
            document.body.style.overflow = '';
        });

        // Modalın dışındaki karanlık alana tıklayınca da kapat
        welcomeModal.addEventListener('click', (e) => {
            if (e.target === welcomeModal) {
                welcomeModal.classList.remove('show');
                // Modal kapandığında kaydırmayı (scroll) geri aç
                document.body.style.overflow = '';
            }
        });
    }

    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetAttr = this.getAttribute('href');

            // Yeni sekme, mail veya tel linklerine dokunma
            if (this.target === '_blank' || targetAttr.startsWith('mailto:') || targetAttr.startsWith('tel:') || targetAttr.startsWith('javascript:')) {
                return;
            }

            // Aynı sayfa içi çapalara (anchor) dokunma
            if (targetAttr.startsWith('#')) return;

            // Form yollama butonlarına dokunma
            if (this.tagName === 'BUTTON') return;

            e.preventDefault();

            // Animasyonu başlat
            document.body.classList.add('page-exit');

            // Animasyon tamamlandıktan sonra yönlendirme yap
            setTimeout(() => {
                window.location.href = this.href;
            }, 550); // CSS'teki pageExit süresi (600ms perdenin kapanışı)
        });
    });
});

// Tarayıcıdan "Geri" tuşu ile dönüldüğünde sayfanın boş görünmemesi için
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        document.body.classList.remove('page-exit');
    }
});
