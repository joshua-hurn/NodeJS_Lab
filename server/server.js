const path = require('path');
const fs = require('fs');

let chirps = [{
        text: "hello world"
    },
    {
        text: "Hi Mom"
    },
    {
        text: "Hi Dad"
    },
    {
        text: "Hi Dad"
    },
    {
        text: "Hi Dad"
    }
]

let chirpsJSON = JSON.stringify(chirps)

fs.writeFile('chirps.json', chirpsJSON, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

fs.readFile('chirps.json', (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
  });
