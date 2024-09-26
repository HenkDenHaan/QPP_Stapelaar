import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMIMetadataMap, IUserContext, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService, ApplicationService, FormService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoModalDialogRef, SohoModalDialogService, SohoTabListComponent } from 'ids-enterprise-ng';
import { ItemService } from '../item.service';
import { filter } from 'rxjs';

@Component({
   selector: 'app-component-Left',
   templateUrl: './component-Left.component.html',
   styleUrls: ['./component-Left.component.css']
})
export class ComponentLeftComponent {
   private messageModal: SohoModalDialogRef<any>;
   private messageModal2: SohoModalDialogRef<any>;
   public Actie: string;
   AlreadyProducedLeft: any;
   checkExpiDate: any;
   CUNMLeft: any;
   EANcodeLeft: string = '';
   ExistingLotcodeLeft: any;
   ExistingThTLeft: any;
   ExpiApiDate: any;
   ExpirationDateLeft: any;
   KratLeft: any;
   MachineLeft: any;
   MTNOnameLeft: any;
   MTNOnameLeft2: any;
   MTNOLeft: string;
   MFNOLeft: string;
   MTNOStockLocation: string;
   OrderQuantityLeft: any;
   PalletLeft: any;
   ProdApiDateLeft: String;
   ProductionDateLeft: String;
   QuantityToReceiveLeft: String;
   RemainToReceiveLeft: string;
   RemarkLeft: any;
   selectedProductionOrderDescriptionLeft: any;
   selectedProductionOrderNumberLeft: string = '';
   selectedRow: MIRecord;
   selectedRowIndex: number;
   StockLeft: any;
   WarningExpiDate: any;
   selectedProductLeft: any;
   ConnectedOrderStatus: string = '';
   RemarkLeft_ST: string = '';
   FACI: any;
   PREA: any;
   RORN: any;
   THTMin: any;
   THTMAx: any;
   NAPQTY: any;
   messageModal3: SohoModalDialogRef<unknown>;
   VHWHST: any;
   public apiDateLeft: any;
   MaxQtyToReceiveLeft: any;
   D1QT: any;
   selectedFilterChange: any;
   MAQA: number;
   ToDPS: any;
   BANOhand: boolean;
   BANOLeft: any;
   apiBANOLeft: any;
   MTNOLeft2: any;
   StockLeft2: any;
   MTNOnameLeft1: any;
   THTMinKB: any;
   THTMaxKB: any;

   title(title: any) {
      throw new Error('Method not implemented.');
   }
   userContext = {} as IUserContext;
   isBusy = false;

   @ViewChild('datagridLeft', { static: false }) dataGrid: SohoDataGridComponent;
   @Input() artikel: ItemService[];
   private datagrid: SohoDataGridComponent;
   public dataGridOptions: SohoDataGridOptions;
   static reload: any

   constructor(private miService: MIService, private userService: UserService, private itemService: ItemService, private formService: ApplicationService, private sohoModalService: SohoModalDialogService) {
      this.buildDataGrid();
      this.itemService.getComponentLeftDataEventEmitter().subscribe(
         x => {
            console.log(x);
            const records: MIRecord[] = [];
            x.items.forEach(item => {
               records.push(item);
            });
            this.dataGridOptions.dataset = records;
            this.setBusy(false)
         });
   }
   ngOnInit() {
      // this.selectedRowIndex = 1;

   }

   buildDataGrid(): void {
      this.dataGridOptions = {
         disableRowDeactivation: true,
         clickToSelect: true,
         cellNavigation: false,
         editable: true,
         filterable: false,
         showDirty: false,
         selectable: 'single',
         rowHeight: 'short',
         columns: this.buildColumns(),
      };
   }

   buildColumns(): SohoDataGridColumn[] {
      const columns: SohoDataGridColumn[] = [];
      columns.push({
         width: 35, id: 'MFNO', name: 'Ordernummer', field: 'VOMFNO', cssClass: this.customCssClass.bind(this), sortable: false
      });
      columns.push({
         width: 120, id: 'ITNO', name: 'Omschrijving', field: 'MMFUDS', cssClass: this.customCssClass.bind(this), sortable: false
      });
      columns.push({
         width: 95, id: 'CUNM', name: 'Klant', field: 'OKCUNM', cssClass: this.customCssClass.bind(this), sortable: false
      });
      columns.push({
         width: 25, id: 'Aantal', name: 'Aantal', field: 'V_1235', cssClass: this.customCssClass2.bind(this), sortable: false,
      });
      columns.push({
         width: 70, id: 'Opmerking', name: 'Opmerking', field: 'VOTXT2', cssClass: this.customCssClass.bind(this), sortable: false
      });
      return columns;
   }

