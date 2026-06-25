const correctPin = "1404"; 
let currentPin = "";
let isMusicPlaying = false; 

function playMusic() {
    if (!isMusicPlaying) {
        document.getElementById("bgMusic").play();
        isMusicPlaying = true;
    }
}

function press(num) {
    playMusic();
    if (currentPin.length < 4) {
        currentPin += num;
        updateDots();
    }
    if (currentPin.length === 4) {
        setTimeout(() => {
            if (currentPin === correctPin) nextScreen('screen1', 'screen2');
            else { alert("Salah sayang... 🥺🎀"); clearPin(); }
        }, 300);
    }
}

function clearPin() { currentPin = ""; updateDots(); }
function updateDots() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`dot${i}`).classList[i <= currentPin.length ? 'add' : 'remove']('filled');
    }
}

function nextScreen(curr, next) {
    document.getElementById(curr).classList.remove('active');
    document.getElementById(next).classList.add('active');
    if(next === 'screen10') fireConfetti();
}

// SLIDER KEMARAHAN (SLIDE 3)
function updateSlider() {
    let v = document.getElementById("kangenSlider").value;
    document.getElementById("kangenValue").innerText = v + "%";
    
    // Tombol Lanjut baru muncul kalau dia menggeser sampai 0%
    if (v == 0) {
        document.getElementById("btnKangen").classList.remove('hidden');
    } else {
        document.getElementById("btnKangen").classList.add('hidden');
    }
}

// CHECKLIST JANJI (SLIDE 4)
function checkChecklist() {
    let checks = document.querySelectorAll('.checklist input:checked');
    document.getElementById("btnCheck").classList[checks.length === 3 ? 'remove' : 'add']('hidden');
}

// PELUK VIRTUAL (SLIDE 6)
let count = 0;
function rechargeHug() {
    count++;
    document.getElementById("hugCount").innerText = count;
    if(count >= 5) nextScreen('screen6', 'screen7');
}

// SURAT RAHASIA (SLIDE 7)
let secretsOpened = 0;
function openSecret(btnElement, secretMessage) {
    // Ubah teks jadi pesan rahasia
    btnElement.innerText = secretMessage;
    // Matikan tombol supaya tidak bisa diklik dua kali
    btnElement.disabled = true;
    
    secretsOpened++;
    
    // Kalau ketiga surat sudah dibuka, munculkan tombol lanjut
    if(secretsOpened === 3) {
        document.getElementById("btnLanjutSecret").classList.remove('hidden');
    }
}

// RUN BUTTON (SLIDE 5)
function moveButton() {
    const btn = document.getElementById("btnRun");
    const container = document.getElementById("runContainer");
    const maxX = container.clientWidth - btn.offsetWidth;
    const maxY = container.clientHeight - btn.offsetHeight;
    btn.style.left = Math.random() * maxX + "px";
    btn.style.top = Math.random() * maxY + "px";
}

// CONFETTI & MODAL
function fireConfetti() {
    var end = Date.now() + 3000;
    var colors = ['#ffb6c1', '#ff6b81', '#ffffff', '#ffe4e1'];
    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

function openModal(el) {
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("expandedImg").src = el.src;
}
function closeModal() { document.getElementById("imageModal").style.display = "none"; }