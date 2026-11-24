let express = require('express');
let router = express.Router();

// Connect the router to the Device model (same as class)
let Device = require('../models/device');

/* Read Operation: show every device */
router.get('/', async (req, res, next) => {
    try {
        const DeviceList = await Device.find();
        res.render('Devices/list', {
            title: 'Inventory',
            DeviceList: DeviceList
        });
    }
    catch (err) {
        console.log(err);
        res.render('Devices/list', {
            title: 'Inventory',
            DeviceList: [],
            error: 'Error on Server'
        });
    }
});

/* Create Operation: show the empty Add Device form */
router.get('/add', (req, res, next) => {
    res.render('Devices/add', {
        title: 'Add Device'
    });
});

/* Create Operation: save the new device */
// EXTRA CODE: router.post and req.body read the submitted form.
// Source: Express documentation (https://expressjs.com)
router.post('/add', async (req, res, next) => {
    try {
        // Build the device from the form, then save it (new Model + save() is from the MongoDB slides)
        let newDevice = new Device({
            name: req.body.name,
            category: req.body.category,
            brand: req.body.brand,
            ipAddress: req.body.ipAddress,
            location: req.body.location,
            status: req.body.status
        });
        await newDevice.save();

        // EXTRA CODE: res.redirect sends the user back to the inventory list.
        // Source: Express documentation (https://expressjs.com)
        res.redirect('/devices');
    }
    catch (err) {
        console.log(err);
        res.render('Devices/list', {
            title: 'Inventory',
            DeviceList: [],
            error: 'Error on Server'
        });
    }
});
/* Update Operation */

/* Delete Operation */

module.exports = router;