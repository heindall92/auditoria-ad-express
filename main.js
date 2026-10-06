(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = document.querySelectorAll('.reveal');

  function revealAll(list) {
    list.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealAll(nodes);
    return;
  }

  function inViewport(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var vw = window.innerWidth || document.documentElement.clientWidth;
    return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '40px 0px 40px 0px', threshold: 0.01 }
  );

  nodes.forEach(function (el) {
    if (inViewport(el)) {
      el.classList.add('is-visible');
      return;
    }
    observer.observe(el);
  });

  // Safety net: never leave sections blank (screenshots, tall sections, IO edge cases)
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }, 800);
})();
