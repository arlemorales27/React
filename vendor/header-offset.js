// Calcula y actualiza la variable CSS --header-offset para evitar que el header oculte secciones ancladas.
(function(){
  const update = () => {
    try{
      const header = document.querySelector('header');
      if(!header) return;
      // altura total del header (incluye padding, sombras) más un margen extra
      const height = Math.ceil(header.getBoundingClientRect().height) + 16;
      document.documentElement.style.setProperty('--header-offset', height + 'px');
    }catch(e){
      // silencioso
      console.warn('header-offset update error', e);
    }
  };

  let resizeTimer = null;
  window.addEventListener('load', () => { update();
    // si hay hash en la URL, desplazar suavemente al elemento teniendo en cuenta scroll-margin-top
    if(location.hash){
      const el = document.querySelector(location.hash);
      if(el) setTimeout(()=> el.scrollIntoView({behavior:'smooth', block:'start'}), 80);
    }
  });
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(update, 120);
  });
  // observar cambios en header (por ejemplo, contenido dinámico) y actualizar
  const header = document.querySelector('header');
  if(header && 'MutationObserver' in window){
    const mo = new MutationObserver(()=> update());
    mo.observe(header, {childList:true, subtree:true, attributes:true});
  }
})();

