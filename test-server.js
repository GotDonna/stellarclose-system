const express = require('express');
const app = express();
const PORT = 3000;

console.log('🔍 Starting minimal server...');

app.get('/', (req, res) => {
    res.send('STELLARCLOSE TEST SERVER WORKING!');
});

console.log('🔍 About to start app.listen...');
app.listen(PORT, () => {
    console.log(`🚀 TEST SERVER running at http://localhost:${PORT}`);
});
