import { computed, inject, signal } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, signalMethod, patchState } from '@ngrx/signals';
import { produce } from 'immer';
import { HotToastService } from '@ngxpert/hot-toast';


export const verifyUserLoginSignal = signal(false);

// const initialState = {
//     user: "",   
//     isLoggedIn: false,
// }

// export const demoSignalStore = signalStore(

//   { providedIn: 'root' },           // provided at the root level

//   withState( initialState ),        // signalStore creates signals for each property in initialState
 
// //   withMethods ((store) => ({   
// //             updateIsLoggedIn: signalMethod( async (isLoggedIn: boolean) => {
// //             patchState(store, {
// //                 isLoggedIn: isLoggedIn
// //                 });  
// //             })
// //         })    
// //     )
// )


