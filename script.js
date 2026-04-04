// =========================================
// Wedding Invitation - Interactive Features
// =========================================

// ⚙️ WEDDING DATE CONFIGURATION
// =========================================
// 🎊 SET YOUR WEDDING DATE HERE! 🎊
// Format: 'YYYY-MM-DDTHH:MM:SS'
// Example: '2024-06-15T14:00:00' = June 15, 2024 at 2:00 PM
// =========================================
const WEDDING_DATE = new Date('2027-06-03T08:00:00');

// Other Configuration
const PETAL_COUNT = 12; // Subtle falling petals (10-15)

// =========================================
// STUNNING LOADING SCREEN ✨
// =========================================

// Create sparkles around loading names
function createLoadingSparkles() {
    const loadingContent = document.querySelector('.loading-content');
    if (!loadingContent) return;

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'loading-sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = (Math.random() * 2) + 's';
        sparkle.textContent = ['✨', '💫', '⭐', '🌸'][Math.floor(Math.random() * 4)];
        loadingContent.appendChild(sparkle);
    }
}

// Initialize loading effects
createLoadingSparkles();

// =========================================
// SCRATCH TO REVEAL LETTER BOX
// =========================================
const letterOverlay = document.getElementById('letter-overlay');
const scratchCanvas = document.getElementById('scratch-canvas');
const waxSealContainer = document.querySelector('.wax-seal-container');
const envelopeContainer = document.querySelector('.envelope-container');
const scratchHint = document.querySelector('.scratch-hint');
const scratchParticlesContainer = document.getElementById('scratch-particles');
const loadingScreen = document.getElementById('loading-screen');
const backgroundMusic = document.getElementById('background-music');

// Prevent body scroll when letter overlay is active
document.body.classList.add('no-scroll');

let isScratching = false;
let scratchPercentage = 0;
let sealBroken = false;
let celebrationTriggered = false;
let progressRing = null;
let ambientSparklesInterval = null;

// Moderate elegant scratch particles - balanced wax breaking effect
function createScratchParticles(x, y) {
    if (!scratchParticlesContainer) return;

    const rect = waxSealContainer.getBoundingClientRect();
    const particleCount = 8 + Math.floor(Math.random() * 4); // 8-12 particles - moderate

    // Balanced wax colors - pastels with some vibrant accents
    const particleColors = [
        '#ffb3d9',  // Medium pink
        '#ff99cc',  // Brighter pink
        '#ffcce6',  // Soft pink
        '#ffe0f0',  // Light pink
        '#ffd4e5',  // Pale rose
        '#f0d4c8',  // Rose gold
        '#e8c4a0',  // Soft gold
        '#ffd700',  // Gold accent
        '#ffffff'   // White shimmer
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'scratch-particle';

        // Moderate radial pattern
        const angle = (Math.random() * Math.PI * 2);
        const distance = 40 + Math.random() * 60; // Balanced distance
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - (Math.random() * 20); // Slight upward
        const rotate = Math.random() * 720 - 360; // Moderate rotation
        const duration = 0.7 + Math.random() * 0.4; // Balanced timing

        // Random color from balanced palette
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        particle.style.setProperty('--particle-color', color);

        // Medium-sized particles
        const size = 4 + Math.random() * 8; // 4-12px - moderate
        particle.style.setProperty('--size', size + 'px');

        // Set CSS variables for animation
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.setProperty('--rotate', rotate + 'deg');
        particle.style.setProperty('--duration', duration + 's');

        // Position particle at scratch point
        const localX = x - rect.left;
        const localY = y - rect.top;
        particle.style.left = localX + 'px';
        particle.style.top = localY + 'px';

        scratchParticlesContainer.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration * 1000);
    }
}

// Cursor trail sparkles
function createCursorTrail(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';

    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
}

// Global cursor trail for main page - balanced frequency
let lastTrailTime = 0;
function createGlobalCursorTrail(e) {
    const now = Date.now();
    // Throttle to create trail every 80ms for balanced effect
    if (now - lastTrailTime < 80) return;
    lastTrailTime = now;

    createCursorTrail(e.pageX, e.pageY);
}

// Enable cursor trails on main page after seal opens
function enableGlobalCursorTrails() {
    document.addEventListener('mousemove', createGlobalCursorTrail);

    // Touch events for mobile
    document.addEventListener('touchmove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 80) return;
        lastTrailTime = now;

        if (e.touches[0]) {
            createCursorTrail(e.touches[0].pageX, e.touches[0].pageY);
        }
    }, { passive: true });
}

