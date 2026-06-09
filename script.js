document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. АНІМАЦІЯ ДРАКОНЧИКА
    // ==========================================
    const dragonImage = document.getElementById("animated-dragon-hero");
    const animationFrames = ["img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png"];
    let currentFrameIndex = 0, direction = 1;

    function animateDragon() {
        if (!dragonImage) return;
        dragonImage.src = animationFrames[currentFrameIndex];
        let currentDelay = 120;
        if (currentFrameIndex === 5 && direction === 1) { currentDelay = 800; direction = -1; }
        else if (currentFrameIndex === 4 && direction === -1) { currentDelay = 300; currentFrameIndex += direction; }
        else if (currentFrameIndex === 0 && direction === -1) { currentDelay = 1500; direction = 1; }
        else { currentFrameIndex += direction; }
        setTimeout(animateDragon, currentDelay);
    }
    if (dragonImage) animateDragon();

    // ==========================================
    // 2. СЛАЙДЕР КАРТОК ТА МАРКІ
    // ==========================================
    const baseTrack = document.getElementById("base-track");
    if (baseTrack) {
        let baseScrollPosition = 0;
        const cardStep = 390;
        document.querySelector(".next-base")?.addEventListener("click", () => {
            const maxScroll = baseTrack.scrollWidth - baseTrack.parentElement.clientWidth;
            if (Math.abs(baseScrollPosition) < maxScroll) {
                baseScrollPosition -= cardStep;
                baseTrack.style.transform = `translateX(${baseScrollPosition}px)`;
            }
        });
        document.querySelector(".prev-base")?.addEventListener("click", () => {
            if (baseScrollPosition < 0) {
                baseScrollPosition += cardStep;
                baseTrack.style.transform = `translateX(${baseScrollPosition}px)`;
            }
        });
    }

    const marqueeTrack = document.getElementById("marquee-track");
    if (marqueeTrack) {
        let scrollX = 0;
        function scrollMarquee() {
            scrollX -= 0.8;
            const halfWidth = marqueeTrack.scrollWidth / 2;
            if (Math.abs(scrollX) >= halfWidth) scrollX = 0;
            marqueeTrack.style.transform = `translateX(${scrollX}px)`;
            requestAnimationFrame(scrollMarquee);
        }
        scrollMarquee();
    }

    // ==========================================
    // 3. ВІДЕО ТА АВТОРИЗАЦІЯ
    // ==========================================
    document.querySelectorAll('.video-preview-block').forEach(block => {
        const video = block.querySelector('.content-video');
        const playBtn = block.querySelector('.play-button-overlay');
        block.addEventListener('click', () => {
            if (video.paused) { video.play(); playBtn.style.opacity = '0'; playBtn.style.pointerEvents = 'none'; }
            else { video.pause(); playBtn.style.opacity = '1'; playBtn.style.pointerEvents = 'auto'; }
        });
    });

    window.openAuthModal = (type) => {
        const modal = document.getElementById("auth-modal");
        document.getElementById("modal-title").innerText = type;
        document.getElementById("name-input").style.display = type === 'Реєстрація' ? "block" : "none";
        document.getElementById("submit-btn").innerText = type === 'Реєстрація' ? "Зареєструватися" : "Увійти";
        modal.style.display = "block";
    };

    document.querySelector(".close-btn")?.addEventListener("click", () => document.getElementById("auth-modal").style.display = "none");
    window.onclick = (event) => { if (event.target == document.getElementById("auth-modal")) document.getElementById("auth-modal").style.display = "none"; };

    document.getElementById("auth-form")?.addEventListener("submit", (e) => { e.preventDefault(); window.location.href = "welcome.html"; });

    // ==========================================
    // 4. ТЕСТ (Весь код тепер тут)
    // ==========================================
    const quizData = [
        { q: "Який інструмент створює кола?", options: ["A) Rectangle", "B) Ellipse", "C) Pen", "D) Brush"], correct: 1 },
        { q: "Що таке Stroke?", options: ["A) Колір заливки", "B) Обводка", "C) Прозорість", "D) Поворот"], correct: 1 },
        { q: "Як називається ефект для анімації лінії?", options: ["A) Mask", "B) Group", "C) Trim Paths", "D) Opacity"], correct: 2 },
        { q: "Для чого потрібні маски?", options: ["A) Щоб вирізати частину", "B) Щоб змінити колір", "C) Щоб видалити шар", "D) Для звуку"], correct: 0 },
        { q: "Як об'єднати кілька шейпів?", options: ["A) Mask", "B) Group", "C) Null", "D) Pre-compose"], correct: 1 },
        { q: "Як називається панель з таймлайном?", options: ["A) Project", "B) Timeline", "C) Effects", "D) Toolbar"], correct: 1 },
        { q: "Що робить параметр Fill?", options: ["A) Заливку кольором", "B) Обводку", "C) Тінь", "D) Світіння"], correct: 0 },
        { q: "Чи можна анімувати форму?", options: ["A) Ні", "B) Так", "C) Тільки колір", "D) Тільки розмір"], correct: 1 },
        { q: "Де знаходяться властивості шейпа?", options: ["A) У меню File", "B) У Contents", "C) У Effect Controls", "D) Ніде"], correct: 1 },
        { q: "Як приховати частину шару?", options: ["A) Mask", "B) Fill", "C) Stroke", "D) Anchor Point"], correct: 0 },
        { q: "Яка клавіша для виклику Scale?", options: ["A) P", "B) R", "C) S", "D) T"], correct: 2 },
        { q: "Для чого потрібен Anchor Point?", options: ["A) Точка обертання", "B) Колір", "C) Масштаб", "D) Ефект"], correct: 0 },
        { q: "Чи можна групувати групи?", options: ["A) Ні", "B) Так", "C) Тільки 2 рази", "D) Тільки 1 раз"], correct: 1 },
        { q: "Що таке шлях (Path)?", options: ["A) Форма лінії", "B) Колір", "C) Звук", "D) Відео"], correct: 0 },
        { q: "Який шар краще для масковання?", options: ["A) Solid", "B) Null", "C) Shape", "D) Text"], correct: 2 },
        { q: "Яке значення у Trim Paths 'End' на початку?", options: ["A) 0%", "B) 50%", "C) 100%", "D) -100%"], correct: 2 },
        { q: "Що робить клавіша U?", options: ["A) Повертає все", "B) Показує ключі", "C) Видаляє шар", "D) Створює маску"], correct: 1 },
        { q: "Де міняють товщину обводки?", options: ["A) Stroke Width", "B) Fill Color", "C) Mask Path", "D) Opacity"], correct: 0 },
        { q: "Чи обов'язково мати Stroke?", options: ["A) Так", "B) Ні", "C) Тільки для фігур", "D) Тільки для тексту"], correct: 1 },
        { q: "Який результат уроків?", options: ["A) Перше лого", "B) Складний сайт", "C) Нічого", "D) 3D гра"], correct: 0 }
    ];

    const list = document.getElementById('questions-list');
    let userAnswers = {};

    window.select = (btn, optIdx, qIdx) => {
        userAnswers[qIdx] = optIdx;
        btn.parentElement.querySelectorAll('button').forEach(b => b.style.background = '#333');
        btn.style.background = '#FF2E93';
    };

    if (list) {
        quizData.forEach((item, index) => {
            list.innerHTML += `<div class="quiz-item" data-qidx="${index}" style="margin-bottom:20px;">
                <p>${index + 1}. ${item.q}</p>
                ${item.options.map((opt, i) => `<button onclick="select(this, ${i}, ${index})">${opt}</button>`).join(' ')}
            </div>`;
        });
    }

    document.getElementById('show-result-btn')?.addEventListener('click', () => {
        let score = 0;
        quizData.forEach((item, qIdx) => {
            const questionDiv = document.querySelector(`.quiz-item[data-qidx="${qIdx}"]`);
            if (!questionDiv) return;
            questionDiv.querySelectorAll('button').forEach((btn, optIdx) => {
                btn.disabled = true;
                if (optIdx === item.correct) btn.style.border = '2px solid #00FF00';
                else if (userAnswers[qIdx] === optIdx) btn.style.border = '2px solid #FF0000';
            });
            if(userAnswers[qIdx] === item.correct) score++;
        });
        const res = document.getElementById('final-score');
        if(res) { res.style.display = 'block'; res.innerHTML = `Твій результат: ${score} з 20.`; }
    });
});


    window.checkAnswer = (answer, isCorrect) => {
        const message = document.getElementById('quiz-message');
        const nextBtn = document.getElementById('next-lesson-btn');

        if (!message || !nextBtn) return; // Перевірка на існування елементів

        if (isCorrect) {
            message.innerHTML = "<span style='color: green; font-weight: bold;'>Правильно! Переходьте далі.</span>";
            nextBtn.style.display = "inline-block";
            setTimeout(() => {
                nextBtn.classList.add('is-visible');
            }, 50);
        } else {
            message.innerHTML = "<span style='color: red;'>Неправильно. Спробуйте ще раз!</span>";
        }
    };