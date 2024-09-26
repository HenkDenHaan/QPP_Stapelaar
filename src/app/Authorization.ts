import { EventEmitter, Injectable } from '@angular/core';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';

@Injectable({
   providedIn: 'root'
})

export class Authorization {
   resolve: Function;
   reject: Function;
   subscriber: Function;

   protected UserDataEventEmitter: EventEmitter<IMIResponse>;
   user: any;
   rol: any;
   isBusy: any;
   miExtendedService: any;

   constructor(private miService: MIService) {
      this.UserDataEventEmitter = new EventEmitter<IMIResponse>();
   }

   public getUserDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.UserDataEventEmitter;
   }

   loadAuthorizationData(user: String, rol: string) {
      const miRequest: IMIRequest = {
         program: "MNS410MI",
         transaction: "Lst",
         record: {
            USID: user,
            ROLL: rol,
         },
         maxReturnedRecords: 1,
         includeMetadata: true,

      };
      this.miService.execute(miRequest).subscribe(x =>
         this.UserDataEventEmitter.emit(x));

   }


}
