const fetch = require('node-fetch');
const axios = require('axios');
const dateFormat = require('dateformat');

class TriggerService {
  static async getSunriseTime() {
    var now = new Date();
    var tomorrow = new Date(now.setDate(now.getDate() + 1)); 
    var formattedTomorrow = dateFormat(tomorrow, "yyyy-mm-dd");

    try {
      const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=40.730610&lng=-73.935242&date=${formattedTomorrow}`);
      var sunriseTime = response.data.results.sunrise.split(":");
      
      // Extract hours and mins from sunrise
      var hours = Number(sunriseTime[0]) - 5
      var mins = sunriseTime[1]
      var timeTomorrowWithHoursMins = tomorrow.setHours(hours, mins);

      // Convert now to epoch time
      var nowEpoch = now.getTime();
      
      // Get ms between now and sunrise tomorrow
      var diffInMs = timeTomorrowWithHoursMins - nowEpoch;

      if (diffInMs < 0) {
        diffInMs += 86400000; // Make sure we're getting tomorrow's time
      }

      return diffInMs;
    } catch (err) {
        console.log(err)
    }

  }

  static callWebhookUrl = async (webhookUrl, data = {}) => {
    fetch(webhookUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.MONDAY_SIGNING_SECRET,
      },
      body: JSON.stringify({
        trigger: {
          outputFields: {
          },
        },
      }),
    });
    JSON.stringify(console.log(webhookUrl));
  };  

}

module.exports = TriggerService;
