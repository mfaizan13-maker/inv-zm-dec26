(function () {
  var C = window.CARD;
  var walima = C.theme === 'walima';
  document.title = C.title;
  document.body.className = 'theme-' + C.theme;

  var html =
    '<div class="blur" style="background-image:url(' + C.image + ')"></div>' +
    '<div class="frame">' +
      '<div class="pic" style="background-image:url(' + C.image + ')"></div>' +
      '<div class="shade"></div>' +
      '<div class="hello"><div class="a">بسم الله الرحمن الرحیم</div><div class="b">' + C.intro + '</div></div>' +
      '<div class="scroller" id="scroller">' +
        '<section class="hero">' +
          '<div class="scrim t"></div><div class="scrim b"></div>' +
          '<div class="top">' +
            '<div class="bism rv">بسم الله الرحمن الرحیم</div>' +
            '<div class="event rv' + (C.event.length > 8 ? ' long' : '') + '">' + C.event + '</div>' +
          '</div>' +
          '<div class="bottom">' +
            '<div class="name rv">' + C.groom + '</div>' +
            '<div class="weds rv">' + (C.with || 'weds') + '</div>' +
            '<div class="name rv">' + C.bride + '</div>' +
            '<div class="date rv">' + C.date + '</div>' +
          '</div>' +
          '<div class="hint">Swipe up &#8964;</div>' +
        '</section>' +
        '<section class="details"><div class="card">' +
          (C.host ? '<div class="host">' + C.host + '</div>' + (C.hostTag ? '<div class="tag">' + C.hostTag + '</div>' : '') + '<div class="rule"></div>' : '') +
          '<div class="time">' + C.time + '</div>' +
          (C.timeAddr ? '<div class="addr">' + C.timeAddr + '</div>' : '') +
          '<div class="rule"></div>' +
          '<div class="venue">' + C.venue + '</div>' +
          '<div class="addr">' + C.address + '</div>' +
          (C.contacts ? '<div class="rule"></div><div class="contacts">' + C.contacts.map(function (c) {
            return '<a href="tel:' + c.tel.replace(/[^+\d]/g, '') + '">' + c.name + '<b>' + c.tel + '</b></a>';
          }).join('') + '</div>' : '') +
          '<a class="map" href="' + C.map + '" target="_blank" rel="noopener">View location</a>' +
          (C.credit ? '<a class="credit" href="' + C.credit.url + '" target="_blank" rel="noopener">' + C.credit.text + '</a>' : '') +
        '</div></section>' +
      '</div>' +
      '<div class="petals" id="petals"></div>' +
      '<button class="tap" id="tap">Tap to open</button>' +
    '</div>' +
    '<button class="mute" id="mute" aria-label="Music">♪</button>' +
    '<audio id="song" preload="auto" src="' + C.music + '"></audio>';

  var scene = document.createElement('main');
  scene.className = 'scene';
  scene.innerHTML = html;
  document.body.appendChild(scene);

  var song = document.getElementById('song');
  var mute = document.getElementById('mute');
  song.addEventListener('canplay', function () { mute.classList.add('show'); });
  mute.addEventListener('click', function () {
    if (song.paused) { song.play(); mute.style.opacity = 1; }
    else { song.pause(); mute.style.opacity = .5; }
  });
  song.addEventListener('ended', function () { song.currentTime = 0; song.play().catch(function () {}); });

  var cols = walima ? ['#b3293b', '#e9d3b0', '#d9a441'] : ['#f4b6bf', '#f9d3d8', '#fff1e6'];
  function petals() {
    var box = document.getElementById('petals');
    for (var i = 0; i < 24; i++) {
      var s = document.createElement('span');
      s.className = 'petal';
      s.style.left = (Math.random() * 100) + '%';
      s.style.background = cols[i % cols.length];
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.animationDuration = (7 + Math.random() * 6) + 's';
      s.style.animationDelay = (Math.random() * 8) + 's';
      box.appendChild(s);
    }
  }

  document.getElementById('tap').addEventListener('click', function () {
    scene.classList.add('open');
    song.play().catch(function () {});
    setTimeout(petals, 1500);
  });
})();
