import axios from "axios";
import * as crypto from "crypto";

const key = "uOvNQtuuQSuGohRSnrBiSqKF3ekrwL2E";
const iv = "bz9Zu4absXF4abk8";

axios.get("http://localhost:3001/").then((res) => {
  console.log(res.data);

  // console.log(key, iv, encryptedMessage);
  const decipher = crypto.createDecipheriv("aes256", key, iv);
  const decryptedMessage =
    decipher.update(res.data, "hex", "utf-8") + decipher.final("utf8");
  const obj = decryptedMessage.toString("utf-8");
  console.log(obj);
});
