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

/* Create Operation */

/* Update Operation */

/* Delete Operation */

module.exports = router;