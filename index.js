/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// use inquirer to get user input
inquirer
	.prompt([
		{
			type: "input",
			name: "url",
			message: "Enter a URL that you want to turn into a QR code:",
		},
	])
	.then((answers) => {
		// use qr-image to turn user-entered URL into a QR code
		const { url } = answers;

		let image = qr.image(url, { type: "png" });

		// use fs to save user input
		image.pipe(fs.createWriteStream("output/qr_img.png"));
	})
	.catch((error) => {
		console.error(error);
	});
