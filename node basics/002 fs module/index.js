const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public');

const data = `<!DOCTYPE html>
    < html lang = "en" >
        <head>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1>hello world</h1>
                </body>
            </html>`;

            // create file
            fs.writeFileSync(`${filePath}/test.txt`, 'hello everyone');