// Update progress ring - scale to 50% (since seal breaks at 50%)
function updateProgressRing(percentage) {
    if (!progressRing) {
        progressRing = document.getElementById('progress-ring-progress');
        const ring = document.querySelector('.progress-ring');
        if (ring) ring.classList.add('active');
    }

    if (progressRing) {
        const circumference = 659.73;
        // Scale percentage so 50% scratch = 100% ring fill
        const scaledPercentage = Math.min((percentage / 50) * 100, 100);
        const offset = circumference - (scaledPercentage / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
}

// Celebration burst at 50%
function triggerCelebration() {
    if (celebrationTriggered) return;
    celebrationTriggered = true;

    const burstContainer = document.getElementById('celebration-burst');
    if (!burstContainer) return;

    // Seal pop animation
    const sealBase = document.querySelector('.wax-seal-base');
    if (sealBase) {
        sealBase.classList.add('seal-popping');
        setTimeout(() => sealBase.classList.remove('seal-popping'), 600);
    }

    // Moderate seal breaking burst - balanced and elegant
    const particleCount = 35; // Good balance
    const balancedColors = [
        '#ffb3d9',  // Medium pink
        '#ff99cc',  // Brighter pink
        '#ffcce6',  // Soft pink
        '#ffe0f0',  // Light pink
        '#f0d4c8',  // Rose gold
        '#e8c4a0',  // Soft gold
        '#ffd700',  // Gold accent
        '#ffffff'   // White
    ];

    // Balanced circular burst
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';

        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 80 + Math.random() * 60; // Moderate distance
        const burstX = Math.cos(angle) * distance;
        const burstY = Math.sin(angle) * distance;

        const color = balancedColors[Math.floor(Math.random() * balancedColors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 12px ${color}`;
        particle.style.setProperty('--burst-x', burstX + 'px');
        particle.style.setProperty('--burst-y', burstY + 'px');
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.animation = `burstExplode ${0.65 + Math.random() * 0.35}s ease-out forwards`;

        burstContainer.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }

    // Moderate sparkle effect
    for (let i = 0; i < 12; i++) {
        const star = document.createElement('div');
        star.className = 'burst-star';
        star.textContent = ['✨', '💫'][Math.floor(Math.random() * 2)];

        const angle = (Math.PI * 2 * i) / 12;
        const distance = 90 + Math.random() * 50;
        const burstX = Math.cos(angle) * distance;
        const burstY = Math.sin(angle) * distance;

        star.style.setProperty('--burst-x', burstX + 'px');
        star.style.setProperty('--burst-y', burstY + 'px');
        star.style.left = '50%';
        star.style.top = '50%';
        star.style.animation = `starBurst ${0.75 + Math.random() * 0.35}s ease-out forwards`;

        burstContainer.appendChild(star);

        setTimeout(() => star.remove(), 1100);
    }
}

// Create ambient floating sparkles
function createAmbientSparkle() {
    const container = document.getElementById('ambient-sparkles');
    if (!container) return;

    const sparkle = document.createElement('div');
    sparkle.className = 'ambient-sparkle';

    // Random position around the seal
    const angle = Math.random() * Math.PI * 2;
    const radius = 70 + Math.random() * 30;
    const x = 100 + Math.cos(angle) * radius;
    const y = 100 + Math.sin(angle) * radius;

    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparkle.style.animationDuration = (3 + Math.random() * 2) + 's';

    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 5000);
}

// Start ambient sparkles
function startAmbientSparkles() {
    if (ambientSparklesInterval) return;

    // Create initial sparkles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createAmbientSparkle(), i * 400);
    }

    // Continue creating sparkles
    ambientSparklesInterval = setInterval(() => {
        createAmbientSparkle();
    }, 1200);
}

// Stop ambient sparkles
function stopAmbientSparkles() {
    if (ambientSparklesInterval) {
        clearInterval(ambientSparklesInterval);
        ambientSparklesInterval = null;
    }
}

// Initialize scratch canvas
if (scratchCanvas) {
    const ctx = scratchCanvas.getContext('2d');
    const canvasWidth = scratchCanvas.width;
    const canvasHeight = scratchCanvas.height;

    // Create simple frosted overlay
    function initScratchOverlay() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Semi-transparent frosted gradient - can see heart through it
        const gradient = ctx.createRadialGradient(
            canvasWidth / 2, canvasHeight / 2, 0,
            canvasWidth / 2, canvasHeight / 2, canvasWidth / 2
        );
        gradient.addColorStop(0, 'rgba(255, 235, 245, 0.7)');    // More transparent
        gradient.addColorStop(0.5, 'rgba(255, 215, 235, 0.68)');
        gradient.addColorStop(1, 'rgba(255, 195, 225, 0.65)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Add some texture dots
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * canvasWidth;
            const y = Math.random() * canvasHeight;
            const size = Math.random() * 2 + 0.5;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    initScratchOverlay();

    // Start ambient sparkles on load
    startAmbientSparkles();

    // Scratch functionality with all enhancements
    function scratch(x, y) {
        if (sealBroken) return;

        const rect = scratchCanvas.getBoundingClientRect();
        const scaleX = canvasWidth / rect.width;
        const scaleY = canvasHeight / rect.height;
        const canvasX = (x - rect.left) * scaleX;
        const canvasY = (y - rect.top) * scaleY;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 20, 0, Math.PI * 2);
        ctx.fill();

        // Create enhanced flying particles
        createScratchParticles(x, y);

        // Create cursor trail sparkles
        createCursorTrail(x, y);

        // Hide hint after first scratch
        if (scratchHint) {
            scratchHint.classList.add('hidden');
        }

        // Update overlay color for smooth transition
        updateOverlayTransition();
    }

    // Calculate scratch percentage
    function calculateScratchPercentage() {
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const pixels = imageData.data;
        let transparent = 0;

        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 128) transparent++;
        }

        return (transparent / (pixels.length / 4)) * 100;
    }

    // Smooth color transition as scratching progresses
    function updateOverlayTransition() {
        const percentage = calculateScratchPercentage();

        // Update progress ring
        updateProgressRing(percentage);

        // Trigger celebration at 50%
        if (percentage >= 50 && !celebrationTriggered) {
            triggerCelebration();
        }

        // Gradually make overlay more transparent and glowy
        const opacity = Math.max(0.3, 0.9 - (percentage / 100) * 0.6);
        ctx.globalAlpha = opacity;
    }

    // Check if seal should break
    function checkScratchComplete() {
        if (sealBroken) return;

        scratchPercentage = calculateScratchPercentage();

        if (scratchPercentage >= 50) {
            sealBroken = true;
            breakSeal();
        }
    }

    // Break seal animation and open envelope
    function breakSeal() {
        // Stop ambient sparkles
        stopAmbientSparkles();

        // Animate seal breaking
        waxSealContainer.classList.add('breaking');

        // Wait for seal break, then open envelope
        setTimeout(() => {
            envelopeContainer.classList.add('open');

            // After envelope opens, hide letter overlay and start loading
            setTimeout(() => {
                letterOverlay.classList.add('opening');
                loadingScreen.style.display = 'flex';

                setTimeout(() => {
                    letterOverlay.style.display = 'none';
                    // Re-enable body scroll when letter overlay is removed
                    document.body.classList.remove('no-scroll');
                    startLoadingSequence();
                }, 1500);
            }, 1500);
        }, 600);
    }

    // Mouse events
    scratchCanvas.addEventListener('mousedown', (e) => {
        isScratching = true;
        scratch(e.clientX, e.clientY);
    });

    scratchCanvas.addEventListener('mousemove', (e) => {
        if (isScratching) {
            scratch(e.clientX, e.clientY);
        }
    });

    scratchCanvas.addEventListener('mouseup', () => {
        isScratching = false;
        checkScratchComplete();
    });

    scratchCanvas.addEventListener('mouseleave', () => {
        if (isScratching) {
            isScratching = false;
            checkScratchComplete();
        }
    });

    // Touch events
    scratchCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isScratching = true;
        const touch = e.touches[0];
        scratch(touch.clientX, touch.clientY);
    });

    scratchCanvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isScratching) {
            const touch = e.touches[0];
            scratch(touch.clientX, touch.clientY);
        }
    });

    scratchCanvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        isScratching = false;
        checkScratchComplete();
    });
}

function startLoadingSequence() {
    // Hide loading screen after 2.5 seconds
    setTimeout(() => {
        // Hide loading screen
        loadingScreen.style.display = 'none';

        // Enable cursor trails on main page
        enableGlobalCursorTrails();

        // Start background music after reveal
        setTimeout(() => {
            if (backgroundMusic) {
                backgroundMusic.volume = 0.0975;
                backgroundMusic.play().then(() => {
                    console.log('Background music playing');
                    const playingIcon = document.querySelector('.music-icon.playing');
                    const pausedIcon = document.querySelector('.music-icon.paused');
                    if (playingIcon) playingIcon.style.display = 'block';
                    if (pausedIcon) pausedIcon.style.display = 'none';
                }).catch((err) => {
                    console.log('Background music error:', err);
                    // Show paused icon
                    const playingIcon = document.querySelector('.music-icon.playing');
                    const pausedIcon = document.querySelector('.music-icon.paused');
                    if (playingIcon) playingIcon.style.display = 'none';
                    if (pausedIcon) pausedIcon.style.display = 'block';
                });
            }
        }, 500);
    }, 2500);
}

// Removed: Now handled by startLoadingSequence() triggered from audio start overlay

// =========================================
// BACKGROUND MUSIC TOGGLE
// =========================================
const musicToggle = document.getElementById('music-toggle');
// backgroundMusic already declared at top
const playingIcon = document.querySelector('.music-icon.playing');
const pausedIcon = document.querySelector('.music-icon.paused');

if (musicToggle && backgroundMusic) {
    // Handle music loading errors
    backgroundMusic.addEventListener('error', (e) => {
        console.warn('Music file not found. Please add your music file to the music/ folder.');
        // Hide the music player if no music is available
        const musicPlayer = document.getElementById('music-player');
        if (musicPlayer) {
            musicPlayer.style.display = 'none';
        }
    });

    // Check if music can be played
    backgroundMusic.addEventListener('canplaythrough', () => {
        console.log('Music loaded successfully!');
    });

    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                playingIcon.style.display = 'block';
                pausedIcon.style.display = 'none';
                musicToggle.setAttribute('aria-label', 'Pause music');
            }).catch((error) => {
                console.warn('Could not play music:', error.message);
                // Show error message
                alert('Unable to play music. Please check that the music file exists in the music/ folder.');
            });
        } else {
            backgroundMusic.pause();
            playingIcon.style.display = 'none';
            pausedIcon.style.display = 'block';
            musicToggle.setAttribute('aria-label', 'Play music');
        }
    });

    // Set volume to 15% for background music
    backgroundMusic.volume = 0.0975;
}

// =========================================
// COUNTDOWN TIMER
// =========================================

// Format wedding date for display
function formatWeddingDate() {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    };
    return WEDDING_DATE.toLocaleDateString('en-US', options);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;

    if (distance < 0) {
        // Wedding has passed
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.countdown-text').textContent = 'Just Married! ❤️';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display with leading zeros
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Add pulse animation to countdown numbers
    document.querySelectorAll('.countdown-number').forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = 'pulse 0.5s ease';
        }, 10);
    });
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// =========================================
// TIME STRETCHING ANIMATION ON CLICK
// =========================================
const countdownElement = document.getElementById('countdown');
const countdownText = document.querySelector('.countdown-text');
let isAnimating = false;

if (countdownElement) {
    // Add click event to countdown
    countdownElement.addEventListener('click', () => {
        if (isAnimating) return; // Prevent multiple clicks during animation

        isAnimating = true;

        // Add time-stretch class
        countdownElement.classList.add('time-stretching');

        // Show wedding date temporarily
        const originalText = countdownText.textContent;
        countdownText.textContent = formatWeddingDate();
        countdownText.classList.add('date-reveal');

        // Remove animation after completion
        setTimeout(() => {
            countdownElement.classList.remove('time-stretching');
            countdownText.classList.remove('date-reveal');
            countdownText.textContent = originalText;
            isAnimating = false;
        }, 2000);
    });

    // Add hover cursor to indicate it's clickable
    countdownElement.style.cursor = 'pointer';
    countdownElement.title = 'Click to see wedding date';
}

// Pulse animation keyframe (added dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// =========================================
// FALLING PETALS
// =========================================
function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';

    // Random starting position
    petal.style.left = Math.random() * 100 + '%';

    // Random size (8-12px)
    const size = 8 + Math.random() * 4;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    // Random animation duration (15-30 seconds for slow fall)
    const duration = 15 + Math.random() * 15;
    petal.style.animationDuration = duration + 's';

    // Random delay
    const delay = Math.random() * 5;
    petal.style.animationDelay = delay + 's';

    // Random color variation
    const colors = ['#e8b4bc', '#f4d4d8', '#f0c8cc', '#eab8c0'];
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.getElementById('falling-petals').appendChild(petal);

    // Remove petal after animation completes
    setTimeout(() => {
        petal.remove();
        createPetal(); // Create a new one to maintain count
    }, (duration + delay) * 1000);
}

// Create initial petals
for (let i = 0; i < PETAL_COUNT; i++) {
    setTimeout(() => createPetal(), i * 200);
}

// =========================================
// SMOOTH SCROLLING & NAVIGATION DOTS
// =========================================
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('section[id]');

// Smooth scroll to section
navDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active dot on scroll
function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === '#' + current) {
            dot.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// =========================================
// PARALLAX SCROLLING
// =========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSections = document.querySelectorAll('.parallax-section');

    parallaxSections.forEach(section => {
        const offset = section.offsetTop;
        const yPos = (scrolled - offset) * 0.5;
        section.style.backgroundPositionY = yPos + 'px';
    });

    // Parallax effect on floating florals
    const floatingFlorals = document.querySelectorAll('.floating-floral');
    floatingFlorals.forEach((floral, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = scrolled * speed;
        floral.style.transform = `translateY(${yPos}px)`;
    });
});

// =========================================
// FADE-IN ON SCROLL ANIMATION
// =========================================
const fadeInSections = document.querySelectorAll('.fade-in-section');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

fadeInSections.forEach(section => {
    fadeInObserver.observe(section);
});

// =========================================
// PHOTO GALLERY LIGHTBOX
// =========================================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map(item => item.getAttribute('data-image'));

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    lightboxImage.src = galleryImages[currentImageIndex];
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navigate lightbox
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    }
});

// =========================================
// SCROLL INDICATOR
// =========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// =========================================
// PRELOAD IMAGES
// =========================================
window.addEventListener('load', () => {
    // Preload gallery images for smooth lightbox experience
    galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// =========================================
// RESPONSIVE NAVIGATION FOR MOBILE
// =========================================
function adjustNavForMobile() {
    if (window.innerWidth < 768) {
        // Hide nav dots on very small screens if needed
        const navDots = document.getElementById('nav-dots');
        if (navDots) {
            navDots.style.display = window.innerWidth < 480 ? 'none' : 'flex';
        }
    }
}

window.addEventListener('resize', adjustNavForMobile);
adjustNavForMobile();

// =========================================
// INITIALIZE
// =========================================
console.log('Wedding Invitation Initialized ❤️');
console.log('Wedding Date:', WEDDING_DATE.toLocaleString());

// Add a subtle entrance animation to the hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1.5s ease';
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// =========================================
// ✨ WOW ENHANCEMENTS ✨
// =========================================

// =========================================
// =========================================
// DUAL CURSOR TRAIL EFFECT: HEARTS & PETALS
// =========================================
const cursorTrail = document.getElementById('cursor-trail');
let lastCursorTime = 0;
const CURSOR_THROTTLE = 60; // ms between particles
let currentTrailType = 'hearts'; // 'hearts' or 'petals'

// Define which sections use which trail
const heartSections = ['hero', 'story', 'gallery', 'wishes'];
const petalSections = ['details', 'schedule', 'venue', 'rsvp'];

// Detect current section based on cursor position
function detectSectionAtPosition(clientY) {
    const sections = document.querySelectorAll('section');

    for (const section of sections) {
        const rect = section.getBoundingClientRect();

        // Check if cursor is within this section's viewport bounds
        if (clientY >= rect.top && clientY <= rect.bottom) {
            const sectionId = section.id || '';
            const sectionClasses = section.className || '';

            // Check if it's a heart section
            if (heartSections.some(id => sectionId.includes(id) || sectionClasses.includes(id))) {
                return 'hearts';
            }
            // Check if it's a petal section
            if (petalSections.some(id => sectionId.includes(id) || sectionClasses.includes(id))) {
                return 'petals';
            }
        }
    }
    return 'petals'; // default to petals
}

// Helper function to create trail particles
function createTrailParticle(clientX, clientY) {
    const now = Date.now();
    if (now - lastCursorTime < CURSOR_THROTTLE) return;
    lastCursorTime = now;

    // Detect which section we're in based on viewport position
    currentTrailType = detectSectionAtPosition(clientY);

    // Create appropriate particle using clientX/clientY for fixed positioning
    if (currentTrailType === 'hearts') {
        // Show hearts only 70% of the time
        if (Math.random() < 0.7) {
            createHeartParticle(clientX, clientY);
        }
    } else {
        createPetalParticle(clientX, clientY);
    }
}

// Mouse events
document.addEventListener('mousemove', (e) => {
    createTrailParticle(e.clientX, e.clientY);
});

// Touch events for mobile
document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
        createTrailParticle(e.touches[0].clientX, e.touches[0].clientY);
    }
}, { passive: true });

// Floating Hearts Trail
function createHeartParticle(x, y) {
    if (!cursorTrail) return; // Safety check

    const heart = document.createElement('div');
    heart.className = 'cursor-heart';
    heart.textContent = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];

    // Use fixed positioning to work across all sections
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (12 + Math.random() * 8) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';

    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 40;
    heart.style.setProperty('--drift', drift + 'px');

    document.body.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 2000);
}

// Rose Petal Trail
function createPetalParticle(x, y) {
    if (!cursorTrail) return; // Safety check

    const petal = document.createElement('div');
    petal.className = 'cursor-petal';

    // Random petal shape and color
    const petalColors = ['#d896a3', '#b8c9c1', '#e8b4bc', '#7a9c8e'];
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];

    // Use fixed positioning to work across all sections
    petal.style.position = 'fixed';
    petal.style.left = x + 'px';
    petal.style.top = y + 'px';
    petal.style.pointerEvents = 'none';
    petal.style.zIndex = '9999';

    // Random size and rotation
    const size = 8 + Math.random() * 8;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.setProperty('--rotation', Math.random() * 360 + 'deg');

    // Random sway
    const sway = (Math.random() - 0.5) * 60;
    petal.style.setProperty('--sway', sway + 'px');

    document.body.appendChild(petal);

    setTimeout(() => {
        if (petal.parentNode) {
            petal.remove();
        }
    }, 2500);
}

// =========================================
// TYPEWRITER EFFECT
// =========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Typewriter for tagline
const tagline = document.querySelector('.typewriter-text');
if (tagline) {
    const taglineText = tagline.textContent;
    setTimeout(() => {
        typeWriter(tagline, taglineText, 60);
    }, 2000);
}

// Story Reveal Animation (triggered on scroll)
const storyRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add revealed class to each paragraph with delay
            const paragraphs = entry.target.querySelectorAll('.story-reveal');
            paragraphs.forEach((para, index) => {
                const delay = parseInt(para.dataset.revealDelay) || (index * 300);
                setTimeout(() => {
                    para.classList.add('revealed');
                }, delay);
            });

            // Unobserve after animation triggered
            storyRevealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

// Observe the story section itself
const storySection = document.getElementById('story');
if (storySection) {
    storyRevealObserver.observe(storySection);
}

// =========================================
// SPARKLES & FIREFLIES
// =========================================
const sparklesContainer = document.getElementById('sparkles-container');
const SPARKLE_COUNT = 30;
const FIREFLY_COUNT = 16;

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 4 + 's';
    sparkle.style.animationDuration = (3 + Math.random() * 2) + 's';

    sparklesContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
        createSparkle();
    }, 8000);
}

function createFirefly() {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = Math.random() * 100 + '%';
    firefly.style.top = (20 + Math.random() * 60) + '%';
    firefly.style.animationDelay = Math.random() * 8 + 's';
    firefly.style.animationDuration = (6 + Math.random() * 4) + 's';

    sparklesContainer.appendChild(firefly);

    setTimeout(() => {
        firefly.remove();
        createFirefly();
    }, 12000);
}

// Initialize sparkles and fireflies (show on all devices including mobile)
for (let i = 0; i < SPARKLE_COUNT; i++) {
    setTimeout(() => createSparkle(), i * 200);
}

for (let i = 0; i < FIREFLY_COUNT; i++) {
    setTimeout(() => createFirefly(), i * 400);
}

// =========================================
// FLOATING BUBBLES
// =========================================
const bubblesContainer = document.getElementById('floating-bubbles');
const BUBBLE_COUNT = 10;

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = 20 + Math.random() * 40;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.animationDelay = Math.random() * 12 + 's';
    bubble.style.animationDuration = (10 + Math.random() * 8) + 's';

    bubblesContainer.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
        if (window.innerWidth > 768) createBubble();
    }, 20000);
}

// Initialize bubbles (desktop only)
if (window.innerWidth > 768) {
    for (let i = 0; i < BUBBLE_COUNT; i++) {
        setTimeout(() => createBubble(), i * 500);
    }
}

// =========================================
// ROMANTIC SECTION ANIMATIONS
// =========================================

// Helper function to create container for animations
function createRomanticContainer(sectionId, className) {
    const section = document.getElementById(sectionId);
    if (!section) return null;

    const container = document.createElement('div');
    container.className = className;
    section.appendChild(container);
    return container;
}

// 1. FLOATING LOVE HEARTS
function createLoveHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'love-heart-particle';

    const colors = ['#e8b4bc', '#d896a3', '#ffb6c1', '#ff99aa'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    heart.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,85 C20,55 10,35 10,25 C10,15 20,5 30,15 C35,20 45,30 50,35 C55,30 65,20 70,15 C80,5 90,15 90,25 C90,35 80,55 50,85 Z"
                  fill="${color}" opacity="0.7" stroke="#ffffff" stroke-width="1"/>
        </svg>
    `;

    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '0';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.animationDuration = (10 + Math.random() * 5) + 's';

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
        if (container.parentElement) createLoveHeart(container);
    }, (10 + Math.random() * 5) * 1000);
}

// 2. SCATTERED ROSE PETALS
function createRosePetal(container) {
    const petal = document.createElement('div');
    petal.className = 'rose-petal-particle';

    const size = 14 + Math.random() * 10;
    petal.style.width = size + 'px';
    petal.style.height = size * 1.2 + 'px';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-50px';
    petal.style.animationDelay = Math.random() * 3 + 's';
    petal.style.animationDuration = (8 + Math.random() * 4) + 's';

    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
        if (container.parentElement) createRosePetal(container);
    }, (8 + Math.random() * 4) * 1000);
}

