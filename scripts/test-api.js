const http = require('http');

http.get('http://localhost:3000/api/queue?salonId=salon-1', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('API Response:', data);
  });
}).on('error', (err) => {
  console.error('API Error:', err.message);
});
