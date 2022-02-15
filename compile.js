const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);//removes the preexisting folder to re-render the compiled data

const campaignPath = path.resolve(__dirname , 'dice_game.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1 ).contracts;

fs.ensureDirSync(buildPath);//checks if that folder exists or not and if it doesn't exists it is created

for(let contract in output){//this loop is for taking properties of an object
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]//1st argument gives the path where bytedata needs to be copied & 2nd parameter is holding that data
    );
}
//this file is using nodeJS