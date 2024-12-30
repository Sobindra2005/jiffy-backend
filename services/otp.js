const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://xkmmz4.api.infobip.com/2fa/1/applications',
    headers: {
        'Authorization': 'App 33f59a636de2c4822c5b4f678e9e6fa5-a8d0e273-dc94-47a0-ad7a-81a606b349f7',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

const raw = JSON.stringify({
    "name": "2fa test application",
    "enabled": true,
    "configuration": {
        "pinAttempts": 10,
        "allowMultiplePinVerifications": true,
        "pinTimeToLive": "15m",
        "verifyPinLimit": "1/3s",
        "sendPinPerApplicationLimit": "100/1d",
        "sendPinPerPhoneNumberLimit": "10/1d"
    }
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

const applicationid = axios.request(options)
    .then(function (response) {
        console.log(response.data);
        const applicationId = response.data[0].applicationId;
        return applicationId;
        console.log('Application ID:', applicationId);
    })
    .catch(function (error) {
        console.error('Error retrieving application ID:', error);
    });
