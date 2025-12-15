// ============================================
// PORTFOLIO YOU KNOW - JAVASCRIPT COMPLET
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MENU HAMBURGER PARFAIT
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    hamburger.addEventListener('click', toggleMenu);
    
    // Fermer au clic sur lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Fermer au clic extérieur
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = 'auto';
        }
    });
    
    // 2. SMOOTH SCROLL + NAVBAR ACTIVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Fermer menu mobile
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Navbar active sur scroll
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });
    
    // 3. ANIMATIONS SCROLL
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments
    document.querySelectorAll('.project-card, .skill-category, .about-grid, .contact-form, .experience-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    // 4. ANIMATIONS BARRES COMPÉTENCES
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.dataset.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-progress').forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // 5. FORMULAIRE CONTACT
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
            submitBtn.disabled = true;
            
            // Simulation envoi
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            contactForm.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 5rem; margin-bottom: 2rem;">✅</div>
                    <h3 style="font-size: 2rem; margin-bottom: 1rem;">Message envoyé !</h3>
                    <p style="font-size: 1.2rem; margin-bottom: 2rem;">Merci pour votre message, je vous réponds sous 24h.</p>
                    <button onclick="location.reload()" class="btn btn-primary" style="width: 250px;">Nouveau message</button>
                </div>
            `;
        });
    }
    
    // 6. PARTICULES BACKGROUND
    function createParticles() {
        const hero = document.querySelector('.hero');
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
            hero.appendChild(particle);
        }
    }
    createParticles();
    
    // 7. PRELOADER
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 600);
    }
    
    // 8. INTERACTIONS CARDS PROJETS
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-20px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
        card.addEventListener('click', () => {
            alert('Détails du projet bientôt disponibles ! Ajoutez vos images réelles ici.');
        });
    });
    
    // 9. SCROLL INDICATEUR
    document.querySelector('.hero-scroll').addEventListener('click', () => {
        document.querySelector('#apropos').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
});
