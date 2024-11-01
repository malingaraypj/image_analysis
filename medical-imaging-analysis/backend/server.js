const app = require("./app");

app.listen(4000, (err) => {
  if (err) {
    console.log("error while connecting to server.");
    return;
  }
  console.log("server connected successfully");
});
