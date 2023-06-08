const path = require('path');

const express = require('express');
const app = express();

app.use('/', express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
