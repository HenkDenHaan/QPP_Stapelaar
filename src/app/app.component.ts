import { Component, OnInit } from '@angular/core';
import { CoreBase, IUserContext, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService, ApplicationService } from '@infor-up/m3-odin-angular';
import { SohoModalDialogService } from 'ids-enterprise-ng';
import { ItemService } from './item.service';
import { Authorization } from './Authorization';


@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent extends CoreBase implements OnInit {
   Machine: any = '';
   MTNOStockLocation: string;
   public MachineLeft: any;
   public MachineRight: any;
   userContext = {} as IUserContext;
   isBusy = true;
   user: string;
   MNS410UserRole: String;
   MNS410UserID: String;
   messageModal3: import("ids-enterprise-ng").SohoModalDialogRef<unknown>;
   KB: boolean = false;//Kronenburg
   QPP: boolean = false;
   QS: boolean = false; // Quiks Specialties


   constructor(private miService: MIService, private userService: UserService, public itemService: ItemService, private formService: ApplicationService, private sohoModalService: SohoModalDialogService, public Authorization: Authorization) {
      super('AppComponent');

      this.userService.getUserContext().subscribe((userContext: IUserContext) => {
         this.userContext = userContext;
         this.user = userContext.m3User;
         this.Authorization.loadAuthorizationData(this.user, 'SDK011');
         this.Authorization.loadAuthorizationData(this.user, 'SYS-ALL');
         this.Authorization.getUserDataEventEmitter().subscribe(
            async x => {
               console.log(x);
               const records: MIRecord[] = [];
               x.items.forEach(item => {
                  records.push(item);
               });


               this.MNS410UserID = x.items[0].USID;

               if (this.user === "KRONENBURG") {
                  this.KB = true
               } else {
                  if (this.user === "PRD215" || this.user === "PRD216" || this.user === "PRD217" || this.user === "PRD218") {
                     this.QS = true;
                     this.QPP = false;
                  } else {
                     this.QS = false;
                     this.QPP = true
                  }
               }
               if (this.MNS410UserRole === 'SYS-ALL' || this.user === "MHOL" || this.user === "RLONGAYROU") {
                  this.KB = true;
                  this.QPP = true;
                  this.QS = true;
               }



               if (this.MNS410UserID === this.user) {
                  this.MNS410UserRole = x.items[0].ROLL;
               }
               const delay = ms => new Promise(res => setTimeout(res, ms));
               await delay(500);
               if ((this.MNS410UserRole === 'SDK011' || this.MNS410UserRole === 'SYS-ALL')) {
                  return;
               } else {

                  this.showMessageModal3('U heeft geen rechten voor dit programma!');
                  this.messageModal3.afterClose(() => {
                     window.location.reload();
                  })

               }
               this.setBusy(true)
            });
      }, (error) => {
         this.setBusy(false);
      });
      this.setBusy(false);



   }
   ngOnInit() {
   }


   private setBusy(isBusy: boolean) {

   }
   private async showMessageModal3(message: string) {
      this.messageModal3 = this.sohoModalService.message('<label>' + message + '</label>');
      this.messageModal3.options({

         content: '<div><em><h1>' + message + '</h1></em></div>',


      });
      this.messageModal3.open();

   }
}
