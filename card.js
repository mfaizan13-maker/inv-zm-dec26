(function () {
  var C = window.CARD;
  var walima = C.theme === 'walima';
  var env = !!C.envelope;
  document.title = C.title;
  document.body.className = 'theme-' + C.theme;

  function box(id, label) { return '<div class="cdb"><b id="' + id + '">00</b><span>' + label + '</span></div>'; }

  var starDiv = '<div class="divider"><svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
    '<rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.3" transform="rotate(45 12 12)"/>' +
    '<circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg></div>';
  var crescent = '<svg class="crescent" viewBox="0 0 48 48"><path d="M32 7A18 18 0 1 0 32 41A14 14 0 1 1 32 7Z" fill="currentColor"/>' +
    '<polygon fill="currentColor" points="35,17.5 36.7,22.3 41.8,22.4 37.7,25.4 39.2,30.2 35,27.3 30.8,30.2 32.3,25.4 28.2,22.4 33.3,22.3"/></svg>';
  function nm(n) { return n.length > 15 ? ' sm' : ''; }
  var I = C.inv;
  var invHtml = I
    ? '<section class="inv">' + crescent +
        '<div class="bism2">بسم الله الرحمن الرحیم</div>' +
        (I.blessing ? '<div class="blessing">' + I.blessing + '</div>' + starDiv : '') +
        '<div class="host">' + I.host + '</div>' +
        '<div class="tag">' + I.invite + '</div>' +
        (I.of ? '<div class="event2">' + C.event + '</div><div class="tag">' + I.of + '</div>' : '') +
        '<div class="name' + nm(C.groom) + '">' + C.groom + '</div>' +
        '<div class="weds">' + (C.with || 'weds') + '</div>' +
        '<div class="name' + nm(C.bride) + '">' + C.bride + '</div>' +
        (I.after ? '<div class="after">' + I.after + '</div>' : '') + starDiv +
        (I.ayah ? '<div class="ayah-ar">' + I.ayah.ar + '</div><div class="ayah-en">' + I.ayah.en + '</div><div class="ayah-ref">' + I.ayah.ref + '</div>' : '') +
      '</section>'
    : '';
  var duaHtml = C.dua
    ? '<div class="dua">' + starDiv + '<div class="ayah-ar">' + C.dua.ar + '</div><div class="ayah-en">' + C.dua.en + '</div></div>'
    : '';

  var envelope = env
    ? '<div class="curtain l"></div><div class="curtain r"></div><div class="rod"></div>' +
      '<div class="env" id="env">' +
        '<div class="env-top">' + (C.envTitle || '') + '</div>' +
        '<div class="envelope">' +
          '<div class="back"></div>' +
          '<div class="paper"><div class="p1">بسم الله الرحمن الرحیم</div><div class="p2">' + C.event + '</div></div>' +
          '<div class="pocket"></div>' +
          '<div class="flap"></div>' +
          '<button class="seal" id="seal" aria-label="Open invitation"><span>' + (C.monogram || '') + '</span></button>' +
        '</div>' +
        '<div class="env-hint">Tap the seal to open</div>' +
      '</div>'
    : '';

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
            '<div class="name rv' + nm(C.groom) + '">' + C.groom + '</div>' +
            '<div class="weds rv">' + (C.with || 'weds') + '</div>' +
            '<div class="name rv' + nm(C.bride) + '">' + C.bride + '</div>' +
            '<div class="date rv">' + C.date + '</div>' +
          '</div>' +
          '<div class="hint">Swipe up &#8964;</div>' +
        '</section>' +
        invHtml +
        '<section class="details"><div class="card">' +
          (C.host && !I ?'<div class="host">' + C.host + '</div>' + (C.hostTag ? '<div class="tag">' + C.hostTag + '</div>' : '') + '<div class="rule"></div>' : '') +
          (C.times
            ? C.times.map(function (t, i) {
                return (i ? '<div class="gap"></div>' : '') + '<div class="tag tl">' + t.label + '</div><div class="time">' + t.time + '</div>';
              }).join('')
            : (C.timeLabel ? '<div class="tag tl">' + C.timeLabel + '</div>' : '') + '<div class="time">' + C.time + '</div>') +
          (C.timeAddr ? '<div class="addr">' + C.timeAddr + '</div>' : '') +
          '<div class="rule"></div>' +
          '<div class="venue">' + C.venue + '</div>' +
          '<div class="addr">' + C.address + '</div>' +
          (C.contacts ? '<div class="rule"></div>' + (C.contactsTitle ? '<div class="rsvp">' + C.contactsTitle + '</div>' : '') + '<div class="contacts">' + C.contacts.map(function (c) {
            return '<a href="tel:' + c.tel.replace(/[^+\d]/g, '') + '">' + c.name + '<b>' + c.tel + '</b></a>';
          }).join('') + '</div>' : '') +
          (C.countdownTo ? '' : '<a class="map" href="' + C.map + '" target="_blank" rel="noopener">View location</a>') +
          (C.credit ? '<a class="credit" href="' + C.credit.url + '" target="_blank" rel="noopener">' + C.credit.text + '</a>' : '') +
        '</div>' +
        (C.countdownTo
          ? '<div class="cd"><div class="cd-t">The Celebration begins</div>' +
              '<div class="cd-row">' + box('cd-d', 'Days') + box('cd-h', 'Hours') + box('cd-m', 'Minutes') + box('cd-s', 'Seconds') + '</div>' +
              '<div class="cd-s2">Until the big day</div></div>' +
            '<div class="vn"><div class="cd-t">The Venue</div>' +
              '<iframe class="mapframe" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=' + encodeURIComponent(C.mapQuery || C.venue) + '&output=embed"></iframe>' +
              '<a class="map" href="' + C.map + '" target="_blank" rel="noopener">View location</a></div>'
          : '') +
        duaHtml +
        '</section>' +
      '</div>' +
      '<div class="petals" id="petals"></div>' +
      envelope +
      '<button class="tap" id="tap">Tap to open</button>' +
    '</div>' +
    '<button class="mute" id="mute" aria-label="Music">♪</button>' +
    '<audio id="song" preload="auto" src="' + C.music + '"></audio>';

  var scene = document.createElement('main');
  scene.className = 'scene' + (env ? ' has-env' : '');
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

  var cols = walima ? ['#b3293b', '#e9d3b0', '#d9a441']
    : C.theme === 'sunset' ? ['#c0394d', '#f6d6b8', '#e9a46a']
    : C.theme === 'champagne' ? ['#f6e7c8', '#e4c98e', '#ffffff']
    : ['#f4b6bf', '#f9d3d8', '#fff1e6'];
  function petals() {
    var b = document.getElementById('petals');
    for (var i = 0; i < 24; i++) {
      var s = document.createElement('span');
      s.className = 'petal';
      s.style.left = (Math.random() * 100) + '%';
      s.style.background = cols[i % cols.length];
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.animationDuration = (7 + Math.random() * 6) + 's';
      s.style.animationDelay = (Math.random() * 8) + 's';
      b.appendChild(s);
    }
  }

  if (C.countdownTo) {
    var target = new Date(C.countdownTo).getTime();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function () {
      var d = Math.max(0, target - Date.now());
      var set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = pad(v); };
      set('cd-d', Math.floor(d / 864e5));
      set('cd-h', Math.floor(d % 864e5 / 36e5));
      set('cd-m', Math.floor(d % 36e5 / 6e4));
      set('cd-s', Math.floor(d % 6e4 / 1e3));
    };
    tick();
    setInterval(tick, 1000);
  }

  function openCard() {
    scene.classList.add('open');
    setTimeout(petals, 1500);
  }

  if (env) {
    document.getElementById('seal').addEventListener('click', function () {
      scene.classList.add('env-open');
      song.play().catch(function () {});
      setTimeout(openCard, 3000);
    });
  } else {
    document.getElementById('tap').addEventListener('click', function () {
      song.play().catch(function () {});
      openCard();
    });
  }
})();
