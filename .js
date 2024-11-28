document.addEventListener("DOMContentLoaded", () => {
    // -------------------
    // Presale Popup Logic
    // -------------------
    const presalePopup = document.getElementById("presale-popup");
    const presaleCloseBtn = document.getElementById("presale-close");
    const presaleMinimized = document.getElementById('presale-minimized');
    const presaleMinimizedBtn = document.getElementById('presale-minimized-btn');

    let presaleShown = false; // Flag to ensure popup is shown only once

    // Countdown Timer Setup
    const launchDate = new Date("December 20, 2024 00:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "<div>Presale Launched!</div>";
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Function to show presale popup
    const showPresale = () => {
        if (!presaleShown) {
            presalePopup.classList.add("active");
            presalePopup.style.display = 'flex'; // Ensure it's displayed
            presaleShown = true;
            observer.disconnect(); // Stop observing after first trigger
        }
    };

    // Function to hide presale popup (minimize)
    const hidePresale = () => {
        // Add minimize animation
        presalePopup.classList.add('minimize');

        // After animation ends, hide popup and show minimized button
        presalePopup.addEventListener('animationend', function handler() {
            presalePopup.classList.remove('active', 'minimize');
            presalePopup.style.display = 'none';
            presaleMinimized.style.display = 'block';
            presalePopup.removeEventListener('animationend', handler);
        });
    };

    // Close button event
    presaleCloseBtn.addEventListener("click", hidePresale);

    // Minimized button click event
    presaleMinimizedBtn.addEventListener('click', () => {
        presalePopup.style.display = 'flex';
        presalePopup.classList.add('maximize');

        presalePopup.addEventListener('animationend', function handler() {
            presalePopup.classList.remove('maximize');
            presalePopup.classList.add('active');
            presalePopup.removeEventListener('animationend', handler);
        });

        presaleMinimized.style.display = 'none';
    });

    // Close popup when clicking outside the popup content
    presalePopup.addEventListener("click", (e) => {
        if (e.target === presalePopup) {
            hidePresale();
        }
    });

    // Intersection Observer to detect when Presale section is in view
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the Presale section is visible
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showPresale();
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const presaleSection = document.getElementById("presale");
    observer.observe(presaleSection);

    // -------------------
    // Slide-Up Animation Logic
    // -------------------
    const slideUpSections = document.querySelectorAll('.slide-up-section');

    slideUpSections.forEach(section => {
        // Add click/tap event listener to each section
        section.addEventListener('click', () => {
            // Toggle the slide-up animation
            if (section.classList.contains('hidden')) {
                section.classList.remove('hidden');
                section.classList.add('slide-up');
            } else {
                // Optionally, you can add functionality to hide the section again
                section.classList.add('hidden');
                section.classList.remove('slide-up');
            }
        });

        // Optional: Remove 'slide-up' class after animation completes
        section.addEventListener('animationend', () => {
            if (section.classList.contains('slide-up')) {
                // Animation complete, perform additional actions if needed
            }
        });
    });

    // -------------------
    // Smooth Scrolling for Navigation Links
    // -------------------
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Adjust for fixed header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // -------------------
    // Back to Top Button
    // -------------------
    // Create Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.display = 'none'; // Hidden initially
    document.body.appendChild(backToTopBtn);

    // Style the Back to Top Button via JavaScript
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '40px';
    backToTopBtn.style.right = '40px';
    backToTopBtn.style.padding = '10px 15px';
    backToTopBtn.style.backgroundColor = '#FFD700';
    backToTopBtn.style.color = '#000';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
    backToTopBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';

    // Show or Hide the Back to Top Button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            setTimeout(() => {
                backToTopBtn.style.display = 'none';
            }, 300);
        }
    });

    // Scroll to Top when Back to Top Button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // -------------------
    // Enhanced FAQ Interactivity
    // -------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Toggle active class
            item.classList.toggle('active');

            // Toggle the visibility of the answer
            const answer = item.querySelector('p');
            if (item.classList.contains('active')) {
                answer.style.display = 'block';
                // Optional: Add slide-down animation
                answer.style.animation = 'slideDown 0.3s forwards';
            } else {
                // Optional: Add slide-up animation
                answer.style.animation = 'slideUp 0.3s forwards';
                // Hide after animation
                answer.addEventListener('animationend', () => {
                    if (!item.classList.contains('active')) {
                        answer.style.display = 'none';
                    }
                }, { once: true });
            }
        });
    });

    // -------------------
    // Additional Animations and Interactivity
    // -------------------

    // Animate Elements on Scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const animateOnScroll = () => {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', debounce(animateOnScroll, 20));
    animateOnScroll(); // Initial call

    // Debounce Function to Optimize Scroll Events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // -------------------
    // Interactive Background Enhancements
    // -------------------
    const canvas = document.getElementById('interactive-background');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 200; // Increased number for denser background
    const mouse = { x: null, y: null, radius: 150 }; // Increased radius for better interaction

    // Handle Canvas Resize
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle Mouse Movement
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // =============================
    //        TOUCH INTERACTION
    // =============================

    // Handle Touch Start
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
    }, false);

    // Handle Touch Move
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
        }
    }, false);

    // Handle Touch End and Touch Cancel
    window.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    }, false);

    window.addEventListener('touchcancel', () => {
        mouse.x = null;
        mouse.y = null;
    }, false);

    // =============================
    //         PARTICLE CLASS
    // =============================

    class Particle {
        constructor(x, y, dx, dy, size, color, opacity) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.color = color;
            this.opacity = opacity;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`; // Gold color with variable opacity
            ctx.fill();
        }

        update() {
            this.x += this.dx;
            this.y += this.dy;

            // Bounce off edges
            if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx *= -1;
            if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy *= -1;

            // Move away from mouse or touch
            if (mouse.x !== null && mouse.y !== null) { // Ensure mouse coordinates are valid
                const dxMouse = mouse.x - this.x;
                const dyMouse = mouse.y - this.y;
                const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distance < mouse.radius + this.size) {
                    const angle = Math.atan2(dyMouse, dxMouse);
                    const moveX = Math.cos(angle) * 5;
                    const moveY = Math.sin(angle) * 5;
                    this.x -= moveX;
                    this.y -= moveY;
                }
            }

            this.draw();
        }
    }

    // =============================
    //      INITIALIZE PARTICLES
    // =============================

    const initParticles = () => {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * (canvas.width - size * 2) + size;
            const y = Math.random() * (canvas.height - size * 2) + size;
            const dx = (Math.random() * 1) - 0.5;
            const dy = (Math.random() * 1) - 0.5;
            const opacity = Math.random() * 0.5 + 0.3; // Variable opacity for depth
            particlesArray.push(new Particle(x, y, dx, dy, size, 'gold', opacity));
        }
    };

    // =============================
    //     CONNECT PARTICLES
    // =============================

    const connectParticles = () => {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) { // Increased distance for more connections
                    const opacity = 1 - distance / 120;
                    ctx.strokeStyle = `rgba(255,215,0,${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    };

    // =============================
    //       ANIMATE PARTICLES
    // =============================

    const animateParticles = () => {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => particle.update());
        connectParticles();
    };

    // =============================
    //       INITIALIZATION
    // =============================

    initParticles();
    animateParticles();

    // -------------------
    // Tokenomics King Image Interaction
    // -------------------
    const kingImageTokenomics = document.getElementById('king-image-tokenomics');
    const tokenomicsSection = document.getElementById("tokenomics");

    if (kingImageTokenomics) {
        kingImageTokenomics.addEventListener('mousemove', (e) => {
            const rect = tokenomicsSection.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Normalize the values
            const maxOffset = 30; // Increased offset for better visibility
            const offsetX = (x / (rect.width / 2)) * maxOffset;
            const offsetY = (y / (rect.height / 2)) * maxOffset;

            // Apply the offset
            kingImageTokenomics.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(5deg)`;
        });

        kingImageTokenomics.addEventListener('mouseleave', () => {
            // Reset the position
            kingImageTokenomics.style.transform = `translate(0px, 0px) rotate(0deg)`;
        });
    }

    // -------------------
    // Initialize Pie Chart using Chart.js
    // -------------------
    const ctxPie = document.getElementById('tokenomics-piechart').getContext('2d');
    const tokenomicsPieChart = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: ['Public Sale', 'Dev and Management', 'Presale', 'Marketing and Promotions', 'Airdrop (Contest)'],
            datasets: [{
                label: 'Token Distribution',
                data: [50, 15, 15, 15, 5], // Percentages
                backgroundColor: [
                    'rgba(255, 215, 0, 0.9)',   // Public Sale - Gold
                    'rgba(54, 162, 235, 0.9)',  // Dev and Management - Blue
                    'rgba(255, 99, 132, 0.9)',  // Presale - Red
                    'rgba(75, 192, 192, 0.9)',  // Marketing and Promotions - Teal
                    'rgba(153, 102, 255, 0.9)'  // Airdrop (Contest) - Purple
                ],
                borderColor: [
                    'rgba(255, 215, 0, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return `${label}: ${value}%`;
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#FFD700',
                    bodyColor: '#fff',
                    borderColor: '#FFD700',
                    borderWidth: 1,
                    cornerRadius: 10,
                },
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 30,
                        padding: 15,
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#fff'
                    }
                },
                title: {
                    display: false,
                    text: 'Token Distribution'
                },
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            },
            cutout: '50%', // Creates the doughnut effect
            maintainAspectRatio: false
        }
    });

    // -------------------
    // Token Price Calculator Logic
    // -------------------
    const tokenCalculatorForm = document.getElementById('token-calculator');
    const amountInput = document.getElementById('amount-input');
    const currencySelect = document.getElementById('currency-select');
    const calculationResult = document.getElementById('calculation-result');

    tokenCalculatorForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const amount = parseFloat(amountInput.value);
        const currency = currencySelect.value;

        // Input Validation
        if (isNaN(amount) || amount <= 0) {
            calculationResult.innerText = 'Please enter a valid amount.';
            return;
        }

        let tokensReceived;

        if (currency === 'USDC') {
            // Calculation for USDC
            tokensReceived = amount / 0.0001; // Ensured consistency with fetchSolPrice
        } else if (currency === 'SOL') {
            try {
                // Fetch SOL price in USDC from Binance API
                const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDC');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const solPriceInUsdc = parseFloat(data.price); // Correct property access

                // Validate the fetched price
                if (isNaN(solPriceInUsdc) || solPriceInUsdc <= 0) {
                    throw new Error('Invalid SOL price received from Binance API.');
                }

                // Calculate tokens received based on SOL input
                const amountInUsdc = amount * solPriceInUsdc;
                tokensReceived = amountInUsdc / 0.0001; // Ensured consistency with fetchSolPrice
            } catch (error) {
                console.error('Error fetching SOL price:', error);
                calculationResult.innerText = 'Error calculating tokens. Please try again.';
                return;
            }
        } else {
            // Handle unsupported currencies if any
            calculationResult.innerText = 'Unsupported currency selected.';
            return;
        }

        // Display the result with comma separators for readability
        calculationResult.innerText = `You will receive ${tokensReceived.toLocaleString()} STUART tokens.`;
    });

    // -------------------
    // Chart Toggle Logic
    // -------------------
    const toggleChartBtn = document.getElementById('toggle-chart-btn');
    const priceChartContainer = document.getElementById('price-chart-container');
    let tradingViewWidgetInitialized = false;

    toggleChartBtn.addEventListener('click', () => {
        if (!tradingViewWidgetInitialized) {
            initializeTradingViewWidget();
            tradingViewWidgetInitialized = true;
        }
        if (priceChartContainer.style.display === 'none' || priceChartContainer.style.display === '') {
            priceChartContainer.style.display = 'block';
            toggleChartBtn.innerText = 'Hide Price Chart';
        } else {
            priceChartContainer.style.display = 'none';
            toggleChartBtn.innerText = 'Show Price Chart';
        }
    });

    // Initialize TradingView Widget
    function initializeTradingViewWidget() {
        new TradingView.widget({
            "width": "100%",
            "height": 500,
            "symbol": "BINANCE:SOLUSDC",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "withdateranges": true,
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "container_id": "tradingview-widget"
        });
    }

    // -------------------
    // Mobile Navigation Toggle (Hamburger Menu)
    // -------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('nav-active');
        menuToggle.classList.toggle('toggle-active');

        // Optional: Animate the hamburger icon into a cross
        if (menuToggle.classList.contains('toggle-active')) {
            menuToggle.innerHTML = '&times;';
        } else {
            menuToggle.innerHTML = '☰';
        }
    });

    // -------------------
    // Accessibility Enhancements
    // -------------------
    // Allow keyboard navigation for presale minimized button
    presaleMinimizedBtn.setAttribute('tabindex', '0');
    presaleMinimizedBtn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            presaleMinimizedBtn.click();
        }
    });

    // Allow keyboard navigation for slide-up sections
    slideUpSections.forEach(section => {
        section.setAttribute('tabindex', '0');
        section.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                section.click();
            }
        });
    });

    // -------------------
    // Lazy Loading Images for Performance
    // -------------------
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    lazyImageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }

    // -------------------
    // Enhance Modal for "Create Meme"
    // -------------------
    const announcementModal = document.getElementById('announcement-modal');

    // Ensure modal is focusable
    announcementModal.setAttribute('tabindex', '-1');

    // Trap focus within the modal when it's open
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', function(e) {
            const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

            if (!isTabPressed) return;

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    // Open Modal Function Enhancement
    function showAnnouncement(event) {
        event.preventDefault(); // Prevent default link behavior
        announcementModal.style.display = 'flex';
        announcementModal.focus(); // Focus on the modal for accessibility
        trapFocus(announcementModal); // Trap focus within the modal
    }

    // Close Modal Function Enhancement
    function hideAnnouncement() {
        announcementModal.style.display = 'none';
    }

    // Close modal when clicking outside of it
    announcementModal.addEventListener("click", (event) => {
        if (event.target === announcementModal) {
            hideAnnouncement();
        }
    });

    // Keyboard Accessibility for Modal
    announcementModal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAnnouncement();
        }
    });

});