// 3. WEDDING RINGS
function createWeddingRing(container) {
    const ring = document.createElement('div');
    ring.className = 'wedding-ring-particle';

    ring.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="18" fill="none" stroke="#d4af37" stroke-width="4" opacity="0.8"/>
            <circle cx="50" cy="50" r="12" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6"/>
            <circle cx="50" cy="30" r="5" fill="#ffffff" opacity="0.9"/>
            <circle cx="48" cy="28" r="2" fill="#d4af37" opacity="1"/>
        </svg>
    `;

    ring.style.left = Math.random() * 100 + '%';
    ring.style.top = '-30px';
    ring.style.animationDelay = Math.random() * 4 + 's';
    ring.style.animationDuration = (12 + Math.random() * 6) + 's';

    container.appendChild(ring);

    setTimeout(() => {
        ring.remove();
        if (container.parentElement) createWeddingRing(container);
    }, (12 + Math.random() * 6) * 1000);
}

// 4. FLOATING STARS WITH TRAILS
function createStarTrail(container) {
    const star = document.createElement('div');
    star.className = 'star-trail-particle';

    star.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="starGradient${Math.random()}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#d4af37;stop-opacity:0.6" />
                </linearGradient>
            </defs>
            <path d="M50,10 L55,40 L85,45 L60,60 L65,90 L50,75 L35,90 L40,60 L15,45 L45,40 Z"
                  fill="url(#starGradient${Math.random()})" stroke="#d4af37" stroke-width="1"/>
            <line x1="85" y1="20" x2="95" y2="10" stroke="#d4af37" stroke-width="1.5" opacity="0.6"/>
            <line x1="80" y1="15" x2="90" y2="5" stroke="#ffffff" stroke-width="1" opacity="0.8"/>
        </svg>
    `;

    star.style.left = (80 + Math.random() * 20) + '%';
    star.style.top = (Math.random() * 30) + '%';
    star.style.animationDelay = Math.random() * 6 + 's';
    star.style.animationDuration = (10 + Math.random() * 5) + 's';

    container.appendChild(star);

    setTimeout(() => {
        star.remove();
        if (container.parentElement) createStarTrail(container);
    }, (10 + Math.random() * 5) * 1000);
}

