import web3 from "../Contract-Ethereum/web3";
import contract from "../Contract-Ethereum/build/Dice_Game.json";

const instance = new web3.eth.Contract(
        JSON.parse(contract.interface),
        "0x7dCC7B4a348D1dF75f48e44bBAB5DCE96c125CDb"
    );

    export default instance;