const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const rootroute = require("./routes/rootroutes");
const trekroute = require("./routes/treksroute");
const connectDB = require("./config/db");

const app = express(); // Create an instance of Express
const PORT = process.env.PORT || 8080; // Use port 8080 or fallback to 7000

connectDB();
app.use(express.json());

app.use("/", rootroute);
app.use("/api/treks", trekroute); // Assuming you want to use trekroute as well

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`.bgBlack.white);
// }
// );
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Database connected"))
//   .catch((err) => console.error("Database connection error:", err));

module.exports = app;