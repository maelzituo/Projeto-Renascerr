function removeGreenBackground(imgElement) {
    // Already processed or processing
    if (imgElement.dataset.processed) return;
    imgElement.dataset.processed = "true";
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgElement.src;
    
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        try {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // Detect bright green (typical chroma key green)
                if (g > 100 && g > r * 1.3 && g > b * 1.3) {
                    // Make pixel transparent
                    data[i + 3] = 0;
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
            imgElement.src = canvas.toDataURL('image/png');
        } catch(e) {
            console.error("Canvas taint error, unable to process image", e);
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Process chroma key logos
    const logos = document.querySelectorAll('.chroma-key-logo');
    logos.forEach(logo => {
        if (logo.complete) {
            removeGreenBackground(logo);
            } else {
            logo.addEventListener('load', () => removeGreenBackground(logo));
        }
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('bg-renascer-dark/95', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-white/5');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-3');
            } else {
            navbar.classList.remove('bg-renascer-dark/95', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-white/5');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-3');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        const isClosed = mobileMenu.classList.contains('opacity-0');
        if (isClosed) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Intersection Observer for Animations (Reveal)
    // Respeita a preferência do usuário por movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const revealElements = document.querySelectorAll('.reveal');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(el => {
            observer.observe(el);
        });
        } else {
        // Se prefers-reduced-motion for ativado, exibe tudo imediatamente sem animação
        document.querySelectorAll('.reveal').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
    }
});
