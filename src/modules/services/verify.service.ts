import { Injectable } from "@nestjs/common";

const AfricasTalking = require("africastalking");

const smsAfrica = AfricasTalking({
  username: "bennett",
  apiKey: "5b6ab2184241f1a92befcbd6a1e10c499ac31d73d586def4beeb0958e317a37a",
});

const sms = smsAfrica.SMS;

@Injectable()
export class VerifyService {
  crops = [
    {
      code: "1234",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000)}/-`,
      zao: "Karanga",
      id: "2",
    },
    {
      code: "1234",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000)}/-`,
      zao: "Mahindi",
      id: "1",
    },
    {
      code: "1234",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000)}/-`,
      zao: "Njugu",
      id: "3",
    },
  ];

  verifyCrops = async (id: string) => {
    try {
      const crops = this.crops.find(({ code }) => code === id);
      if (crops) {
        await this.sendToNumber({
          message: JSON.stringify(crops),
          phone: "+255656238890",
        });
      } else {
        await this.sendToNumber({
          message: "Pembejeo au mazao sio halali",
          phone: "+255656238890",
        });
      }
    } catch (e) {
      await this.sendToNumber({
        message: "Pembejeo au mazao sio halali",
        phone: "+255656238890",
      });
    }
  };
  sendToNumber = async ({ message, phone }) => {
    try {
      const result = await sms.send({
        to: [phone],
        message,
      });
      console.log(JSON.stringify(result));
    } catch (ex) {
      console.error(ex);
    }
  };

  verify = (req, res) => {
    const { phoneNumber, text } = req.body;
    console.log("PHONE", phoneNumber);
    console.log("TEXT", text);
    let response = "";

    if (text == "") {
      // This is the first request. Note how we start the response with CON
      response = `CON Karibu Soko Mkononi
      1. Bei ya sokoni
      2. Angalia Pembejeo`;
    }
    if (text == "1") {
      // Business logic for first level response
      response = `CON Chaguo zao
      1. Mahindi
      2. Karanga
      3. Njugu`;
    }
    if (text == "2") {
      response = `CON Ingiza namba ya pembejeo`;
    }

    if (text.includes("*")) {
      const numbers = text.split("*");
      const number = numbers[numbers.length - 1];
      const price = this.crops.find(({ id }) => Number(id) === Number(number));
      response = `CON Bei ya ${price.zao} ni ${price.price}`;
    }

    if (response === "") {
      response = `END Ahsante kwa kutumia soko mkononi`;
    }

    // Send the response back to the API
    res.set("Content-Type: text/plain");
    res.send(response);
  };
}
