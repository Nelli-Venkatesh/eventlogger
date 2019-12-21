"use strict";

let path = require("path");
let fs = require("fs");
const fse = require("fs-extra");

module.exports.log = async function(foldername, data) {
  try {
    let today = new Date();
    let filepath =
      today.getDate().toString() +
      today.getMonth().toString() +
      today.getFullYear().toString();

    let filename = filepath + today.getHours().toString() + ".txt";
    let logPath = path.join(__dirname, "..", "logs", foldername, filepath);

    let finalfilepath = logPath + "\\" + filename;

    fs.mkdir(logPath, { recursive: true }, err => {
      if (err) console.log(err);
      return;
    });

    await fs.open(finalfilepath, "r", function(err, fd) {
      if (err) {
        console.log("Final file path", finalfilepath);

        fse.outputFile(finalfilepath, JSON.stringify(data) + "\n")
          .then(() => {
            console.log("log saved successfully !!!",data);
            return;
          })
          .catch(err => {
            console.error(err);
            return;
          });


      } else {
        let logger = fs.createWriteStream(finalfilepath, {
          flags: "a" // 'a' means appending (old data will be preserved)
        });
        logger.write(JSON.stringify(data));
        logger.write("\n");
        console.log("log saved successfully !!!", data);
        return;
      }
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
