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

    // 5. 3D Language Switcher Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // Set initial active state (Default is Korean)
    const setActiveLang = (langCode) => {
        langBtns.forEach(btn => {
            if(btn.getAttribute('data-lang') === langCode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Trigger Google Translate
    const translatePage = (langCode) => {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.value = langCode;
            googleSelect.dispatchEvent(new Event('change'));
        } else {
            // If google translate is not ready, try again in 500ms
            setTimeout(() => translatePage(langCode), 500);
        }
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setActiveLang(lang);
            translatePage(lang);
        });
    });

    // 6. Certification Modal (Lightbox) Logic
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.querySelector('.modal-close');
    const certItems = document.querySelectorAll('.cert-item');

    certItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-cert-img');
            if (imgSrc) {
                modalImg.src = imgSrc;
                certModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            }
        });
    });

    const closeModal = () => {
        certModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modalImg.src = "";
        }, 400);
    };

    modalClose.addEventListener('click', closeModal);
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) closeModal();
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal.classList.contains('active')) {
            closeModal();
        }
    });
});
