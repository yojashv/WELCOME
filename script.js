const slider = document.getElementById('mainSlider');
const display = document.getElementById('percent-display');
const setupView = document.getElementById('setup-view');
const resultView = document.getElementById('result-view');

const yourPhoneNumber = "919407384878"; 
const yourName = "Yojashv";

// 1. Initial Choice Logic
function handleInitialChoice(choice) {
    localStorage.setItem('shikhaInitialChoice', choice);
    fetch("https://formspree.io/f/mbdaozw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: "Shikha", Action: "InitialResponse", Choice: choice })
    });

    if (choice === 'Yes') {
        document.getElementById('initial-view').style.display = 'none';
        document.getElementById('gate-container').style.display = 'flex';
        autoOpenGate(); 
        document.getElementById('card').style.display = 'block';
    } else {
        showEmotionalPage();
    }
}

function showEmotionalPage() {
    document.getElementById('initial-view').style.display = 'none';
    const emotionalView = document.getElementById('emotional-view');
    emotionalView.style.display = 'block';
    const sadMsg = "I respect your choice. Sometimes, the most beautiful chapters are the ones we hold silently in our hearts. Wishing you the best, Shikha. ✨";
    typeWriter(sadMsg, 'emotional-text', 50);
}

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if(panel) panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
}

function messageYojashvAndShowKey() {
    togglePanel('no-admin-panel');
    window.open(`https://wa.me/${yourPhoneNumber}?text=Hey%20${yourName}!%20I%20clicked%20no%20by%20mistake...%20🥺`, '_blank');
}

function openWhatsAppAndShowKey() {
    togglePanel('admin-panel');
    window.open(`https://wa.me/${yourPhoneNumber}?text=Hey%20${yourName}!%20I%20want%20to%20reset%20my%20percentage!%20🥺`, '_blank');
}

function typeWriter(text, elementId, speed = 50) {
    let i = 0;
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = "";
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            const pr = document.getElementById('post-result');
            if(pr) pr.style.display = 'block';
        }
    }
    type();
}

function autoOpenGate() {
    const gc = document.getElementById('gate-container');
    setTimeout(() => {
        gc.classList.add('gate-open');
        setTimeout(() => { gc.style.display = 'none'; }, 2000);
    }, 500); 
}

function initStars() {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, size: Math.random()*1.5, speed: Math.random()*0.3 });
    }
    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = "white";
        stars.forEach(s => {
            ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill();
            s.y += s.speed; if(s.y > canvas.height) s.y = 0;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

window.onload = function() {
    initStars();
    const hr = new Date().getHours();
    const gr = document.getElementById('greeting');
    if (gr) {
        if (hr < 12) gr.innerHTML = "Good Morning ☀️, Shikha! ❤️";
        else if (hr < 17) gr.innerHTML = "Good Afternoon 🌤️, Shikha! ❤️";
        else gr.innerHTML = "Good Evening 🌙, Shikha! ❤️";
    }

    const savedInit = localStorage.getItem('shikhaInitialChoice');
    const savedSlide = localStorage.getItem('shikhaFinalVal');

    if (savedInit === 'No') {
        showEmotionalPage();
    } else if (savedInit === 'Yes' && savedSlide) {
        document.getElementById('card').style.display = 'block';
        showFinalUI(savedSlide);
    } else if (savedInit === 'Yes') {
        document.getElementById('gate-container').style.display = 'flex';
        autoOpenGate();
        document.getElementById('card').style.display = 'block';
    } else {
        document.getElementById('initial-view').style.display = 'block';
    }
}

if(slider) {
    slider.oninput = function() {
        display.innerHTML = this.value + "%";
        const hue = 200 + (this.value * 1.6); 
        display.style.color = `hsl(${hue}, 100%, 60%)`;
    }
}

function submitChoice() {
    const val = slider.value;
    localStorage.setItem('shikhaFinalVal', val);
    fetch("https://formspree.io/f/mbdaozw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: "Shikha", Percentage: val + "%" })
    });
    showFinalUI(val);
}

function showFinalUI(val) {
    setupView.style.display = "none";
    resultView.style.display = "block";
    document.getElementById('final-percent').innerHTML = val + "%";
    let msg = "";
    if (val >= 90) msg = "Shikha, some things are written in the stars... you make the world feel like home. ❤️";
    else if (val >= 70) msg = "You mean the world to me, Shikha. You're a beautiful creature! ✨";
    else if (val >= 50) msg = "You're a huge part of my world, Shikha! 🌸";
    else msg = "You're a great friend, Shikha! 😊";
    typeWriter(msg, 'typewriter-msg', 60);
}

// THE UPDATED KEY LOGIC
function checkKey(inputId) {
    const input = document.getElementById(inputId).value;
    const keyUsed = localStorage.getItem('shikhaKeyUsed');

    if (input === "Shikha") {
        if (keyUsed === "true") {
            alert("This key has EXPIRED! Use the master key or ask Yojashv for a new one.");
        } else {
            // Success - Mark as used
            localStorage.setItem('shikhaKeyUsed', 'true');
            resetUniverse();
        }
    } else if (input === "Buddy") {
        // Master key - Always works
        resetUniverse();
    } else { 
        alert("Unauthorized Code. Please check with Yojashv."); 
    }
}

function resetUniverse() {
    localStorage.removeItem('shikhaFinalVal');
    localStorage.removeItem('shikhaInitialChoice');
    location.reload();
}