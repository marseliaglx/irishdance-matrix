// Cache only public site files for offline navigation. No visitor data is sent.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => reg.update()).catch(() => {});
  });
}
