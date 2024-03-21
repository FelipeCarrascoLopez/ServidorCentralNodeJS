const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    const jsonData = JSON.parse(data);
    saveDataToFile(jsonData);
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    // Leer el archivo data.json y enviarlo en la respuesta
    fs.readFile('data.json', (err, fileData) => {
      if (err) {
        console.error('Error reading file:', err);
        res.end(JSON.stringify({ error: 'Error reading file' }));
        return;
      }
      res.end(fileData);
    });
  });
});

function saveDataToFile(data) {
  const fileName = 'data.json';
  fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error('Error saving data to file:', err);
      return;
    }
    console.log('Data saved to file:', fileName);
  });
}

const PORT = 3005;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
