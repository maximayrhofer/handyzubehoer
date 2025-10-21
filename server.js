const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Öffentlichen Ordner bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// API-Route für Produkte
app.get('/api/products', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'data', 'products.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Lesen der Produktdaten.' });
    }
    res.json(JSON.parse(data));
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft unter http://localhost:${PORT}`);
});
