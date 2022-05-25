import converter from 'json-2-csv';
import fs from 'fs';

process.on('message', (data) => {
  convert(data);

  // send the results back to the parent process
});

async function convert(data) {
  converter.json2csv(data, (err, csv) => {
    fs.writeFileSync('data.csv', csv);

    process.send(true);

    // kill the child process
    process.exit();
  });

  return;
}
