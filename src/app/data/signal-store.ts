import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'

import { effect, inject, signal } from '@angular/core';
import { VerifyLoginService, VerifyLoginType } from '../model/verify-login.service';
import { FinancialDataService, FinancialDataset } from '../model/financial-data.service';
import { HotToastService } from '@ngxpert/hot-toast';

const MESSAGE_429 = "Se excedió el número autorizado de solicitudes por minuto. Intentalo de nuevo en un minuto"
const FIN_SERVICE_ERROR = "Error al acceder el servicio financiero"

export type DataPointType = {
  x: Date;
  y: number;
};

type signalState = {
  verifyUserLogin: VerifyLoginType,
  ticker: string,
  timeSpanMonths: number,
  dataset: DataPointType[],
  status: string,
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
  ticker: '',
  timeSpanMonths: 1,
  dataset: [],
  status: 'ok',
  chartObject: undefined,
} as signalState;

export const appSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((state, 
      loginService: VerifyLoginService = inject(VerifyLoginService),
      financialDataService = inject(FinancialDataService),
      toast = inject(HotToastService),

    ) => ({
    login: async (username: string, password: string): Promise<VerifyLoginType> => {
      return loginService.verifyPromise(username, password)
        .then(verifyString => {
          let vls = JSON.parse(verifyString) as VerifyLoginType
          patchState(state, { verifyUserLogin: vls})
          return vls
        })
        .catch(error => {
          console.error(error)
          patchState(state, {verifyUserLogin: initialState.verifyUserLogin})
          return initialState.verifyUserLogin
        })
    },
    
    datasetForTickerPromise: async () => {
      const endDate: Date = new Date()
      const iniDate: Date = new Date(endDate.getFullYear(), endDate.getMonth() - state.timeSpanMonths() , endDate.getDate())

      financialDataService.getDataSetPromise(state.ticker(), iniDate, endDate)
        .then((finDataset: FinancialDataset) => {
          patchState(state, {dataset: finDataset.dataset, status: "ok"})
        })
        .catch((error) => {
          patchState(state, {dataset: [], status: "error"} )
          toast.error(error.status == 429 ? MESSAGE_429 : FIN_SERVICE_ERROR)
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
          store.chartObject()?.subtitles[0]?.remove();
          store.chartObject()?.render();
        }
      })
    },
  })

) 


