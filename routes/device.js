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
// router.post and req.body read the submitted form (MEAN Stack slides 88 and 90)
router.post('/add', async (req, res, next) => {
    try {
        // Build the device from the form, then save it (MongoDB slides: creating with save())
        let newDevice = new Device({
            name: req.body.name,
            category: req.body.category,
            brand: req.body.brand,
            ipAddress: req.body.ipAddress,
            location: req.body.location,
            status: req.body.status
        });
        await newDevice.save();

        // Send the user back to the inventory list (res.redirect, MEAN Stack slide 92)
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

/* Update Operation: show the Edit form, filled in with this device */
// req.params.id reads the device id from the address (MEAN Stack slide 90)
router.get('/edit/:id', async (req, res, next) => {
    try {
        // find() with an equality query on _id (MongoDB slide 57) returns a list,
        // so the device we want is the first item
        const result = await Device.find({ _id: req.params.id });
        const device = result[0];

        res.render('Devices/edit', {
            title: 'Edit Device',
            device: device
        });
    }
    catch (err) {
        console.log(err);
        res.redirect('/devices');
    }
});

/* Update Operation: save the changes */
router.post('/edit/:id', async (req, res, next) => {
    try {
        // Find the device, change its values, then save() it (MongoDB slide 66: updating with save())
        const result = await Device.find({ _id: req.params.id });
        let device = result[0];

        device.name = req.body.name;
        device.category = req.body.category;
        device.brand = req.body.brand;
        device.ipAddress = req.body.ipAddress;
        device.location = req.body.location;
        device.status = req.body.status;
        await device.save();

        res.redirect('/devices');
    }
    catch (err) {
        console.log(err);
        res.redirect('/devices');
    }
});

/* Delete Operation: remove one device */
// The Delete button links here; the browser asks "Are you sure?" first (public/Script/app.js)
router.get('/delete/:id', async (req, res, next) => {
    try {
        // EXTRA CODE: deleteOne removes the device with this _id.
        // The slides use remove() (MongoDB slide 71), which newer Mongoose no longer has;
        // deleteOne is its replacement. Source: Mongoose documentation (https://mongoosejs.com)
        await Device.deleteOne({ _id: req.params.id });
        res.redirect('/devices');
    }
    catch (err) {
        console.log(err);
        res.redirect('/devices');
    }
});
module.exports = router;