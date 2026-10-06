(function () {
  'use strict';

  /* —— Theme —— */
  var THEME_KEY = 'theme';
  var LANG_KEY = 'lang';

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function resolveTheme() {
    var stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  function setTheme(theme, persist) {
    var t = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, t);
      } catch (e) { /* ignore */ }
    }
    syncThemeButtons(t);
  }

  function syncThemeButtons(theme) {
    document.querySelectorAll('[data-theme-set]').forEach(function (btn) {
      var on = btn.getAttribute('data-theme-set') === theme;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* —— i18n —— */
  var I18N = {
    es: {
      'meta.title': 'Auditoría Web Express — Seguridad web en 5 días',
      'meta.desc': 'Auditoría Web Express: sabe en 5 días dónde es vulnerable tu web y qué arreglar primero. Revisión de solo lectura, informe priorizado. Pymes ES+LatAm.',
      'meta.titleReport': 'Informe de ejemplo (FICTICIO) — Auditoría Web Express',
      'meta.descReport': 'Informe de ejemplo ficticio — Auditoría Web Express. Hotel Costa Luz.',
      'nav.brand': 'Auditoría Web',
      'nav.aria': 'Principal',
      'nav.audience': 'Para quién',
      'nav.includes': 'Incluye',
      'nav.process': 'Proceso',
      'nav.pricing': 'Precios',
      'nav.cta': 'Reservar llamada',
      'nav.back': '← Volver',
      'nav.theme': 'Tema',
      'nav.lang': 'Idioma',
      'theme.light': 'Claro',
      'theme.dark': 'Oscuro',
      'hero.eyebrow': 'Solo lectura · 5 días laborables',
      'hero.title': 'Auditoría Web Express',
      'hero.subtitle': 'Sabe en 5 días dónde es vulnerable tu web y qué arreglar primero',
      'hero.sub': 'Revisión de seguridad de solo lectura sobre tu sitio público. Alcance cerrado, informe priorizado. Sin explotación ni cambios en producción.',
      'hero.cta': 'Reservar llamada de 20 min',
      'hero.sample': 'Ver informe de ejemplo',
      'aud.label': 'Contexto',
      'aud.title': 'Para quién y por qué ahora',
      'aud.whoTitle': 'Para quién',
      'aud.whoBody': 'Pymes con web pública, e-commerce o sitios de reservas en España y LatAm. Si tu negocio depende de un sitio expuesto a Internet y nunca lo has revisado con criterio de seguridad, este servicio es para ti.',
      'aud.whyTitle': 'Por qué ahora',
      'aud.whyBody': 'Headers débiles, cookies sin flags, paneles de admin expuestos, backups a la vista o librerías obsoletas son hallazgos habituales. Un atacante no necesita un pentest completo: basta con lo que tu web ya revela.',
      'inc.label': 'Alcance',
      'inc.title': 'Qué incluye y qué no',
      'inc.lead': 'Alcance cerrado, autorizado y de solo lectura. Sin sorpresas en producción.',
      'inc.yes': 'Incluye',
      'inc.yes1': 'Cabeceras de seguridad, TLS/HTTPS, cookies y flags de sesión',
      'inc.yes2': 'CORS, CSP, archivos expuestos (.env, backups, .git) y directory listing',
      'inc.yes3': 'Superficie de autenticación (formularios de login) y CSRF básico en formularios',
      'inc.yes4': 'Checks comunes OWASP Top 10 sin explotación',
      'inc.yes5': 'Inventario ligero de subdominios/activos y scripts de terceros',
      'inc.yes6': 'Hasta 15 riesgos priorizados + llamada de entrega 45 min',
      'inc.no': 'No incluye',
      'inc.no1': 'Explotación ni pruebas destructivas',
      'inc.no2': 'DoS / denegación de servicio',
      'inc.no3': 'Ingeniería social',
      'inc.no4': 'Pentest completo o auditoría de código fuente',
      'inc.no5': 'Cambios en producción',
      'proc.label': 'Proceso',
      'proc.title': 'Cómo funciona',
      'proc.lead': 'Cuatro pasos. Menos de un día de coordinación por tu parte.',
      'proc.s1n': 'Paso 1',
      'proc.s1t': 'Llamada 20 min',
      'proc.s1b': 'Alineamos alcance, URLs objetivo y ventana de ejecución.',
      'proc.s2n': 'Paso 2',
      'proc.s2t': 'Contrato + autorización',
      'proc.s2b': 'Documentación clara y permiso escrito de solo lectura.',
      'proc.s3n': 'Paso 3',
      'proc.s3t': 'Ejecución guiada',
      'proc.s3b': 'Revisión remota no destructiva sobre el sitio autorizado.',
      'proc.s4n': 'Paso 4',
      'proc.s4t': 'Informe en 5 días',
      'proc.s4b': 'Hallazgos priorizados + llamada de entrega de 45 min.',
      'price.label': 'Precios',
      'price.title': 'Elige el alcance',
      'price.lead': 'Precios + IVA. Un sitio / dominio principal. Entrega en 5 días laborables.',
      'price.basic': 'Básico',
      'price.vat': '+ IVA',
      'price.basicNote': '1 sitio web',
      'price.basic1': 'Informe de hasta 15 riesgos',
      'price.basic2': 'Hallazgos priorizados + evidencia',
      'price.basic3': 'Llamada de entrega 45 min',
      'price.badge': 'Recomendado',
      'price.plus': 'Plus ⭐',
      'price.plusNote': 'Máximo valor',
      'price.plus1': 'Todo lo del Básico',
      'price.plus2': 'Plan de remediación 30/60/90',
      'price.plus3': 'Re-test a 30 días',
      'price.pilot': 'Piloto',
      'price.pilotNote': '2 primeros clientes',
      'price.pilot1': 'Alcance Básico',
      'price.pilot2': 'Precio de lanzamiento',
      'price.pilot3': 'A cambio de testimonio',
      'price.cta': 'Reservar llamada',
      'about.label': 'Quién soy',
      'about.meta': 'eJPTv2 · junior pentester · web + offensive security · labs HTB / web',
      'about.quote': '«Te digo qué está mal, por qué importa y cómo arreglarlo, en el orden correcto.»',
      'cta.title': 'Reserva tu llamada de 20 minutos',
      'cta.body': 'Sin compromiso. Alineamos si el alcance encaja y la ventana de ejecución.',
      'cta.btn': 'Reservar llamada de 20 min',
      'footer.body': 'El informe de ejemplo es ficticio y no corresponde a un cliente real. Auditoría Web Express es un servicio de revisión de seguridad de solo lectura sobre sitios web públicos. No incluye explotación, DoS, ingeniería social ni pentest completo.',
      'mail.subject': 'Auditoría Web Express',
      'mail.basic': 'Auditoría Web Express — Básico',
      'mail.plus': 'Auditoría Web Express — Plus',
      'mail.pilot': 'Auditoría Web Express — Piloto',
      'report.watermark': 'FICTICIO',
      'report.badge': 'Ejemplo ficticio',
      'report.title': 'Informe de auditoría web',
      'report.meta': 'Sitio: www.hotelcostaluz.example · Entrega: 5 días laborables · Solo lectura',
      'report.exec': 'Resumen ejecutivo',
      'report.crit': 'Crítico',
      'report.c1': 'Panel de administración accesible sin restricción de IP ni MFA — superficie de ataque directa sobre el back-office de reservas.',
      'report.c2': 'Directorio /backups expuesto con listado de archivos — copias de configuración y datos a la vista de cualquier visitante.',
      'report.c3': 'jQuery 1.x obsoleto con vulnerabilidades XSS conocidas cargado en páginas públicas de reservas.',
      'report.top5': 'Top 5 hallazgos',
      'report.thFinding': 'Hallazgo',
      'report.thSev': 'Severidad',
      'report.thArea': 'Área',
      'report.f1': 'Panel de administración expuesto a Internet',
      'report.f2': 'Directory listing abierto en /backups',
      'report.f3': 'jQuery desactualizado (riesgo XSS)',
      'report.f4': 'Cabecera HSTS ausente',
      'report.f5': 'Cookies de sesión sin Secure / HttpOnly',
      'report.area1': 'Auth surface',
      'report.area2': 'Exposición',
      'report.area3': 'Dependencias',
      'report.area4': 'TLS / Headers',
      'report.area5': 'Sesión',
      'report.sevHigh': 'Alto',
      'report.sevMed': 'Medio',
      'report.note': 'Este documento es un teaser ficticio. Un informe real incluye hasta 15 riesgos, evidencia, impacto y (en Plus) plan de remediación 30/60/90 con re-test a 30 días.',
      'report.back': 'Volver a Auditoría Web Express',
      'report.cta': 'Reservar llamada de 20 min',
      'report.footer': 'Informe de ejemplo ficticio. No corresponde a un cliente real ni a datos reales de Hotel Costa Luz.',
      'report.home': 'Inicio'
    },
    en: {
      'meta.title': 'Web Audit Express — Web security in 5 days',
      'meta.desc': 'Web Audit Express: know in 5 days where your site is vulnerable and what to fix first. Read-only review, prioritized report. SMBs ES+LatAm.',
      'meta.titleReport': 'Sample report (FICTITIOUS) — Web Audit Express',
      'meta.descReport': 'Fictitious sample report — Web Audit Express. Hotel Costa Luz.',
      'nav.brand': 'Web Audit',
      'nav.aria': 'Primary',
      'nav.audience': 'Who it’s for',
      'nav.includes': 'Scope',
      'nav.process': 'Process',
      'nav.pricing': 'Pricing',
      'nav.cta': 'Book a call',
      'nav.back': '← Back',
      'nav.theme': 'Theme',
      'nav.lang': 'Language',
      'theme.light': 'Light',
      'theme.dark': 'Dark',
      'hero.eyebrow': 'Read-only · 5 business days',
      'hero.title': 'Web Audit Express',
      'hero.subtitle': 'Know in 5 days where your site is vulnerable and what to fix first',
      'hero.sub': 'Read-only security review of your public site. Fixed scope, prioritized report. No exploitation and no changes in production.',
      'hero.cta': 'Book a 20-min call',
      'hero.sample': 'View sample report',
      'aud.label': 'Context',
      'aud.title': 'Who it’s for and why now',
      'aud.whoTitle': 'Who it’s for',
      'aud.whoBody': 'SMBs with a public website, e-commerce, or booking sites in Spain and LatAm. If your business depends on a site exposed to the internet and you’ve never reviewed it with a security lens, this service is for you.',
      'aud.whyTitle': 'Why now',
      'aud.whyBody': 'Weak headers, cookies without flags, exposed admin panels, backups in plain sight, or outdated libraries are common findings. An attacker doesn’t need a full pentest—what your site already reveals is enough.',
      'inc.label': 'Scope',
      'inc.title': 'What’s included and what’s not',
      'inc.lead': 'Fixed, authorized, read-only scope. No surprises in production.',
      'inc.yes': 'Included',
      'inc.yes1': 'Security headers, TLS/HTTPS, cookies and session flags',
      'inc.yes2': 'CORS, CSP, exposed files (.env, backups, .git) and directory listing',
      'inc.yes3': 'Authentication surface (login forms) and basic CSRF on forms',
      'inc.yes4': 'Common OWASP Top 10 checks without exploitation',
      'inc.yes5': 'Light inventory of subdomains/assets and third-party scripts',
      'inc.yes6': 'Up to 15 prioritized risks + 45-min delivery call',
      'inc.no': 'Not included',
      'inc.no1': 'Exploitation or destructive testing',
      'inc.no2': 'DoS / denial of service',
      'inc.no3': 'Social engineering',
      'inc.no4': 'Full pentest or source-code audit',
      'inc.no5': 'Changes in production',
      'proc.label': 'Process',
      'proc.title': 'How it works',
      'proc.lead': 'Four steps. Less than a day of coordination on your side.',
      'proc.s1n': 'Step 1',
      'proc.s1t': '20-min call',
      'proc.s1b': 'We align on scope, target URLs, and the execution window.',
      'proc.s2n': 'Step 2',
      'proc.s2t': 'Contract + authorization',
      'proc.s2b': 'Clear documentation and written read-only permission.',
      'proc.s3n': 'Step 3',
      'proc.s3t': 'Guided execution',
      'proc.s3b': 'Non-destructive remote review of the authorized site.',
      'proc.s4n': 'Step 4',
      'proc.s4t': 'Report in 5 days',
      'proc.s4b': 'Prioritized findings + 45-min delivery call.',
      'price.label': 'Pricing',
      'price.title': 'Choose your scope',
      'price.lead': 'Prices + VAT. One site / primary domain. Delivery in 5 business days.',
      'price.basic': 'Basic',
      'price.vat': '+ VAT',
      'price.basicNote': '1 website',
      'price.basic1': 'Report of up to 15 risks',
      'price.basic2': 'Prioritized findings + evidence',
      'price.basic3': '45-min delivery call',
      'price.badge': 'Recommended',
      'price.plus': 'Plus ⭐',
      'price.plusNote': 'Best value',
      'price.plus1': 'Everything in Basic',
      'price.plus2': '30/60/90 remediation plan',
      'price.plus3': 'Re-test at 30 days',
      'price.pilot': 'Pilot',
      'price.pilotNote': 'First 2 clients',
      'price.pilot1': 'Basic scope',
      'price.pilot2': 'Launch pricing',
      'price.pilot3': 'In exchange for a testimonial',
      'price.cta': 'Book a call',
      'about.label': 'About',
      'about.meta': 'eJPTv2 · junior pentester · web + offensive security · HTB / web labs',
      'about.quote': '“I tell you what’s wrong, why it matters, and how to fix it—in the right order.”',
      'cta.title': 'Book your 20-minute call',
      'cta.body': 'No commitment. We align on whether the scope fits and the execution window.',
      'cta.btn': 'Book a 20-min call',
      'footer.body': 'The sample report is fictitious and does not correspond to a real client. Web Audit Express is a read-only security review service for public websites. It does not include exploitation, DoS, social engineering, or a full pentest.',
      'mail.subject': 'Web Audit Express',
      'mail.basic': 'Web Audit Express — Basic',
      'mail.plus': 'Web Audit Express — Plus',
      'mail.pilot': 'Web Audit Express — Pilot',
      'report.watermark': 'FICTITIOUS',
      'report.badge': 'Fictitious sample',
      'report.title': 'Web audit report',
      'report.meta': 'Site: www.hotelcostaluz.example · Delivery: 5 business days · Read-only',
      'report.exec': 'Executive summary',
      'report.crit': 'Critical',
      'report.c1': 'Admin panel reachable without IP restriction or MFA — direct attack surface on the reservations back office.',
      'report.c2': 'Exposed /backups directory with file listing — configuration copies and data visible to any visitor.',
      'report.c3': 'Outdated jQuery 1.x with known XSS vulnerabilities loaded on public booking pages.',
      'report.top5': 'Top 5 findings',
      'report.thFinding': 'Finding',
      'report.thSev': 'Severity',
      'report.thArea': 'Area',
      'report.f1': 'Admin panel exposed to the internet',
      'report.f2': 'Open directory listing on /backups',
      'report.f3': 'Outdated jQuery (XSS risk)',
      'report.f4': 'Missing HSTS header',
      'report.f5': 'Session cookies without Secure / HttpOnly',
      'report.area1': 'Auth surface',
      'report.area2': 'Exposure',
      'report.area3': 'Dependencies',
      'report.area4': 'TLS / Headers',
      'report.area5': 'Session',
      'report.sevHigh': 'High',
      'report.sevMed': 'Medium',
      'report.note': 'This document is a fictitious teaser. A real report includes up to 15 risks, evidence, impact, and (in Plus) a 30/60/90 remediation plan with a re-test at 30 days.',
      'report.back': 'Back to Web Audit Express',
      'report.cta': 'Book a 20-min call',
      'report.footer': 'Fictitious sample report. It does not correspond to a real client or real data from Hotel Costa Luz.',
      'report.home': 'Home'
    }
  };

  function getStoredLang() {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (e) {
      return null;
    }
  }

  function resolveLang() {
    var stored = getStoredLang();
    if (stored === 'en' || stored === 'es') return stored;
    return 'es';
  }

  function t(lang, key) {
    var dict = I18N[lang] || I18N.es;
    return dict[key] != null ? dict[key] : (I18N.es[key] != null ? I18N.es[key] : key);
  }

  function applyLang(lang, persist) {
    var l = lang === 'en' ? 'en' : 'es';
    document.documentElement.setAttribute('lang', l);
    if (persist) {
      try {
        localStorage.setItem(LANG_KEY, l);
      } catch (e) { /* ignore */ }
    }

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      el.textContent = t(l, key);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (!key) return;
      el.setAttribute('aria-label', t(l, key));
    });

    document.querySelectorAll('[data-i18n-mail]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-mail');
      if (!key) return;
      var subject = encodeURIComponent(t(l, key));
      var href = el.getAttribute('href') || '';
      var base = href.split('?')[0];
      if (base.indexOf('mailto:') === 0) {
        el.setAttribute('href', base + '?subject=' + subject);
      }
    });

    var page = document.body.getAttribute('data-page') || 'home';
    if (page === 'report') {
      document.title = t(l, 'meta.titleReport');
      var metaR = document.querySelector('meta[name="description"]');
      if (metaR) metaR.setAttribute('content', t(l, 'meta.descReport'));
    } else {
      document.title = t(l, 'meta.title');
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', t(l, 'meta.desc'));
    }

    syncLangButtons(l);
  }

  function syncLangButtons(lang) {
    document.querySelectorAll('[data-lang-set]').forEach(function (btn) {
      var on = btn.getAttribute('data-lang-set') === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* —— Init preference UI —— */
  function bindControls() {
    document.querySelectorAll('[data-theme-set]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(btn.getAttribute('data-theme-set'), true);
      });
    });
    document.querySelectorAll('[data-lang-set]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-lang-set'), true);
      });
    });
  }

  /* Apply theme/lang early values already on <html>; sync UI + translate */
  var theme = document.documentElement.getAttribute('data-theme') || resolveTheme();
  setTheme(theme, false);
  var lang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : resolveLang();
  applyLang(lang, false);
  bindControls();

  /* —— Scroll reveal —— */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = document.querySelectorAll('.reveal');

  function revealAll(list) {
    list.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll(nodes);
    return;
  }

  function inViewport(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var vw = window.innerWidth || document.documentElement.clientWidth;
    return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '40px 0px 40px 0px', threshold: 0.01 }
  );

  nodes.forEach(function (el) {
    if (inViewport(el)) {
      el.classList.add('is-visible');
      return;
    }
    observer.observe(el);
  });

  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }, 800);
})();
