const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                const href = link.getAttribute('href');
                if (href === `#${sectionId}`) {
                    link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'py-1');
                    link.classList.remove('text-slate-600', 'dark:text-slate-300');
                } else {
                    link.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary', 'py-1');
                    link.classList.add('text-slate-600', 'dark:text-slate-300');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNavLink);
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Dark & Light Theme Switch

const themeToggleButton = document.getElementById('theme-toggle-button');

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeToggleButton?.setAttribute('aria-pressed', 'true');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleButton?.setAttribute('aria-pressed', 'false');
        localStorage.setItem('theme', 'light');
    }
}

themeToggleButton?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// Portfolio Filtering (Navs & Tabs)

const filterButtons = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

const activeFilterClasses = [
    'active',
    'bg-linear-to-r',
    'from-primary',
    'to-secondary',
    'text-white',
    'hover:shadow-lg',
    'hover:shadow-primary/50'
];

const inactiveFilterClasses = [
    'bg-white',
    'dark:bg-slate-800',
    'text-slate-600',
    'dark:text-slate-300',
    'hover:bg-slate-100',
    'dark:hover:bg-slate-700',
    'border',
    'border-slate-300',
    'dark:border-slate-700'
];

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedFilter = button.getAttribute('data-filter');

        filterButtons.forEach((btn) => {
            btn.classList.remove(...activeFilterClasses);
            btn.classList.add(...inactiveFilterClasses);
            btn.setAttribute('aria-pressed', 'false');
        });

        button.classList.remove(...inactiveFilterClasses);
        button.classList.add(...activeFilterClasses);
        button.setAttribute('aria-pressed', 'true');

        portfolioItems.forEach((item) => {
            const itemCategory = item.getAttribute('data-category');

            if (selectedFilter === 'all' || itemCategory === selectedFilter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Testimonials Carousel / Slider

const carousel = document.getElementById('testimonials-carousel');
const cards = document.querySelectorAll('.testimonial-card');
const nextBtn = document.getElementById('next-testimonial');
const prevBtn = document.getElementById('prev-testimonial');
const indicators = document.querySelectorAll('.carousel-indicator');

let currentSlide = 0;

function getVisibleCardsCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

function getMaxSlideIndex() {
    return Math.max(0, cards.length - getVisibleCardsCount());
}

function updateCarousel() {
    const visibleCards = getVisibleCardsCount();
    const maxIndex = getMaxSlideIndex();

    if (currentSlide > maxIndex) {
        currentSlide = maxIndex;
    }
    if (currentSlide < 0) {
        currentSlide = 0;
    }

    const cardWidthPercentage = 100 / visibleCards;
    carousel.style.transform = `translateX(${currentSlide * cardWidthPercentage}%)`;

    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('bg-accent');
            indicator.classList.remove('bg-slate-400', 'dark:bg-slate-600');
            indicator.setAttribute('aria-selected', 'true');
        } else {
            indicator.classList.remove('bg-accent');
            indicator.classList.add('bg-slate-400', 'dark:bg-slate-600');
            indicator.setAttribute('aria-selected', 'false');
        }
    });
}

nextBtn?.addEventListener('click', () => {
    const maxIndex = getMaxSlideIndex();
    currentSlide = currentSlide >= maxIndex ? 0 : currentSlide + 1;
    updateCarousel();
});

prevBtn?.addEventListener('click', () => {
    const maxIndex = getMaxSlideIndex();
    currentSlide = currentSlide <= 0 ? maxIndex : currentSlide - 1;
    updateCarousel();
});

indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        const targetIndex = parseInt(indicator.getAttribute('data-index') || '0', 10);
        currentSlide = Math.min(targetIndex, getMaxSlideIndex());
        updateCarousel();
    });
});
window.addEventListener('resize', updateCarousel);

updateCarousel();

// Settings Sidebar & Customization (Colors & Fonts)

const settingsToggle = document.getElementById('settings-toggle');
const closeSettings = document.getElementById('close-settings');
const settingsSidebar = document.getElementById('settings-sidebar');
const fontOptions = document.querySelectorAll('.font-option');
const themeColorsGrid = document.getElementById('theme-colors-grid');
const resetSettingsBtn = document.getElementById('reset-settings');

function toggleSidebar(open) {
    const shouldOpen = open !== undefined ? open : settingsSidebar?.classList.contains('translate-x-full');
    if (shouldOpen) {
        settingsSidebar?.classList.remove('translate-x-full');
        settingsToggle?.setAttribute('aria-expanded', 'true');
        settingsSidebar?.setAttribute('aria-hidden', 'false');
    } else {
        settingsSidebar?.classList.add('translate-x-full');
        settingsToggle?.setAttribute('aria-expanded', 'false');
        settingsSidebar?.setAttribute('aria-hidden', 'true');
    }
}