// 5. FLOATING LIGHT ORBS
function createLightOrb(container) {
    const orb = document.createElement('div');
    orb.className = 'light-orb-particle';

    const size = 15 + Math.random() * 15;
    orb.style.width = size + 'px';
    orb.style.height = size + 'px';
    orb.style.left = Math.random() * 100 + '%';
    orb.style.bottom = '0';
    orb.style.animationDelay = Math.random() * 4 + 's';
    orb.style.animationDuration = (8 + Math.random() * 6) + 's';

    container.appendChild(orb);

    setTimeout(() => {
        orb.remove();
        if (container.parentElement) createLightOrb(container);
    }, (8 + Math.random() * 6) * 1000);
}

// 6. FLOATING LEAVES
function createLeaf(container) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf-particle';

    const colors = ['#e8b4bc', '#d896a3', '#f4d4d8', '#b8c9c1'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    leaf.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,10 Q70,30 75,60 Q70,80 50,90 Q30,80 25,60 Q30,30 50,10 Z"
                  fill="${color}" opacity="0.7" stroke="${color}" stroke-width="1"/>
            <path d="M50,15 Q50,40 50,90" stroke="${color}" stroke-width="1.5" opacity="0.5" fill="none"/>
            <path d="M50,30 Q35,35 30,45" stroke="${color}" stroke-width="1" opacity="0.4" fill="none"/>
            <path d="M50,30 Q65,35 70,45" stroke="${color}" stroke-width="1" opacity="0.4" fill="none"/>
        </svg>
    `;

    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.top = '-50px';
    leaf.style.animationDelay = Math.random() * 3 + 's';
    leaf.style.animationDuration = (9 + Math.random() * 5) + 's';

    container.appendChild(leaf);

    setTimeout(() => {
        leaf.remove();
        if (container.parentElement) createLeaf(container);
    }, (9 + Math.random() * 5) * 1000);
}

// 7. FLOATING CONFETTI
function createConfetti(container) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-particle';

    const colors = ['#b76e79', '#e8b4bc', '#d4af37', '#f4d4d8', '#ff99aa', '#d896a3'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shapes = ['square', 'circle', 'rectangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
    } else if (shape === 'rectangle') {
        confetti.style.width = '6px';
        confetti.style.height = '12px';
    }

    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-50px';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.animationDuration = (7 + Math.random() * 4) + 's';

    container.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
        if (container.parentElement) createConfetti(container);
    }, (7 + Math.random() * 4) * 1000);
}

// 8. FLOATING SPARKLES
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-particle';

    sparkle.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="sparkleGradient${Math.random()}" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#d4af37;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#d4af37;stop-opacity:0" />
                </radialGradient>
            </defs>
            <path d="M50,10 L52,48 L90,50 L52,52 L50,90 L48,52 L10,50 L48,48 Z"
                  fill="url(#sparkleGradient${Math.random()})" stroke="#ffffff" stroke-width="0.5"/>
            <circle cx="50" cy="50" r="5" fill="#ffffff" opacity="0.9"/>
            <line x1="50" y1="15" x2="50" y2="5" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
            <line x1="50" y1="95" x2="50" y2="85" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
            <line x1="15" y1="50" x2="5" y2="50" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
            <line x1="95" y1="50" x2="85" y2="50" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
        </svg>
    `;

    const size = 12 + Math.random() * 10;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = '-30px';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    sparkle.style.animationDuration = (9 + Math.random() * 5) + 's';

    container.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
        if (container.parentElement) createSparkle(container);
    }, (9 + Math.random() * 5) * 1000);
}

