import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Crop } from "../entities/verify.entity";

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
      price: 500,
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
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";

    if (text == "") {
      // This is the first request. Note how we start the response with CON
      response = `CON What would you like to check
      1. My account
      2. My phone number`;
    } else if (text == "1") {
      // Business logic for first level response
      response = `CON Choose account information you want to view
      1. Account number`;
    } else if (text == "2") {
      // Business logic for first level response
      // This is a terminal request. Note how we start the response with END
      response = `END Your phone number is ${phoneNumber}`;
    } else if (text == "1*1") {
      // This is a second level response where the user selected 1 in the first instance
      const accountNumber = "ACC100101";
      // This is a terminal request. Note how we start the response with END
      response = `END Your account number is ${accountNumber}`;
    }

    // Send the response back to the API
    res.set("Content-Type: text/plain");
    res.send(response);
  };
}
