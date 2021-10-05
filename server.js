const express = require('express');
const app = express();
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const sequelize = require('./config/connection');
const routes = require('./controllers');

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`NOW LISTENING ON PORT ${PORT}`));
});