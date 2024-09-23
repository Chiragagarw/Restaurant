const admin = require('./firebaseAdmin');

const message = {
  notification: {
    title: 'Hello, world!',
    body: 'This is a test notification from FCM.',
  },
  token: 'your-device-token', 
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });
