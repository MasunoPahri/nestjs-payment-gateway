import { HttpService } from '@nestjs/axios';
import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { map, catchError, firstValueFrom } from 'rxjs';
import { DISBURSEMENT_BASEURL, DISBURSE_BASEURL, HEADERS } from 'src/common/constant';

@Injectable()
export class MoneyTransferService {
    constructor(
      private httpService: HttpService
    ) {}

    async createDisburse() {
        const bodyReq = {
            'account_number': '1122333300',
            'bank_code': 'bni',
            'amount': '10000',
            'remark': 'some remark',
            'recipient_city': '391',
            'beneficiary_email': 'test@mail.com,user@mail.com'
        }

        const { data } = await firstValueFrom(this.httpService
          .post('https://bigflip.id/big_sandbox_api/v3/disbursement', bodyReq, {headers: HEADERS})
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

    private isEmpty(str): boolean {
      return (!str || str.length === 0 );
    }

    async fetchDisburse(queryParam) {
      let endpoint: string = '';
      let params: string = '';
      
      endpoint = DISBURSEMENT_BASEURL;
      if (!this.isEmpty(queryParam.pagination) ||
          !this.isEmpty(queryParam.page) ||
          !this.isEmpty(queryParam.sort)) {
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
      
      if (!this.isEmpty(queryParam.idempotencyKey)) {
          params   = '?idempotency-key=' + queryParam.idempotencyKey;
          endpoint = DISBURSE_BASEURL + params;
      }
      
      if (!this.isEmpty(queryParam.id)) {
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

