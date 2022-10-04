import { Injectable } from "@nestjs/common";
import AfricasTalking from "africastalking";

const smsAfrica = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_APIKEY,
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
      1. Bei ya sokoni
      2. Angalia Pembejeo
      3. Pokea bei za masoko kila siku`;
    }
    if (text == "1") {
      response = `CON Chaguo zao
      1. Mahindi
      2. Karanga
      3. Njugu`;
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
    }

    if (text && text.includes("*")) {
      const numbers = text.split("*");
      if (Number(numbers[0]) === 1) {
        const number = numbers[numbers.length - 1];
        const price = this.crops.find(
          ({ id }) => Number(id) === Number(number)
        );
        response = `END Bei ya ${price.zao} kwa gunia ni ${price.price}`;
      } else {
        const number = numbers[numbers.length - 1];
        const price = this.crops.find(
          ({ code }) => Number(code) === Number(number)
        );
        if (price) {
          response = `END Pembejeo ni halali. 
          Bei ya ${price.zao} kwa gunia ni ${price.price}. 
          Mzalishaji ${price.manufacturer}
          Msambazaji ${price.supplier}`;
        } else {
          response = `END Pembejo sio halali(Feki)`;
        }
      }
    }

    if (response === "") {
      response = `END Ahsante kwa kutumia soko mkononi`;
    }

    res.set("Content-Type: text/plain");
    res.send(response);
  };
}
