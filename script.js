document.addEventListener('DOMContentLoaded', ()=> {
  const letterInner = document.getElementById('letterInner');
  const letterBox = document.getElementById('letterBox');
  const text = `💌 My Dearest Alee,

Happy Birthday, my dearest. On this special day, I can’t help but think about how grateful I am for your presence in my life. From the moment we first met on July 10, something quietly changed inside me. That small Titanic act we shared might have seemed simple then, but to me, it became one of the most beautiful and unforgettable moments of my life. It wasn’t just a scene — it was the beginning of a feeling I never expected to hold so deeply.

You have always carried a calm, gentle light with you, something that makes everything around you feel peaceful. Even when you go silent or drift away, your presence still stays with me. Sometimes when you avoid me, it hurts, not because I expect anything, but because I care more than I probably should. My friends often argue or tease me, saying I take things too seriously, but they don’t understand — you’re not just someone I like, you’re someone I truly value. You turned simple moments into lasting memories.

I know I’ve made mistakes, and I may have hurt you, but it was never my intention. For every moment that caused you pain, I am deeply sorry. Still, I believe that one day God will listen, Inshallah, and bring peace between us again. Because even when distance grows, my heart still believes in what’s true and pure.

There are so many things I wish I could write, but this paper has only so much space — and my heart holds far more than words could ever express. If feelings could speak, they would tell you how much I care, how much I wish you happiness, and how thankful I am that our paths once met.

No matter where life takes us, Alee, you will always have a special place in my heart — one that time can never replace.
         Carpediem 
             "Enjoy today, don’t waste time waiting for tomorrow.”
`;

  // typewriter effect (reveals line by line)
  const lines = text.split('\n\n');
  let out = '';
  let idx = 0;
  function showNextLine(){
    if(idx >= lines.length) {
      document.querySelector('.letter-inner').style.opacity = 1;
      return;
    }
    const line = lines[idx] + '\n\n';
    let i = 0;
    function step(){
      if(i <= line.length){
        letterInner.textContent = out + line.slice(0,i);
        i++;
        setTimeout(step, 18);
      } else {
        out += line;
        idx++;
        setTimeout(showNextLine, 300);
      }
    }
    step();
  }

  // start after intro animation
  setTimeout(()=>{
    showNextLine();
    // show full letter container visually
    const li = document.getElementById('letterInner');
    li.style.opacity = 1;
    li.style.transform = 'translateY(0)';
  }, 2200);

  // create petals dynamically
  const petals = document.getElementById('petals');
  for(let i=0;i<12;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = (Math.random()*95) + '%';
    p.style.top = (Math.random()*-20) + '%';
    p.style.animationDelay = (Math.random()*6) + 's';
    p.style.transform = 'rotate(' + (Math.random()*60 - 30) + 'deg)';
    p.style.opacity = 0.95;
    petals.appendChild(p);
  }

  // floating hearts
  const heartsParent = document.querySelector('.hearts');
  for(let i=0;i<6;i++){
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = (Math.random()*100) + '%';
    h.style.top = (Math.random()*60) + '%';
    h.style.position = 'absolute';
    h.style.width = (8 + Math.random()*18) + 'px';
    h.style.height = h.style.width;
    h.style.borderRadius = '50%';
    h.style.opacity = 0.85;
    heartsParent.appendChild(h);
  }

  // music handling
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  let playing = false;
  function setPlaying(v){
    playing = v;
    btn.textContent = playing ? 'Pause Music' : 'Play Music';
  }
  function tryPlay(){
    if(!audio) return;
    audio.volume = 0.22;
    audio.play().then(()=> setPlaying(true)).catch(()=> setPlaying(false));
  }
  btn.addEventListener('click', ()=>{
    if(!playing){
      audio.play().then(()=> setPlaying(true)).catch(()=> alert('Tap to allow audio.'));
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  // try autoplay after user gesture or timeout
  window.addEventListener('click', tryPlay, {once:true});
  setTimeout(tryPlay, 2000);
});
