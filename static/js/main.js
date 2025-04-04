document.addEventListener('DOMContentLoaded', function() {
    // แสดงหน้าโหลดก่อน
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // จำลองการโหลด
    let progress = 0;
    const loadingMessages = [
        'Initializing System...',
        'Loading Assets...',
        'Connecting Modules...',
        'Calibrating Interface...',
        'Ready To Launch'
    ];
    
    // เพิ่มเอฟเฟกต์กระพริบสำหรับโลโก้ตอนโหลด
    const loaderLogo = document.querySelector('.loader-logo-inner');
    let glitchInterval = setInterval(() => {
        loaderLogo.style.opacity = Math.random() < 0.1 ? '0.7' : '1';
    }, 100);
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 3 + 0.5;
        
        if (progress > 100) {
            progress = 100;
            clearInterval(glitchInterval);
            loaderLogo.style.opacity = '1';
        }
        
        loaderProgress.style.width = `${progress}%`;
        
        // เพิ่มเอฟเฟกต์ glitch ตอนโหลดใกล้เสร็จ
        if (progress > 85) {
            if (Math.random() < 0.1) {
                loaderProgress.style.width = `${progress - 5 + Math.random() * 10}%`;
                setTimeout(() => {
                    loaderProgress.style.width = `${progress}%`;
                }, 50);
            }
        }
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                    initSite();
                }, 500);
            }, 800);
        }
    }, 100);
    
    // เริ่มต้นเว็บไซต์หลังจากโหลดเสร็จ
    function initSite() {
        // ตั้งค่าภาษาเริ่มต้นเป็นภาษาไทย
        document.documentElement.lang = 'th';
        
        // สร้าง Matrix effect 
        createMatrixEffect();
        
        // สร้าง Particle effect
        initParticles();
        
        // สลับภาษา
        const langThBtn = document.getElementById('lang-th');
        const langEnBtn = document.getElementById('lang-en');
        
        langThBtn.addEventListener('click', function() {
            document.documentElement.lang = 'th';
            langThBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        });
        
        langEnBtn.addEventListener('click', function() {
            document.documentElement.lang = 'en';
            langEnBtn.classList.add('active');
            langThBtn.classList.remove('active');
        });
        
        // ตั้งค่า mobile navigation
        setupMobileNavigation();
        
        // การนำทางระหว่างส่วนต่างๆ
        const navLinks = document.querySelectorAll('.navigation a');
        const sections = document.querySelectorAll('main section');
        
        navLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // เพิ่มเสียงคลิกแบบไซไฟ
                playClickSound();
                
                // ลบคลาส active จากทุกลิงก์และเพิ่มให้ลิงก์ที่ถูกคลิก
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // ซ่อนทุกส่วนและแสดงส่วนที่เลือก
                const targetId = this.getAttribute('data-section');
                sections.forEach(section => {
                    section.classList.remove('active');
                    setTimeout(() => {
                        section.style.display = 'none';
                    }, 300);
                });
                
                const targetSection = document.getElementById(targetId);
                setTimeout(() => {
                    targetSection.style.display = 'block';
                    // เพิ่ม delay เล็กน้อยก่อนเพิ่ม active class เพื่อให้ transition ทำงาน
                    setTimeout(() => {
                        targetSection.classList.add('active');
                        
                        // เพิ่ม animation ให้กับ elements ในส่วนที่แสดง
                        animateSectionElements(targetSection);
                    }, 50);
                }, 350);
                
                // อัปเดต URL แบบไม่รีโหลดหน้า
                history.pushState(null, null, `#${targetId}`);
            });
        });
        
        // ปุ่มดาวน์โหลด - ลูกเล่นกระพริบที่ปุ่ม
        const cyberButton = document.querySelector('.cyber-button');
        if (cyberButton) {
            cyberButton.addEventListener('mouseover', function() {
                if (Math.random() < 0.3) {
                    const glitchEffect = () => {
                        if (Math.random() < 0.5) {
                            this.style.transform = `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 5}px)`;
                            this.style.color = Math.random() < 0.5 ? 'var(--accent-color)' : 'var(--secondary-color)';
                        } else {
                            this.style.transform = 'translate(0, 0)';
                            this.style.color = 'var(--secondary-color)';
                        }
                    };
                    
                    let glitchCount = 0;
                    const glitchInterval = setInterval(() => {
                        glitchEffect();
                        glitchCount++;
                        if (glitchCount > 5) {
                            clearInterval(glitchInterval);
                            this.style.transform = 'translate(0, 0)';
                            this.style.color = 'var(--secondary-color)';
                        }
                    }, 100);
                }
            });
            
            cyberButton.addEventListener('mouseout', function() {
                this.style.transform = 'translate(0, 0)';
                this.style.color = 'var(--secondary-color)';
            });
        }
        
        // ตรวจสอบ URL hash เมื่อโหลดหน้า
        const checkHash = () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const targetLink = document.querySelector(`.navigation a[data-section="${hash}"]`);
                if (targetLink) {
                    targetLink.click();
                }
            } else {
                // ถ้าไม่มี hash ให้แสดงส่วนแรก
                document.querySelector('.navigation a').click();
            }
        };
        
        checkHash();
        window.addEventListener('hashchange', checkHash);
        
        // แอนิเมชันเมื่อเลื่อนหน้า
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.skills-group, .timeline-item, .education-card, .contact-card');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100 && elementBottom > 0) {
                    element.classList.add('fade-in');
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // เรียกฟังก์ชันครั้งแรกเมื่อโหลดหน้า
        
        // เพิ่มปีปัจจุบันให้กับ footer
        const footerYear = document.querySelector('footer p:first-child');
        if (footerYear) {
            const currentYear = new Date().getFullYear();
            footerYear.innerHTML = footerYear.innerHTML.replace('{{ current_year }}', currentYear);
        }
        
        // เพิ่มเอฟเฟกต์ Terminal
        setupTerminal();
        
        // เพิ่มเอฟเฟกต์ Typewriter ให้กับชื่อและตำแหน่ง
        const name = document.querySelector('.name');
        const title = document.querySelector('.title');
        
        setTimeout(() => {
            name.classList.add('typewriter');
            setTimeout(() => {
                title.classList.add('typewriter');
            }, 2000);
        }, 500);
        
        // เพิ่ม hover effect ให้กับ timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, idx) => {
            item.style.setProperty('--idx', idx);
        });
        
        // ตั้งค่า data-number ให้กับหัวข้อแต่ละส่วน
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title, idx) => {
            title.setAttribute('data-number', idx + 1);
        });
        
        // ทำให้ elements บางตัวลอยขึ้นลง
        const floatingElements = document.querySelectorAll('.name, .education-icon, .contact-social .social-link');
        floatingElements.forEach(el => {
            el.classList.add('floating');
        });
    }
    
    // เพิ่มเอฟเฟกต์ Terminal
    function setupTerminal() {
        const terminal = document.querySelector('.terminal');
        if (!terminal) return;
        
        const terminalInput = document.querySelector('.terminal-input');
        const terminalResponse = document.querySelector('.terminal-response');
        
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                let response = '';
                
                if (command === 'help') {
                    response = `Available commands:
                    - help: Show this help menu
                    - about: Show information about me
                    - skills: List my skills
                    - contact: Show contact information
                    - clear: Clear terminal`;
                } else if (command === 'about') {
                    response = `Nontapat Eiedtong - Pentester & Software Engineer
                    ฉันเป็นบัณฑิตสาขาระบบสารสนเทศทางธุรกิจที่มีประสบการณ์การพัฒนาเว็บและแอปพลิเคชัน`;
                } else if (command === 'skills') {
                    response = `Technical skills:
                    - Programming: Python, PHP, TypeScript/JavaScript, HTML/CSS, Kotlin
                    - Frontend: React (TSX, JSX), Vue.js, Next.js
                    - Backend: Node.js, Flask, PHP
                    - Cybersecurity: Kali Linux, SQL Injection, MITM, Wireshark, Metasploit`;
                } else if (command === 'contact') {
                    response = `Email: nontapat0467@gmail.com
                    Phone: +66 65 403 2410
                    GitHub: https://github.com/Mubmib1305
                    Facebook: https://www.facebook.com/nontapat.eiedtong
                    Line: Nontapat_46
                    Instagram: https://www.instagram.com/_mubmib_/`;
                } else if (command === 'clear') {
                    terminalResponse.style.display = 'none';
                    this.value = '';
                    return;
                } else if (command !== '') {
                    response = `Command not found: ${command}. Type 'help' for available commands.`;
                }
                
                if (response) {
                    terminalResponse.textContent = response;
                    terminalResponse.style.display = 'block';
                }
                
                this.value = '';
            }
        });
    }
    
    // เพิ่มฟังก์ชันสำหรับ Navigation บนมือถือ
    function setupMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navList = document.querySelector('.nav-list');
        const navLinks = document.querySelectorAll('.navigation a');
        
        if (navToggle) {
            // เปิด/ปิดเมนูเมื่อคลิกปุ่มแฮมเบอร์เกอร์
            navToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navList.classList.toggle('active');
            });
            
            // ปิดเมนูเมื่อคลิกลิงก์
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navList.classList.remove('active');
                });
            });
            
            // ปิดเมนูเมื่อคลิกนอกพื้นที่เมนู
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.navigation')) {
                    navToggle.classList.remove('active');
                    navList.classList.remove('active');
                }
            });
        }
    }
    
    // สร้าง Matrix effect
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        canvas.classList.add('matrix-background');
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // ตั้งค่าขนาด canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // ตัวอักษรที่จะแสดงใน Matrix effect
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノマミムメモヤユヨラリルレロワヲン';
        
        // คำนวณจำนวนคอลัมน์
        const fontSize = 12;
        const columns = Math.floor(canvas.width / fontSize);
        
        // สร้างตำแหน่ง y เริ่มต้นสำหรับแต่ละคอลัมน์
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        // ฟังก์ชันสำหรับวาด Matrix
        function drawMatrix() {
            // ทำให้หน้าจอค่อยๆ จางลง แทนที่จะลบทั้งหมด
            ctx.fillStyle = 'rgba(6, 12, 33, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // สีและฟอนต์ของตัวอักษร
            ctx.fillStyle = 'rgba(100, 255, 218, 0.3)';
            ctx.font = `${fontSize}px monospace`;
            
            // วนลูปสำหรับแต่ละคอลัมน์และวาดตัวอักษร
            for (let i = 0; i < drops.length; i++) {
                // สุ่มตัวอักษรที่จะแสดง
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                
                // วาดตัวอักษร
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                // เพิ่มความสว่างให้กับตัวอักษรตัวแรกเพื่อสร้างเอฟเฟกต์หัว
                if (drops[i] * fontSize < 100) {
                    ctx.fillStyle = 'rgba(100, 255, 218, 0.8)';
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    ctx.fillStyle = 'rgba(100, 255, 218, 0.3)';
                }
                
                // เริ่มต้นใหม่เมื่อถึงด้านล่างหรือสุ่ม
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // เลื่อนตัวอักษรลงมา
                drops[i]++;
            }
        }
        
        // อัปเดตขนาด canvas เมื่อหน้าต่างเปลี่ยนขนาด
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const newColumns = Math.floor(canvas.width / fontSize);
            
            // ปรับขนาดของ drops array
            if (newColumns > columns) {
                for (let i = columns; i < newColumns; i++) {
                    drops[i] = 1;
                }
            }
        });
        
        // เรียกใช้ฟังก์ชันวาด Matrix ทุก 33ms (ประมาณ 30fps)
        return setInterval(drawMatrix, 33);
    }
    
    // สร้าง Particle effect
    function initParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.classList.add('particles-js');
        document.body.prepend(particlesContainer);
        
        // ถ้ามี particlesJS ในโปรเจค (ต้องเพิ่ม script particles.js)
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: '#64ffda' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: true },
                    size: { value: 2, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#64ffda',
                        opacity: 0.2,
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
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 0.5 } },
                        push: { particles_nb: 3 }
                    }
                },
                retina_detect: true
            });
        } else {
            // ถ้าไม่มี particles.js ให้โหลดไฟล์และเรียกใช้
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
            script.onload = function() {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 50, density: { enable: true, value_area: 800 } },
                        color: { value: '#64ffda' },
                        shape: { type: 'circle' },
                        opacity: { value: 0.5, random: true },
                        size: { value: 2, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: '#64ffda',
                            opacity: 0.2,
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
                            onhover: { enable: true, mode: 'grab' },
                            onclick: { enable: true, mode: 'push' },
                            resize: true
                        },
                        modes: {
                            grab: { distance: 140, line_linked: { opacity: 0.5 } },
                            push: { particles_nb: 3 }
                        }
                    },
                    retina_detect: true
                });
            };
            document.body.appendChild(script);
        }
    }
    
    // เพิ่ม animation ให้กับ elements ในส่วนที่แสดง
    function animateSectionElements(section) {
        const elements = section.querySelectorAll('.skills-group, .timeline-item, .education-card, .contact-item, .contact-social');
        
        elements.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, idx * 100);
        });
    }
    
    // เล่นเสียงคลิกแบบไซไฟ
    function playClickSound() {
        // สร้าง AudioContext
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // สร้าง oscillator
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // ตั้งค่า oscillator
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.1);
        
        // ตั้งค่า volume
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        // เชื่อมต่อ nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // เล่นเสียง
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }
});

// ปรับปรุงการตอบสนองเมื่อขนาดหน้าจอเปลี่ยน
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // รีเซ็ตการแสดงผลเมนูเมื่อกลับไปที่หน้าจอใหญ่
        const navToggle = document.querySelector('.nav-toggle');
        const navList = document.querySelector('.nav-list');
        
        if (navToggle && navList) {
            navToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    }
});