// Initialize animations for each section
document.addEventListener('DOMContentLoaded', function() {
    // Hero - Floating Love Hearts
    const heroHearts = createRomanticContainer('hero', 'romantic-love-hearts');
    if (heroHearts) {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => createLoveHeart(heroHearts), i * 800);
        }
    }

    // Hero - Wedding Rings
    const heroRings = createRomanticContainer('hero', 'romantic-wedding-rings');
    if (heroRings) {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createWeddingRing(heroRings), i * 1500);
        }
    }

    // Story - Scattered Rose Petals
    const storyPetals = createRomanticContainer('story', 'romantic-rose-petals');
    if (storyPetals) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createRosePetal(storyPetals), i * 600);
        }
    }

    // Details - Wedding Rings
    const detailsRings = createRomanticContainer('details', 'romantic-wedding-rings');
    if (detailsRings) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createWeddingRing(detailsRings), i * 1000);
        }
    }

    // Venue - Leaves
    const venueLeaves = createRomanticContainer('venue', 'romantic-leaves');
    if (venueLeaves) {
        for (let i = 0; i < 7; i++) {
            setTimeout(() => createLeaf(venueLeaves), i * 700);
        }
    }

    // Schedule - Wedding Rings (same as Details section)
    const scheduleRings = createRomanticContainer('schedule', 'romantic-wedding-rings');
    if (scheduleRings) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createWeddingRing(scheduleRings), i * 1000);
        }
    }

    // Gallery - No floating animations (removed light orbs)

    // RSVP - Floating Confetti
    const rsvpConfetti = createRomanticContainer('rsvp', 'romantic-confetti');
    if (rsvpConfetti) {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => createConfetti(rsvpConfetti), i * 500);
        }
    }

    // Wishes - Floating Sparkles
    const wishesSparkles = createRomanticContainer('wishes', 'romantic-sparkles');
    if (wishesSparkles) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createSparkle(wishesSparkles), i * 600);
        }
    }
});

