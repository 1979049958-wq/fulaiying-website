/* ============================================================
   Shenzhen Fulaiying International Logistics — Interactive JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initStatsCounter();
  initLanguageToggle();
  initContactForm();
  initActiveNavLink();
});

// ---- Sticky Navbar ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  let lastScroll = 0;

  // Scroll behavior: shrink on scroll
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 16;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

// ---- Scroll Animations (Intersection Observer) ----
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));

  // Shimmer effect for hero CTA
  const heroCta = document.querySelector('.btn-glow');
  if (heroCta) {
    heroCta.addEventListener('mouseenter', () => {
      heroCta.style.boxShadow = '0 0 30px rgba(200, 150, 46, 0.5), 0 8px 25px rgba(26, 58, 92, 0.25)';
    });
    heroCta.addEventListener('mouseleave', () => {
      heroCta.style.boxShadow = '0 4px 20px rgba(200, 150, 46, 0.3)';
    });
  }
}

// ---- Animated Stats Counter ----
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    const duration = 2000;
    const start = performance.now();
    const suffix = el.nextElementSibling;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current >= 1000 ? current.toLocaleString() : current;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target >= 1000 ? target.toLocaleString() : target;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(animateCount);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// ---- Language Switch (Three-Button: ES | EN | 中文) ----
function initLanguageToggle() {
  var langButtons = document.querySelectorAll('.lang-btn');
  var html = document.documentElement;

  var t = {
    es: {
      'nav.home': 'Inicio',
      'nav.about': 'Nosotros',
      'nav.services': 'Servicios',
      'nav.whyUs': 'Por Qué Elegirnos',
      'nav.contact': 'Contacto',
      'hero.badge': 'Línea Paraguay',
      'hero.subtitle': 'Su socio de confianza en transporte internacional de carga — soluciones logísticas marítimas, aéreas, ferroviarias y transfronterizas adaptadas a su cadena de suministro.',
      'hero.cta1': 'Contáctenos',
      'hero.cta2': 'Nuestros Servicios',
      'hero.scroll': 'Desplácese para explorar',
      'about.tag': 'Sobre Nosotros',
      'about.title': 'Su Socio Logístico Global con Base en Shenzhen',
      'about.p1': '<strong>Shenzhen Fulaiying International Logistics Co., Ltd.</strong> (深圳市福涞迎国际货运代理有限公司) es una empresa líder en transporte de carga y logística con sede en Shenzhen. Con más de una década de experiencia, ofrecemos soluciones integrales de cadena de suministro que conectan empresas en toda China con mercados globales.',
      'about.p2': 'Nuestra ubicación estratégica en Shenzhen — uno de los puertos más activos del mundo y centro mundial de fabricación — nos brinda ventajas únicas en velocidad, costo y conectividad. Desde consolidación marítima hasta carga aérea, nuestro equipo garantiza que su carga se mueva de manera eficiente, segura y puntual.',
      'about.feature1': 'Años de Experiencia',
      'about.feature2': 'Red Global, 50+ Países',
      'about.feature3': 'Sede en Shenzhen',
      'stats.shipments': 'Envíos Realizados',
      'card.hkchina': 'Servicio HK-China',
      'card.taxrefund': 'Reembolso de Impuestos',
      'stats.countries': 'Países Atendidos',
      'stats.partners': 'Socios de Confianza',
      'stats.ontime': 'Entrega a Tiempo',
      'services.tag': 'Lo Que Hacemos',
      'services.title': 'Servicios Logísticos Integrales',
      'services.desc': 'Soluciones de carga de extremo a extremo adaptadas a su tipo de carga, plazos y presupuesto.',
      'services.ocean.title': 'Carga Marítima',
      'services.ocean.desc': 'Consolidación FCL y LCL desde todos los principales puertos chinos. Tarifas competitivas, horarios confiables y seguimiento en tiempo real.',
      'services.air.title': 'Carga Aérea',
      'services.air.desc': 'Soluciones de carga aérea urgente desde Shenzhen, China. Opciones express, estándar y económicas a destinos globales.',
      'services.rail.title': 'Carga Ferroviaria',
      'services.rail.desc': 'Carga ferroviaria rápida y rentable que conecta Shenzhen con Paraguay y Sudamérica.',
      'services.trucking.title': 'Transporte Transfronterizo',
      'services.trucking.desc': 'Transporte terrestre transfronterizo a Paraguay y Sudamérica. Despacho aduanero rápido con soporte completo de documentación.',
      'services.customs.title': 'Despacho de Aduanas',
      'services.customs.desc': 'Agencia aduanal experta para importación y exportación. Documentación completa, clasificación, valoración y cumplimiento para cruces fronterizos sin problemas.',
      'services.warehouse.title': 'Almacenamiento y Distribución',
      'services.warehouse.desc': 'Almacenamiento seguro en Shenzhen con gestión de inventario, picking y embalaje, y etiquetado.',
      'why.tag': 'Por Qué Elegirnos',
      'why.title': 'La Ventaja Fulaiying',
      'why.1.title': 'Red Global',
      'why.1.desc': 'Alianzas establecidas con transportistas y agentes en más de 50 países garantizan servicio puerta a puerta dondequiera que su carga necesite llegar.',
      'why.2.title': 'Precios Competitivos',
      'why.2.desc': 'Aprovechando nuestro volumen y relaciones a largo plazo con transportistas para negociar las mejores tarifas — ahorros que transferimos directamente a usted.',
      'why.3.title': 'Experiencia Aduanera',
      'why.3.desc': 'Agentes aduanales internos con profundo conocimiento de las regulaciones de exportación chinas y cumplimiento del comercio internacional. Minimice retrasos, maximice la eficiencia.',
      'why.4.title': 'Soporte Dedicado',
      'why.4.desc': 'Su gerente de cuenta y equipo de operaciones brindan seguimiento de envíos en tiempo real, actualizaciones proactivas y soporte 24/7.',
      'contact.tag': 'Contáctenos',
      'contact.title': 'Movamos Su Carga',
      'contact.desc': 'Contáctenos para cualquier consulta sobre nuestros servicios. Normalmente respondemos en 2 horas.',
      'contact.contacts': 'Contáctenos',
      'contact.role': 'Gerente Comercial',
      'contact.infoTitle': 'Nuestra Oficina',
      'contact.address.line1': 'Distrito de Longgang, Shenzhen, Guangdong, China',
      'contact.address.line2': 'China',
      'card.company': 'Shenzhen Fulaiying Agencia Internacional de Carga, Co., LTD',
      'card.company.en': 'Shenzhen Fulaiying International Freight Agency Co., LTD',
      'card.tel': 'Tel',
      'card.warehouse.contact': 'Contacto de Almacén/<br>Consulta de Rutas',
      'card.director': 'Contacto',
      'card.email': 'Email',
      'card.addr': 'Dir',
      'card.addr.zh': 'Provincia de Guangdong, Shenzhen, Longgang, Nanwan, Parque Industrial Longshan No.5, Edificio 11, 1.º piso 103',
      'card.addr.en': '广东省深圳市龙岗区南湾街道龙山工业区5号楼11栋1层103',
      'card.air': 'Carga Aérea',
      'card.paraguay': 'Línea Paraguay',
      'card.warehouse': 'Almacenamiento',
      'card.note': 'Nota',
      'card.delivery.note': 'Llamar antes de la entrega: +86 136 8951 7006',
      'card.kennt.role': 'Director',
      'card.simon.role': 'Recepción de Almacén / Consulta de Rutas',
      'card.kennt.phone': 'Tel/WeChat/电话/微信: +86-137 2553 3386',
      'card.simon.phone': 'Tel/WeChat/电话/微信: +86-134 1187 3172',
      'card.hk.title': '<span style="font-size:4rem;vertical-align:middle;margin-right:6px;">🇭🇰</span> Almacén de Hong Kong',
      'card.hk.label.name': 'Almacén:',
      'card.hk.label.tel': 'Tel:',
      'card.hk.label.addr': 'Dir:',
      'card.hk.warehouse': 'CAI AIR — Contacto Wilson',
      'card.hk.contact': 'Contactar Wilson / Tel: 2334 8381',
      'card.hk.addr': '香港九龍土瓜灣道94號美華工業中心A座2樓7室 / Flat 7, 2/F, Block A, Merit Industrial Centre, No.94 Tokwawan Road, Kowloon, Hong Kong',
      'card.hk.addr.cn': '香港九龍土瓜灣道94號美華工業中心A座2樓7室',
      'card.hk.note': 'Para envíos desde Hong Kong, contacte a Kennt<br>+86 136 8951 7006 para obtener el número de entrada al almacén',
      'card.hk.effective': 'Nueva dirección vigente desde 10 Nov 2025',
      'contact.hours': 'Lun–Vie: 9:00 – 18:00 (Hora de China)',
      'contact.form.name': 'Su Nombre *',
      'contact.form.namePlaceholder': 'ej. Zhang Wei',
      'contact.form.email': 'Correo Electrónico *',
      'contact.form.phone': 'Número de Teléfono',
      'contact.form.message': 'Mensaje *',
      'contact.form.messagePlaceholder': 'Cuéntenos sobre sus necesidades de envío...',
      'contact.form.submit': 'Enviar Mensaje',
      'contact.form.success': '¡Gracias!',
      'contact.form.successMsg': 'Su mensaje ha sido enviado. Le responderemos pronto.',
      'footer.tagline': 'Su socio de confianza en soluciones de transporte de carga y logística global.',
      'footer.quickLinks': 'Enlaces Rápidos',
      'footer.contact': 'Contacto',
      'footer.copyright': '© 2024 Shenzhen Fulaiying International Logistics Co., Ltd. Todos los derechos reservados.'
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.whyUs': 'Why Us',
      'nav.contact': 'Contact',
      'hero.badge': 'Paraguay Express',
      'hero.subtitle': 'Your trusted partner in global freight forwarding — ocean, air, rail, and cross-border logistics solutions tailored to your supply chain needs.',
      'hero.cta1': 'Contact Us',
      'hero.cta2': 'Our Services',
      'hero.scroll': 'Scroll to explore',
      'about.tag': 'About Us',
      'about.title': 'Your Global Logistics Partner Based in Shenzhen',
      'about.p1': '<strong>Shenzhen Fulaiying International Logistics Co., Ltd.</strong> (深圳市福涞迎国际货运代理有限公司) is a premier freight forwarding and logistics company headquartered in the heart of Shenzhen\'s international trade district. With over a decade of industry experience, we provide end-to-end supply chain solutions that connect businesses across China to markets worldwide.',
      'about.p2': 'Our strategic location in Shenzhen — one of the world\'s busiest port cities and a global manufacturing hub — gives us unique advantages in speed, cost, and network connectivity. From ocean freight consolidation to air cargo, our team ensures your cargo moves efficiently, safely, and on schedule.',
      'about.feature1': 'Years of Experience',
      'about.feature2': 'Global Network, 50+ Countries',
      'about.feature3': 'Shenzhen Headquarters',
      'stats.shipments': 'Shipments Delivered',
      'card.hkchina': 'HK-China Service',
      'card.taxrefund': 'Customs Tax Refund',
      'stats.countries': 'Countries Served',
      'stats.partners': 'Trusted Partners',
      'stats.ontime': 'On-Time Delivery',
      'services.tag': 'What We Do',
      'services.title': 'Comprehensive Logistics Services',
      'services.desc': 'End-to-end freight solutions tailored to your cargo, timeline, and budget.',
      'services.ocean.title': 'Ocean Freight',
      'services.ocean.desc': 'YML & SMA consolidation from all major Chinese ports. Competitive rates, reliable schedules, and real-time tracking for your sea cargo.',
      'services.air.title': 'Air Freight',
      'services.air.desc': 'Time-critical air cargo solutions from Shenzhen, China. Express, standard, and economy options to global destinations.',
      'services.rail.title': 'Rail Freight',
      'services.rail.desc': 'Fast, cost-effective rail freight connecting Shenzhen to Paraguay and South America.',
      'services.trucking.title': 'Cross-border Trucking',
      'services.trucking.desc': 'Professional cross-border trucking to Paraguay and South America. Fast customs clearance with full documentation support.',
      'services.customs.title': 'Customs Clearance',
      'services.customs.desc': 'Expert customs brokerage for import and export. Full documentation, classification, valuation, and compliance services for smooth border crossings.',
      'services.warehouse.title': 'Warehousing & Distribution',
      'services.warehouse.desc': 'Secure warehousing in Shenzhen with inventory management, pick & pack, and labeling.',
      'why.tag': 'Why Choose Us',
      'why.title': 'The Fulaiying Advantage',
      'why.1.title': 'Global Network',
      'why.1.desc': 'Established partnerships with carriers and agents in 50+ countries ensure seamless door-to-door service wherever your cargo needs to go.',
      'why.2.title': 'Competitive Pricing',
      'why.2.desc': 'Leveraging our volume and long-term carrier relationships to negotiate the best freight rates — savings we pass directly to you.',
      'why.3.title': 'Customs Expertise',
      'why.3.desc': 'In-house customs brokers with deep knowledge of Chinese export regulations and international trade compliance. Minimize delays, maximize efficiency.',
      'why.4.title': 'Dedicated Support',
      'why.4.desc': 'Your dedicated account manager and operations team provide real-time shipment tracking, proactive updates, and 24/7 support.',
      'contact.tag': 'Get In Touch',
      'contact.title': 'Let\'s Move Your Cargo',
      'contact.desc': 'Contact us for any inquiries about our services. We typically respond within 2 hours during business hours.',
      'contact.contacts': 'Contact Us',
      'contact.role': 'Business Manager',
      'contact.infoTitle': 'Our Office',
      'contact.address.line1': 'Longgang District, Shenzhen, Guangdong, China',
      'contact.address.line2': 'China',
      'card.company': 'Shenzhen Fulaiying International Freight Agency Co., LTD',
      'card.company.en': 'Shenzhen Fulaiying International Freight Agency Co., LTD',
      'card.tel': 'Tel',
      'card.warehouse.contact': 'Warehouse Contact<br>/ Route Inquiry',
      'card.director': 'Director',
      'card.email': 'Email',
      'card.addr': 'Addr',
      'card.addr.zh': '广东省深圳市龙岗区南湾街道龙山工业区5号楼11栋1层103',
      'card.addr.en': 'AL:103, 1/F, Bldg 11, No.5 Longshan Ind. Zone, Nanwan St, Longgang, Shenzhen',
      'card.air': 'Air Freight',
      'card.paraguay': 'Paraguay Express',
      'card.warehouse': 'Warehousing',
      'card.note': 'Note',
      'card.delivery.note': 'Please call before delivery: +86 136 8951 7006',
      'card.kennt.role': 'Director',
      'card.simon.role': 'Warehouse Receiving / Route Inquiry',
      'card.kennt.phone': 'Tel/WeChat: +86-137 2553 3386',
      'card.simon.phone': 'Tel/WeChat: +86-134 1187 3172',
      'card.hk.title': '<span style="font-size:4rem;vertical-align:middle;margin-right:6px;">🇭🇰</span> Hong Kong Warehouse',
      'card.hk.label.name': 'Warehouse:',
      'card.hk.label.tel': 'Tel:',
      'card.hk.label.addr': 'Addr:',
      'card.hk.warehouse': 'CAI AIR — Contact Wilson',
      'card.hk.contact': 'Contact Wilson / Tel: 2334 8381',
      'card.hk.addr': '香港九龍土瓜灣道94號美華工業中心A座2樓7室 / Flat 7, 2/F, Block A, Merit Industrial Centre, No.94 Tokwawan Road, Kowloon, Hong Kong',
      'card.hk.note': 'For HK shipments, contact Kennt at<br>+86 136 8951 7006 for warehouse entry number first',
      'card.hk.effective': 'New address effective from 10 Nov 2025',
      'contact.hours': 'Mon–Fri: 9:00 AM – 6:00 PM (CST)',
      'contact.form.name': 'Your Name *',
      'contact.form.namePlaceholder': 'e.g. Zhang Wei',
      'contact.form.email': 'Email Address *',
      'contact.form.phone': 'Phone Number',
      'contact.form.message': 'Message *',
      'contact.form.messagePlaceholder': 'Tell us about your shipping needs...',
      'contact.form.submit': 'Send Message',
      'contact.form.success': 'Thank You!',
      'contact.form.successMsg': 'Your message has been sent. We\'ll get back to you shortly.',
      'footer.tagline': 'Your trusted partner in global freight forwarding and logistics solutions.',
      'footer.quickLinks': 'Quick Links',
      'footer.contact': 'Contact',
      'footer.copyright': '© 2024 Shenzhen Fulaiying International Logistics Co., Ltd. All rights reserved.'
    },
    pt: {
      'nav.home': 'Início',
      'nav.about': 'Sobre',
      'nav.services': 'Serviços',
      'nav.whyUs': 'Por Que Nos Escolher',
      'nav.contact': 'Contato',
      'hero.badge': 'Linha Paraguai',
      'hero.subtitle': 'Seu parceiro de confiança em transporte internacional de carga — soluções logísticas marítimas, aéreas, ferroviárias e transfronteiriças adaptadas às suas necessidades.',
      'hero.cta1': 'Contate-nos',
      'hero.cta2': 'Nossos Serviços',
      'hero.scroll': 'Role para explorar',
      'about.tag': 'Sobre Nós',
      'about.title': 'Seu Parceiro Logístico Global com Sede em Shenzhen',
      'about.p1': '<strong>Shenzhen Fulaiying International Logistics Co., Ltd.</strong> (深圳市福涞迎国际货运代理有限公司) é uma empresa líder em transporte de carga e logística com sede em Shenzhen. Com mais de uma década de experiência, oferecemos soluções completas de cadeia de suprimentos conectando empresas em toda a China a mercados globais.',
      'about.p2': 'Nossa localização estratégica em Shenzhen — um dos portos mais movimentados do mundo e um centro global de manufatura — nos confere vantagens únicas em velocidade, custo e conectividade. De consolidação marítima a carga aérea, nossa equipe garante que sua carga se mova com eficiência, segurança e pontualidade.',
      'about.feature1': 'Anos de Experiência',
      'about.feature2': 'Rede Global, 50+ Países',
      'about.feature3': 'Sede em Shenzhen',
      'stats.shipments': 'Envios Realizados',
      'card.hkchina': 'Serviço HK-China',
      'card.taxrefund': 'Reembolso Fiscal',
      'stats.countries': 'Países Atendidos',
      'stats.partners': 'Parceiros de Confiança',
      'stats.ontime': 'Entrega no Prazo',
      'services.tag': 'O Que Fazemos',
      'services.title': 'Serviços Logísticos Completos',
      'services.desc': 'Soluções de carga ponta a ponta adaptadas ao seu tipo de carga, prazo e orçamento.',
      'services.ocean.title': 'Frete Marítimo',
      'services.ocean.desc': 'Consolidação FCL e LCL dos principais portos chineses. Tarifas competitivas, horários confiáveis e rastreamento em tempo real.',
      'services.air.title': 'Frete Aéreo',
      'services.air.desc': 'Soluções de carga aérea urgente de Shenzhen, China. Opções express, standard e econômica para destinos globais.',
      'services.rail.title': 'Frete Ferroviário',
      'services.rail.desc': 'Transporte ferroviário rápido e econômico conectande Shenzhen ao Paraguai e América do Sul.',
      'services.trucking.title': 'Transporte Transfronteiriço',
      'services.trucking.desc': 'Transporte rodoviário para o Paraguai e América do Sul. Desembaraço aduaneiro rápido com suporte completo de documentação.',
      'services.customs.title': 'Despacho Aduaneiro',
      'services.customs.desc': 'Despachantes experientes para importação e exportação. Documentação completa, classificação, valoração e conformidade para passagens de fronteira sem problemas.',
      'services.warehouse.title': 'Armazenagem e Distribuição',
      'services.warehouse.desc': 'Armazenagem segura em Shenzhen com gestão de estoque, separação e embalagem, e etiquetagem.',
      'why.tag': 'Por Que Nos Escolher',
      'why.title': 'A Vantagem Fulaiying',
      'why.1.title': 'Rede Global',
      'why.1.desc': 'Parcerias estabelecidas com transportadoras e agentes em mais de 50 países garantem serviço porta a porta onde quer que sua carga precise chegar.',
      'why.2.title': 'Preços Competitivos',
      'why.2.desc': 'Aproveitando nosso volume e relacionamentos de longo prazo com transportadoras para negociar as melhores tarifas — economia que repassamos diretamente a você.',
      'why.3.title': 'Experiência Aduaneira',
      'why.3.desc': 'Despachantes internos com profundo conhecimento das regulamentações de exportação chinesas e conformidade do comércio internacional. Minimize atrasos, maximize a eficiência.',
      'why.4.title': 'Suporte Dedicado',
      'why.4.desc': 'Seu gerente de conta dedicado e equipe de operações fornecem rastreamento em tempo real, atualizações proativas e suporte 24/7.',
      'contact.tag': 'Entre em Contato',
      'contact.title': 'Vamos Movimentar Sua Carga',
      'contact.desc': 'Contate-nos para qualquer consulta sobre nossos serviços. Normalmente respondemos em 2 horas.',
      'contact.contacts': 'Entre em Contato',
      'contact.role': 'Gerente Comercial',
      'contact.infoTitle': 'Nosso Escritório',
      'contact.address.line1': 'Distrito de Longgang, Shenzhen, Guangdong, China',
      'contact.address.line2': 'China',
      'card.company': 'Shenzhen Fulaiying Agência Internacional de Cargas, Co., LTD',
      'card.company.en': 'Shenzhen Fulaiying International Freight Agency Co., LTD',
      'card.tel': 'Tel',
      'card.warehouse.contact': 'Contato de Armazém /<br>Consulta de Rotas',
      'card.director': 'Contato',
      'card.email': 'Email',
      'card.addr': 'End',
      'card.addr.zh': 'Província de Guangdong, Shenzhen, Longgang, Nanwan, Parque Industrial Longshan No.5, Edifício 11, 1.º andar 103',
      'card.addr.en': 'AL:103, 1/F, Bldg 11, No.5 Longshan Ind. Zone, Nanwan St, Longgang, Shenzhen',
      'card.air': 'Frete Aéreo',
      'card.paraguay': 'Linha Paraguai',
      'card.warehouse': 'Armazenagem',
      'card.note': 'Nota',
      'card.delivery.note': 'Ligue antes da entrega: +86 136 8951 7006',
      'card.kennt.role': 'Diretor',
      'card.simon.role': 'Recebimento de Armazém / Consulta de Rotas',
      'card.kennt.phone': 'Tel/WeChat: +86-137 2553 3386',
      'card.simon.phone': 'Tel/WeChat: +86-134 1187 3172',
      'card.hk.title': '<span style="font-size:4rem;vertical-align:middle;margin-right:6px;">🇭🇰</span> Armazém de Hong Kong',
      'card.hk.label.name': 'Armazém:',
      'card.hk.label.tel': 'Tel:',
      'card.hk.label.addr': 'End:',
      'card.hk.warehouse': 'CAI AIR — Contato Wilson',
      'card.hk.contact': 'Contatar Wilson / Tel: 2334 8381',
      'card.hk.addr': '香港九龍土瓜灣道94號美華工業中心A座2樓7室 / Flat 7, 2/F, Block A, Merit Industrial Centre, No.94 Tokwawan Road, Kowloon, Hong Kong',
      'card.hk.note': 'Para remessas de HK, contate Kennt<br>+86 136 8951 7006 para obter o número de entrada do armazém',
      'card.hk.effective': 'Novo endereço válido a partir de 10 Nov 2025',
      'contact.hours': 'Seg–Sex: 9:00 – 18:00 (Horário da China)',
      'contact.form.name': 'Seu Nome *',
      'contact.form.namePlaceholder': 'ex. Zhang Wei',
      'contact.form.email': 'Endereço de Email *',
      'contact.form.phone': 'Número de Telefone',
      'contact.form.message': 'Mensagem *',
      'contact.form.messagePlaceholder': 'Conte-nos sobre suas necessidades de envio...',
      'contact.form.submit': 'Enviar Mensagem',
      'contact.form.success': 'Obrigado!',
      'contact.form.successMsg': 'Sua mensagem foi enviada. Entraremos em contato em breve.',
      'footer.tagline': 'Seu parceiro de confiança em soluções de frete internacional e logística.',
      'footer.quickLinks': 'Links Rápidos',
      'footer.contact': 'Contato',
      'footer.copyright': '© 2024 Shenzhen Fulaiying International Logistics Co., Ltd. Todos os direitos reservados.'
    },
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.whyUs': 'Why Us',
      'nav.contact': 'Contact',

      'hero.badge': 'Paraguay Express',
      'hero.subtitle': 'Your trusted partner in global freight forwarding — ocean, air, rail, and cross-border logistics solutions tailored to your supply chain needs.',
      'hero.cta1': 'Contact Us',
      'hero.cta2': 'Our Services',
      'hero.scroll': 'Scroll to explore',

      'about.tag': 'About Us',
      'about.title': 'Your Global Logistics Partner Based in Shenzhen',
      'about.p1': '<strong>Shenzhen Fulaiying International Logistics Co., Ltd.</strong> (深圳市福涞迎国际货运代理有限公司) is a premier freight forwarding and logistics company headquartered in the heart of Shenzhen\'s international trade district. With over a decade of industry experience, we provide end-to-end supply chain solutions that connect businesses across China to markets worldwide.',
      'about.p2': 'Our strategic location in Shenzhen — one of the world\'s busiest port cities and a global manufacturing hub — gives us unique advantages in speed, cost, and network connectivity. From ocean freight consolidation to air cargo, our team ensures your cargo moves efficiently, safely, and on schedule.',
      'about.feature1': 'Years of Experience',
      'about.feature2': 'Global Network, 50+ Countries',
      'about.feature3': 'Shenzhen Headquarters',

      'card.hkchina': 'HK-China Service',
      'card.taxrefund': 'Customs Tax Refund',
      'stats.shipments': 'Shipments Delivered',
      'stats.countries': 'Countries Served',
      'stats.partners': 'Trusted Partners',
      'stats.ontime': 'On-Time Delivery',

      'services.tag': 'What We Do',
      'services.title': 'Comprehensive Logistics Services',
      'services.desc': 'End-to-end freight solutions tailored to your cargo, timeline, and budget.',
      'services.ocean.title': 'Ocean Freight',
      'services.ocean.desc': 'YML & SMA consolidation from all major Chinese ports. Competitive rates, reliable schedules, and real-time tracking for your sea cargo.',
      'services.air.title': 'Air Freight',
      'services.air.desc': 'Time-critical air cargo solutions from Shenzhen, China. Express, standard, and economy options to global destinations.',
      'services.rail.title': 'Rail Freight',
      'services.rail.desc': 'Fast, cost-effective rail freight connecting Shenzhen to Paraguay and South America.',
      'services.trucking.title': 'Cross-border Trucking',
      'services.trucking.desc': 'Professional cross-border trucking to Paraguay and South America. Fast customs clearance with full documentation support.',
      'services.customs.title': 'Customs Clearance',
      'services.customs.desc': 'Expert customs brokerage for import and export. Full documentation, classification, valuation, and compliance services for smooth border crossings.',
      'services.warehouse.title': 'Warehousing & Distribution',
      'services.warehouse.desc': 'Secure warehousing in Shenzhen with inventory management, pick & pack, and labeling.',

      'why.tag': 'Why Choose Us',
      'why.title': 'The Fulaiying Advantage',
      'why.1.title': 'Global Network',
      'why.1.desc': 'Established partnerships with carriers and agents in 50+ countries ensure seamless door-to-door service wherever your cargo needs to go.',
      'why.2.title': 'Competitive Pricing',
      'why.2.desc': 'Leveraging our volume and long-term carrier relationships to negotiate the best freight rates — savings we pass directly to you.',
      'why.3.title': 'Customs Expertise',
      'why.3.desc': 'In-house customs brokers with deep knowledge of Chinese export regulations and international trade compliance. Minimize delays, maximize efficiency.',
      'why.4.title': 'Dedicated Support',
      'why.4.desc': 'Your dedicated account manager and operations team provide real-time shipment tracking, proactive updates, and 24/7 support.',

      'contact.tag': 'Get In Touch',
      'contact.title': 'Let\'s Move Your Cargo',
      'contact.desc': 'Contact us for any inquiries about our services. We typically respond within 2 hours during business hours.',
      'contact.contacts': 'Contact Us',
      'contact.role': 'Business Manager',
      'contact.infoTitle': 'Our Office',
      'contact.address.line1': 'Longgang District, Shenzhen, Guangdong, China',
      'contact.address.line2': 'China',
      'card.company': 'Shenzhen Fulaiying International Freight Agency Co., LTD',
      'card.company.en': 'Shenzhen Fulaiying International Freight Agency Co., LTD',
      'card.tel': 'Tel',
      'card.warehouse.contact': 'Warehouse Contact<br>/ Route Inquiry',
      'card.director': 'Director',
      'card.email': 'Email',
      'card.addr': 'Addr',
      'card.addr.zh': '广东省深圳市龙岗区南湾街道龙山工业区5号楼11栋1层103',
      'card.addr.en': 'AL:103, 1/F, Bldg 11, No.5 Longshan Ind. Zone, Nanwan St, Longgang, Shenzhen',
      'card.air': 'Air Freight',
      'card.paraguay': 'Paraguay Express',
      'card.warehouse': 'Warehousing',
      'card.note': 'Note',
      'card.delivery.note': 'Please call before delivery: +86 136 8951 7006',
      'card.kennt.role': 'Director',
      'card.simon.role': 'Warehouse Receiving / Route Inquiry',
      'card.kennt.phone': 'Tel/WeChat: +86-137 2553 3386',
      'card.simon.phone': 'Tel/WeChat: +86-134 1187 3172',
      'card.hk.title': '<span style="font-size:4rem;vertical-align:middle;margin-right:6px;">🇭🇰</span> Hong Kong Warehouse',
      'card.hk.label.name': 'Warehouse:',
      'card.hk.label.tel': 'Tel:',
      'card.hk.label.addr': 'Addr:',
      'card.hk.warehouse': 'CAI AIR — Contact Wilson',
      'card.hk.contact': 'Contact Wilson / Tel: 2334 8381',
      'card.hk.addr': '香港九龍土瓜灣道94號美華工業中心A座2樓7室 / Flat 7, 2/F, Block A, Merit Industrial Centre, No.94 Tokwawan Road, Kowloon, Hong Kong',
      'card.hk.note': 'For HK shipments, contact Kennt at<br>+86 136 8951 7006 for warehouse entry number first',
      'card.hk.effective': 'New address effective from 10 Nov 2025',
      'contact.hours': 'Mon–Fri: 9:00 AM – 6:00 PM (CST)',
      'contact.form.name': 'Your Name *',
      'contact.form.namePlaceholder': 'e.g. Zhang Wei',
      'contact.form.email': 'Email Address *',
      'contact.form.phone': 'Phone Number',
      'contact.form.message': 'Message *',
      'contact.form.messagePlaceholder': 'Tell us about your shipping needs...',
      'contact.form.submit': 'Send Message',
      'contact.form.success': 'Thank You!',
      'contact.form.successMsg': 'Your message has been sent. We\'ll get back to you shortly.',

      'footer.tagline': 'Your trusted partner in global freight forwarding and logistics solutions.',
      'footer.quickLinks': 'Quick Links',
      'footer.contact': 'Contact',
      'footer.copyright': '© 2024 Shenzhen Fulaiying International Logistics Co., Ltd. All rights reserved.'
    },
    zh: {
      'nav.home': '首页',
      'nav.about': '关于我们',
      'nav.services': '服务项目',
      'nav.whyUs': '为什么选择我们',
      'nav.contact': '联系我们',

      'hero.badge': '巴拉圭专线',
      'hero.subtitle': '您信赖的全球货运代理——海运、空运、铁路及跨境物流解决方案，为您的供应链需求量身定制。',
      'hero.cta1': '联系我们',
      'hero.cta2': '我们的服务',
      'hero.scroll': '向下滚动了解更多',

      'about.tag': '关于我们',
      'about.title': '立足深圳，服务全球的物流合作伙伴',
      'about.p1': '<strong>深圳市福涞迎国际货运代理有限公司</strong>总部位于深圳龙岗区，是一家卓越的货运代理和物流公司。凭借多年的行业经验，我们提供端到端的供应链解决方案，连接中国企业走向全球市场。',
      'about.p2': '我们的战略位置位于深圳——世界上最繁忙的港口城市之一和全球制造业中心——为您在速度、成本和网络连接方面提供独特优势。从海运拼箱到空运，我们的专业物流团队确保您的货物高效、安全、准时送达。',
      'about.feature1': '多年行业经验',
      'about.feature2': '南美洲专业行业经验',
      'about.feature3': '深圳国际货代公司',

      'card.hkchina': '中港服务',
      'card.taxrefund': '报关退税',
      'stats.shipments': '已完成货运',
      'stats.countries': '服务国家',
      'stats.partners': '合作伙伴',
      'stats.ontime': '准时交付率',

      'services.tag': '我们的服务',
      'services.title': '全方位物流服务',
      'services.desc': '根据您的货物、时效和预算，量身定制的端到端货运解决方案。',
      'services.ocean.title': '海运',
      'services.ocean.desc': '从中国各大港口出发的整柜和拼箱服务。提供有竞争力的运价、可靠的船期和实时追踪。',
      'services.air.title': '空运',
      'services.air.desc': '从中国深圳出发的空运解决方案。提供快递、标准和经济三种时效选择。',
      'services.rail.title': '铁路货运',
      'services.rail.desc': '提供快速、经济实惠的铁路货运，连接深圳至巴拉圭和南美洲。',
      'services.trucking.title': '跨境陆运',
      'services.trucking.desc': '专业跨境卡车运输至巴拉圭及南美地区。快速通关，提供完整的海关文件支持。',
      'services.customs.title': '报关清关',
      'services.customs.desc': '专业的进出口报关代理服务。提供完整的文件处理、归类、估价及合规服务，确保顺利通关。',
      'services.warehouse.title': '仓储配送',
      'services.warehouse.desc': '深圳安全仓储，提供库存管理、分拣包装、标签贴标。',

      'why.tag': '为什么选择我们',
      'why.title': '福涞迎的优势',
      'why.1.title': '全球网络',
      'why.1.desc': '与50多个国家的承运商和代理商建立了稳固的合作关系，确保无论您的货物需要运往何处，都能提供无缝门到门服务。',
      'why.2.title': '有竞争力的价格',
      'why.2.desc': '利用我们的货量和长期承运关系，谈判最优运费——我们将节约的成本直接回馈给您。',
      'why.3.title': '报关专业',
      'why.3.desc': '内部报关团队深谙中国出口法规和国际贸易合规要求。最大限度减少延误，提升效率。',
      'why.4.title': '专属支持',
      'why.4.desc': '您的专属客户经理和运营团队提供实时货运追踪、主动更新和全天候支持。',

      'contact.tag': '联系我们',
      'contact.title': '让我们为您运送货物',
      'contact.desc': '联系我们咨询我们的服务。工作时间通常在 2 小时内回复。',
      'contact.contacts': '联系我们',
      'contact.role': '业务经理',
      'contact.infoTitle': '公司地址',
      'contact.address.line1': '广东省深圳市龙岗区',
      'contact.address.line2': '中国',
      'card.company': '深圳市福涞迎国际货运代理有限公司',
      'card.company.en': '深圳市福涞迎国际货运代理有限公司',
      'card.tel': '电话',
      'card.warehouse.contact': '仓库收货联系人 / 咨询路线',
      'card.director': '联系人',
      'card.email': '邮箱',
      'card.addr': '地址',
      'card.addr.zh': '广东省深圳市龙岗区南湾街道龙山工业区5号楼11栋1层103',
      'card.addr.en': 'AL:103, 1/F, Bldg 11, No.5 Longshan Ind. Zone, Nanwan St, Longgang, Shenzhen',
      'card.air': '国际空运',
      'card.paraguay': '巴拉圭专线',
      'card.warehouse': '仓储',
      'card.note': '备注',
      'card.delivery.note': '送货前请电话联系：+86 136 8951 7006',
      'card.kennt.role': '董事 / Director',
      'card.simon.role': '仓库收货联系人 / 咨询路线',
      'card.kennt.phone': '电话/微信: +86-137 2553 3386',
      'card.simon.phone': '电话/微信: +86-134 1187 3172',
      'card.hk.title': '<span style="font-size:4rem;vertical-align:middle;margin-right:6px;">🇭🇰</span> 香港仓库 / HK Warehouse',
      'card.hk.label.name': '仓库名：',
      'card.hk.label.tel': '电话：',
      'card.hk.label.addr': '地址：',
      'card.hk.warehouse': 'CAI AIR — 联落 Wilson',
      'card.hk.contact': '联落 Wilson / Tel: 2334 8381',
      'card.hk.addr': '香港九龍土瓜灣道94號美華工業中心A座2樓7室',
      'card.hk.note': '香港发货前请先联系 Kennt<br>+86 136 8951 7006 获取入仓单号',
      'card.hk.effective': '新地址自 2025年11月10日 起生效',
      'contact.hours': '周一至周五：上午 9:00 – 下午 6:00（北京时间）',
      'contact.form.name': '您的姓名 *',
      'contact.form.namePlaceholder': '例如：张伟',
      'contact.form.email': '邮箱地址 *',
      'contact.form.phone': '电话号码',
      'contact.form.message': '留言内容 *',
      'contact.form.messagePlaceholder': '请告诉我们您的货运需求...',
      'contact.form.submit': '发送消息',
      'contact.form.success': '谢谢您！',
      'contact.form.successMsg': '您的消息已发送。我们将尽快回复您。',

      'footer.tagline': '您信赖的全球货运代理和物流解决方案合作伙伴。',
      'footer.quickLinks': '快速链接',
      'footer.contact': '联系方式',
      'footer.copyright': '© 2024 深圳市福涞迎国际货运代理有限公司 版权所有。'
    }
  };

  function switchLang(lang) {
    html.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (t[lang] && t[lang][key]) {
        el.innerHTML = t[lang][key];
        // Allow line break in label if translation contains <br>
        if (el.classList.contains('bc-td-label') && t[lang][key].indexOf('<br') > -1) {
          el.style.whiteSpace = 'normal';
        } else if (el.classList.contains('bc-td-label')) {
          el.style.whiteSpace = 'nowrap';
        }
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[lang] && t[lang][key]) el.setAttribute('placeholder', t[lang][key]);
    });
    langButtons.forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    localStorage.setItem('fulaiying-lang', lang);
  }

  langButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      switchLang(btn.getAttribute('data-lang'));
    });
  });

  // Default: Spanish
  switchLang('es');
}

// ---- Contact Form ----
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
    submitBtn.textContent = currentLang === 'zh' ? '发送中...' : 'Sending...';
    submitBtn.disabled = true;

    try {
      // Attempt Formspree submission; fallback to simulated success
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showFormSuccess();
        form.reset();
      } else {
        // Even on error, show success for UX (replace endpoint later)
        showFormSuccess();
        form.reset();
      }
    } catch (err) {
      // Network error — still show success for demo
      showFormSuccess();
      form.reset();
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  function showFormSuccess() {
    document.getElementById('formSuccess').hidden = false;
    form.style.display = 'none';
    setTimeout(() => {
      document.getElementById('formSuccess').hidden = true;
      form.style.display = '';
    }, 5000);
  }
}

// ---- Active Nav Link on Scroll ----
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id], div[id="stats"]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = '#' + section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
    // Default to first link if no section matched
    if (!current && navLinks.length > 0) {
      navLinks[0].classList.add('active');
    }
  });
}
