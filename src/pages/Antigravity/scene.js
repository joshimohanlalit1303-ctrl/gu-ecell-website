export function initScene() {
  const loadingScreen = document.getElementById('loading-screen');
  const loaderFill = document.querySelector('.loader-fill');
  if(!loadingScreen || !loaderFill) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    loaderFill.style.width = `${progress}%`;
    
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        initScrollReveals();
      }, 500);
    }
  }, 100);

  let lenis;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  const mobileMenu = document.getElementById('mobile-menu');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -100 });
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
        }
      }
    });
  });

  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function cursorLoop() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    if(cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  const interactables = document.querySelectorAll('a, button, .faq-q, .tab-btn, .f-card, .pillar-card, .outcome-card, .track-card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });

  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scroll-progress-bar');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    if (scrollProgressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgressBar.style.width = scrolled + "%";
    }
  });

  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileClose = document.querySelector('.mobile-menu-close');

  if(mobileToggle && mobileMenu) mobileToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  if(mobileClose && mobileMenu) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-text');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -100px 0px", threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  if (typeof window.countUp !== 'undefined') {
    const counterElements = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseFloat(el.getAttribute('data-target'));
          
          let prefix = '';
          if (el.innerHTML.includes('₹')) prefix = '₹';
          
          const counter = new window.countUp.CountUp(el, targetNum, {
            duration: 2.5,
            separator: ',',
            prefix: prefix,
            useEasing: true
          });
          
          if (!counter.error) {
            counter.start();
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => counterObserver.observe(el));
  }

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if(targetPane) targetPane.classList.add('active');
    });
  });

  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    if(q) {
      q.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}
