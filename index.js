const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const HTML_FILE = path.join(__dirname, 'index.html');

app.use(express.json({limit:'20mb'}));

app.get('/api/load', (req,res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      res.json(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
    } else {
      res.json({});
    }
  } catch(e) { res.json({}); }
});

app.post('/api/save', (req,res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body), 'utf8');
    console.log('Saved', Object.keys(req.body.plan||{}).length, 'Artikel');
    res.json({ok:true});
  } catch(e) { res.status(500).json({error:e.message}); }
});

// Read HTML file once at startup - no template literal escaping issues
const HTML = fs.readFileSync(HTML_FILE, 'utf8');

app.use((req,res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(HTML);
});

app.listen(PORT, () => console.log('BW Planungstool running on port', PORT));
