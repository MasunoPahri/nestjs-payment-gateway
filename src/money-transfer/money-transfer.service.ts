import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, firstValueFrom } from 'rxjs';
import { HEADERS } from 'src/common/constant';

@Injectable()
export class MoneyTransferService {
    constructor(private httpService: HttpService) {}

    async createDisburse() {
        const headers = HEADERS;
        const bodyReq = {
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
      const headers = HEADERS;
      
      endpoint = "https://bigflip.id/big_sandbox_api/v3/disbursement";
      if (!this.isEmpty(queryParam.pagination) ||
          !this.isEmpty(queryParam.page) ||
          !this.isEmpty(queryParam.sort)) {
          params   = '?pagination=' + queryParam.pagination + '&page=' + queryParam.page + '&sort=' + queryParam.sort;
          endpoint = "https://bigflip.id/big_sandbox_api/v3/disbursement" + params;
      }

      const { data } = await firstValueFrom(this.httpService
        .get(endpoint, {headers: headers})
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
}

