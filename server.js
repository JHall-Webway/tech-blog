const express = require('express');
const app = express();
const sequelize = require('./config/connection');
const routes = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`NOW LISTENING ON PORT ${PORT}`));
});