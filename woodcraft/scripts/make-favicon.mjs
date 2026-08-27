import fs from "fs";
import sharp from "sharp";

const png64 = await sharp("public/images/logo.avif")
  .resize(128, 128, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp(png64).png().toFile("public/apple-touch-icon.png");
await sharp("public/images/logo.avif")
  .resize(32, 32, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile("public/favicon-32.png");

const b64 = png64.toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <image href="data:image/png;base64,${b64}" width="128" height="128" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;

fs.writeFileSync("public/favicon.svg", svg);
console.log("wrote favicon.svg", fs.statSync("public/favicon.svg").size);
