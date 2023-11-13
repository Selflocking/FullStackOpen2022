const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const dsn = `mongodb+srv://YunShu:${password}@cluster0.b82z40r.mongodb.net/fullstackopen2022?retryWrites=true&w=majority`;

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phone = mongoose.model("Phone", phoneSchema);

mongoose.connect(dsn).catch((err) => {
  console.log("Failed to connect to mongo db");
});

switch (process.argv.length) {
  case 3:
    {
      Phone.find({}).then((result) => {
        console.log("PhoneBook:");
        result.forEach((phone) => {
          console.log(phone.name, " ", phone.number);
        });
        mongoose.connection.close();
      });
    }
    break;
  case 5:
    {
      const phone = new Phone({
        name: process.argv[3],
        number: process.argv[4],
      });
      phone.save().then((result) => {
        console.log(
          `added ${result.name} number ${result.number} to phonebook`
        );
        mongoose.connection.close();
      });
    }
    break;
  default:
    {
      console.log("invaild arg");
    }
    break;
}
