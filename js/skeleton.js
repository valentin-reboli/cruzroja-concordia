/**
 * skeleton.js
 * Manages skeleton loading states for images and iframes.
 *
 * Strategy:
 *  - Elements that need a skeleton are marked with `is-loading` in the HTML.
 *  - When the underlying media fires its `load` event, we swap to `loaded`
 *    (CSS transitions handle the fade-out; after the transition we remove
 *    both classes so the DOM stays clean).
 */

(function () {
  'use strict';

  /**
   * Resolve the skeleton when media is ready.
   * @param {HTMLElement} container  - the .is-loading wrapper element
   * @param {HTMLElement} media      - the img or iframe inside it
   */
  function resolveOnLoad(container, media) {
    function resolve() {
      container.classList.add('loaded');
      // Remove both classes after the CSS transition ends (300 ms in CSS)
      container.addEventListener('transitionend', function cleanup() {
        container.classList.remove('is-loading', 'loaded');
        container.removeEventListener('transitionend', cleanup);
      });
    }

    // Image may already be cached and complete before JS runs
    if (media.tagName === 'IMG' && media.complete) {
      resolve();
    } else {
      media.addEventListener('load', resolve, { once: true });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Hero image
    var hero = document.querySelector('.hero');
    var heroImg = hero && hero.querySelector('.hero-media');
    if (hero && heroImg) resolveOnLoad(hero, heroImg);

    // 2. Volunteer photo
    var volunteerPhoto = document.querySelector('.volunteer-photo');
    var volunteerImg = volunteerPhoto && volunteerPhoto.querySelector('img');
    if (volunteerPhoto && volunteerImg) resolveOnLoad(volunteerPhoto, volunteerImg);

    // 3. Google Maps iframe
    var mapFrame = document.querySelector('.map-frame');
    var mapIframe = mapFrame && mapFrame.querySelector('iframe');
    if (mapFrame && mapIframe) resolveOnLoad(mapFrame, mapIframe);
  });
})();
