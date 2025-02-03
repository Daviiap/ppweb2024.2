import dotenv from "dotenv";

function main() {
  dotenv.config({
    path: "./.env",
  });
  console.log(process.env.MSG);
}

main();
