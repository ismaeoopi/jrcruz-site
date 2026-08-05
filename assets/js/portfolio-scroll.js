gsap.registerPlugin(ScrollTrigger);

(function () {
  "use strict";

  const portfolioSection = document.querySelector('.portfolio-scroll');
  if (!portfolioSection) return;

  const catItems = portfolioSection.querySelectorAll('.cat-item');
  const catPanels = portfolioSection.querySelectorAll('.cat-panel');
  const totalCategories = catItems.length;
  if (!totalCategories) return;

  function setActiveCategory(index) {
    catItems.forEach((item, i) => item.classList.toggle('is-active', i === index));
    catPanels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
  }

  setActiveCategory(0);

  ScrollTrigger.create({
    trigger: portfolioSection,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const index = Math.min(totalCategories - 1, Math.floor(self.progress * totalCategories));
      setActiveCategory(index);
    }
  });

  catItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      const sectionTop = portfolioSection.offsetTop;
      const sectionHeight = portfolioSection.offsetHeight - window.innerHeight;
      const targetScroll = sectionTop + (sectionHeight * (i / totalCategories)) + 10;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
