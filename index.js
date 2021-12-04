const express = require('express');
const pa11y = require('pa11y');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/api/test', async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ success: false, error: 'url is required' });
  } else {
    const results = await pa11y(req.query.url);
    res.status(200).json({ success: false, results });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
