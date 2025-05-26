const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});