settingsToggle?.addEventListener('click', () => toggleSidebar());
closeSettings?.addEventListener('click', () => toggleSidebar(false));

document.addEventListener('click', (e) => {
    if (
        settingsSidebar &&
        !settingsSidebar.contains(e.target) &&
        !settingsToggle?.contains(e.target) &&
        !settingsSidebar.classList.contains('translate-x-full')
    ) {
        toggleSidebar(false);
    }
});

const availableFonts = ['tajawal', 'alexandria', 'cairo'];

function setFont(selectedFont) {
    availableFonts.forEach((f) => document.body.classList.remove(`font-${f}`));
    document.body.classList.add(`font-${selectedFont}`);

    fontOptions.forEach((btn) => {
        const font = btn.getAttribute('data-font');
        if (font === selectedFont) {
            btn.classList.add('active', 'border-primary');
            btn.classList.remove('border-slate-200', 'dark:border-slate-700');
            btn.setAttribute('aria-checked', 'true');
        } else {
            btn.classList.remove('active', 'border-primary');
            btn.classList.add('border-slate-200', 'dark:border-slate-700');
            btn.setAttribute('aria-checked', 'false');
        }
    });

    localStorage.setItem('selectedFont', selectedFont);
}

fontOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
        const font = btn.getAttribute('data-font');
        if (font) setFont(font);
    });
});

const themeColors = [
    { name: 'Indigo (Default)', primary: '#6366f1', secondary: '#8b5cf6' },
    { name: 'Emerald', primary: '#10b981', secondary: '#059669' },
    { name: 'Blue', primary: '#3b82f6', secondary: '#2563eb' },
    { name: 'Rose', primary: '#f43f5e', secondary: '#e11d48' },
    { name: 'Amber', primary: '#f59e0b', secondary: '#d97706' },
    { name: 'Purple', primary: '#a855f7', secondary: '#7c3aed' },
    { name: 'Cyan', primary: '#06b6d4', secondary: '#0891b2' },
    { name: 'Teal', primary: '#14b8a6', secondary: '#0d9488' }
];

function applyThemeColors(colorObj) {
    document.documentElement.style.setProperty('--color-primary', colorObj.primary);
    document.documentElement.style.setProperty('--color-secondary', colorObj.secondary);
    localStorage.setItem('selectedThemeColor', JSON.stringify(colorObj));

    document.querySelectorAll('.color-choice-btn').forEach((btn) => {
        if (btn.getAttribute('data-primary') === colorObj.primary) {
            btn.classList.add('ring-2', 'ring-offset-2', 'ring-primary');
        } else {
            btn.classList.remove('ring-2', 'ring-offset-2', 'ring-primary');
        }
    });
}

if (themeColorsGrid) {
    themeColorsGrid.innerHTML = '';
    themeColors.forEach((c) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'color-choice-btn w-12 h-12 rounded-xl transition-transform hover:scale-110 cursor-pointer shadow-md';
        btn.style.backgroundColor = c.primary;
        btn.setAttribute('data-primary', c.primary);
        btn.setAttribute('aria-label', c.name);
        btn.addEventListener('click', () => applyThemeColors(c));
        themeColorsGrid.appendChild(btn);
    });
}

resetSettingsBtn?.addEventListener('click', () => {
    localStorage.removeItem('selectedFont');
    localStorage.removeItem('selectedThemeColor');
    setFont('tajawal');
    applyThemeColors(themeColors[0]);
});

const savedFont = localStorage.getItem('selectedFont') || 'tajawal';
setFont(savedFont);

const savedColor = localStorage.getItem('selectedThemeColor');
if (savedColor) {
    try {
        applyThemeColors(JSON.parse(savedColor));
    } catch {
        applyThemeColors(themeColors[0]);
    }
} else {
    applyThemeColors(themeColors[0]);
}

// Scroll to Top Button

const scrollToTopBtn = document.getElementById('scroll-to-top');

function toggleScrollToTopButton() {
    if (window.scrollY > 400) {
        scrollToTopBtn?.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn?.classList.add('opacity-100', 'visible');
    } else {
        scrollToTopBtn?.classList.add('opacity-0', 'invisible');
        scrollToTopBtn?.classList.remove('opacity-100', 'visible');
    }
}

window.addEventListener('scroll', toggleScrollToTopButton);

scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

