// Service worker حداقلی — فقط برای شرط «قابل‌نصب‌بودن» به‌عنوان PWA.
// این فایل کش آفلاین انجام نمی‌دهد؛ فقط درخواست‌ها را عادی از شبکه پاس می‌دهد.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
