const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Import bodyParser

const app = express();
const port = 3000;

const User = require("./model/company_data");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add the body parser middleware

mongoose.connect("mongodb+srv://SaifySheikh:Sharif4565@cluster0.xbgnrhv.mongodb.net/EMS", {})
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.error(e);
    console.log("Database Can't Be Connected");
  });

app.use(express.static("public"));
app.use(express.static("templates"));
app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/templates/admin.html");
});

app.get("/client", async (req, res) => {
  try {
    const data = await User.find();
    console.log("Fetched Data:", data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



app.post("/", async (req, res) => {
  const userData = new User(req.body);
  try {
    await userData.save();
    res.redirect("/client");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});




app.post("/add_company_data", async (req, res) => {
  const companyData = new User(req.body);
  try {
    await companyData.save();
    console.log("Company data saved:", companyData);
    res.redirect("/admin.html"); // or wherever you want to redirect after saving
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update route in index.js
app.put("/updateUser/:id", async (req, res) => {
  const userId = req.params.id;
  const newData = req.body;

  try {
    // Update user data in MongoDB
    const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });

    // Log the updated user data for verification
    console.log("Updated User:", updatedUser);

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});




app.listen(port, () => {
  console.log("App Running on port: ", port);
});
