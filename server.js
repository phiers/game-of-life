const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
// redirect all https traffic to http (so openWeatherMap api will work)
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect(`http://${req.hostname}${req.url}`);
  } else {
    next(); // the next() function just processes the request
  }
});
// set app to use Public folders
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
  console.log(`The express server is running on port${PORT}`);
});
