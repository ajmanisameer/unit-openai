const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
app.use(cors());

//build in middleware to parse JSON objects
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use("/api/zoom", zoomRoutes);
const PORT = 5000;
const correctionsRoutes = require('./routes/correctionRoutes');
app.use('/api', correctionsRoutes);


// // OpenAI usage
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });



// app.post("/grammar", async(req, res) => {
//     try{
//         return res.status(200).json({
//             message: "Working"
//         })

//     } catch(error){
//     }
// })

// Global error handling
app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: "unknown error occured",
    status: 500,
    message: { err: "error has occured" },
  };
  const errObject = Object.assign({}, defaultErr, err);
  return res.status(errObject.status).json(errObject.message);
});

app.use((req, res, next) => {
  res.send("Welcome to Express");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = app;
