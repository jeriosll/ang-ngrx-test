const productRoutes = require('./products')

const appRoutes = (app, fs) => {
    
    app.get('/api/', (req, res) => {
        res.send('Welcome to development Mock API server');
    })

    productRoutes(app, fs);
};

module.exports = appRoutes;