const express = require('express');
const twilio = require('twilio');

const app = express();

const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || 'YOUR_TWILIO_ACCOUNT_SID';
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID || 'YOUR_TWILIO_API_KEY_SID';
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET || 'YOUR_TWILIO_API_KEY_SECRET';

app.get('/token', (req, res) => {
  const identity = req.query.identity;

  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKeySID,
    twilioApiKeySecret,
    { identity: identity }
  );

  const videoGrant = new VideoGrant();
  token.addGrant(videoGrant);

  res.send({
    identity: identity,
    token: token.toJwt()
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
