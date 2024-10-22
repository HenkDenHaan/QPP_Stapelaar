import { EventEmitter, Injectable } from '@angular/core';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { MIResponse } from '@infor-up/m3-odin/dist/mi/runtime';
import { Observable, first, last } from 'rxjs';

@Injectable({
   providedIn: 'root'
})

export class ItemService {

   public selectedItem: String;
   public MainWarehouse: String = "";
   resolve: Function;
   reject: Function;
   subscriber: Function;

   // protected ItemDataEventEmitter: EventEmitter<IMIResponse>;
   protected ProductionOrderLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected StockLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected CheckStockLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected StockLeftDataEventEmitter2: EventEmitter<IMIResponse>;
   protected ComponentLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected ConectedOrderLeftDataEventEmitter: EventEmitter<IMIResponse>;
   protected ConectedOrderLeft2DataEventEmitter: EventEmitter<IMIResponse>;

   protected ProductionOrderRightDataEventEmitter: EventEmitter<IMIResponse>;
   protected StockRightDataEventEmitter: EventEmitter<IMIResponse>;
   protected CheckStockRightDataEventEmitter: EventEmitter<IMIResponse>;
   protected StockRightDataEventEmitter2: EventEmitter<IMIResponse>;
   protected ComponentRightDataEventEmitter: EventEmitter<IMIResponse>;
   protected ConectedOrderRightDataEventEmitter: EventEmitter<IMIResponse>;
   protected ConectedOrderRight2DataEventEmitter: EventEmitter<IMIResponse>;

   isBusy: any;
   items: any[];
   itemNumber: any[];
   Day: String;
   EAN: String;
   MFNO: any[];
   miExtendedService: any;
   LstWarehouseData: any;
   ProductionOrderNumber: String;
   ProductionOrderNumberRight: String;
   MFNOLeft: any;
   MFNORight: any;
   MTNOLeft: any;
   MTNORight: any;
   MTNOStockLocationLeft: any;

   MTNOStockLocationRight: any;
   MachineRight: string;
   MachineLeft: string;

   ConnectedOrderDataEventEmitter: any;
   WHLORight: any;
   WHLOLeft: any;
   MTNORight2: String;
   MTNOLeft2: String;
   MTNOStockLocationLeft2: any;
   MTNOStockLocationRight2: any;






   constructor(private miService: MIService) {
      // this.ItemDataEventEmitter = new EventEmitter<IMIResponse>();
      this.ProductionOrderLeftDataEventEmitter = new EventEmitter<IMIResponse>();
      this.StockLeftDataEventEmitter = new EventEmitter<IMIResponse>();
      this.CheckStockLeftDataEventEmitter = new EventEmitter<IMIResponse>();
      this.StockLeftDataEventEmitter2 = new EventEmitter<IMIResponse>();
      this.ComponentLeftDataEventEmitter = new EventEmitter<IMIResponse>();
      this.ConectedOrderLeftDataEventEmitter = new EventEmitter<IMIResponse>();
      this.ConectedOrderLeft2DataEventEmitter = new EventEmitter<IMIResponse>();

      this.ProductionOrderRightDataEventEmitter = new EventEmitter<IMIResponse>();
      this.StockRightDataEventEmitter = new EventEmitter<IMIResponse>();
      this.CheckStockRightDataEventEmitter = new EventEmitter<IMIResponse>();
      this.StockRightDataEventEmitter2 = new EventEmitter<IMIResponse>();
      this.ComponentRightDataEventEmitter = new EventEmitter<IMIResponse>();
      this.ConectedOrderRightDataEventEmitter = new EventEmitter<IMIResponse>();
      this.ConectedOrderRight2DataEventEmitter = new EventEmitter<IMIResponse>();

   }

