const productRouter = (app, fs) => {

    const dataPath = './data/products.json';

    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        })
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, err => {
            if (err) {
                throw err;
            }
            callback();
        });
    };

    const flattenObjectToArray = data => {
        let flatten = [];
        for(let id of Object.keys(data)) {
            flatten.push(data[id]);
        }
        return flatten;
    };

    // get all products
    app.get('/api/products', (req, res) => {
        readFile(data => {
            res.send(flattenObjectToArray(data));
        }, true);
    });

    // create a new product
    app.post('/api/products', (req, res) => {
        readFile(data => {
            const newProductId = req.body['id'];
            data[newProductId] = req.body;
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send({status: 'New Product Added.'});
            })
        }, true);
    });

    // update a product
    app.put('/api/products/:id', (req, res) => {
        readFile(data => {
            const productId = req.params['id'];
            data[productId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send({status:`Product id: ${productId} updated`});
            });
        }, true);
    });

    // delete a product
    app.delete('/api/products/:id', (req, res) => {
        readFile(data => {
            const productId = req.params['id'];
            delete data[productId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send({status:`Product id: ${productId} removed`});
            })
        }, true);
    });
};



module.exports = productRouter;