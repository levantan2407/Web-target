/**
 * TARGET B1-B2 Static Application Script
 * Vanilla JavaScript implementation of interactive features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Initialize Particles.js on Hero Section
  initParticles();

  // 3. Initialize Scroll Reveal & ScrollSpy Animations
  initScrollReveal();
  initScrollSpy();

  // 4. Close modal when clicking on overlay background
  const modalOverlay = document.getElementById('consultation-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeConsultationModal();
      }
    });
  }

  // 5. ESC key closes modal & mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeConsultationModal();
      closeMobileMenu();
    }
  });

  // 6. Check URL hash for section switching
  function handleUrlHash() {
    const hash = window.location.hash;
    if (hash === '#teacher-info-section' || hash === '#teacher') {
      setTimeout(() => switchTab('teacher'), 100);
      setTimeout(() => switchTab('teacher'), 400);
    } else if (hash === '#courses-section' || hash === '#courses') {
      setTimeout(() => switchTab('courses'), 100);
      setTimeout(() => switchTab('courses'), 400);
    } else if (hash === '#roadmap-section' || hash === '#roadmap') {
      setTimeout(() => switchTab('roadmap'), 100);
      setTimeout(() => switchTab('roadmap'), 400);
    } else if (hash === '#hero-section' || hash === '#home') {
      setTimeout(() => switchTab('home'), 100);
    }
  }

  handleUrlHash();
  window.addEventListener('hashchange', handleUrlHash);
});

/* ==================== PARTICLES.JS INIT ==================== */
function initParticles() {
  // Removed: New clean VSTEP design does not use particles
}

let isManualScrolling = false;
let manualScrollTimeout = null;

/* ==================== TAB NAVIGATION ==================== */
function switchTab(tabName, event) {
  if (event) event.preventDefault();

  // Set manual scrolling lock to prevent scrollspy override during smooth scroll
  isManualScrolling = true;
  if (manualScrollTimeout) clearTimeout(manualScrollTimeout);
  manualScrollTimeout = setTimeout(() => {
    isManualScrolling = false;
  }, 1000);

  // Update navbar button active styles
  const navBtns = document.querySelectorAll('.nav-tab-btn');
  navBtns.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else if (btn.hasAttribute('data-tab')) {
      btn.classList.remove('active');
    }
  });

  // Handle section visibility or smooth scrolling based on tab selection
  const structureSec = document.getElementById('structure-section');

  if (tabName === 'structure') {
    if (structureSec) {
      structureSec.classList.remove('hidden');
      structureSec.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  }

  const sections = {
    home: 'hero-section',
    structure: 'structure-section',
    courses: 'courses-section',
    roadmap: 'roadmap-section',
    reviews: 'reviews-section',
    teacher: 'teacher-info-section'
  };

  const targetSectionId = sections[tabName] || 'hero-section';
  const targetElement = document.getElementById(targetSectionId);

  if (targetElement) {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 90;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - headerHeight - 16);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    if (tabName !== 'structure' && structureSec && !structureSec.classList.contains('hidden')) {
      setTimeout(() => {
        structureSec.classList.add('hidden');
      }, 500);
    }
  }
}

/* ==================== COURSE TAB SWITCHER (B1/B2) ==================== */
function switchCourseTab(level) {
  const contentB1 = document.getElementById('course-content-b1');
  const contentB2 = document.getElementById('course-content-b2');
  const tabB1 = document.getElementById('course-tab-b1');
  const tabB2 = document.getElementById('course-tab-b2');

  if (level === 'B1') {
    if (contentB1) {
      contentB1.classList.remove('hidden');
      contentB1.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }
    if (contentB2) contentB2.classList.add('hidden');
    if (tabB1) {
      tabB1.classList.add('border-primary', 'bg-[#FAF0ED]');
      tabB1.classList.remove('border-gray-200', 'bg-white');
    }
    if (tabB2) {
      tabB2.classList.remove('border-primary', 'bg-[#FAF0ED]');
      tabB2.classList.add('border-gray-200', 'bg-white');
    }
  } else if (level === 'B2') {
    if (contentB2) {
      contentB2.classList.remove('hidden');
      contentB2.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }
    if (contentB1) contentB1.classList.add('hidden');
    if (tabB2) {
      tabB2.classList.add('border-primary', 'bg-[#FAF0ED]');
      tabB2.classList.remove('border-gray-200', 'bg-white');
    }
    if (tabB1) {
      tabB1.classList.remove('border-primary', 'bg-[#FAF0ED]');
      tabB1.classList.add('border-gray-200', 'bg-white');
    }
  }

  // Scroll to the content area
  const targetContent = document.getElementById(level === 'B1' ? 'course-content-b1' : 'course-content-b2');
  if (targetContent) {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 90;
    const elementPosition = targetContent.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementPosition - headerHeight - 16);
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ==================== MOBILE MENU DRAWER ==================== */
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  if (mobileMenu) {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      if (openIcon) openIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    } else {
      mobileMenu.classList.add('open');
      if (openIcon) openIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    }
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('menu-icon-open');
  const closeIcon = document.getElementById('menu-icon-close');

  if (mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    if (openIcon) openIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  }
}

