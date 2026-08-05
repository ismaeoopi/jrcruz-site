(function(){
  "use strict";

  var WA_NUMBER = "5511999999999";
  var WA_DEFAULT_MSG = "Olá! Encontrei o site da JR Cruz e gostaria de saber mais sobre os serviços de engenharia, arquitetura e design de interiores.";

  function waLink(msg){
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
  }

  document.querySelectorAll('[data-wa-msg]').forEach(function(el){
    el.setAttribute('href', waLink(el.getAttribute('data-wa-msg')));
  });

  ["headerWA","heroWA","contactWA","finalWA","footerWA"].forEach(function(id){
    var el = document.getElementById(id);
    if(el){ el.setAttribute('href', waLink(WA_DEFAULT_MSG)); }
  });
})();
