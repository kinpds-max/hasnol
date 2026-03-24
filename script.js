document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    mobileBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        const icon = mobileBtn.querySelector('i');
        if(navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            document.body.classList.remove('no-scroll');
            mobileBtn.querySelector('i').classList.remove('fa-xmark');
            mobileBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealFunction = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if(revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealFunction);
    revealFunction(); // trigger on load

    // 4. Tabs Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // 5. Robust Multilingual Overhaul
    const langBtns = document.querySelectorAll('.lang-btn');
    
    const setActiveLang = (langCode) => {
        langBtns.forEach(btn => {
            if(btn.getAttribute('data-lang') === langCode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    const triggerTranslation = (langCode) => {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.value = langCode;
            googleSelect.dispatchEvent(new Event('change'));
            
            // Re-trigger for mobile stability
            setTimeout(() => {
                if (googleSelect.value !== langCode) {
                    googleSelect.value = langCode;
                    googleSelect.dispatchEvent(new Event('change'));
                }
            }, 300);
        } else {
            // Wait for Google Translate Engine to wake up
            const waitMsg = document.createElement('div');
            waitMsg.id = "trans-loading";
            waitMsg.innerHTML = "Translating page...";
            waitMsg.style = "position:fixed; bottom:20px; left:20px; background:rgba(0,0,0,0.8); color:white; padding:10px 20px; border-radius:30px; z-index:99999; font-size:12px;";
            if(!document.getElementById('trans-loading')) document.body.appendChild(waitMsg);
            
            setTimeout(() => {
                triggerTranslation(langCode);
                if(document.getElementById('trans-loading')) document.getElementById('trans-loading').remove();
            }, 1000);
        }
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setActiveLang(lang);
            triggerTranslation(lang);
        });
    });

    // 6. Certification Modal (Lightbox) Logic - Grid & Scroll Support
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.querySelector('.modal-close');
    
    // Select both cert-items AND archive-items
    const allCertTriggers = document.querySelectorAll('.cert-item, .archive-item');

    allCertTriggers.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-cert-img');
            if (imgSrc) {
                modalImg.src = imgSrc;
                certModal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    const closeModal = () => {
        if(certModal) certModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => { if(modalImg) modalImg.src = ""; }, 400);
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (certModal) certModal.addEventListener('click', (e) => {
        if (e.target === certModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Default Language Persistence (Optional)
    setActiveLang('ko');
});
