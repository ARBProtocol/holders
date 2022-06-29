import got from "got";


const getTokenOwners = (offset, size, token) =>
    got
        .get(
            `https://api.solscan.io/token/holders?token=${token}&offset=${offset}&size=${size}`
        )
        .json();

const ownersSet = new Set();
var size = 50;
var offset = 0;
const limit = 1000; // change this number to change the limit of owners you want to get
const token = "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE"; // change this for a different token ID
while (size <= limit) {
    const response = await getTokenOwners(offset, size, token);
    const obj = JSON.parse(JSON.stringify(response?.data.result));
    for (var x = 0; x < obj.length; x++) {
        if (!ownersSet.has(obj[x].owner)) {
            ownersSet.add(obj[x].owner);
            console.log(obj[x].owner);
        }
    }
    offset+=50;
    size+=50;
}
console.log(`Total owners: ${ownersSet.size}`);
