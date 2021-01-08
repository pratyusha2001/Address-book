const fs = require("fs");
const { exit } = require("process");
fs.readFileSync;
const readline = require("readline");
const { start } = require("repl");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let ob = { name: null, address: null }
var c = 0;

entries();
console.log("\nThere are " + c + " entries in the address book\n");  // displays number of entries at the beginning
begin();

function begin() {      // accepts user's choice
    console.log("\n(1)Add Address");
    console.log("(2)Delete Address");
    console.log("(3)View Address");
    console.log("(4)Exit \n");
    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case "1": add();
                break;
            case "2": del();
                break;
            case "3": view();
                break;
            case "4": stop();
                break;
            default: console.log("Enter your choice among 1,2 and 3: "); begin();
                break;
        }
    });
}

function add() {        // adds name and address to address book

    rl.question("\nEnter your name: ", (n) => {
        rl.question("Enter your address: ", (adrs) => {
            ob.name = n;
            ob.adress = adrs;
            let dataRead = fs.readFileSync("dir.json");
            let data = JSON.parse(dataRead);
            data.push(ob);
            let json_string = JSON.stringify(data);
            fs.writeFileSync("dir.json", json_string);
            console.log("\nName " + n + " and address " + adrs + " added \n")
            c++;
            console.log("\nThere are " + c + " entries in the address book now\n");  // displays number of entries after addition of address
            begin();
        });
    });
}
function del() {        // deletes name and address from address book
    let dataRead = fs.readFileSync("dir.json");
    let data = JSON.parse(dataRead);
    let array = [];
    rl.question("Enter the name whose address you want to delete: ", (delName) => {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name != delName)
                array.push(data[i]);
            else
                var delAdress = data[i].adress;
        }
        console.log("\nName " + delName + " and address " + delAdress + " deleted\n")
        let json_str = JSON.stringify(array);
        fs.writeFileSync("dir.json", json_str);
        c--;
        console.log("\nThere are " + c + " entries in the address book now\n");  // displays number of entries after deletion
        begin();
    })
}
function view() {       // displays name and address of address book
    let dataRead = fs.readFileSync("dir.json");
    console.log("");
    console.table(JSON.parse(dataRead.toString()))
    console.log("");
    begin();
}

function stop() {       // exits from the program
    rl.close();
}

function entries() {    // checks the number of entries in address book
    let dataRead = fs.readFileSync("dir.json");
    let data = JSON.parse(dataRead);
    for (var i = 0; i < data.length; i++)
        c++;
}