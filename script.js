const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = (Math.random() - 0.5) * 4;
                this.speedY = (Math.random() - 0.5) * 4;
                this.color = `hsl(${Math.random() * 10}, 100%, ${Math.random() * 20 + 10}%)`;
                this.glow = Math.random() * 30 + 10;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = this.glow;
                ctx.fill();
            }
        }

        let particles = [];
        for (let i = 0; i < 300; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();

        // Mouse move effect
        window.addEventListener('mousemove', (e) => {
            const mouseParticle = new Particle();
            mouseParticle.x = e.clientX;
            mouseParticle.y = e.clientY;
            mouseParticle.size = Math.random() * 8 + 2;
            mouseParticle.speedX = (Math.random() - 0.5) * 2;
            mouseParticle.speedY = (Math.random() - 0.5) * 2;
            particles.push(mouseParticle);
            if (particles.length > 200) particles.shift();
        });

        // Text fade and change effect
        const texts = [
            "Dark Blood Realm",
            "Whispers in the Void",
            "Eternal Crimson Night",
            "Shadows of the Forgotten"
        ];

        const descriptions = [
            "Step into the abyss, where shadows dance and the blood-red glow reveals the secrets of the forgotten.",
            "Lost souls wander here, their whispers fading into the endless void.",
            "A night of blood and mystery, where only the strong survive.",
            "Darkness consumes all, leaving only echoes of the past."
        ];

        let index = 0;
        const mainText = document.getElementById("mainText");
        const subText = document.getElementById("subText");

        function changeText() {
            mainText.classList.add("fade-out");
            subText.classList.add("fade-out");
            setTimeout(() => {
                index = (index + 1) % texts.length;
                mainText.textContent = texts[index];
                subText.textContent = descriptions[index];
                mainText.classList.remove("fade-out");
                subText.classList.remove("fade-out");
            }, 1000);
        }

        mainText.addEventListener("click", changeText);
        subText.addEventListener("click", changeText);