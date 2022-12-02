const userServices = require("./models/user-services");
const mongoose = require("mongoose");
require("dotenv").config();

describe("Connection", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://" +
        process.env.MONGO_USER +
        ":" +
        process.env.MONGO_PWD +
        "@" +
        process.env.MONGO_CLUSTER +
        "/" +
        process.env.MONGO_DB +
        "?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  });

test("Testing DB Query -- all", async () => {
  let result = await userServices.getElements();
  
  console.log(result);
  expect(result[0].name).toBe("Hydrogen");
  expect(result[1].name).toBe("Carbon");
  expect(result[2].name).toBe("Oxygen");
  expect(result[3].name).toBe("Chlorine");
  expect(result[4].name).toBe("Nitrogen");
});

test("Testing DB Query -- Carbon", async () => {
  let result = await userServices.getElements("Carbon");

  expect(result[0].name).toBe("Carbon");
  expect(result[0].tile).toBe("square-carbon");
  expect(result[0].symbol).toBe("C");
  expect(result[0].atomicNum).toBe(6);
});

test("Testing DB Query -- Hydrogen", async () => {
  let result = await userServices.getElements("Hydrogen");

  expect(result[0].name).toBe("Hydrogen");
  expect(result[0].tile).toBe("square-hydrogen");
  expect(result[0].symbol).toBe("H");
  expect(result[0].atomicNum).toBe(1);
});

test("Testing DB Query -- Oxygen", async () => {
  let result = await userServices.getElements("Oxygen");

  expect(result[0].name).toBe("Oxygen");
  expect(result[0].tile).toBe("square-oxygen");
  expect(result[0].symbol).toBe("O");
  expect(result[0].atomicNum).toBe(8);
});

test("Testing DB Query -- Chlorine", async () => {
  let result = await userServices.getElements("Chlorine");

  expect(result[0].name).toBe("Chlorine");
  expect(result[0].tile).toBe("square-chlorine");
  expect(result[0].symbol).toBe("Cl");
  expect(result[0].atomicNum).toBe(17);
});

test("Testing DB Query -- Nitrogen", async () => {
  let result = await userServices.getElements("Nitrogen");

  expect(result[0].name).toBe("Nitrogen");
  expect(result[0].tile).toBe("square-nitrogen");
  expect(result[0].symbol).toBe("N");
  expect(result[0].atomicNum).toBe(7);
});

test("Testing DB Query -- no element exists", async () => {
  let result = await userServices.getElements("NotAnElement");

  expect(result).toStrictEqual([]);
});

afterAll(async () => {
  await userServices.disconnectDB();
});

});