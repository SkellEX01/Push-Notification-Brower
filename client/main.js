const triggerPush = document.querySelector('.trigger-push')
triggerPush.addEventListener('click', () => triggerPushNotification().catch(err => console.log(err)))

const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;

const triggerPushNotification = async () => {
    if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('/sw.js', { scope: '/' })
        console.log('waiting for acceptance')
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        })
        console.log('acceptance complete')
        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } else {
       console.log('Service workers are not supported in this browser')
    }
}