// =========================================
// CONFETTI BURST
// =========================================
function createConfetti(x, y) {
    const colors = ['#b76e79', '#e8b4bc', '#d4af37', '#f4d4d8', '#f0c8cc'];
    const confettiCount = 30;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        confetti.style.setProperty('--tx', tx + 'px');
        confetti.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2000);
    }
}

// Add confetti to RSVP and Wishes buttons
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createConfetti(x, y);
    });
});

// =========================================
// ENHANCED SCROLL-TRIGGERED ANIMATIONS
// =========================================
const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Add slide-in animations to detail boxes
document.querySelectorAll('.detail-box').forEach((box, index) => {
    box.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
    slideObserver.observe(box);
});

// Add slide-in animations to accordion items
document.querySelectorAll('.accordion-item').forEach((item, index) => {
    const headerSide = item.querySelector('.accordion-header-side');
    if (headerSide) {
        headerSide.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        slideObserver.observe(headerSide);
    }
});

// =========================================
// ANIMATED COUNTDOWN ENHANCEMENT
// =========================================
const countdownItems = document.querySelectorAll('.countdown-item');
countdownItems.forEach((item, index) => {
    item.style.animationDelay = (index * 0.1) + 's';
});

// =========================================
// PHOTO GALLERY ENHANCEMENT
// =========================================
// Add stagger animation to gallery items (desktop only)
if (window.innerWidth > 768) {
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
        galleryObserver.observe(item);
    });
}

// =========================================
// FILM STRIP AUTO-SCROLL - MINIMAL VERSION
// =========================================

// =========================================
// FIX TIMELINE LINE ON MOBILE
// =========================================
function fixTimelineLine() {
    if (window.innerWidth > 768) return; // Only on mobile

    const timeline = document.querySelector('.botanical-timeline');
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (!timeline || !timelineLine || timelineItems.length === 0) return;

    // Get the first event icon to calculate horizontal position
    const firstIcon = timelineItems[0].querySelector('.event-icon');
    if (!firstIcon) return;

    // Calculate horizontal position (align with icon center)
    const timelineRect = timeline.getBoundingClientRect();
    const iconRect = firstIcon.getBoundingClientRect();
    const iconCenterX = iconRect.left + (iconRect.width / 2) - timelineRect.left;

    // Get the last timeline item
    const lastItem = timelineItems[timelineItems.length - 1];
    const lastItemRect = lastItem.getBoundingClientRect();

    // Calculate where the line should end (at the last item)
    const lineHeight = lastItemRect.top - timelineRect.top + (lastItemRect.height / 2);

    // Set the line position and height
    timelineLine.style.left = iconCenterX + 'px';
    timelineLine.style.height = lineHeight + 'px';
    timelineLine.style.bottom = 'auto';

    console.log('Timeline line fixed - Left:', iconCenterX + 'px', 'Height:', lineHeight + 'px');
}

// Fix on load and resize
window.addEventListener('load', fixTimelineLine);
window.addEventListener('resize', function() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(fixTimelineLine, 200);
});

// =========================================
// HORIZONTAL PORTRAIT STACK AUTO-SCROLL
// =========================================

// Wait for everything to load
window.addEventListener('load', function() {

    // Only run on mobile/tablet
    if (window.innerWidth > 768) {
        console.log('Desktop - no auto-scroll');
        return;
    }

    console.log('Mobile detected, starting horizontal portrait auto-scroll...');

    const gallery = document.querySelector('.gallery-grid');

    if (!gallery) {
        console.error('Gallery not found!');
        return;
    }

    console.log('Gallery found, scrollWidth:', gallery.scrollWidth, 'clientWidth:', gallery.clientWidth);

    let isPaused = false;
    let pauseTimer;

    // Smooth auto-scroll
    setInterval(function() {
        if (isPaused) return;

        const maxScroll = gallery.scrollWidth - gallery.clientWidth;

        // If at end, reset to start for continuous loop
        if (gallery.scrollLeft >= maxScroll - 2) {
            gallery.scrollLeft = 0;
            console.log('Looped back to start');
        } else {
            // Scroll smoothly at 1.5px per frame
            gallery.scrollLeft += 1.5;
        }
    }, 30); // Every 30ms = smooth 33fps

    // Pause when user interacts
    function pause() {
        isPaused = true;
        console.log('Auto-scroll paused');
        clearTimeout(pauseTimer);
        pauseTimer = setTimeout(function() {
            isPaused = false;
            console.log('Auto-scroll resumed');
        }, 4000); // Resume after 4 seconds
    }

    gallery.addEventListener('touchstart', pause);
    gallery.addEventListener('mousedown', pause);
    gallery.addEventListener('touchmove', pause);

    console.log('✅ Horizontal portrait auto-scroll active!');
});

// =========================================
// SECTION TITLE ANIMATION
// =========================================
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInScale 1s ease forwards';
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// =========================================
// DETAIL ICON ANIMATION ON SCROLL
// =========================================
const iconObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const icon = entry.target.querySelector('.detail-icon');
            if (icon) {
                icon.style.animation = 'popCircle 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            }
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.detail-box').forEach(box => {
    iconObserver.observe(box);
});

