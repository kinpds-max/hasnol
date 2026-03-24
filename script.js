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
            if(mobileBtn.querySelector('i')) {
                mobileBtn.querySelector('i').classList.remove('fa-xmark');
                mobileBtn.querySelector('i').classList.add('fa-bars');
            }
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
    revealFunction(); 

    // 4. Tabs Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            if(document.getElementById(target)) document.getElementById(target).classList.add('active');
        });
    });

    // 5. REAL Custom Translation System (KO, EN, ZH)
    const translations = {
        ko: {
            nav_about: "기업소개",
            nav_philosophy: "핵심가치",
            nav_business: "주요사업",
            nav_platform: "플랫폼",
            nav_certs: "인증서",
            hero_badge: "하늘공간 창조 기업",
            hero_title_1: "하늘공간을 창조하는",
            hero_title_2: "테크놀로지",
            hero_desc: "단순한 장소를 넘어, 사람과 삶, 그리고 소중한 반려동물이 공존하는 가치 있는 공간을 만듭니다. 하늘공간에서 즐겁게 놀자, HASNOL.",
            hero_btn_1: "자세히 보기",
            hero_btn_2: "사업 분야",
            about_title: "하스놀 기업소개",
            about_subtitle: "하늘 + 스페이스 + 놀자",
            about_card_1_h: "하늘",
            about_card_1_p: "높은 이상과 숭고한 가치를 지향하며, 무한한 가능성을 상징합니다.",
            about_card_2_h: "스페이스",
            about_card_2_p: "단순한 장소를 넘어, 사람과 삶이 공존하는 가치 있는 공간을 창조합니다.",
            about_card_3_h: "놀자",
            about_card_3_p: "혁신적인 기술력(Technology)을 바탕으로 즐겁게 일하며 끊임없이 도전합니다."
        },
        en: {
            nav_about: "About",
            nav_philosophy: "Philosophy",
            nav_business: "Business",
            nav_platform: "Platform",
            nav_certs: "Certs",
            hero_badge: "Sky Space Creation",
            hero_title_1: "Technology Creating",
            hero_title_2: "Sky Spaces",
            hero_desc: "Beyond simple places, we create valuable spaces where people, life, and precious pets coexist. Let's play in sky space, HASNOL.",
            hero_btn_1: "View Details",
            hero_btn_2: "Business Sectors",
            about_title: "About HASNOL",
            about_subtitle: "Sky + Space + Play",
            about_card_1_h: "SKY",
            about_card_1_p: "Aiming for high ideals and noble values, symbolizing infinite possibilities.",
            about_card_2_h: "SPACE",
            about_card_2_p: "Beyond simple locations, we create valuable spaces where life and people coexist.",
            about_card_3_h: "PLAY",
            about_card_3_p: "Constantly challenging based on innovative technology and joyful work."
        },
        zh: {
            nav_about: "关于企业",
            nav_philosophy: "核心价值",
            nav_business: "主要业务",
            nav_platform: "平台",
            nav_certs: "认证",
            hero_badge: "创造天空空间的企业",
            hero_title_1: "创造天空空间的",
            hero_title_2: "技术",
            hero_desc: "超越简单的场所, 创造人, 生活, 以及珍贵的宠物共存的有价值的空间。在天空空间愉快地玩耍吧, HASNOL。",
            hero_btn_1: "查看详情",
            hero_btn_2: "业务领域",
            about_title: "HASNOL 企业介绍",
            about_subtitle: "天空 + 空间 + 玩耍",
            about_card_1_h: "天空",
            about_card_1_p: "志向高远的理想和崇高的价值, 象征着无限的可能性。",
            about_card_2_h: "空间",
            about_card_2_p: "超越简单的场所, 创造人与生活共存的有价值的空间。",
            about_card_3_h: "技术/玩耍",
            about_card_3_p: "以创新的技术为基础, 愉快地工作并不断挑战。"
        }
    };

    const switchLanguage = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });
        document.getElementById('current-lang-label').innerText = lang.toUpperCase();
        localStorage.setItem('hasnol_lang', lang);
    };

    // Lang Selector Floating Logic
    const langTrigger = document.querySelector('.lang-trigger');
    const langOptions = document.querySelector('.lang-options');
    const langOpts = document.querySelectorAll('.lang-opt');

    if (langTrigger) {
        langTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            langOptions.classList.toggle('active');
        });
    }

    langOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.getAttribute('data-lang');
            switchLanguage(lang);
            langOptions.classList.remove('active');
        });
    });

    document.addEventListener('click', () => {
        if(langOptions) langOptions.classList.remove('active');
    });

    // Load Saved Language
    const savedLang = localStorage.getItem('hasnol_lang') || 'ko';
    switchLanguage(savedLang);

    // 6. Certification Modal (Lightbox) Logic
    // (Re-adding lost modal logic if necessary, though it should be here)
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.querySelector('.modal-close');
    const allCertTriggers = document.querySelectorAll('.cert-item, .archive-item');

    allCertTriggers.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-cert-img');
            if (imgSrc) {
                if(modalImg) modalImg.src = imgSrc;
                if(certModal) certModal.classList.add('active');
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
});
