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

		// use fs to save QR code as png file
		image.pipe(fs.createWriteStream("output/qr_img.png"));

		// use fs to save user input as txt file
		fs.writeFile("output/URL.txt", url, (err) => {
			if (err) throw err;
		});
	})
	.catch((error) => {
		console.error(error);
	});
