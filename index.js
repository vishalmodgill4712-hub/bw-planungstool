const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const HTML_FILE = path.join(__dirname, 'index.html');

const GH_TOKEN = process.env.GITHUB_TOKEN;
const GH_REPO = process.env.GITHUB_REPO || 'vishalmodgill4712-hub/bw-planungstool';
const GH_FILE = 'data.json';
const GH_API = 'https://api.github.com/repos/' + GH_REPO + '/contents/' + GH_FILE;

let cachedData = null;
let cachedSha = null;

app.use(express.json({limit:'20mb'}));

app.get('/api/load', async (req, res) => {
  if (cachedData) return res.json(cachedData);
  if (GH_TOKEN) {
    try {
      const r = await fetch(GH_API, {headers:{'Authorization':'token '+GH_TOKEN,'Accept':'application/vnd.github.v3+json'}});
      if (r.ok) {
        const file = await r.json();
        cachedData = JSON.parse(Buffer.from(file.content,'base64').toString('utf8'));
        cachedSha = file.sha;
        console.log('Loaded from GitHub:', Object.keys(cachedData.plan||{}).length, 'Artikel');
        return res.json(cachedData);
      }
    } catch(e) { console.error('GitHub load:', e.message); }
  }
  try { if(fs.existsSync('data.json')){cachedData=JSON.parse(fs.readFileSync('data.json','utf8'));return res.json(cachedData);} } catch(e){}
  res.json({});
});

app.post('/api/save', async (req, res) => {
  cachedData = req.body;
  try { fs.writeFileSync('data.json',JSON.stringify(req.body),'utf8'); } catch(e){}
  if (GH_TOKEN) {
    try {
      const content = Buffer.from(JSON.stringify(req.body,null,2)).toString('base64');
      const body = {message:'Gespeichert '+new Date().toLocaleString('de-DE'),content:content};
      if (cachedSha) body.sha = cachedSha;
      const r = await fetch(GH_API, {method:'PUT',headers:{'Authorization':'token '+GH_TOKEN,'Content-Type':'application/json','Accept':'application/vnd.github.v3+json'},body:JSON.stringify(body)});
      if (r.ok) {
        const result = await r.json();
        cachedSha = result.content.sha;
        console.log('Saved to GitHub');
        return res.json({ok:true,permanent:true});
      }
      const err = await r.json();
      if (err.message && err.message.includes('does not match')) {
        const r2 = await fetch(GH_API, {headers:{'Authorization':'token '+GH_TOKEN,'Accept':'application/vnd.github.v3+json'}});
        if (r2.ok) { const f2=await r2.json(); cachedSha=f2.sha; body.sha=cachedSha;
          const r3 = await fetch(GH_API, {method:'PUT',headers:{'Authorization':'token '+GH_TOKEN,'Content-Type':'application/json','Accept':'application/vnd.github.v3+json'},body:JSON.stringify(body)});
          if (r3.ok) { cachedSha=(await r3.json()).content.sha; console.log('Saved to GitHub (retry)'); return res.json({ok:true,permanent:true}); }
        }
      }
      console.error('GitHub save failed:', err.message);
    } catch(e) { console.error('GitHub save error:', e.message); }
  }
  res.json({ok:true,permanent:false});
});

const HTML = fs.readFileSync(HTML_FILE, 'utf8');
app.use((req, res) => { res.setHeader('Content-Type','text/html; charset=utf-8'); res.send(HTML); });

app.listen(PORT, async () => {
  console.log('BW Planungstool on port', PORT);
  console.log('GITHUB_TOKEN:', GH_TOKEN ? 'SET' : 'NOT SET');
  if (GH_TOKEN) {
    try {
      const r = await fetch(GH_API, {headers:{'Authorization':'token '+GH_TOKEN,'Accept':'application/vnd.github.v3+json'}});
      if (r.ok) { const f=await r.json(); cachedData=JSON.parse(Buffer.from(f.content,'base64').toString('utf8')); cachedSha=f.sha; console.log('Pre-loaded:', Object.keys(cachedData.plan||{}).length, 'Artikel'); }
      else { console.log('No saved data yet (status:',r.status,')'); }
    } catch(e) { console.error('Pre-load failed:', e.message); }
  }
});
