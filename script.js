// Smooth scrolling para links do menu
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
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(13, 15, 54, 0.95) 0%, rgba(41, 67, 128, 0.95) 100%)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #0d0f36 0%, #294380 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.segmento-card, .portfolio-card, .contato-info, .contato-form');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Menu ativo baseado na seção
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Formulário de contato
document.querySelector('.contato-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simular envio (aqui você integraria com backend)
    const submitButton = this.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = 'Enviado com sucesso!';
        submitButton.style.background = 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = 'linear-gradient(135deg, #294380 0%, #0d0f36 100%)';
            this.reset();
        }, 2000);
    }, 1500);
});

// Efeitos de hover aprimorados
document.querySelectorAll('.cta-button, .secondary-button, .whatsapp-header').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Analytics de cliques (preparado para implementação futura)
function trackClick(element, action) {
    console.log(`Click tracked: ${action} on element:`, element);
    // Aqui você pode adicionar Google Analytics ou outro sistema
}

// Track cliques importantes
document.addEventListener('DOMContentLoaded', () => {
    const whatsappBtns = document.querySelectorAll('a[href*="wa.me"]');
    const ctaBtns = document.querySelectorAll('.cta-button');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', () => trackClick(btn, 'WhatsApp Click'));
    });
    
    ctaBtns.forEach(btn => {
        btn.addEventListener('click', () => trackClick(btn, 'CTA Click'));
    });
});

// Menu hambúrguer mobile
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenuToggle.classList.remove('active');
            menu.classList.remove('active');
        }
    });
    
    // Fechar menu ao redimensionar tela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            menu.classList.remove('active');
        }
    });
});