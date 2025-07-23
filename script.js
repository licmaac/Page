// script.js
// Configuración de partículas
particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 120,
            color: '#ffffff',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});

// Cambiar navbar al hacer scroll
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar menú al hacer clic en un enlace
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    });
});

// Animación al desplazar
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .product-card, .installer-card');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Carrusel de testimonios
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
        testimonial.classList.remove('active');
    });
    testimonials[index].style.display = 'block';
    setTimeout(() => {
        testimonials[index].classList.add('active');
    }, 10);
}

// Cambiar testimonio cada 5 segundos
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Pausar carrusel al interactuar
const testimonialsContainer = document.querySelector('.testimonials-slider');
if (testimonialsContainer) {
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    testimonialsContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
}

// Mostrar el primer testimonio al cargar
showTestimonial(0);

// Newsletter
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            alert('Por favor ingresa tu correo electrónico');
            return;
        }
        if (!emailRegex.test(emailInput.value)) {
            alert('Por favor ingresa un correo válido');
            return;
        }
        alert('¡Gracias por suscribirte a nuestro boletín!');
        newsletterForm.reset();
    });
}

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contador animado para estadísticas
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        // Iniciar cuando el elemento es visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        });
        observer.observe(counter);
    });
}

// Inicializar carruseles con Swiper
document.addEventListener('DOMContentLoaded', function() {
    // Carrusel de productos
    const productsSwiper = new Swiper('.products-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    // Carrusel de instaladores
    const installersSwiper = new Swiper('.installers-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        controller: {
            control: productsSwiper,
        },
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    });
});



// Filtrado del portafolio
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase activa de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase activa al botón clickeado
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        portfolioItems.forEach(item => {
    if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
    } else {
        item.style.display = 'none';
    }
});
    });
});

// Al cargar la página, filtrar por la categoría "contabilidad"
window.addEventListener('DOMContentLoaded', () => {
    const defaultFilter = 'category1'; // Ajusta según tu categoría
    filterButtons.forEach(btn => btn.classList.remove('active'));
    const defaultBtn = document.querySelector(`.filter-btn[data-filter="${defaultFilter}"]`);
    if (defaultBtn) defaultBtn.classList.add('active');
    portfolioItems.forEach(item => {
        if (item.dataset.category === defaultFilter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Modal para videos del portafolio
const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.querySelector('.close-modal');
const videoFrame = document.getElementById('portfolioVideo');
const portfolioVideoBtns = document.querySelectorAll('.portfolio-btn.view-video');

portfolioVideoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        let videoUrl = btn.getAttribute('data-video');
        // Convertir enlaces cortos de YouTube a formato embed
        const youtubeShort = /^https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;
        const match = videoUrl.match(youtubeShort);
        if (match) {
            videoUrl = `https://www.youtube.com/embed/${match[1]}`;
        }
        videoFrame.src = videoUrl;
        videoModal.style.display = 'block';
    });
});

closeVideoModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    videoFrame.src = '';
});

window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        videoFrame.src = '';
    }
});

// Modal para imágenes de servicios
const serviceImageModal = document.getElementById('imageModal');
const closeServiceImageModal = document.querySelector('.close-image-modal');
const expandedServiceImg = document.getElementById('expandedImg');
const serviceIcons = document.querySelectorAll('.services-icon');

serviceIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const imageSrc = icon.getAttribute('data-image');
        expandedServiceImg.src = imageSrc;
        serviceImageModal.style.display = 'block';
    });
});

closeServiceImageModal.addEventListener('click', () => {
    serviceImageModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === serviceImageModal) {
        serviceImageModal.style.display = 'none';
    }
});

// Modal para imágenes del portafolio
const portfolioImageModal = document.getElementById('portfolioImageModal');
const closePortfolioImageModal = document.querySelector('.close-portfolio-image-modal');
const expandedPortfolioImg = document.getElementById('expandedPortfolioImg');
const portfolioImages = document.querySelectorAll('.portfolio-img.view-image');

portfolioImages.forEach(img => {
    img.addEventListener('click', () => {
        const imageSrc = img.getAttribute('data-image');
        expandedPortfolioImg.src = imageSrc;
        portfolioImageModal.style.display = 'block';
    });
});

closePortfolioImageModal.addEventListener('click', () => {
    portfolioImageModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === portfolioImageModal) {
        portfolioImageModal.style.display = 'none';
    }
});

// Cerrar modales con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        videoModal.style.display = 'none';
        serviceImageModal.style.display = 'none';
        portfolioImageModal.style.display = 'none';
        videoFrame.src = '';
    }
});


