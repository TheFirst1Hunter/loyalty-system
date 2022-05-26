import converter from 'json-2-csv';
import fs from 'fs';

process.on('message', (data) => {
  convert(data);

  // send the results back to the parent process
});

function convert(data) {
  console.debug('started the conv');

  converter.json2csv(data, (err, csv) => {
    console.debug('writtung');
    fs.writeFile('data.csv', csv, () => {
      console.debug('file created');
      process.send(true);

      // kill the child process
      process.exit();
    });
  });
}
