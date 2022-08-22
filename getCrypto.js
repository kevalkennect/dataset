import axios from "axios";
import * as crypto from "crypto";

const key = "uOvNQtuuQSuGohRSnrBiSqKF3ekrwL2E";
const iv = "bz9Zu4absXF4abk8";

const res = await axios.get("http://localhost:3001/", {
  responseType: "stream",
});

const stream = res.data;

const decipher = crypto.createDecipheriv("aes256", key, iv);
let counter = 0;
stream.on("data", (data) => {
  counter++;
  console.log(data.toString());
  const decryptedMessage =
    decipher.update(data.toString(), "hex", "utf-8") + decipher.final("utf8");
  const obj = decryptedMessage.toString("utf-8");
  console.log(obj,counter);
});

stream.on("end", () => {
  console.log("stream done");

});