/* ==================== CONSULTATION MODAL ==================== */
function openConsultationModal(packageTitle) {
  const modal = document.getElementById('consultation-modal');
  const targetSelect = document.getElementById('modal-target-select');

  if (packageTitle && targetSelect) {
    if (packageTitle.includes('Cấp Tốc')) {
      targetSelect.value = 'B1-Fast';
    } else if (packageTitle.includes('Mất Gốc')) {
      targetSelect.value = 'B1-Foundation';
    } else if (packageTitle.includes('TARGET B2')) {
      targetSelect.value = 'B2-Pro';
    } else if (packageTitle.includes('Test')) {
      targetSelect.value = 'Test-Free';
    }
  }

  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  // Trigger Confetti Animation
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Show Toast Success Feedback
  const form = document.getElementById('consultation-form');
  if (form) {
    const originalContent = form.innerHTML;

    form.innerHTML = `
      <div class="text-center py-8 space-y-4">
        <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
          <i data-lucide="check-circle-2" class="w-8 h-8"></i>
        </div>
        <h4 class="text-xl font-bold text-primary">Đăng Ký Thành Công!</h4>
        <p class="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
          Cảm ơn bạn đã đăng ký. Đội ngũ chuyên gia TARGET sẽ liên hệ tư vấn qua Zalo cho bạn trong vòng 15 phút.
        </p>
        <button onclick="closeConsultationModal()" class="px-6 py-2.5 bg-primary text-white font-semibold text-xs rounded-xl hover:bg-primaryDark transition-colors">
          Đóng cửa sổ
        </button>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Reset form after modal close timeout
    setTimeout(() => {
      closeConsultationModal();
      setTimeout(() => {
        form.innerHTML = originalContent;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }, 500);
    }, 4000);
  }
}

/* ==================== ROADMAP TARGET TOGGLE & COLLAPSE ==================== */
function switchRoadmapTarget(target) {
  const btnB1 = document.getElementById('roadmap-btn-b1');
  const btnB2 = document.getElementById('roadmap-btn-b2');
  const contentB1 = document.getElementById('roadmap-content-b1');
  const contentB2 = document.getElementById('roadmap-content-b2');

  if (target === 'B1') {
    btnB1.className = 'px-6 py-2.5 rounded-xl font-bold text-sm transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-500/20';
    btnB2.className = 'px-6 py-2.5 rounded-xl font-semibold text-sm text-slate-400 hover:text-white transition-all';
    contentB1.classList.remove('hidden');
    contentB2.classList.add('hidden');
  } else if (target === 'B2') {
    btnB2.className = 'px-6 py-2.5 rounded-xl font-bold text-sm transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-500/20';
    btnB1.className = 'px-6 py-2.5 rounded-xl font-semibold text-sm text-slate-400 hover:text-white transition-all';
    contentB2.classList.remove('hidden');
    contentB1.classList.add('hidden');
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function toggleRoadmapCollapse(stageId) {
  const collapseEl = document.getElementById(stageId);
  const iconEl = document.getElementById(`${stageId}-icon`);

  if (collapseEl) {
    const isOpen = collapseEl.classList.contains('open');
    if (isOpen) {
      collapseEl.classList.remove('open');
      if (iconEl) iconEl.style.transform = 'rotate(0deg)';
    } else {
      collapseEl.classList.add('open');
      if (iconEl) iconEl.style.transform = 'rotate(180deg)';
    }
  }
}

/* ==================== SCROLL REVEAL ANIMATION ==================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==================== TEACHER SECTION TAB SWITCHER ==================== */
function switchTeacherTab(tabName) {
  const tabs = ['education', 'experience', 'activities'];
  
  tabs.forEach(t => {
    const btn = document.getElementById(`teacher-tab-${t}`);
    const sec = document.getElementById(`teacher-sec-${t}`);
    
    if (btn) {
      if (t === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }

    if (sec) {
      if (tabName === 'all' || t === tabName) {
        sec.style.display = '';
      } else {
        sec.style.display = 'none';
      }
    }
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ==================== SCROLLSPY NAVBAR HIGHLIGHTER ==================== */
function initScrollSpy() {
  const sections = [
    { id: 'hero-section', tab: 'home' },
    { id: 'courses-section', tab: 'courses' },
    { id: 'teacher-info-section', tab: 'teacher' }
  ];

  window.addEventListener('scroll', () => {
    if (isManualScrolling) return;

    let currentTab = '';
    const scrollPosition = window.pageYOffset + 180;

    sections.forEach(({ id, tab }) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentTab = tab;
        }
      }
    });

    if (currentTab) {
      const navBtns = document.querySelectorAll('.nav-tab-btn');
      navBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === currentTab) {
          btn.classList.add('active');
        } else if (btn.hasAttribute('data-tab')) {
          btn.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}
