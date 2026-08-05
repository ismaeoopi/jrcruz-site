(function(){
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var STORAGE_KEY = 'jrcruz-theme';

  function applyTheme(theme){
    if(theme === 'light' || theme === 'dark'){
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function currentEffectiveTheme(){
    var attr = root.getAttribute('data-theme');
    if(attr) return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  try{
    var saved = localStorage.getItem(STORAGE_KEY);
    if(saved){ applyTheme(saved); }
  }catch(e){}

  if(toggle){
    toggle.addEventListener('click', function(){
      var next = currentEffectiveTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try{ localStorage.setItem(STORAGE_KEY, next); }catch(e){}
    });
  }
})();
