const express = require("express");
const axios = require("axios");

const app = express();

app.get("/api/rates", async (req, res) => {
  try {
    const {base, currency} = req.query;
    
    const today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    const {data} = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`);
    
    res.status(200).json({
      results: {
        base,
        date: date,
        rates: {
          ...data.rates
        }
      }
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: "invalid input"
    })
  }
  
  
});

process.env.PORT = 8000;
app.listen(process.env.PORT, () => console.log("Now listening to port 8000"));