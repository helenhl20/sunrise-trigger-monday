const subscriptionModelService = require('../services/subscription-model-service');

async function subscribe(req, res) {
  const { webhookUrl, subscriptionId } = req.body.payload;
  console.log(`A new subscription was added. The webhook URL is: ${webhookUrl}`);

  try {
    await subscriptionModelService.createSubscription(webhookUrl, subscriptionId);
    return res.status(200).send({webhookId: subscriptionId});
  }
  catch(err) {
    console.log(err);
  }
}

async function unsubscribe(req, res) {
  const { webhookId } = req.body.payload;

  try {
    await subscriptionModelService.removeSubscription(webhookId);
    return res.status(200).send({result: 'Unsubscribed successfully.'});
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = {
  subscribe,
  unsubscribe
}
