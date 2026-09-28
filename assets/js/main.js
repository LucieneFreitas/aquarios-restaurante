/*=== Aquários Restaurante - main.js ================

1. mobileNavToggle ---(abre/fecha o menu mobile)
2. stickyHeader ------(header fixo ao rolar)
3. swiperJs ----------(banner do topo + carrossel "Espaço")
4. salActive ---------(animações de entrada com Sal.js)
5. backToTopInit -----(botão voltar ao topo com progresso)
6. preloader ---------(esconde o loader após carregar)

Dependências (ordem no HTML): jquery.min.js -> swiper.js -> sal.min.js -> main.js
==================================================*/

(function ($) {
  'use strict';

  var imJs = {
    m: function () {
      imJs.methods();
    },

    methods: function () {
      imJs.mobileNavToggle();
      imJs.stickyHeader();
      imJs.swiperJs();
      imJs.salActive();
      imJs.backToTopInit();
      imJs.preloader();
    },

    // 1. menu mobile (botão ☰)
    mobileNavToggle: function () {
      var $toggle = $('#mobileNavToggle');
      var $menu = $('#mobileNavMenu');

      $toggle.on('click', function () {
        var isOpen = $menu.toggleClass('is-open').hasClass('is-open');
        $toggle.attr('aria-expanded', isOpen ? 'true' : 'false');
      });

      $menu.find('a').on('click', function () {
        $menu.removeClass('is-open');
        $toggle.attr('aria-expanded', 'false');
      });
    },

    // 2. header fixo
    stickyHeader: function () {
      $(window).on('scroll', function () {
        $('.header--sticky').toggleClass('sticky', $(this).scrollTop() > 150);
      });
    },

    // 3. carrosséis
    swiperJs: function () {
      $(function () {
        // banner do topo (fade)
        new Swiper('.banner-swiper', {
          effect: 'fade',
          loop: true,
          pagination: {
            el: '.banner-swiper .swiper-pagination',
            clickable: true
          },
          autoplay: {
            delay: 7000
          }
        });

        // carrossel "Venha Conhecer Nosso Espaço"
        new Swiper('.case-three', {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: true,
          loop: true,
          autoplay: {
            delay: 3000
          },
          pagination: {
            el: '.case-three .swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.case-three .swiper-button-next',
            prevEl: '.case-three .swiper-button-prev'
          },
          breakpoints: {
            // Swiper 4: breakpoints são "até" (max-width)
            767: { slidesPerView: 1 },
            991: { slidesPerView: 2 }
          }
        });
      });
    },

    // 4. animações de entrada
    salActive: function () {
      if (typeof sal === 'function') {
        sal({ threshold: 0.1, once: true });
      }
    },

    // 5. voltar ao topo
    backToTopInit: function () {
      $(function () {
        var progressPath = document.querySelector('.progress-wrap path');
        if (!progressPath) return;

        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = 'stroke-dashoffset 10ms linear';

        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          progressPath.style.strokeDashoffset = pathLength - (scroll * pathLength / height);
          $('.progress-wrap').toggleClass('active-progress', scroll > 50);
        };

        updateProgress();
        $(window).on('scroll', updateProgress);

        $('.progress-wrap').on('click', function (event) {
          event.preventDefault();
          $('html, body').animate({ scrollTop: 0 }, 550);
        });
      });
    },

    // 6. preloader
    preloader: function () {
      var preload = document.querySelector('#dinenos-load');
      if (preload) {
        window.addEventListener('load', function () {
          preload.classList.add('loaded');
        });
      }
    }
  };

  imJs.m();
})(jQuery);