   private customCssClass(row: number, cell: number, fieldValue: any, columnDef: SohoDataGridColumn, rowData: any): string {
      const ToProduce = Number(rowData.V_1235);
      if (ToProduce <= 0) {
         return 'green';
      } else {
         return 'normal'
      }
   }
   private customCssClass2(row: number, cell: number, fieldValue: any, columnDef: SohoDataGridColumn, rowData: any): string {
      const ToProduce = Number(rowData.V_1235);
      const AlreadyProduced = Number(rowData.VHRVQA)
      if (ToProduce <= 0) {
         return 'green';
      } else {
         if (AlreadyProduced > 0) {
            return 'orange';
         } else {
            return 'normal'
         }
      }
   }
   getExpiDateLeft(event) {
      // let apiDateLeft: any;
      this.apiDateLeft = this.ExpirationDateLeft;
      this.checkExpiDate = this.apiDateLeft.substring(6, 10) + this.apiDateLeft.substring(3, 5) + this.apiDateLeft.substring(0, 2);
      this.ExpiApiDate = this.apiDateLeft.substring(0, 2) + this.apiDateLeft.substring(3, 5) + this.apiDateLeft.substring(8, 10);
      this.WarningExpiDate = this.apiDateLeft.substring(0, 2) + '-' + this.apiDateLeft.substring(3, 5) + '-' + this.apiDateLeft.substring(6, 10);
   }

   getBANOLeft(event) {
      this.apiBANOLeft = this.BANOLeft;

   }

   async LoadOrdersLeft(event) {
      if (!this.itemService.MachineLeft) {
         this.showMessageModal2('Kies eerst de machine', 'First choose the machine ', 'Najpierw wybierz maszyny');

      }
      if (this.itemService.MachineLeft === "...") {
         this.showMessageModal2('Gebruik andere machine', 'Use other machine ', 'Uzyj innej maszyny');
         return
      }
      if (this.itemService.MachineLeft === "KCD") { this.EANcodeLeft = 'CD' }
      let apiDate: any;
      apiDate = this.ProductionDateLeft;
      this.ProdApiDateLeft = apiDate.substring(6, 10) + apiDate.substring(3, 5) + apiDate.substring(0, 2);
      this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
      this.AlreadyProducedLeft = '';
      this.CUNMLeft = '';
      this.ExistingLotcodeLeft = '';
      this.ExistingThTLeft = '';
      this.KratLeft = '';
      this.MTNOnameLeft = '';
      this.MTNOnameLeft2 = '';
      this.MTNOLeft = '';
      this.MTNOLeft2 = '';
      this.OrderQuantityLeft = '';
      this.PalletLeft = '';
      this.selectedProductLeft = '';
      this.QuantityToReceiveLeft = '';
      this.RemainToReceiveLeft = '';
      this.RemarkLeft = '';
      this.selectedProductionOrderDescriptionLeft = '';
      this.selectedProductionOrderNumberLeft = '';
      this.StockLeft = '';
      this.StockLeft2 = '';
      this.RemarkLeft = '';
      this.RemarkLeft_ST = '';
      this.ConnectedOrderStatus = '';
      this.isValid = true

      if (this.itemService.MachineLeft === "KCD") { this.EANcodeLeft = 'CD' }
   }



