const express = require('express');
const app = express();
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(require('express-session').Store);
app.use(require('express-session')({
    secret: process.env.SESSION,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
}));

const helpers = require('./utils/helpers');
app.engine('handlebars', require('express-handlebars').create({ helpers }).engine);
app.set('view engine', 'handlebars');
app.use(express.static(require('path').join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./controllers'));
sequelize.sync({ force: false }).then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`NOW LISTENING ON PORT ${PORT}`));
});