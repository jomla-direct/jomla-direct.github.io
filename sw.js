// جملة دايركت - استقبال الإشعارات حتى لو الموقع مقفول
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{}}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||'جملة دايركت',{
    body:d.body||'',icon:'/og.jpg',badge:'/og.jpg',dir:'rtl',lang:'ar',tag:d.tag||'jd',data:{url:d.url||'/'}
  }));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const u=(e.notification.data&&e.notification.data.url)||'/';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if(c.url.startsWith(self.location.origin)&&'focus' in c){c.navigate(u).catch(()=>{});return c.focus()}}
    return self.clients.openWindow(u);
  }));
});

// مطلوب لإمكانية تثبيت الموقع كتطبيق (من غير تخزين مؤقت)
self.addEventListener('fetch',()=>{});
