import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '30s'
}

export default function () {
    http.get('https://www.yobingo.pt');
    sleep(1);
    http.get('https://www.yobingo.pt/help');
    sleep(2);
    http.get('https://www.yobingo.pt/promocoes-bingo');
    sleep(2);
}