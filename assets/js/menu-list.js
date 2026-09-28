(function(){
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var chips = Array.prototype.slice.call(document.querySelectorAll('.cat-chip'));
  var sections = chips.map(function(chip){
    return document.getElementById(chip.dataset.target);
  });

  function setActive(id){
    chips.forEach(function(chip){
      var active = chip.dataset.target === id;
      chip.classList.toggle('is-active', active);
      if(active) chip.setAttribute('aria-current','true');
      else chip.removeAttribute('aria-current');
    });
  }

  // Scroll-spy: observa cada seção e atualiza o chip ativo + o hash da URL sem dar salto na página
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.id;
        setActive(id);
        if(history.replaceState){
          history.replaceState(null, '', '#' + id);
        }
      }
    });
  }, {
    root: null,
    rootMargin: '-45% 0px -50% 0px', // dispara quando a seção cruza a faixa central da viewport
    threshold: 0
  });

  sections.forEach(function(sec){ if(sec) observer.observe(sec); });

  // Clique no chip: scroll suave até a seção + feedback visual imediato
  chips.forEach(function(chip){
    chip.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.getElementById(chip.dataset.target);
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
        setActive(chip.dataset.target);
        history.pushState(null, '', '#' + chip.dataset.target);
      }
    });
  });

  // Ao carregar, respeita um hash já existente na URL
  if(location.hash){
    var initId = location.hash.replace('#','');
    var initTarget = document.getElementById(initId);
    if(initTarget){
      setActive(initId);
      window.addEventListener('load', function(){
        initTarget.scrollIntoView({behavior:'auto', block:'start'});
      });
    }
  } else {
    setActive('comecar');
  }
})();
