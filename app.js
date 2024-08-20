const express = require("express");
const app = express();

require("dotenv").config();

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
