import axios from "axios";

const instance = axios.create({
    baseURL: "https://whiteblue-ee5d5.firebaseio.com/"
})

export default instance;