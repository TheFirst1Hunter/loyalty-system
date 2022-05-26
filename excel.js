const express = require('express');
const app = express();
const fs = require('fs');
const converter = require('json-2-csv');

const app = express();

app.use(express.json({ limit: '50mb' }));

app.post('/excel', async (req, res) => {
  const { data } = req.body;

  const csv = await converter.json2csvAsync(data);

  await fs.writeFileSync('data.csv', csv);

  res.status(200).json({ success: true });
});

app.listen(9000, () => console.log('excel service'));
