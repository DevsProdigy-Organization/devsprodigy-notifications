import  { notification }  from './dist/devsprodigy-notifications.es.js';

document.getElementById('notifyBtn').addEventListener('click', () => {
    notification({ 
        title: 'Test Notification',
        message: 'Hello, this is a test notification!',
        type: 'success',
        duration: 5000,
    });
});