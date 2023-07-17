import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UserBalanceService {
    constructor(private httpService: HttpService) {}
  
    async getBalance() {
      const privateKey = process.env.FLIP_SECRET;
      const encodeKey  = btoa(privateKey + ':');
      const authHeader = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodeKey}`,
      };

      const { data } = await firstValueFrom(this.httpService
        .get('https://bigflip.id/big_sandbox_api/v2/general/balance', {headers: authHeader})
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
