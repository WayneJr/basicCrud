module.exports = app => {
    app.get('/', (req, res) => {
        res.send('<h1>You have reached the root route</h1>');
    });
}
