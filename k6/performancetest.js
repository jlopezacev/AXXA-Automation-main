import http from "k6/http";
import { sleep } from "k6";

export const options = {
    vus: 200, // Users
    duration: '40s' // duracion de la prueba
}

export default function(){
    //http.get('https://test.k6.io'); 
    http.get('https://www.yobingo.pt'); //tipo de peticion y hacia que URL
    //sleep(1);
}