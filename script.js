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
            about_card_3_p: "혁신적인 기술력(Technology)을 바탕으로 즐겁게 일하며 끊임없이 도전합니다.",
            biz_tab_1: "반려동물제조업",
            biz_tab_2: "마무리건설업",
            biz_tab_3: "구제선교사업",
            biz_pet_h: "반려동물 관련 사업",
            biz_pet_lead: "하스펫(Haspet)을 통해 프리미엄 반려동물 라이프스타일을 제안합니다.",
            biz_pet_l1: "프리미엄 펫 가구 & 안전매트:",
            biz_pet_l1_d: "쁘띠 쇼파, 침대, 카시트, 안전매트 등",
            biz_pet_l2: "펫 라이프스타일:",
            biz_pet_l2_d: "건강을 생각한 수제 사료 및 저자극 어메니티",
            biz_pet_l3: "AI 스마트 공간:",
            biz_pet_l3_d: "반려동물의 관절과 활동성을 고려한 맞춤형 환경",
            biz_pet_l4: "OEM 전문 제조:",
            biz_pet_l4_d: "고객사 맞춤형 OEM/ODM 생산 시스템 구축",
            biz_pet_l5: "대표 브랜드:",
            biz_pet_l5_d: "하스펫 (HASPET)",
            biz_con_h: "마무리건설업 & 바닥재",
            biz_con_lead: "안전하고 쾌적한 공간의 마무리를 책임지는 바닥재 전문 시공 및 유통.",
            biz_con_l1: "안전한 공간시공:",
            biz_con_l1_d: "프리미엄 마감재를 활용한 토탈 케어 솔루션",
            biz_con_l2: "전문 인테리어 마감:",
            biz_con_l2_d: "공간의 완성도를 높이는 디테일링 시공",
            biz_con_l3: "맞춤형 리모델링:",
            biz_con_l3_d: "사용자 니즈에 최적화된 마루 및 타일 시공",
            biz_con_l4: "주요 브랜드:",
            biz_con_l4_d: "매트허브, 리매트, 셀맘매트",
            plat_badge: "AI 스마트 공간 컨설팅",
            plat_title: "제니스 플로우 플랫폼",
            plat_desc_1: "하스놀의 '하늘공간 창조' 철학은 땅의 안정성을 곧 자유로운 움직임의 기반으로 재해석합니다.",
            plat_desc_2: "반려동물의 무게와 움직임에 따라 미세하게 밀도가 조절되는 적응형 표면을 갖춥니다.",
            cert_title: "검증된 기술력과 품질",
            archive_title: "Certification Archive",
            archive_subtitle: "하스놀의 기술력을 테이블 형태로 투명하게 공개합니다."
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
            about_card_3_h: "PLAY/TEC",
            about_card_3_p: "Constantly challenging based on innovative technology and joyful work.",
            biz_tab_1: "Pet Manufacturing",
            biz_tab_2: "Finishing Construction",
            biz_tab_3: "Social Outreach",
            biz_pet_h: "Pet Business Sector",
            biz_pet_lead: "Proposing premium pet lifestyles through our brand 'Haspet'.",
            biz_pet_l1: "Premium Pet Furniture:",
            biz_pet_l1_d: "Petit sofas, beds, car seats, safety mats, etc.",
            biz_pet_l2: "Pet Lifestyle:",
            biz_pet_l2_d: "Healthy homemade food and hypoallergenic amenities.",
            biz_pet_l3: "AI Smart Space:",
            biz_pet_l3_d: "Custom environments considering joint health and activity.",
            biz_pet_l4: "OEM Specialization:",
            biz_pet_l4_d: "Established OEM/ODM production systems for global partners.",
            biz_pet_l5: "Core Brand:",
            biz_pet_l5_d: "HASPET",
            biz_con_h: "Construction & Flooring",
            biz_con_lead: "Professional flooring construction and distribution for safe spaces.",
            biz_con_l1: "Safe Space Construction:",
            biz_con_l1_d: "Total care solutions using premium finishing materials.",
            biz_con_l2: "Interior Detailing:",
            biz_con_l2_d: "Detailing construction that enhances the perfection of the space.",
            biz_con_l3: "Custom Remodeling:",
            biz_con_l3_d: "Floor and tile construction optimized for user needs.",
            biz_con_l4: "Major Brands:",
            biz_con_l4_d: "MatHub, ReMat, SelmomMat",
            plat_badge: "AI Smart Space Consulting",
            plat_title: "Zenith Flow Platform",
            plat_desc_1: "HASNOL's philosophy reinterprets stability as the foundation for free movement.",
            plat_desc_2: "Features an adaptive surface that adjusts density based on pet weight and movement.",
            cert_title: "Verified Technology & Quality",
            archive_title: "Certification Archive",
            archive_subtitle: "Transparency in our technology via a structured archive."
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
            about_card_3_h: "玩耍/技术",
            about_card_3_p: "以创新的技术为基础, 愉快地工作并不断挑战。",
            biz_tab_1: "宠物产品制造",
            biz_tab_2: "精装修工程",
            biz_tab_3: "社会贡献事业",
            biz_pet_h: "宠物相关业务",
            biz_pet_lead: "通过 Haspet 提供优质的宠物生活方式。",
            biz_pet_l1: "高级宠物家具:",
            biz_pet_l1_d: "宠物沙发、床、安全座椅、安全垫等",
            biz_pet_l2: "宠物生活用品:",
            biz_pet_l2_d: "手工饲料和低刺激性洗浴用品",
            biz_pet_l3: "AI 智能空间:",
            biz_pet_l3_d: "考虑关节和活动的定制环境",
            biz_pet_l4: "OEM 专业制造:",
            biz_pet_l4_d: "为客户建立定制的 OEM/ODM 生产系统",
            biz_pet_l5: "核心品牌:",
            biz_pet_l5_d: "HASPET",
            biz_con_h: "装修工程与地材",
            biz_con_lead: "负责打造安全舒适空间的地面材料施工与流通。",
            biz_con_l1: "安全空间施工:",
            biz_con_l1_d: "使用高级装饰材料的全方位护理解决方案",
            biz_con_l2: "专业室内设计:",
            biz_con_l2_d: "提高空间完成度的细节施工",
            biz_con_l3: "定制化翻新:",
            biz_con_l3_d: "优化用户需求的地板和瓷砖施工",
            biz_con_l4: "主要品牌:",
            biz_con_l4_d: "MatHub, ReMat, SelmomMat",
            plat_badge: "AI 智能空间咨询",
            plat_title: "Zenith Flow 平台",
            plat_desc_1: "哈斯놀的哲学将地面的稳定性重新解释为自由移动的基础。",
            plat_desc_2: "具有根据宠物的重量和动作微调密度的自适应表面。",
            cert_title: "经过验证的技术和质量",
            archive_title: "认证档案",
            archive_subtitle: "以列表形式透明地公开哈斯놀的技术实力。"
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
    const certModal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.querySelector('.modal-close');
    const allCertTriggers = document.querySelectorAll('.cert-item, .archive-item');

    const updateLightboxImage = (item) => {
        const savedLang = localStorage.getItem('hasnol_lang') || 'ko';
        const suffix = (savedLang === 'ko') ? 'ko' : 'en';
        
        // Try specific lang img first, fallback to default
        let imgSrc = item.getAttribute(`data-cert-img-${suffix}`);
        if (!imgSrc) imgSrc = item.getAttribute('data-cert-img'); 
        
        if (imgSrc && modalImg) {
            modalImg.src = imgSrc;
        }
    };

    allCertTriggers.forEach(item => {
        item.addEventListener('click', () => {
            updateLightboxImage(item);
            if(certModal) certModal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
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
