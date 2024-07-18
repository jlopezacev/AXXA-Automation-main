import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '30s',
            target: 10
        },
        {
            duration: '10s',
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