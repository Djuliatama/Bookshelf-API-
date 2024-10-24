
const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use('/', routes); 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

