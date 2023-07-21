import { HttpService } from '@nestjs/axios';
import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { createHmac } from 'crypto';
import { map, catchError, firstValueFrom } from 'rxjs';
import { DISBURSEMENT_BASEURL, DISBURSE_BASEURL, HASHED_SECRET_STRING, HEADERS } from 'src/common/constant';
import { commonFunctions } from 'src/common/function';

@Injectable()
export class MoneyTransferService {
    constructor(
      private httpService: HttpService,
      private commonFunction: commonFunctions
    ) {}

    async createDisburse(body) {
        const bodyReq = {
            'account_number': body.account_number,
            'bank_code': body.bank_code,
            'amount': body.amount,
            'remark': body.remark,
            'recipient_city': body.recipient_city,
            'beneficiary_email': body.beneficiary_email,
        }

        // This string used for idempotency-key
        const hashedBody = createHmac('md5', HASHED_SECRET_STRING)
          .update(JSON.stringify(bodyReq))
          .digest('hex');

          console.log(HEADERS);
        // Overried idempotency-key value;
        HEADERS['idempotency-key'] = hashedBody;

        const { data } = await firstValueFrom(this.httpService
          .post('https://bigflip.id/big_sandbox_api/v3/disbursement', bodyReq, {headers: HEADERS})
          .pipe(
            map((res) => res),
          )
          .pipe(
            catchError((err) => {
              const errorMsg = err.response.data.errors[0].message;
              console.log(errorMsg);
              throw new ForbiddenException(err);
          }),
        ));
        
        return data;
    }

    async fetchDisburse(queryParam) {
      let endpoint: string = '';
      let params: string = '';
      
      endpoint = DISBURSEMENT_BASEURL;
      if (!this.commonFunction.isEmpty(queryParam.pagination) ||
          !this.commonFunction.isEmpty(queryParam.page) ||
          !this.commonFunction.isEmpty(queryParam.sort)) {
          params   = '?pagination=' + queryParam.pagination + '&page=' + queryParam.page + '&sort=' + queryParam.sort;
          endpoint = DISBURSEMENT_BASEURL + params;
      }

      const { data } = await firstValueFrom(this.httpService
        .get(endpoint, {headers: HEADERS})
        .pipe(
          map((res) => res),
        )
        .pipe(
          catchError((err) => {
            throw new ForbiddenException(err);
        }),
      ));
      
      return data;
    }

    async fetch(queryParam) {
      let params: string = ''; 
      let endpoint: string = DISBURSE_BASEURL;
      
      if (!this.commonFunction.isEmpty(queryParam.idempotencyKey)) {
          params   = '?idempotency-key=' + queryParam.idempotencyKey;
          endpoint = DISBURSE_BASEURL + params;
      }
      
      if (!this.commonFunction.isEmpty(queryParam.id)) {
          params   = '?id=' + queryParam.id;
          endpoint = DISBURSE_BASEURL + params;
      }

      const { data } = await firstValueFrom(this.httpService
        .get(endpoint, {headers: HEADERS})
        .pipe(
          map((res) => res),
        )
        .pipe(
          catchError((err) => {
            console.log(err);
            const rescode  = err.response.data.code;
            const errorMsg = err.response.data.errors[0].message;
            switch (rescode) {
              case "disbursement_id_not_found":
                throw new HttpException(errorMsg, 404);
                break;
            
              default:
                throw new ForbiddenException(err);
                break;
            }
        }),
      ));

      console.log(data)
      
      return data;
    }
}

