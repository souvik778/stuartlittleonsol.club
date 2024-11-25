document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.classList.add("particle-background"); // Add class for styling
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    // Set canvas to full window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    // Particle settings
    const particleCount = 150; // Number of particles
    const colors = ["#007BFF", "#0056b3", "#003d80"];
    const particles = [];

    class Particle {
        constructor(x, y, radius, dx, dy, color) {
            this.x = x; // Horizontal position
            this.y = y; // Vertical position
            this.radius = radius; // Particle size
            this.dx = dx; // Horizontal velocity
            this.dy = dy; // Vertical velocity
            this.color = color; // Particle color
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Draw circle
            ctx.fillStyle = this.color; // Apply particle color
            ctx.fill();
            ctx.closePath();
        }

        update() {
            // Update position
            this.x += this.dx;
            this.y += this.dy;

            // Bounce off canvas edges
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx *= -1;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy *= -1;
            }

            this.draw();
        }
    }

    // Initialize particles
    function initParticles() {
        particles.length = 0; // Clear previous particles
        for (let i = 0; i < particleCount; i++) {
            const radius = Math.random() * 3 + 1; // Random size between 1 and 4
            const x = Math.random() * canvas.width; // Random horizontal position
            const y = Math.random() * canvas.height; // Random vertical position
            const dx = (Math.random() - 0.5) * 2; // Random horizontal velocity
            const dy = (Math.random() - 0.5) * 2; // Random vertical velocity
            const color = colors[Math.floor(Math.random() * colors.length)]; // Random color
            particles.push(new Particle(x, y, radius, dx, dy, color));
        }
    }

    // Animate particles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        particles.forEach(particle => particle.update()); // Update each particle
        requestAnimationFrame(animate); // Recursive animation loop
    }

    // Handle window resize
    window.addEventListener("resize", () => {
        resizeCanvas(); // Adjust canvas dimensions
        initParticles(); // Reinitialize particles
    });

    // Initialize and start animation
    initParticles();
    animate();
});
