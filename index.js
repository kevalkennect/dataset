import fs, { read } from "fs";
import * as crypto from "crypto";
import express from "express";
import cors from "cors";
import { Transform } from "stream";

const dataset1 = [];
const dataset2 = [];
const dataset3 = [];
const mainArr = [];
function createDataset1(egid, skus, date) {
  for (let i = 1; i <= egid; i++) {
    for (let j = 1; j <= skus; j++) {
      for (let k = 1; k <= date; k++) {
        const newDate = new Date(`${k}/1/22`).toLocaleDateString();
        let randomNumber = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
        for (let l = 1; l <= randomNumber; l++) {
          dataset1.push({
            egid: `emp_${i}`,
            skuid: j + 20,
            date: newDate,
            doctorId: l + 30,
            qty: Math.floor(Math.random() * (50 - 18 + 1)) + 18,
          });
        }
      }
    }
  }
  mainArr.push(dataset1);
}
function createDataSet2(products, skus, noOfMo) {
  for (let i = 1; i <= products; i++) {
    for (let j = 1; j <= skus; j++) {
      for (let m = 1; m <= noOfMo; m++) {
        const date = new Date(`1/${m}/22`).toLocaleDateString();
        dataset2.push({
          skuid: j + 20,
          product: `product_${i}`,
          date: date,
        });
      }
    }
  }
  mainArr.push(dataset2);
}

function createDateset3(egids, doctors, months) {
  for (let i = 1; i <= egids; i++) {
    for (let j = 1; j <= doctors; j++) {
      for (let m = 1; m <= months; m++) {
        dataset3.push({
          egid: `emp_${i}`,
          doctorId: j + 30,
          date: new Date(`1/${m}/22`).toLocaleDateString(),
        });
      }
    }
  }
  mainArr.push(dataset3);
}
createDataset1(3, 4, 4); // dateset 1
createDataSet2(2, 2, 3); //dataset2
createDateset3(3, 5, 3); //dataset3

// dataset 4 - hirarchy
// egid, bossId
// e1, e21
// e2, e21
// e3, e31
// e21, e101
// e31, e101
mainArr.forEach((el, i, arr) => {
  fs.writeFile(
    `dataset_${i + 1}.json`,
    JSON.stringify(el, null, 2),
    function (err) {
      if (err) throw err;
      console.log("complete");
    }
  );
});

const app = express();
const port = 3001;
app.use(cors());

app.get("/", (req, res) => {
  console.log(req.body);
  // The filename is simple the local directory and tacks on the requested url
  var filename = "./dataset_1.json";

  // This line opens the file as a readable stream
  var readStream = fs.createReadStream(filename);

  const key = "uOvNQtuuQSuGohRSnrBiSqKF3ekrwL2E";
  const iv = "bz9Zu4absXF4abk8";
  const cipher = crypto.createCipheriv("aes256", key, iv);

  const encrypted = new Transform({
    transform(chunk, encoding, callback) {
      const encryptedMessage =
        cipher.update(chunk, "utf8", "hex") + cipher.final("hex");
      this.push(encryptedMessage);
      callback();
    },
  });
  readStream.pipe(encrypted).pipe(res);

  readStream.on("error", function (err) {
    console.log(err);
    res.end(err);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