   public getProductionOrderLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ProductionOrderLeftDataEventEmitter;
   }
   setSelectedOrderLeft(ProductionOrderNumber: String) {
      this.ProductionOrderNumber = ProductionOrderNumber;
      this.loadProductionOrdersLeft();
   }

   loadProductionOrdersLeft() {
      const miRequest: IMIRequest = {
         program: "CMS100MI",
         transaction: "Lst_SDK_011_02",
         record: {
            VOFACI: '200',
            VOMFNO: this.ProductionOrderNumber
            ,

         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.ProductionOrderLeftDataEventEmitter.emit(x)
      )
      return this.miService.execute(miRequest).toPromise();
   }

   public getStockLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.StockLeftDataEventEmitter;
   }
   setStockLeft(MTNO: String, MTNOStockLocationLeft: String) {
      this.MTNOLeft = MTNO;
      this.MTNOStockLocationLeft = MTNOStockLocationLeft;
      this.loadStockLeft();
   }

   loadStockLeft() {
      const miRequest: IMIRequest = {
         program: "MMS060MI",
         transaction: "LstSumQty",
         record: {
            WHLO: this.WHLOLeft,
            ITNO: this.MTNOLeft,
            WHSL: this.MTNOStockLocationLeft,
            STAS: '2',
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.StockLeftDataEventEmitter.emit(x)
      )
   }

   public NowCheckStockLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.CheckStockLeftDataEventEmitter;
   }
   NowCheckStockLeft(MTNO: String, MTNOStockLocationLeft: String) {
      this.MTNOLeft = MTNO;
      this.MTNOStockLocationLeft = MTNOStockLocationLeft;
      this.CheckStockLeft();
   }

   CheckStockLeft() {
      const miRequest: IMIRequest = {
         program: "MMS060MI",
         transaction: "LstBalID",
         record: {
            WHLO: this.WHLOLeft,
            ITNO: this.MTNOLeft,
            WHSL: this.MTNOStockLocationLeft,
            ISTA: '13',
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.CheckStockLeftDataEventEmitter.emit(x)
      )
   }

   public getStockLeftDataEventEmitter2(): EventEmitter<IMIResponse> {
      return this.StockLeftDataEventEmitter2;
   }
   setStockLeft2(MTNO: String, MTNOStockLocationLeft2: String) {
      this.MTNOLeft2 = MTNO;
      this.MTNOStockLocationLeft2 = MTNOStockLocationLeft2;
      this.loadStockLeft2();
   }

   loadStockLeft2() {
      const miRequest: IMIRequest = {
         program: "MMS060MI",
         transaction: "LstSumQty",
         record: {
            WHLO: this.WHLOLeft,
            ITNO: this.MTNOLeft2,
            WHSL: this.MTNOStockLocationLeft2,
            STAS: '2',
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.StockLeftDataEventEmitter2.emit(x)
      )
   }


   public getComponentLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ComponentLeftDataEventEmitter;
   }


   loadComponentLeft(EAN: String, Day: String) {
      const miRequestRight: IMIRequest = {
         program: "CMS100MI",
         transaction: "Lst_SDK_011_01",
         record: {
            VOTXT1: EAN,
            VOFIDT: Day,
         },
         includeMetadata: true,
         maxReturnedRecords: 100,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.ComponentLeftDataEventEmitter.emit(x)
      )
      // return this.miService.execute(miRequestRight).toPromise();
   };

   public getConnectedOrderLeftDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ConectedOrderLeftDataEventEmitter;
   }

   setCheckConnectedOrdersLeft(MTNOLeft: String, MFNOLeft: String) {
      this.MTNOLeft = MTNOLeft;
      this.MFNOLeft = MFNOLeft;
      this.CheckConnectedOrderLeft();
   }

   CheckConnectedOrderLeft() {
      const miRequest: IMIRequest = {
         program: "PMS100MI",
         transaction: "Get",
         record: {
            FACI: this.WHLOLeft,
            PRNO: this.MTNOLeft,
            MFNO: this.MFNOLeft
            ,

         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.ConectedOrderLeftDataEventEmitter.emit(x)
      )
   }

   public getConnectedOrderLeft2DataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ConectedOrderLeft2DataEventEmitter;
   }

   setCheckConnectedOrdersLeft2(MFNOLeft: String) {
      this.MFNOLeft = MFNOLeft;
      this.CheckConnectedOrderLeft2();
   }

   CheckConnectedOrderLeft2() {
      const miRequest: IMIRequest = {
         program: "MWS070MI",
         transaction: "LstTransByOrder",
         record: {
            TTYP: '11',
            RIDN: this.MFNOLeft,
            RIDL: '1',
         },
         maxReturnedRecords: 1,
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.ConectedOrderLeft2DataEventEmitter.emit(x)
      )
   }

   public getProductionOrderRightDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ProductionOrderRightDataEventEmitter;
   }
   setSelectedOrderRight(ProductionOrderNumber: String) {
      this.ProductionOrderNumber = ProductionOrderNumber;
      this.loadProductionOrdersRight();
   }

   loadProductionOrdersRight() {
      const miRequest: IMIRequest = {
         program: "CMS100MI",
         transaction: "Lst_SDK_011_02",
         record: {
            VOFACI: '200',
            VOMFNO: this.ProductionOrderNumber
            ,

         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.ProductionOrderRightDataEventEmitter.emit(x)
      )
      // return this.miService.execute(miRequest).toPromise();
   }

   public getStockRightDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.StockRightDataEventEmitter;
   }
   setStockRight(MTNO: String, MTNOStockLocationRight: String) {
      this.MTNORight = MTNO;
      this.MTNOStockLocationRight = MTNOStockLocationRight;
      this.loadStockRight();
   }

   loadStockRight() {
      const miRequest: IMIRequest = {
         program: "MMS060MI",
         transaction: "LstSumQty",
         record: {
            WHLO: this.WHLORight,
            ITNO: this.MTNORight,
            WHSL: this.MTNOStockLocationRight,
            STAS: '2',
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.StockRightDataEventEmitter.emit(x)
      )
   }

   public NowCheckStockRightDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.CheckStockRightDataEventEmitter;
   }
   NowCheckStockRight(MTNO: String, MTNOStockLocationRight: String) {
      this.MTNORight = MTNO;
      this.MTNOStockLocationRight = MTNOStockLocationRight;
      this.CheckStockRight();
   }

   CheckStockRight() {
      const miRequest: IMIRequest = {
         program: "MMS060MI",
         transaction: "LstBalID",
         record: {
            WHLO: this.WHLORight,
            ITNO: this.MTNORight,
            WHSL: this.MTNOStockLocationRight,
            ISTA: '13',
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.CheckStockRightDataEventEmitter.emit(x)
      )
   }

   public getStockRightDataEventEmitter2(): EventEmitter<IMIResponse> {
      return this.StockRightDataEventEmitter2;
   }
   setStockRight2(MTNO: String, MTNOStockLocationRight2: String) {
      this.MTNORight2 = MTNO;
      this.MTNOStockLocationRight2 = MTNOStockLocationRight2;
      this.loadStockRight2();
   }

   loadStockRight2() {
      const miRequest: IMIRequest = {
         program: "MMS060MI",
         transaction: "LstSumQty",
         record: {
            WHLO: this.WHLORight,
            ITNO: this.MTNORight2,
            WHSL: this.MTNOStockLocationRight2,
            STAS: '2',
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.StockRightDataEventEmitter2.emit(x)
      )
   }

   public getComponentRightDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ComponentRightDataEventEmitter;
   }


   loadComponentRight(EAN: String, Day: String) {
      const miRequestRight: IMIRequest = {
         program: "CMS100MI",
         transaction: "Lst_SDK_011_01",
         record: {
            VOTXT1: EAN,
            VOFIDT: Day,
         },
         includeMetadata: true,
         maxReturnedRecords: 100,

      };
      this.miService.execute(miRequestRight).subscribe(x =>
         this.ComponentRightDataEventEmitter.emit(x)
      )
      // return this.miService.execute(miRequestRight).toPromise();
   };

   public getConnectedOrderRightDataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ConectedOrderRightDataEventEmitter;
   }

   setCheckConnectedOrdersRight(MTNORight: String, MFNORight: String) {
      this.MTNORight = MTNORight;
      this.MFNORight = MFNORight;
      this.CheckConnectedOrderRight();
   }

   CheckConnectedOrderRight() {
      const miRequest: IMIRequest = {
         program: "PMS100MI",
         transaction: "Get",
         record: {
            FACI: this.WHLORight,
            PRNO: this.MTNORight,
            MFNO: this.MFNORight,
         },
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.ConectedOrderRightDataEventEmitter.emit(x)
      )
      return
   }

   public getConnectedOrderRight2DataEventEmitter(): EventEmitter<IMIResponse> {
      return this.ConectedOrderRight2DataEventEmitter;
   }

   setCheckConnectedOrdersRight2(MFNORight: String) {
      this.MFNORight = MFNORight;
      this.CheckConnectedOrderRight2();
   }

   CheckConnectedOrderRight2() {
      const miRequest: IMIRequest = {
         program: "MWS070MI",
         transaction: "LstTransByOrder",
         record: {
            TTYP: '11',
            RIDN: this.MFNORight,
            RIDL: '1',
         },
         maxReturnedRecords: 1,
         includeMetadata: true,
      }
      this.miService.execute(miRequest).subscribe(x =>
         this.ConectedOrderRight2DataEventEmitter.emit(x)
      )
   }


   getMachine(event) {
      if (this.MachineLeft) { window.location.reload(); }
      let StockLocation: any;
      StockLocation = event;
      this.MachineLeft = StockLocation.substring(0, 3);
      this.MachineRight = StockLocation.substring(4, 7);


      if (this.MachineLeft === "BM1") {
         this.MTNOStockLocationLeft = '200BMENG1';
         this.MTNOStockLocationLeft2 = '200SPC';
         this.WHLOLeft = '200';
      } else {
         if (this.MachineLeft === "BM2") {
            this.MTNOStockLocationLeft = '200BMENG2';
            this.MTNOStockLocationLeft2 = '200SPC';
            this.WHLOLeft = '200';
         } else {
            this.MTNOStockLocationLeft = '200INP' + this.MachineLeft;
            this.MTNOStockLocationLeft2 = '200INP' + this.MachineLeft;
            this.WHLOLeft = '200';
         }
      }

      if (this.MachineRight === "BM1") {
         this.MTNOStockLocationRight = '200BMENG1';
         this.MTNOStockLocationRight2 = '200SPC';
         this.WHLORight = '200';
      } else {
         if (this.MachineRight === "BM2") {
            this.MTNOStockLocationRight = '200BMENG2';
            this.MTNOStockLocationRight2 = '200SPC';
            this.WHLORight = '200';
         } else {
            this.MTNOStockLocationRight = '200INP' + this.MachineRight;
            this.MTNOStockLocationRight2 = '200INP' + this.MachineRight;
            this.WHLORight = '200';
         }
      }
   }
}
