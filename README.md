# Homelab Inventory

INFR3120 Assignment 3: Secure CRUD Application

Homelab Inventory keeps track of the hardware in a home lab: servers, switches, storage, Raspberry Pis and more. You can add, view, edit and delete devices, and everything is saved in a MongoDB Atlas database.

**Live site:** [TBD]

- Splash (home) page
- Shared header (navbar) and footer on every page
- Public inventory page listing every device in the database
- Add, edit and delete devices (full CRUD)
- "Are you sure?" message before a device is deleted
- Database username and password kept in `.env`, which `.gitignore` keeps off GitHub

## How to run it

1. Run `npm install`
2. Create a file called `.env` in the main folder with your MongoDB Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/HomelabInventory
   ```
3. Run `npm start` and open http://localhost:3000


```
HomelabInventory/
├── config/
│   ├── app.js              Express setup, database connection, routes
│   └── db.js               reads the connection string from .env
├── models/
│   └── device.js           what a device looks like in MongoDB
├── public/
│   ├── Content/app.css     our own CSS (cyberpunk theme)
│   └── Script/app.js       delete confirmation
├── routes/
│   ├── index.js            home page
│   ├── users.js            created by express-generator
│   └── device.js           inventory pages: list, add, edit, delete
├── views/
│   ├── partials/
│   │   ├── header.ejs      top of every page: title, Bootstrap, Font Awesome, our CSS
│   │   ├── main_nav.ejs    navbar on every page
│   │   └── footer.ejs      footer on every page, loads the delete confirmation script
│   ├── Devices/
│   │   ├── list.ejs        inventory table with Edit and Delete buttons (Read)
│   │   ├── add.ejs         Add Device form (Create)
│   │   └── edit.ejs        Edit Device form (Update)
│   ├── index.ejs           splash page
│   └── error.ejs           error page
├── .gitignore              keeps node_modules and .env off GitHub
├── package.json             
├── package-lock
└── server.js               starts the server
```


## Styling

- **Bootstrap** (https://getbootstrap.com): layout, table, forms, buttons and dark mode (`data-bs-theme="dark"`)
- **Font Awesome Free** (https://fontawesome.com): icons
- **Our own CSS** (`public/Content/app.css`): the cyberpunk colour scheme (yellow, cyan, red, black and dark grey), the splash page banner, the title underline and the form width

## Code sources

This project follows the INFR3120 course material: the class WebProject (CRUD Part 1), the MEAN Stack and MongoDB slides, the Chapter 8 and 9 JavaScript slides and the Week 3 examples. Only two pieces of code come from outside the course, and both are marked `EXTRA CODE` in the comments:

| EXTRA CODE | File | Why it's needed | Source |
|---|---|---|---|
| `Device.deleteOne()` | `routes/device.js` | The slides delete with `remove()` (MongoDB slide 71), which newer Mongoose no longer has | Mongoose documentation, https://mongoosejs.com |
