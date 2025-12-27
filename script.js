// Hamburger Menu Toggle (cross-browser compatible)
var hamburgerMenu = document.querySelector('.hamburger-menu');
var navMenu = document.querySelector('.nav-menu');
var navLinks = document.querySelectorAll('.nav-link');

if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', function() {
        var isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
        hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when clicking on a nav link (mobile)
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburgerMenu.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !navMenu.contains(e.target) && 
            !hamburgerMenu.contains(e.target) &&
            navMenu.classList.contains('active')) {
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling for navigation links (cross-browser compatible)
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            var offsetTop = target.offsetTop - 80; // Account for fixed navbar
            // Cross-browser smooth scroll support
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for older browsers
                var currentPosition = window.pageYOffset;
                var targetPosition = offsetTop;
                var distance = targetPosition - currentPosition;
                var duration = 500;
                var start = null;
                
                function step(timestamp) {
                    if (!start) start = timestamp;
                    var progress = timestamp - start;
                    var percentage = Math.min(progress / duration, 1);
                    window.scrollTo(0, currentPosition + distance * percentage);
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                }
                window.requestAnimationFrame(step);
            }
        }
    });
});

// Active navigation link highlighting (cross-browser compatible)
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Intersection Observer for fade-in animations
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

// Observe project cards and other elements
document.querySelectorAll('.project-card, .about-content, .contact-content, .program-card, .certification-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Image Carousel - switches every minute (60 seconds)
const carouselImages = document.querySelectorAll('.carousel-image');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
const totalImages = carouselImages.length;
const switchInterval = 60000; // 60 seconds (1 minute)

function showImage(index) {
    // Hide all images
    carouselImages.forEach(img => img.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Show current image
    carouselImages[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
}

// Initialize carousel
if (carouselImages.length > 0) {
    showImage(0);
    
    // Auto-rotate every minute
    setInterval(nextImage, switchInterval);
    
    // Allow clicking indicators to switch images
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
        });
    });
}

// Horizontal Auto-Scrolling Carousel for Innovation Section
const contaminationCarousel = document.getElementById('contaminationCarousel');
if (contaminationCarousel) {
    const slides = contaminationCarousel.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlideIndex = 0;
    const scrollInterval = 4000; // 4 seconds between slides
    let autoScrollInterval = null;

    function scrollToSlide(index) {
        const translateX = -index * 100;
        contaminationCarousel.style.transform = `translateX(${translateX}%)`;
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        scrollToSlide(currentSlideIndex);
    }

    function startAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
        autoScrollInterval = setInterval(() => {
            nextSlide();
        }, scrollInterval);
    }

    // Initialize: start at first slide
    scrollToSlide(0);
    startAutoScroll();

    // Pause on hover, resume on mouse leave
    const carouselContainer = contaminationCarousel.closest('.horizontal-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    }
}

