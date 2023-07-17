import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
// import moment from 'moment';
import { map, catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class MoneyTransferService {
    constructor(private httpService: HttpService) {}

    async transfer() {
        const privateKey = process.env.FLIP_SECRET;
        const encodeKey  = btoa(privateKey + ':');
        const date       = new Date();
        const timestamp  = date.getFullYear() +
            '-' + (date.getMonth()+1) +
            '-' + date.getDate() +
            'T' + date.getHours() +
            ':' + date.getMinutes() +
            ':' + date.getSeconds() + date.getTimezoneOffset();
            
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'idempotency-key': 'idem-key-1',
            'Authorization': `Basic ${encodeKey}`,
            'X-TIMESTAMP': `${timestamp}`
        };
        console.log(headers);

        const bodyReq  = {
            'account_number': '1122333300',
            'bank_code': 'bni',
            'amount': '10000',
            'remark': 'some remark',
            'recipient_city': '391',
            'beneficiary_email': 'test@mail.com,user@mail.com'
        }

        const { data } = await firstValueFrom(this.httpService
          .post('https://bigflip.id/big_sandbox_api/v3/disbursement', bodyReq, {headers: headers})
          .pipe(
            map((res) => res),
          )
          .pipe(
            catchError((err) => {
              console.log(err.response.data.errors);
              throw new ForbiddenException(err);
          }),
        ));
        
        return data;
    }
}

