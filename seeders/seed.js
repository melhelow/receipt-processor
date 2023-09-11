const db = require('../config/connection');
const { Receipts} = require('../models');
const {Points } = require('../models')
const receiptSeeds = require('./receiptSeed.json');
// const pointSeeds = require('./pointsSeed.json');

db.once('open', async () => {
  try {
    await Receipts.deleteMany({});
    await Receipts.create(receiptSeeds);
    // await Points.deleteMany({});
    // await Points.create(pointSeeds);

    console.log('all done!');
    process.exit(0);

  } catch (err) {
    throw err;
  }
});
