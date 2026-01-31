import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

import { effect, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VerifyLoginService, VerifyLoginType } from '../model/verify-login.service';
import { FinancialDataService } from '../model/financial-data.service';

export type DataPointType = {
  x: Date;
  y: number;
};

type signalState = {
  verifyUserLogin: VerifyLoginType,
  ticker: string,
  timeSpanMonths: number,
  dataset: DataPointType[],
  chartObject: any;
}

const initialState = {
  verifyUserLogin: {
    isAuthenticated: false,
    username: '',
    message: '',
    token: -1,
    error: null
  },
  ticker: 'MSFT',
  timeSpanMonths: 1,
  dataset: [],
  chartObject: undefined,
} as signalState;

const dateMinusMonths = (date: Date, months: number): Date => {
    return new Date(date.getFullYear(), date.getMonth() - months, date.getDate());
  }

export const appSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((state, 
      loginService: VerifyLoginService = inject(VerifyLoginService),
      financialDataService = inject(FinancialDataService),
    ) => ({
    login: async (username: string, password: string) => {
      loginService.verifyPromise(username, password)
        .then(verifyString => {
          let vls = JSON.parse(verifyString) as VerifyLoginType
          patchState(state, { verifyUserLogin: vls})
        })
        .catch(error => {
          console.error(error)
          patchState(state, {verifyUserLogin: initialState.verifyUserLogin})
        })
    },
    
    datasetForTickerPromise: async () => {
      const endDate: Date = new Date()
      const iniDate: Date = new Date(endDate.getFullYear(), endDate.getMonth() - state.timeSpanMonths() , endDate.getDate())

      financialDataService.getDataSetPromise(state.ticker(), iniDate, endDate)
        .then((dataPoints: DataPointType[]) => {
          patchState(state, {dataset: dataPoints})
        })
        .catch((error) => {
          patchState(state, {dataset: []} )
          console.error('Error fetching data:', error);
        })
    },

  })),

  withMethods((state) => ({
    setChartObject: (chart: any) => {
      patchState(state, {chartObject: chart})
    },

    setTimeSpan: async (months: number) => {
      patchState(state, {timeSpanMonths: months})
      await state.datasetForTickerPromise()
    },

    setTicker: async (newTicker: string) => {
      patchState(state, {ticker: newTicker})
      await state.datasetForTickerPromise()
    },
  })),

  withHooks({
    onInit(store) {
      effect(() => {
        if (store.chartObject() !== undefined) {
          store.chartObject().options.data[0].dataPoints = store.dataset();
          store.chartObject().subtitles[0].remove();
          store.chartObject().render();
        }
      })
    },
  })

) 


