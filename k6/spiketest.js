import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        {
            duration: '2m',
            target: 1000
        },

        {
            duration: '1m',
            target: 0
        }
    ]    
}

export default function () {
    http.get('https://www.yobingo.pt');
    sleep(1);
    http.get('https://www.yobingo.pt/help');
    sleep(2);
    http.get('https://www.yobingo.pt/promocoes-bingo');
    sleep(2);
}