const CACHE_NAME = 'bj-bar-tweet-gen-v4';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// インストール時に一旦キャッシュ
self.addEventListener('install', (event) => {
  self.skipWaiting(); // すぐに新しいSWを有効化
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 最新版を優先する戦略（Network First）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
