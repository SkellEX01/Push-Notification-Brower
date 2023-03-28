self.addEventListener('push', async event => {
    const data = event.data.json();
    await self.registration.showNotification(data.title, {
        body: 'Administration board announced: ...',
    });
});