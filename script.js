document.addEventListener('DOMContentLoaded', () => {
  const yes = document.getElementById('yes');
  const no = document.getElementById('no');
  const response = document.getElementById('response');
  const emoji = document.getElementById('emoji');
  const message = document.getElementById('message');
  const livesWrap = document.getElementById('lives');
  const count = document.getElementById('count');

  let lives = 3;

  function showResponse(face, text) {
    emoji.textContent = face;
    message.textContent = text;
    response.classList.remove('hidden');
  }

  yes.addEventListener('click', () => {
    // Mostrar carta + confetti
    yes.disabled = true;
    no.disabled = true;
    showLetter();
  });

  no.addEventListener('click', () => {
    lives = Math.max(0, lives - 1);
    livesWrap.classList.remove('hidden');
    count.textContent = lives;
    if (lives > 0) {
      showResponse('😠', `Te quedan ${lives} vidas`);
    } else {
      showResponse('😤', 'Te quedaste sin vidas 😢');
      no.disabled = true;
      yes.disabled = true;
    }
  });

  // --- Carta, confetti y corazones ---
  const modal = document.getElementById('letterModal');
  const closeLetter = document.getElementById('closeLetter');
  const confettiRoot = document.getElementById('confetti');
  const heartsRoot = document.getElementById('hearts');

  function showLetter() {
    response.classList.add('hidden');
    modal.classList.remove('hidden');
    spawnConfetti(60);
    spawnHearts(18);
  }

  function hideLetter() {
    modal.classList.add('hidden');
    confettiRoot.innerHTML = '';
    heartsRoot.innerHTML = '';
  }

  closeLetter.addEventListener('click', hideLetter);

  // Generar confetti como elementos div
  function spawnConfetti(amount){
    const colors = ['#ff5c8a','#ffd166','#6fe7c1','#ff8fab','#8ec5ff'];
    for(let i=0;i<amount;i++){
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const size = Math.floor(Math.random()*12)+8;
      el.style.width = `${size}px`;
      el.style.height = `${Math.floor(size*1.2)}px`;
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.left = Math.random()*100 + '%';
      el.style.top = (Math.random()*10 - 10) + 'vh';
      el.style.transform = `rotate(${Math.random()*360}deg)`;
      el.style.animationDuration = `${1800 + Math.random()*1400}ms`;
      confettiRoot.appendChild(el);
      // auto remove
      setTimeout(()=>el.remove(), 4200);
    }
  }

  // Crear corazones flotantes dentro de la carta
  function spawnHearts(amount){
    const colors = ['#ff4d6d','#ff8fb3','#ff6b9a'];
    for(let i=0;i<amount;i++){
      const h = document.createElement('div');
      h.className = 'heart';
      h.style.left = (10 + Math.random()*80) + '%';
      h.style.top = (60 + Math.random()*30) + '%';
      h.style.fontSize = `${12 + Math.random()*26}px`;
      h.style.color = colors[Math.floor(Math.random()*colors.length)];
      h.textContent = '❤';
      heartsRoot.appendChild(h);
      setTimeout(()=>h.remove(), 3800 + Math.random()*1200);
    }
    // repetir unos segundos para mantener movimiento
    setTimeout(()=>spawnHearts(Math.max(6, Math.floor(amount/2))), 900);
  }
});
