/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import * as fs from "node:fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Enter URL:\n",
    },
  ])
  .then((answers) => {
    qr.image(answers.url).pipe(fs.createWriteStream(`${answers.url}.png`));
    console.log("QR code image created successfully.");
    fs.writeFile("user-input.txt", answers.url, (err) => {
      if (err) throw err;
    });
  })
  .catch((error) => {
    console.error("Error", error);
  });
