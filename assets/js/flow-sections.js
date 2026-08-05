gsap.registerPlugin(ScrollTrigger);

// Mobile browsers toggle their address bar during scroll, which resizes the
// viewport and makes ScrollTrigger re-measure pinned sections mid-gesture —
// that's what was causing the reveal to lag behind and only show up after a
// section had already scrolled past. Pinning-heavy layouts should ignore that.
ScrollTrigger.config({ ignoreMobileResize: true });

const letterOffsets = [
  { x: -45, y: -30, rot: -120 }, { x: 60, y: 40, rot: 90 },
  { x: -30, y: 50, rot: 180 }, { x: 50, y: -45, rot: -60 },
  { x: -55, y: 20, rot: 150 }, { x: 35, y: -55, rot: -100 },
  { x: -20, y: -40, rot: 45 }, { x: 45, y: 35, rot: -150 },
  { x: -50, y: -20, rot: 75 }, { x: 25, y: 50, rot: -45 },
];

document.querySelectorAll('[data-word]').forEach(el => {
  const words = el.dataset.word.split(' ');
  let i = 0;
  el.innerHTML = words.map(word => {
    const lettersHtml = Array.from(word).map(ch => {
      const p = letterOffsets[i % letterOffsets.length];
      i++;
      return `<span class="letter" style="transform: translate(${p.x}vw, ${p.y}vh) rotate(${p.rot}deg); opacity: 0.15;">${ch}</span>`;
    }).join('');
    return `<span class="word">${lettersHtml}</span>`;
  }).join(' ');
});

const sections = gsap.utils.toArray('[data-flow-section]');
const mm = gsap.matchMedia();

sections.forEach((section, i) => {
  gsap.set(section, { zIndex: i + 1 });
  const inner = section.querySelector('.flow-art-container');
  const letters = section.querySelectorAll('.letter');

  // Small/touch viewports get a reveal window anticipated well ahead of the
  // section's "fully on screen" point: by the time its art container is
  // centered in the viewport, the word must already be 100% assembled —
  // not still settling in as the user scrolls past.
  mm.add(
    {
      isTouch: '(max-width: 880px), (hover: none) and (pointer: coarse)',
      isDesktop: '(min-width: 881px) and (hover: hover) and (pointer: fine)',
    },
    (context) => {
      const { isTouch } = context.conditions;

      if (i > 0) {
        gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: isTouch ? 'top center' : 'top 25%',
            scrub: isTouch ? 0.4 : true,
          },
        });
        tl.to(inner, { rotation: 0, ease: 'none' }, 0);
        tl.to(letters, { x: 0, y: 0, rotation: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 0);
      } else {
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: isTouch ? 'top bottom' : 'top 90%',
            end: isTouch ? 'top center' : 'top 20%',
            scrub: isTouch ? 0.4 : true,
          },
        }).to(letters, { x: 0, y: 0, rotation: 0, opacity: 1, stagger: 0.02, ease: 'none' });
      }
    }
  );

  if (i < sections.length - 1) {
    ScrollTrigger.create({ trigger: section, start: 'bottom bottom', end: 'bottom top', pin: true, pinSpacing: false });
  }
});

window.addEventListener('load', () => ScrollTrigger.refresh());
window.addEventListener('orientationchange', () => ScrollTrigger.refresh());
