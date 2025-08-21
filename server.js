//Bootstrap / Entry Point
require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/connections');
const PORT = process.env.PORT || 3000;

// Connect to MongoDB database and start server
connectDB().then(() => {
    app.listen(PORT, () =>
        console.log(`Server is listening on ${PORT} ....🚀`)
    );
});
