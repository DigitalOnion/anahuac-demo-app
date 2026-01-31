import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import {environment} from '../../environments/environment';

const MASIVE_HOST = 'api.massive.com';
const AUTHORIZATION = 'Bearer' 

export type DataPoint = {
    x: Date,
    y: number
  }

export type FinancialDataset = {
  isOk: boolean,
  dataset: DataPoint[],
  ticker: string,
  message: string,
}

@Injectable({
  providedIn: 'root',
})
export class FinancialDataService {
  private http = inject(HttpClient)

  
  async getDataSetPromise(ticker: string, initialDate: Date, endingDate: Date): Promise<FinancialDataset> {
    const apiKey = environment.apiKey;
    const iniDate = initialDate.toISOString().split('T')[0]       // like '2025-12-01'
    const endDate = endingDate.toISOString().split('T')[0]        // like '2025-12-31'
    const baseURL = 'https://api.massive.com';
    const endpoint = `/v2/aggs/ticker/${ticker}/range/1/day/${iniDate}/${endDate}?sort=asc&limit=365`
    const url = baseURL + endpoint;    
    const postRequestObservable = this.http.get<string>(
      url, 
      {headers: {"Host": MASIVE_HOST, "Authorization": `${AUTHORIZATION} ${apiKey}` }} 
    );
    return lastValueFrom(postRequestObservable)
    .then((response: any) => {
      const dataSet = response.results.map((item: any) => {
        return { x: new Date(item.t), y: item.c }
      }) 
      return {
        isOk: true,
        dataset: dataSet,
        ticker: ticker,
        message: "Success"
      }
    })
    .catch((error) => {
      throw error
    });
  }
}
