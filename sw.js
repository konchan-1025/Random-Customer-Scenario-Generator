// sw.js

const CACHE_NAME = 'utilization-generator-cache-v1.2'; // キャッシュ名を更新（変更内容に合わせてバージョンを上げる）
const urlsToCache = [
  './', // ルート (index.html を想定)
  './index.html',
  './beginner.html',
  './advanced.html',
  './css/style.css',
  './js/common.js',
  './js/beginner.js',
  './js/advanced.js',
  './manifest.json', // マニフェストファイルもキャッシュ
  // アイコンのパスも追加 (manifest.json で指定したもの)
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
  // 必要に応じて他のアイコンや画像ファイルもここに追加
];

// インストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Failed to open cache or add urls: ', err);
      })
  );
});

// リクエストへの応答 (キャッシュファースト戦略)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュがあればそれを返す
        if (response) {
          return response;
        }
        // キャッシュがなければネットワークから取得
        return fetch(event.request).then(
          (networkResponse) => {
            // ネットワークから取得できたら、それをキャッシュにも保存 (任意)
            // if (networkResponse && networkResponse.status === 200) {
            //   const responseToCache = networkResponse.clone();
            //   caches.open(CACHE_NAME)
            //     .then(cache => {
            //       cache.put(event.request, responseToCache);
            //     });
            // }
            return networkResponse;
          }
        ).catch(err => {
            console.error('Fetch failed; returning offline page instead.', err);
            // ここでオフライン用の代替ページを返すこともできる (今回は省略)
        });
      })
  );
});

// 古いキャッシュの削除 (アクティベート処理)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; // このバージョンのキャッシュ名のみを保持
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // ホワイトリストに含まれていないキャッシュは削除する
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
