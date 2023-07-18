require('dotenv').config();

const privateKey = process.env.FLIP_SECRET;
const encodeKey  = btoa(privateKey + ':');
const date       = new Date();
const timestamp  = date.getFullYear() +
    '-' + (date.getMonth()+1) +
    '-' + date.getDate() +
    'T' + date.getHours() +
    ':' + date.getMinutes() +
    ':' + date.getSeconds() + date.getTimezoneOffset();
    
export const HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'idempotency-key': 'idem-key-2',
    'Authorization': `Basic ${encodeKey}`,
    'X-TIMESTAMP': `${timestamp}`
};