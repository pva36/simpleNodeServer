const express = require("express");
const app = express();

app.use(express.static("./public"));

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
