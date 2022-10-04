import { Injectable } from "@nestjs/common";
require("dotenv").config();
const AfricasTalking = require("africastalking")({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_APIKEY,
});

const sms = AfricasTalking.SMS;

@Injectable()
export class VerifyService {
  notify = [];
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
      code: "1235",
      supplier: "Justine",
      manufacturer: "IDD",
      price: `Tshs.${Math.floor(Math.random() * 10000)}/-`,
      zao: "Mahindi",
      id: "1",
    },
    {
      code: "1236",
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

  verify = (
    req: { body: { phoneNumber: any; text: any } },
    res: { set: (arg0: string) => void; send: (arg0: string) => void }
  ) => {
    const { phoneNumber, text } = req.body;
    console.log("PHONE", phoneNumber);
    console.log("TEXT", text);
    let response = "";

    if (text == "") {
      response = `CON Karibu Soko Mkononi
      1. Pata bei ya mazao sokoni
      2. Hakiki ubora wa mbegu au pembejeo
      3. Jiunge kupata bei ya soko kila siku
      4. Toa taarifa ya bidhaa au pembejo bandia/feki`;
    }
    if (text == "1") {
      response = `CON Weka jina la zao`;
    }
    if (text == "2") {
      response = `CON Ingiza namba ya pembejeo`;
    }
    if (text == "3") {
      response = `END Ahsante kwa kutumia soko mkononi. 
      Utapokea masoko kwenye number ${phoneNumber} kila siku`;
      this.sendToNumber({
        message: "Ahsante kwa kujiunga na huduma ya masoko mkonni",
        phone: phoneNumber,
      });
      this.notify = [...this.notify, phoneNumber];
    }

    if (text && text.includes("*")) {
      const numbers = text.split("*");
      response = this.checkRepeating(numbers);
    }

    if (response === "") {
      response = `END Ahsante kwa kutumia soko mkononi`;
    }

    res.set("Content-Type: text/plain");
    res.send(response);
  };

  checkRepeating = (numbers: any[]) => {
    let response = "";
    if (Number(numbers[0]) === 1) {
      const number = numbers[numbers.length - 1];
      const price = this.crops.find(({ id }) => Number(id) === Number(number));
      response = `END Bei ya ${price.zao} kwa gunia ni ${price.price}`;
    } else {
      const number = numbers[numbers.length - 1];
      const price = this.crops.find(({ zao }) =>
        zao.toLowerCase().includes(number)
      );
      if (price) {
        response = `END
        Pembejeo ni halali. 
        Bei ya ${price.zao} kwa gunia ni ${price.price}. 
        Mzalishaji: ${price.manufacturer}
        Msambazaji: ${price.supplier}`;
      } else {
        response = `END Pembejeo haijasajiliwa kwenye kanzi data yetu inaweza kuwa bandia/feki`;
      }
    }
    return response;
  };
}
