document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. АНІМАЦІЯ ДРАКОНЧИКА (Твій фірмовий холд)
    // ==========================================
    const dragonImage = document.getElementById("animated-dragon-hero");

    const animationFrames = [
        "img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png"
    ];

    let currentFrameIndex = 0;
    let direction = 1;

    function animateDragon() {
        if (!dragonImage) return;
        dragonImage.src = animationFrames[currentFrameIndex];
        let currentDelay = 120; 

        if (currentFrameIndex === 5 && direction === 1) {
            currentDelay = 800; // Холд на підморгування
            direction = -1; 
        }
        else if (currentFrameIndex === 4 && direction === -1) {
            currentDelay = 300; 
            currentFrameIndex += direction;
        }
        else if (currentFrameIndex === 0 && direction === -1) {
            currentDelay = 1500; 
            direction = 1; 
        } 
        else {
            currentFrameIndex += direction;
        }

        setTimeout(animateDragon, currentDelay);
    }
    animateDragon();


    // ==========================================
    // 2. ІНТЕРАКТИВНИЙ СЛАЙДЕР ДЛЯ КАРТОК КУРСІВ
    // ==========================================
    const baseTrack = document.getElementById("base-track");
    const btnPrevBase = document.querySelector(".prev-base");
    const btnNextBase = document.querySelector(".next-base");

    if (baseTrack && btnPrevBase && btnNextBase) {
        let baseScrollPosition = 0;
        // Ширина однієї картки (360px) + відстань gap між ними (30px) = 390px за один крок
        const cardStep = 390; 

        btnNextBase.addEventListener("click", () => {
            const maxScroll = baseTrack.scrollWidth - baseTrack.parentElement.clientWidth;
            if (Math.abs(baseScrollPosition) < maxScroll) {
                baseScrollPosition -= cardStep;
                baseTrack.style.transform = `translateX(${baseScrollPosition}px)`;
            }
        });

        btnPrevBase.addEventListener("click", () => {
            if (baseScrollPosition < 0) {
                baseScrollPosition += cardStep;
                baseTrack.style.transform = `translateX(${baseScrollPosition}px)`;
            }
        });
    }


    // ==========================================
    // 3. ПОСТІЙНО РУХОМИЙ МАРКІ-СЛАЙДЕР ІНСТРУМЕНТІВ
    // ==========================================
    const marqueeTrack = document.getElementById("marquee-track");
    
    if (marqueeTrack) {
        let speed = 0.8; // Швидкість руху стрічки (можна поставити 1 або 1.5, якщо треба швидше)
        let scrollX = 0;

        function scrollMarquee() {
            scrollX -= speed;
            
            // Напівширина всього треку (оскільки ми дублювали іконки 1-в-1 в HTML)
            const halfWidth = marqueeTrack.scrollWidth / 2;
            
            // Якщо перша половина повністю сховалася зліва — скидаємо позицію на 0 безшовно
            if (Math.abs(scrollX) >= halfWidth) {
                scrollX = 0;
            }
            
            marqueeTrack.style.transform = `translateX(${scrollX}px)`;
            // Використовуємо requestAnimationFrame для ідеальної плавності моушену (60fps)
            requestAnimationFrame(scrollMarquee);
        }
        
        scrollMarquee();
    }
});


document.querySelectorAll('.video-preview-block').forEach(block => {
    const video = block.querySelector('.content-video');
    const playBtn = block.querySelector('.play-button-overlay');

    block.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playBtn.style.opacity = '0'; // Ховаємо кнопку, коли відео грає
            playBtn.style.pointerEvents = 'none'; // Щоб кнопка не заважала клікати по відео далі
        } else {
            video.pause();
            playBtn.style.opacity = '1'; // Повертаємо кнопку, якщо поставили на паузу
            playBtn.style.pointerEvents = 'auto';
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    
    const modal = document.getElementById("registerModal");
    const btn = document.querySelector(".register-btn"); 
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("registerForm");

    if (btn) {
        btn.onclick = () => modal.style.display = "block";
    }

    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = "none";
    }

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            window.location.href = "lesson1.html";
        };
    }
});

function checkAnswer(answer, isCorrect) {
    const message = document.getElementById('quiz-message');
    const nextBtn = document.getElementById('next-lesson-btn');

    if (isCorrect) {
        message.innerHTML = "<span style='color: green; font-weight: bold;'>Правильно! Переходьте далі.</span>";
        
        // Змінюємо display на flex або block, щоб елемент став видимим для розмітки
        nextBtn.style.display = "inline-block";
        
        // Маленька затримка (setTimeout) потрібна, щоб браузер "відчув" 
        // перехід між display: none -> block і зміг відтворити transition
        setTimeout(() => {
            nextBtn.classList.add('is-visible');
        }, 50);
        
    } else {
        message.innerHTML = "<span style='color: red;'>Неправильно. Спробуйте ще раз!</span>";
    }
}