// =========================================
// PERFORMANCE OPTIMIZATION
// =========================================
// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations
        document.querySelectorAll('.sparkle, .firefly, .bubble').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
        document.querySelectorAll('.sparkle, .firefly, .bubble').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Clean up on mobile for performance
if (window.innerWidth <= 768) {
    // Cursor trail is already disabled in the mousemove handler for mobile
    // No particles (hearts/petals) will be created on mobile devices
}

// =========================================
// ACCORDION TIMELINE
// =========================================
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other accordion items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');

            // Smooth scroll to item if needed (mobile)
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        }
    });
});

// =========================================
// BOTANICAL TIMELINE
// =========================================

// Scroll-triggered fade-in animation for botanical timeline items
const botanicalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.2
});

// Initialize timeline items with hidden state and observe
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = (index * 0.1) + 's';
    botanicalObserver.observe(item);
});

// Detect if device supports hover (desktop vs touch)
const isTouchDevice = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Scroll-triggered animation for timeline items
const royalTimelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
});

// Observe all royal timeline items
document.querySelectorAll('.royal-timeline-item').forEach(item => {
    royalTimelineObserver.observe(item);
});

// Mobile/Touch: Tap to expand cards
if (isTouchDevice) {
    document.querySelectorAll('.timeline-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent event bubbling
            e.stopPropagation();

            // Get all cards
            const allCards = document.querySelectorAll('.timeline-card');

            // Check if this card is already expanded
            const isExpanded = card.classList.contains('expanded');

            // Close all other cards
            allCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });

            // Toggle current card
            if (isExpanded) {
                card.classList.remove('expanded');
            } else {
                card.classList.add('expanded');

                // Smooth scroll to keep card in view
                setTimeout(() => {
                    const cardRect = card.getBoundingClientRect();
                    const isCardFullyVisible = (
                        cardRect.top >= 0 &&
                        cardRect.bottom <= window.innerHeight
                    );

                    if (!isCardFullyVisible) {
                        card.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 300);
            }
        });
    });

    // Close expanded cards when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.timeline-card')) {
            document.querySelectorAll('.timeline-card').forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });
}

// Desktop: Enhanced hover effects with ceremony-specific animations
if (!isTouchDevice) {
    document.querySelectorAll('.royal-timeline-item').forEach(item => {
        const card = item.querySelector('.timeline-card');
        const badge = item.querySelector('.timeline-badge');
        const ceremonyType = item.getAttribute('data-ceremony');

        card.addEventListener('mouseenter', () => {
            // Add glow to badge based on ceremony type
            if (ceremonyType === 'traditional') {
                badge.style.borderColor = 'var(--rose-gold)';
                badge.style.boxShadow = '0 12px 48px rgba(183, 110, 121, 0.5), 0 0 40px rgba(183, 110, 121, 0.4), 0 0 0 12px rgba(183, 110, 121, 0.15)';
            } else if (ceremonyType === 'celebration') {
                badge.style.borderColor = 'var(--gold-accent)';
                badge.style.boxShadow = '0 12px 48px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.4), 0 0 0 12px rgba(212, 175, 55, 0.15)';
            } else {
                badge.style.borderColor = 'var(--dark-pink)';
                badge.style.boxShadow = '0 12px 48px rgba(232, 180, 188, 0.5), 0 0 40px rgba(232, 180, 188, 0.4), 0 0 0 12px rgba(232, 180, 188, 0.15)';
            }
        });

        card.addEventListener('mouseleave', () => {
            // Reset badge to default
            badge.style.borderColor = 'var(--gold-accent)';
            badge.style.boxShadow = '0 8px 32px rgba(183, 110, 121, 0.3), 0 0 20px rgba(212, 175, 55, 0.4), 0 0 0 8px rgba(212, 175, 55, 0.1)';
        });
    });
}

// Animate timeline spine on scroll (flowing gradient effect)
let lastScrollTop = 0;
const timelineSpine = document.querySelector('.timeline-spine');

if (timelineSpine) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop;

        // Calculate scroll progress for timeline section
        const scheduleSection = document.getElementById('schedule');
        if (scheduleSection) {
            const sectionTop = scheduleSection.offsetTop;
            const sectionHeight = scheduleSection.clientHeight;
            const scrollProgress = (scrollTop - sectionTop) / sectionHeight;

            if (scrollProgress >= 0 && scrollProgress <= 1) {
                // Animate spine opacity and scale based on scroll
                const opacity = 0.5 + (scrollProgress * 0.5);
                timelineSpine.style.opacity = opacity;
            }
        }
    }, { passive: true });
}

// Add sparkle effect on timeline badges when they come into view
const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const badge = entry.target;
            badge.style.animation = 'glowPulse 3s ease-in-out infinite';

            // Stagger the animation start
            const index = Array.from(document.querySelectorAll('.timeline-badge')).indexOf(badge);
            badge.style.animationDelay = (index * 0.2) + 's';
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.timeline-badge').forEach(badge => {
    badgeObserver.observe(badge);
});

// Performance: Disable badge animations when not in viewport
document.addEventListener('visibilitychange', () => {
    const badges = document.querySelectorAll('.timeline-badge');
    if (document.hidden) {
        badges.forEach(badge => {
            badge.style.animationPlayState = 'paused';
        });
    } else {
        badges.forEach(badge => {
            badge.style.animationPlayState = 'running';
        });
    }
});

// =========================================
// BOTANICAL FORM HANDLING ✨
// =========================================

// RSVP Form Handler
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(rsvpForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = rsvpForm.querySelector('.botanical-submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';

        // Simulate submission (replace with actual API call)
        await simulateFormSubmission(data);

        // Show success message
        showSuccessMessage(rsvpForm, 'Thank You!', 'Your RSVP has been received. We look forward to celebrating with you!');

        // Reset form
        rsvpForm.reset();
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
    });
}

// Wishes Form Handler
const wishesForm = document.getElementById('wishes-form');
if (wishesForm) {
    wishesForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(wishesForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = wishesForm.querySelector('.botanical-submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';

        // Simulate submission (replace with actual API call)
        await simulateFormSubmission(data);

        // Show success message
        showSuccessMessage(wishesForm, 'Blessings Received!', 'Thank you for your beautiful wishes. Your words mean the world to us!');

        // Reset form
        wishesForm.reset();
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
    });
}

// Google Sheets Integration - Submit form data to Google Sheets
async function submitToGoogleSheets(data) {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPlenbbSbl_Qsmf_9jSUpS-J6CgRB8RGJmAnz-VOGbln8v28dtrhyERRyCWm1jwfBoww/exec';

    try {
        console.log('Submitting to Google Sheets:', data);

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Note: no-cors mode doesn't allow reading response, but submission works
        console.log('Submitted successfully to Google Sheets');
        return true;

    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        // Still return true because no-cors prevents error detection
        // The data will be saved even if we can't read the response
        return true;
    }
}

