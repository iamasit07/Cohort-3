import { atom } from "recoil";

const counterAtom = atom({
    default: 0,
    key: "counter"
});


export default counterAtom;