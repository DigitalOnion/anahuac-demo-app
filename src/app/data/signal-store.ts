import { signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const verifyUserLoginSignal = signal(false);

export const tickerSignal = signal<string>('');

export const datasetSubject = new BehaviorSubject<DataPointType[]>([]);

export type DataPointType = {
  x: Date;
  y: number;
};

