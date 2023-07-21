require('dotenv').config();

const BASEURL = "https://bigflip.id/big_sandbox_api/v3";
export const DISBURSEMENT_BASEURL = BASEURL + "/disbursement";
export const DISBURSE_BASEURL = BASEURL + "/get-disbursement";
export const HASHED_SECRET_STRING = "thisissecretstring";

const privateKey = process.env.FLIP_SECRET;
const encodeKey  = btoa(privateKey + ':');
const date       = new Date();

var d = date.getDate();
var m = date.getMonth() + 1; //Month from 0 to 11
var y = date.getFullYear();

const timestamp  = y +
    '-' + (m<=9 ? '0' + m : m) +
    '-' + (d <= 9 ? '0' + d : d) +
    'T' + date.getHours() +
    ':' + date.getMinutes() +
    ':' + date.getSeconds() + date.getTimezoneOffset();
    
export const HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'idempotency-key': '',
    'Authorization': `Basic ${encodeKey}`,
    'X-TIMESTAMP': `${timestamp}`
};