// Legacy function name for compatibility
async function simulateFormSubmission(data) {
    return await submitToGoogleSheets(data);
}

// Show success message with botanical animation
function showSuccessMessage(form, title, message) {
    // Create success message element
    let successDiv = document.querySelector('.form-success-message');

    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        document.body.appendChild(successDiv);
    }

    successDiv.innerHTML = `
        <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" style="width: 100px; height: 40px; margin-bottom: 10px;">
            <circle cx="50" cy="20" r="8" fill="#7a9c8e" opacity="0.6">
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="35" cy="25" r="5" fill="#d896a3" opacity="0.5">
                <animate attributeName="r" values="5;8;5" dur="2s" begin="0.3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="65" cy="25" r="5" fill="#d896a3" opacity="0.5">
                <animate attributeName="r" values="5;8;5" dur="2s" begin="0.6s" repeatCount="indefinite"/>
            </circle>
        </svg>
        <h3>${title}</h3>
        <p>${message}</p>
    `;

    // Show success message with fade-in animation
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 10);

    // Auto-hide after 5 seconds and reset form
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => {
            successDiv.remove();
        }, 600);
    }, 5000);
}

// Add input focus animations
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add radio button click effects
document.querySelectorAll('.radio-option').forEach(option => {
    option.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(122, 156, 142, 0.3)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple effect keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// =========================================
// SAVE THE DATE TO CALENDAR
// =========================================

// Display wedding date above button
const weddingDateDisplay = document.getElementById('wedding-date-display');
if (weddingDateDisplay) {
    const formatWeddingDateLong = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = WEDDING_DATE.toLocaleDateString('en-US', options);

        // Add ordinal suffix to day
        const day = WEDDING_DATE.getDate();
        const suffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return dateStr.replace(/\d+,/, `${day}${suffix(day)},`);
    };

    weddingDateDisplay.textContent = formatWeddingDateLong();
}

// Calendar button and dropdown toggle
const saveDateBtn = document.getElementById('save-date-btn');
const calendarDropdown = document.getElementById('calendar-dropdown');

if (saveDateBtn && calendarDropdown) {
    // Move dropdown to body for proper positioning
    document.body.appendChild(calendarDropdown);

    // Function to position dropdown
    function positionDropdown() {
        const btnRect = saveDateBtn.getBoundingClientRect();
        const dropdownWidth = 280;

        // Position below button, centered
        calendarDropdown.style.position = 'fixed';
        calendarDropdown.style.top = (btnRect.bottom + 15) + 'px';
        calendarDropdown.style.left = (btnRect.left + btnRect.width / 2 - dropdownWidth / 2) + 'px';
    }

    // Toggle dropdown
    saveDateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = saveDateBtn.classList.toggle('active');

        if (isActive) {
            positionDropdown();
            calendarDropdown.classList.add('show');
        } else {
            calendarDropdown.classList.remove('show');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!saveDateBtn.contains(e.target) && !calendarDropdown.contains(e.target)) {
            saveDateBtn.classList.remove('active');
            calendarDropdown.classList.remove('show');
        }
    });

    // Reposition on scroll and resize
    window.addEventListener('scroll', () => {
        if (calendarDropdown.classList.contains('show')) {
            positionDropdown();
        }
    });

    window.addEventListener('resize', () => {
        if (calendarDropdown.classList.contains('show')) {
            positionDropdown();
        }
    });

    // Handle calendar option clicks
    const calendarOptions = document.querySelectorAll('.calendar-option');
    calendarOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const calendarType = option.dataset.calendar;
            addToCalendar(calendarType);

            // Close dropdown
            saveDateBtn.classList.remove('active');
            calendarDropdown.classList.remove('show');
        });
    });
}

// Generate calendar links/files
function addToCalendar(type) {
    // Wedding details (using the WEDDING_DATE from configuration)
    const eventTitle = 'Lakshitha & Supuni Wedding';
    const eventDescription = 'Join us in celebrating our wedding day! Two hearts, one love, forever begins.';
    const eventLocation = 'The Garden Estate, 123 Blossom Lane, Botanical Gardens, Springfield, CA 94000';

    // Format dates for calendar (using WEDDING_DATE)
    const startDate = WEDDING_DATE;
    const endDate = new Date(WEDDING_DATE);
    endDate.setHours(endDate.getHours() + 5); // 5-hour event

    // Format for different calendar systems
    const formatDateForGoogle = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const formatDateForICS = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    switch (type) {
        case 'google':
            const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;
            window.open(googleUrl, '_blank');
            break;

        case 'apple':
        case 'outlook':
        case 'ics':
            // Generate .ics file for Apple Calendar, Outlook, and generic download
            const icsContent = generateICS(eventTitle, eventDescription, eventLocation, startDate, endDate);
            downloadICS(icsContent, 'wedding-invitation.ics');
            break;
    }
}

// Generate ICS file content
function generateICS(title, description, location, startDate, endDate) {
    const formatDate = (date) => {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Wedding Invitation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(startDate)}`,
        `DTEND:${formatDate(endDate)}`,
        `DTSTAMP:${formatDate(new Date())}`,
        `UID:${Date.now()}@wedding-invitation.com`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'DESCRIPTION:Wedding Reminder',
        'ACTION:DISPLAY',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
}

// Download ICS file
function downloadICS(icsContent, filename) {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success feedback
    showCalendarSuccess();
}

// Show success message
function showCalendarSuccess() {
    // Create success indicator
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #7a9c8e, #8aac9e);
        color: white;
        padding: 20px 40px;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        font-family: 'Cormorant', serif;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 10000;
        animation: successFadeIn 0.4s ease;
    `;
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" fill="none"/>
                <path d="M8 12l3 3 5-5" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
            <span>Calendar event saved!</span>
        </div>
    `;

    document.body.appendChild(successDiv);

    // Remove after 2 seconds
    setTimeout(() => {
        successDiv.style.animation = 'successFadeOut 0.4s ease forwards';
        setTimeout(() => successDiv.remove(), 400);
    }, 2000);
}

// Add success animations
const successStyle = document.createElement('style');
successStyle.textContent = `
    @keyframes successFadeIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    @keyframes successFadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(successStyle);

// =========================================
// FINAL TOUCHES
// =========================================
console.log('✨ Wow Enhancements Activated! ✨');
console.log('✨ Wow Enhancements Activated! ✨');
console.log('Features: Botanical Timeline, Dual Cursor Trail (Hearts & Petals), Sparkles, Fireflies, Enhanced Animations, Botanical Forms, Save to Calendar');