   onSelectedLeft(event: any) {

      this.BANOLeft = "";
      if (this.itemService.MachineLeft === "KS " || this.itemService.MachineLeft === "KCD") {
         this.BANOhand = true
      } else {
         this.BANOhand = false
      }

      if (this.ExistingLotcodeLeft != "") {
         this.BANOLeft = this.ExistingLotcodeLeft;
      }
      else {
         this.BANOLeft = this.apiBANOLeft
      }
      this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
      this.selectedRow = event.rows[0].data
      this.selectedProductLeft = this.selectedRow['VOPRNO'];
      this.selectedProductionOrderNumberLeft = this.selectedRow['VOMFNO'];
      this.selectedProductionOrderDescriptionLeft = this.selectedRow['MMFUDS'];
      this.CUNMLeft = this.selectedRow['OKCUNM'];
      this.RemarkLeft = this.selectedRow['VOTXT2'];
      this.MFNOLeft = this.selectedRow['VHRORN'];
      this.MTNOLeft = this.selectedRow['VMMTNO'];
      this.MTNOLeft2 = this.selectedRow['V2MTNO'];
      this.ExistingThTLeft = this.selectedRow['V_1401'];

      this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.RemainToReceiveLeft = x.items[0].V_1235);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.ExistingLotcodeLeft = x.items[0].VHBANO);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.QuantityToReceiveLeft = x.items[0].V_6550);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.MaxQtyToReceiveLeft = x.items[0].V_6550);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.OrderQuantityLeft = x.items[0].VHORQT);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.AlreadyProducedLeft = x.items[0].VHRVQA);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.PalletLeft = x.items[0].V_5000);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.KratLeft = x.items[0].M4PANM);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.RemarkLeft_ST = x.items[0].VHMAUN);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.FACI = x.items[0].VHFACI);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.PREA = x.items[0].V_6760);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.MTNOnameLeft = x.items[0].Z1FUDS);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.THTMin = x.items[0].V_6001);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.THTMAx = x.items[0].V_6002);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.THTMinKB = x.items[0].V_6004);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.THTMaxKB = x.items[0].V_6005);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.NAPQTY = x.items[0].NAPQTY);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.VHWHST = x.items[0].VHWHST);
      this.itemService.getProductionOrderLeftDataEventEmitter().subscribe(x => this.D1QT = x.items[0].V_5100);

      this.itemService.setStockLeft(this.MTNOLeft, this.itemService.MTNOStockLocationLeft);
      this.itemService.setStockLeft2(this.MTNOLeft2, this.itemService.MTNOStockLocationLeft);
      this.StockLeft = '';
      this.StockLeft2 = '';
      this.itemService.getStockLeftDataEventEmitter().subscribe(x => this.StockLeft = Number(x.items[0].STQT).toFixed(0));
      this.itemService.getStockLeftDataEventEmitter().subscribe(x => this.MTNOnameLeft1 = x.items[0].ITDS);
      this.itemService.getStockLeftDataEventEmitter2().subscribe(x => this.StockLeft2 = Number(x.items[0].STAQ).toFixed(0));
      this.itemService.getStockLeftDataEventEmitter2().subscribe(x => this.MTNOnameLeft2 = x.items[0].ITDS);
      this.itemService.setCheckConnectedOrdersLeft(this.MTNOLeft, this.MFNOLeft)
      this.ConnectedOrderStatus = '';
      this.itemService.getConnectedOrderLeftDataEventEmitter().subscribe(x => this.ConnectedOrderStatus = x.items[0].WHST)

      if (this.ExistingThTLeft != "" && this.ExistingThTLeft != "00-00-0000") {
         this.ExpirationDateLeft = this.ExistingThTLeft;
      }
      else {
         this.ExpirationDateLeft = this.apiDateLeft
      }


      this.isValid = true
   }

   async ReceiveQuantityLeft(event: any) {
      this.isBusy = true
      this.isValid = false;

      if (this.ExistingThTLeft != "00-00-0000") {
         this.ExpirationDateLeft = this.ExistingThTLeft
         this.apiDateLeft = this.ExpirationDateLeft;
         this.checkExpiDate = this.apiDateLeft.substring(6, 10) + this.apiDateLeft.substring(3, 5) + this.apiDateLeft.substring(0, 2);
         this.ExpiApiDate = this.apiDateLeft.substring(0, 2) + this.apiDateLeft.substring(3, 5) + this.apiDateLeft.substring(8, 10);
         this.WarningExpiDate = this.apiDateLeft.substring(0, 2) + '-' + this.apiDateLeft.substring(3, 5) + '-' + this.apiDateLeft.substring(6, 10);
      } else {
         this.ExpirationDateLeft = this.WarningExpiDate
      }
      if (this.ExistingLotcodeLeft != "") {
         this.BANOLeft = this.ExistingLotcodeLeft;
      }
      else {
         this.BANOLeft = this.apiBANOLeft
      }
      this.MAQA = Number(this.QuantityToReceiveLeft);
      const MaxQtyToReceiveLeft = Number(this.MaxQtyToReceiveLeft);
      const CheckEmptyExpiDate = this.ExpirationDateLeft
      await this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
      await this.itemService.setStockLeft(this.MTNOLeft, this.itemService.MTNOStockLocationLeft);
      await this.itemService.setStockLeft2(this.MTNOLeft2, this.itemService.MTNOStockLocationLeft);
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500)
      const MTNOLeft = this.selectedRow['VMMTNO'];
      const RemainToReceive = Number(this.RemainToReceiveLeft);
      const AlreadyProduced = Number(this.AlreadyProducedLeft);
      const FACI = this.FACI;
      const MFNO = this.selectedRow['VOMFNO'];
      const PRNO = this.selectedRow['VOPRNO'];
      const PREA = this.PREA;
      const RORN = this.MFNOLeft
      const NAPQTY = this.NAPQTY;
      const STAQ = this.StockLeft;
      const STAQ2 = this.StockLeft2;
      const WHSL = this.itemService.MTNOStockLocationLeft;
      const VHWHST = this.VHWHST;
      const WHST = this.ConnectedOrderStatus;
      const BRE2 = this.itemService.MTNOStockLocationLeft.substring(6, 12);
      const D1QT = Number(this.D1QT);

      if (VHWHST.substring(1, 2) === "2") {
         this.showMessageModal2('Orderstatus is ' + VHWHST + ' Vraag hulp', 'Order status is ' + VHWHST + ' Request help', 'Status zamówienia to ' + VHWHST + ' Poproś o pomoc');
         this.isValid = true;
         return;
      } else {
         if (PREA === "N") {
            this.showMessageModal2('Ontvang klantspecifieke orders', 'Receive customer-specific orders ', 'odbieraj indywidualne zamówienia klientów ');
            this.isValid = true;
            return;
         } else {
            if (AlreadyProduced === 0) {
               if (CheckEmptyExpiDate === '' || !CheckEmptyExpiDate) {
                  this.showMessageModal2('ThT niet gevuld', 'ThT not filled  ', 'ThT nie jest wypełniony');
                  this.isValid = true;
                  return;
               }
               if ((this.itemService.MachineLeft === "KS " || this.itemService.MachineLeft === "KCD") && (this.BANOLeft === '' || !this.BANOLeft)) {
                  this.showMessageModal2('Partijnummer niet gevuld', 'Lotcode not filled  ', 'ThT nie jest wypełniony');
                  this.isValid = true;
                  return;
               }
               if (this.itemService.MachineLeft === "KCD" || this.itemService.MachineLeft === "KS ") {
                  const NewBANO = this.BANOLeft.substring(0, 6) + '-' + this.ExpiApiDate.substring(0, 2);
                  await this.showMessageModal('ThT en Lotcode akkoord?', ' ThT and Lot code approved?', 'Zatwierdzone kody ThT i Lot?', 'ThT &emsp;&emsp;&emsp;:&ensp;' + this.WarningExpiDate, 'Lotcode &emsp;&nbsp;:&ensp;' + NewBANO);
               } else {
                  const NewBANO = this.selectedRow['V_3010'].substring(0, 7) + this.ExpiApiDate.substring(0, 2);
                  await this.showMessageModal('ThT en Lotcode akkoord?', ' ThT and Lot code approved?', 'Zatwierdzone kody ThT i Lot?', 'ThT &emsp;&emsp;&emsp;:&ensp;' + this.WarningExpiDate, 'Lotcode &emsp;&nbsp;:&ensp;' + NewBANO);
               }

            } else {
               if (this.MAQA > RemainToReceive && NAPQTY > 0) {
                  this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
                  this.showMessageModal2('Aantal te groot! Op deze order kunnen nog maximaal ' + RemainToReceive + ' stuks worden ontvangen', 'Quantity to large! Max. ' + RemainToReceive + ' pieces can be received on this order', 'Ilość za duża! w ramach tego zamówienia może być maksymalnie ' + RemainToReceive + ' sztuk')
                  this.isValid = true;
                  return;
               } else {
                  if (this.MAQA > D1QT && this.RemarkLeft_ST != "ST") {
                     this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
                     this.showMessageModal2('Aantal te groot! Maximaal ' + MaxQtyToReceiveLeft + ' per pallet', 'Quantity too large! Maximum ' + MaxQtyToReceiveLeft + ' per pallet', 'Ilość za duża! Maksymalnie ' + MaxQtyToReceiveLeft + ' na paletę');
                  } else {
                     if (RORN != '' && (STAQ <= 0 || !STAQ)) {
                        if (!WHST || WHST === "90") {
                           this.showMessageModal2('Gekoppelde order fout!', 'Error connected order!', 'Blad przyporzadkowania zamówienia!');
                           this.isValid = true;
                           return;
                        } else {
                           //set SPMT to 2
                           this.isBusy = true
                           if (this.MAQA <= MaxQtyToReceiveLeft) {
                              const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                           } else {
                              //extra enter tbv overproductie
                              const mformsResponse2 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                           }
                           await delay(3000);
                        }
                     } else {
                        this.isBusy = true
                        if (this.itemService.MachineLeft === "KCD" && (STAQ <= 0 || STAQ2 <= 0)) {
                           this.showMessageModal2('Geen voorraad!', 'Not enough stock!', 'Wza mało zapasów!');
                           this.isValid = true;
                           return;
                        } else {
                           if (this.itemService.MachineLeft === "KCD" && (STAQ <= this.MAQA || STAQ2 <= this.MAQA)) {
                              if (Number(STAQ2) <= Number(STAQ)) {
                                 const MaxMAQA = STAQ2
                                 this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                                 this.isValid = true;
                                 return;
                              } else {
                                 const MaxMAQA = STAQ
                                 this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                                 this.isValid = true;
                                 return;
                              }
                           }
                        }
                        if (STAQ <= 0 || !STAQ) {
                           this.showMessageModal2('Trechter leeg!', 'Funnel empty!', 'Wsyp/podajnik jest pusty!');
                           this.isValid = true;
                           return;
                        } else {
                           if (RORN != '') {
                              this.ToDPS = " (x)";
                           }
                           else {
                              this.ToDPS = "";
                           }
                           //set SPMT to 3 and WHSL to StockLocation
                           if (this.MAQA <= MaxQtyToReceiveLeft) {
                              const mformsResponse3 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + this.ToDPS + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                           } else {
                              //extra enter tbv overproductie
                              const mformsResponse4 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + this.ToDPS + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                           }
                        }
                     }
                     await delay(3000)
                     this.isBusy = true
                     await this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
                     await this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
                     await delay(3000);
                     await this.itemService.setStockLeft(MTNOLeft, WHSL);
                     this.isBusy = true

                     for (let i = 0; i < 5; i++) {
                        const AlreadyProducedAfter = Number(this.AlreadyProducedLeft);
                        if (AlreadyProducedAfter > AlreadyProduced) {
                           this.showMessageModal3('Label voor ' + this.MAQA + ' stuks wordt geprint!', 'Label is printing!', 'Etykieta jest drukowana!')
                           this.messageModal3.afterClose(() => {
                           })
                           this.isValid = true;
                           this.isBusy = false
                           return;
                        } else {
                           await delay(3000)
                        }
                     }
                     this.showMessageModal3('Ontvangst niet uitgevoerd! Probeer opnieuw of vraag hulp.', 'Reception not carried out! Please try again or ask for help.', 'Odbiór nie został przeprowadzony! Spróbuj ponownie lub poproś o pomoc.')
                     this.messageModal3.afterClose(() => {
                        this.isValid = true;
                     })
                  }
               }
            }
         }
         await this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
         await this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
         await this.itemService.setStockLeft(MTNOLeft, WHSL);
         this.setBusy(false);
         this.isValid = true
      }
   }

   private setBusy(isBusy: boolean) {
      this.isBusy = isBusy;
   }

   private showMessageModal(title: string, message: string, message2: string, message3: string, message4: string) {
      this.messageModal = this.sohoModalService.message('<label>' + message + message2 + message3 + message4 + '</label>');
      this.messageModal.options({
         title: title,
         buttons: [
            {
               text: 'OK',
               click: async (e, model) => {
                  this.messageModal.close();
                  const EXPI = this.ExpiApiDate;
                  const FACI = this.selectedRow['VHFACI'];
                  const MFNO = this.selectedRow['VOMFNO'];
                  const PRNO = this.selectedRow['VOPRNO'];
                  const NewBANO = this.selectedRow['V_3010'].substring(0, 7) + this.ExpiApiDate.substring(0, 2);
                  const MaxQtyToReceiveLeft = Number(this.MaxQtyToReceiveLeft);
                  await this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
                  await this.itemService.setStockLeft(this.MTNOLeft, this.itemService.MTNOStockLocationLeft);
                  const delay = ms => new Promise(res => setTimeout(res, ms));
                  const MTNOLeft = this.selectedRow['VMMTNO'];
                  const RemainToReceive = Number(this.RemainToReceiveLeft);
                  const AlreadyProduced = Number(this.AlreadyProducedLeft);
                  const RORN = this.MFNOLeft
                  const NAPQTY = this.NAPQTY;
                  const STAQ = this.StockLeft;
                  const STAQ2 = this.StockLeft2
                  const checkExpiDate = this.checkExpiDate;
                  const THTMin = this.THTMin;
                  const THTMax = this.THTMAx;
                  const THTMinKB = this.THTMinKB;
                  const THTMaxKB = this.THTMaxKB;
                  const WHSL = this.itemService.MTNOStockLocationLeft;
                  const WHST = this.ConnectedOrderStatus;
                  const BRE2 = this.itemService.MTNOStockLocationLeft.substring(6, 12);
                  const D1QT = Number(this.D1QT);

                  //set ThT en BANO

                  if (this.ExistingThTLeft != "00-00-0000") {
                     this.ExpirationDateLeft = this.ExistingThTLeft
                     this.apiDateLeft = this.ExpirationDateLeft;
                     this.checkExpiDate = this.apiDateLeft.substring(6, 10) + this.apiDateLeft.substring(3, 5) + this.apiDateLeft.substring(0, 2);
                     this.ExpiApiDate = this.apiDateLeft.substring(0, 2) + this.apiDateLeft.substring(3, 5) + this.apiDateLeft.substring(8, 10);
                     this.WarningExpiDate = this.apiDateLeft.substring(0, 2) + '-' + this.apiDateLeft.substring(3, 5) + '-' + this.apiDateLeft.substring(6, 10);
                  } else {
                     this.ExpirationDateLeft = this.WarningExpiDate
                  }

                  if ((!this.itemService.MachineLeft.startsWith("K") && (checkExpiDate < THTMin || checkExpiDate > THTMax)) || (this.itemService.MachineLeft.startsWith("K") && (checkExpiDate < THTMinKB || checkExpiDate > THTMaxKB))) {
                     this.showMessageModal2('ThT ' + this.WarningExpiDate + ' valt buiten bereik', 'Experation date ' + this.WarningExpiDate + ' is out of range', 'Data ważności ' + this.WarningExpiDate + ' jest poza zakresem');
                  } else {
                     const mformsResponse = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WHFACI%22%3e' + FACI + '%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WHBANO%22%3e' + NewBANO + '%3c%2ffield%3e%3cfield+name%3d%22WWMEXP%22%3e' + EXPI + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                     await delay(500);

                     if (this.MAQA > RemainToReceive && NAPQTY > 0) {
                        this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
                        this.showMessageModal2('Aantal te groot! Op deze order kunnen nog maximaal ' + RemainToReceive + ' stuks worden ontvangen', 'Quantity to large! Max. ' + RemainToReceive + ' pieces can be received on this order', 'Ilość za duża! w ramach tego zamówienia może być maksymalnie ' + RemainToReceive + ' sztuk')
                     } else {
                        if (this.MAQA > D1QT && this.RemarkLeft_ST != "ST") {
                           this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
                           this.showMessageModal2('Aantal te groot! Maximaal ' + MaxQtyToReceiveLeft + ' per pallet', 'Quantity too large! Maximum ' + MaxQtyToReceiveLeft + ' per pallet', 'Ilość za duża! Maksymalnie ' + MaxQtyToReceiveLeft + ' na paletę');
                        } else {
                           if (RORN != '' && (STAQ <= 0 || !STAQ)) {
                              if (!WHST || WHST === "90") {
                                 this.showMessageModal2('Gekoppelde order fout!', 'Error connected order!', 'Blad przyporzadkowania zamówienia!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 //set SPMT to 2
                                 this.isBusy = true
                                 if (this.MAQA <= MaxQtyToReceiveLeft) {
                                    const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 } else {
                                    //extra enter tbv overproductie
                                    const mformsResponse2 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 }
                              }
                           } else {
                              this.isBusy = true
                              if (this.itemService.MachineLeft === "KCD" && (STAQ <= 0 || STAQ2 <= 0)) {
                                 this.showMessageModal2('Geen voorraad!', 'Not enough stock!', 'Wza mało zapasów!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 if (this.itemService.MachineLeft === "KCD" && (STAQ <= this.MAQA || STAQ2 <= this.MAQA)) {
                                    if (Number(STAQ2) <= Number(STAQ)) {
                                       const MaxMAQA = STAQ2
                                       this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                                       this.isValid = true;
                                       return;
                                    } else {
                                       const MaxMAQA = STAQ
                                       this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                                       this.isValid = true;
                                       return;
                                    }
                                 }
                              }
                              if (STAQ <= 0 || !STAQ) {
                                 this.showMessageModal2('Trechter leeg!', 'Funnel empty!', 'Wsyp/podajnik jest pusty!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 if (RORN != '') {
                                    this.ToDPS = " (x)";
                                 }
                                 else {
                                    this.ToDPS = "";
                                 }
                                 //set SPMT to 3 and WHSL to StockLocation and delete WHRORN
                                 if (this.MAQA <= MaxQtyToReceiveLeft) {
                                    const mformsResponse3 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + this.ToDPS + this.ToDPS + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 } else {
                                    //extra enter tbv overproductie
                                    const mformsResponse4 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + this.ToDPS + '%3c%2ffield%3e%3cfield+name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 }
                              }
                           }
                           await delay(3000);
                           this.isBusy = true
                           this.itemService.loadComponentLeft(this.EANcodeLeft, this.ProdApiDateLeft)
                           await this.itemService.setSelectedOrderLeft(this.selectedProductionOrderNumberLeft);
                           await delay(3000)
                           this.itemService.setStockLeft(MTNOLeft, WHSL);
                           this.isBusy = true

                           const AlreadyProducedAfter = Number(this.AlreadyProducedLeft);
                           for (let i = 0; i < 3; i++) {
                              if (AlreadyProducedAfter > AlreadyProduced) {
                                 this.showMessageModal3('Label voor ' + this.MAQA + ' stuks wordt geprint!', 'Label is printing!', 'Etykieta jest drukowana!')
                                 this.messageModal3.afterClose(() => {
                                 })
                                 this.isValid = true;
                                 this.isBusy = false
                                 return;
                              } else {
                                 await delay(3000)
                              }
                           }
                           this.showMessageModal3('Ontvangst niet uitgevoerd! Probeer opnieuw of vraag hulp.', 'Reception not carried out! Please try again or ask for help.', 'Odbiór nie został przeprowadzony! Spróbuj ponownie lub poproś o pomoc.')
                           this.messageModal3.afterClose(() => {
                              this.isValid = true;
                           })
                        }
                     }
                  }
               },
               isDefault: false
            }
            ,
            {
               text: 'Annuleren',
               click: () => {
                  this.messageModal.close();
                  this.setBusy(false);
                  this.isValid = true;
                  return;
               },
               isDefault: true
            }
         ],
         content: '<div><h4>' + message + '<br>' + message2 + '</h4><br><br><h1>' + message3 + '<br>' + message4 + '</h1></div>'
      });
      this.messageModal.open();
   }


   private showMessageModal2(title: string, message: string, message2: string) {
      this.messageModal2 = this.sohoModalService.message('<label>' + message + message2 + '</label>');
      this.messageModal2.options({
         title: '<header>' + title + '</header>',
         buttons: [

            {
               text: 'OK',
               click: (e, model) => {
                  this.setBusy(false);
                  this.messageModal2.close();
               },
               isDefault: true
            }
         ],
         content: '<div><h4>' + message + '<br>' + message2 + '</h4></div>'
      });
      this.messageModal2.open();
   }

   private showMessageModal3(title: string, message: string, message2: string) {
      this.messageModal3 = this.sohoModalService.message('<label>' + message + message2 + '</label>');
      this.messageModal3.options({
         title: '<header>' + title + '</header>',
         buttons: [
            {
               text: 'OK',
               click: (e, model) => { this.messageModal3.close(); },
               isDefault: true
            }
         ],
         content: '<div><h4>' + message + '<br>' + message2 + '</h4></div>'
      });
      this.messageModal3.open();
   }
   isValid: boolean = true;

}