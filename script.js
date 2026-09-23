document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const updateNavbar = () => {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('bg-renascer-dark/95', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-white/10', 'py-3');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.remove('bg-renascer-dark/95', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-white/10', 'py-3');
            navbar.classList.add('py-4');
        }
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // Mobile Menu Toggle & Accessibility
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        if (closeMenuBtn) closeMenuBtn.focus();
    }

    function closeMenu() {
        if (!mobileMenu || !mobileBtn) return;
        mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        mobileBtn.focus();
    }

    function toggleMenu() {
        if (!mobileMenu) return;
        const isClosed = mobileMenu.classList.contains('opacity-0');
        if (isClosed) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('opacity-0')) {
            closeMenu();
        }
    });

    // Gallery Filter Handling
    const filterButtons = document.querySelectorAll('[data-gallery-filter]');
    const galleryItems = document.querySelectorAll('[data-gallery-item]');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-gallery-filter');
                
                // Update active tab styles
                filterButtons.forEach(b => {
                    const isActive = b === btn;
                    b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                    if (isActive) {
                        b.classList.remove('bg-white/5', 'text-renascer-gray', 'hover:text-white');
                        b.classList.add('bg-renascer-green', 'text-white', 'shadow-md');
                    } else {
                        b.classList.remove('bg-renascer-green', 'text-white', 'shadow-md');
                        b.classList.add('bg-white/5', 'text-renascer-gray', 'hover:text-white');
                    }
                });

                // Filter items with smooth transition
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-gallery-item');
                    if (category === 'all' || itemCategory === category) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 20);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.96)';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 200);
                    }
                });
            });
        });
    }

    // Intersection Observer for Animations (Reveal)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const revealElements = document.querySelectorAll('.reveal');
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('active');
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
    }
});
