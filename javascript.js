document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. Funcionalidad del Menú Móvil
    // =========================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Función para alternar el menú
    function toggleMenu() {
        const isActive = navList.classList.toggle('active');
        // Accesibilidad: Actualizar atributo aria-expanded
        mobileBtn.setAttribute('aria-expanded', isActive);
        
        // Animación simple para el icono de hamburguesa (opcional si se desea agregar CSS extra)
        mobileBtn.classList.toggle('is-active');
    }

    // Event Listener para el botón
    mobileBtn.addEventListener('click', toggleMenu);

    // Cerrar el menú automáticamente al hacer clic en un enlace
    // Esto mejora la experiencia de usuario (UX) en móviles
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !mobileBtn.contains(e.target) && navList.classList.contains('active')) {
            toggleMenu();
        }
    });

    // =========================================
    // 2. Scroll Suave con Compensación de Header
    // =========================================
    // Seleccionamos todos los enlaces que inician con # (anclas internas)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Altura del header fijo (definido en CSS como 70px)
                const headerOffset = 70; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================================
    // 3. Simulación de Envío de Formulario
    // =========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir recarga real de la página
            
            // Simulación de feedback visual
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Simular retardo de red (2 segundos)
            setTimeout(() => {
                alert('¡Gracias por tu mensaje! La Dra. García te contactará pronto.');
                contactForm.reset(); // Limpiar formulario
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // =========================================
    // 4. Efecto de Header al hacer Scroll (Opcional)
    // =========================================
    // Añade una sombra más fuerte cuando el usuario baja
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
        }
    });

});