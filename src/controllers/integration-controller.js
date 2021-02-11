const subscriptionModelService = require('../services/subscription-model-service');
const triggerService = require('../services/triggers-service');

async function initialize() {
  try {
    var sunrise = await triggerService.getSunriseTime(); 
    // Set sunrise for immediate testing
    // sunrise = 5000;
    setTimeout(async () => {
        try {
            await invokeActiveTriggers();
        } catch (error) {
            console.log(error);
        }
      }, sunrise);
  } catch (err) {
      console.log(err); 
  }
}

async function invokeActiveTriggers() {
    try {
        var activeSubscriptions = await subscriptionModelService.getActiveSubscriptions();
        let triggers = activeSubscriptions.map(async (subscription) => {
            const webhookUrl = subscription.dataValues.mondayWebhookUrl;
            console.log(webhookUrl); //webhookURL test
            triggerService.callWebhookUrl(webhookUrl);
        });
        return Promise.all(triggers);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    initialize,
    invokeActiveTriggers
  }