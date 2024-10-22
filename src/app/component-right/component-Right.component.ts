import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMIMetadataMap, IUserContext, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService, ApplicationService, FormService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoModalDialogRef, SohoModalDialogService, SohoTabListComponent } from 'ids-enterprise-ng';
import { ItemService } from '../item.service';
import { filter } from 'rxjs';

@Component({
   selector: 'app-component-Right',
   templateUrl: './component-Right.component.html',
   styleUrls: ['./component-Right.component.css']
})
export class ComponentRightComponent {
   private messageModal: SohoModalDialogRef<any>;
   private messageModal2: SohoModalDialogRef<any>;
   public Actie: string;
   public ShowCAMU;
   AlreadyProducedRight: any;
   checkExpiDate: any;
   CUNMRight: any;
   EANcodeRight: string = '';
   ExistingLotcodeRight: any;
   ExistingThTRight: any;
   ExpiApiDate: any;
   ExpirationDateRight: any;
   KratRight: any;
   MachineRight: any;
   MTNOnameRight: any;
   MTNOnameRight2: any;
   MTNORight: string;
   MFNORight: string;
   MTNOStockLocation: string;
   OrderQuantityRight: any;
   PalletRight: any;
   ProdApiDateRight: String;
   ProductionDateRight: String;
   QuantityToReceiveRight: String;
   Karnummer: String;
   RemainToReceiveRight: string;
   RemarkRight: any;
   selectedProductionOrderDescriptionRight: any;
   selectedProductionOrderNumberRight: string = '';
   selectedRow: MIRecord;
   selectedRowIndex: number;
   StockRight: any;
   WarningExpiDate: any;
   selectedProductRight: any;
   ConnectedOrderStatus: string = '';
   ConnectedOrderStatus2: string = '';
   RemarkRight_ST: string = '';
   FACI: any;
   PREA: any;
   RORN: any;
   THTMin: any;
   THTMAx: any;
   NAPQTY: any;
   messageModal3: SohoModalDialogRef<unknown>;
   VHWHST: any;
   public apiDateRight: any;
   MaxQtyToReceiveRight: any;
   D1QT: any;
   selectedFilterChange: any;
   MAQA: number;
   BANOhand: boolean;
   BANORight: any;
   apiBANORight: any;
   MTNORight2: any;
   StockRight2: any;
   MTNOnameRight1: any;
   THTMinKB: any;
   THTMaxKB: any;
   StockFromFunnel: boolean = false
   StockSTAS: any;
   MTNOQtyRight: any;
   KarnummerInput: String;
   MBWHSL: any;


   title(title: any) {
      throw new Error('Method not implemented.');
   }
   userContext = {} as IUserContext;


   @ViewChild('datagridRight', { static: false }) dataGrid: SohoDataGridComponent;
   @Input() artikel: ItemService[];
   private datagrid: SohoDataGridComponent;
   public dataGridOptions: SohoDataGridOptions;
   static reload: any

   constructor(private miService: MIService, private userService: UserService, private itemService: ItemService, private formService: ApplicationService, private sohoModalService: SohoModalDialogService) {
      this.buildDataGrid();
      this.itemService.getComponentRightDataEventEmitter().subscribe(
         x => {
            console.log(x);
            const records: MIRecord[] = [];
            x.items.forEach(item => {
               records.push(item);
            });
            this.dataGridOptions.dataset = records;
         });
   }
   ngOnInit() {
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
   getExpiDateRight(event) {
      // let apiDateRight: any;
      this.apiDateRight = this.ExpirationDateRight;
      this.checkExpiDate = this.apiDateRight.substring(6, 10) + this.apiDateRight.substring(3, 5) + this.apiDateRight.substring(0, 2);
      this.ExpiApiDate = this.apiDateRight.substring(0, 2) + this.apiDateRight.substring(3, 5) + this.apiDateRight.substring(8, 10);
      this.WarningExpiDate = this.apiDateRight.substring(0, 2) + '-' + this.apiDateRight.substring(3, 5) + '-' + this.apiDateRight.substring(6, 10);
   }

   getBANORight(event) {
      this.apiBANORight = this.BANORight;

   }

   async LoadOrdersRight(event) {
      if (!this.itemService.MachineRight) {
         this.showMessageModal2('Kies eerst de machine', 'First choose the machine ', 'Najpierw wybierz maszyny');
         return
      }
      if (this.itemService.MachineRight === "...") {
         this.showMessageModal2('Gebruik andere machine', 'Use other machine ', 'Uzyj innej maszyny');
         return
      }
      if (this.EANcodeRight === "CD" && this.itemService.MachineRight != "BCD") {
         this.showMessageModal2('Gebruik machine BCD', 'Use machine BCD ', 'wybierz maszyny BCD ');
         return;
      }
      if (this.itemService.MachineRight === "BCD") { this.EANcodeRight = 'CD' }
      if (this.itemService.MachineRight === "BM1" || this.itemService.MachineRight === "BM2") { this.EANcodeRight = 'MENG' }
      let apiDate: any;
      apiDate = this.ProductionDateRight;
      this.ProdApiDateRight = apiDate.substring(6, 10) + apiDate.substring(3, 5) + apiDate.substring(0, 2);
      this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight)
      this.AlreadyProducedRight = '';
      this.CUNMRight = '';
      this.ExistingLotcodeRight = '';
      this.ExistingThTRight = '';
      this.KratRight = '';
      this.MTNOnameRight = '';
      this.MTNOnameRight2 = '';
      this.MTNORight = '';
      this.MTNORight2 = '';
      this.OrderQuantityRight = '';
      this.PalletRight = '';
      this.selectedProductRight = '';
      this.QuantityToReceiveRight = '';
      this.RemainToReceiveRight = '';
      this.selectedProductionOrderDescriptionRight = '';
      this.selectedProductionOrderNumberRight = '';
      this.StockRight = '';
      this.StockSTAS = '';
      this.StockRight2 = '';
      this.RemarkRight = '';
      this.RemarkRight_ST = '';
      this.ConnectedOrderStatus = '';
      this.ConnectedOrderStatus2 = '';
      this.isValid = true

      if (this.itemService.MachineRight === "BCD") { this.EANcodeRight = 'CD' }
      if (this.itemService.MachineRight === "BM1" || this.itemService.MachineRight === "BM2") { this.EANcodeRight = 'MENG' }
   }

   onSelectedRight(event: any) {

      this.BANORight = "";
      if (this.itemService.MachineRight === "BSL" || this.itemService.MachineRight === "BCD") {
         this.BANOhand = true
      } else {
         this.BANOhand = false
      }

      if (this.ExistingLotcodeRight != "") {
         this.BANORight = this.ExistingLotcodeRight;
      }
      else {
         this.BANORight = this.apiBANORight
      }
      this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight)
      this.selectedRow = event.rows[0].data
      this.selectedProductRight = this.selectedRow['VOPRNO'];
      this.selectedProductionOrderNumberRight = this.selectedRow['VOMFNO'];
      this.selectedProductionOrderDescriptionRight = this.selectedRow['MMFUDS'];
      this.CUNMRight = this.selectedRow['OKCUNM'];
      this.RemarkRight = this.selectedRow['VOTXT2'];
      this.MFNORight = this.selectedRow['VHRORN'];
      this.MTNORight = this.selectedRow['VMMTNO'];
      this.MTNORight2 = this.selectedRow['V2MTNO'];
      this.ExistingThTRight = this.selectedRow['V_1401'];

      this.itemService.setSelectedOrderRight(this.selectedProductionOrderNumberRight);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.RemainToReceiveRight = x.items[0].V_1235);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.ExistingLotcodeRight = x.items[0].VHBANO);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.QuantityToReceiveRight = x.items[0].V_6550);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.MaxQtyToReceiveRight = x.items[0].V_6550);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.OrderQuantityRight = x.items[0].VHORQT);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.AlreadyProducedRight = x.items[0].VHRVQA);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.PalletRight = x.items[0].V_5000);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.KratRight = x.items[0].M4PANM);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.RemarkRight_ST = x.items[0].VHMAUN);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.FACI = x.items[0].VHFACI);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.PREA = x.items[0].V_6760);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.MTNOnameRight = x.items[0].Z1FUDS);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.MTNOQtyRight = x.items[0].VMCNQT);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.THTMin = x.items[0].V_6001);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.THTMAx = x.items[0].V_6002);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.THTMinKB = x.items[0].V_6004);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.THTMaxKB = x.items[0].V_6005);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.NAPQTY = x.items[0].NAPQTY);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.VHWHST = x.items[0].VHWHST);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.D1QT = x.items[0].V_5100);
      this.itemService.getProductionOrderRightDataEventEmitter().subscribe(x => this.MBWHSL = x.items[0].MBWHSL);

      this.itemService.setStockRight(this.MTNORight, this.itemService.MTNOStockLocationRight);
      this.itemService.NowCheckStockRight(this.MTNORight, this.itemService.MTNOStockLocationRight);
      this.itemService.setStockRight2(this.MTNORight2, this.itemService.MTNOStockLocationRight2);
      this.StockRight = '';
      this.StockSTAS = '';
      this.StockRight2 = '';
      this.itemService.getStockRightDataEventEmitter().subscribe(x => this.StockRight = Number(x.items[0].STQT).toFixed(0));
      this.itemService.getStockRightDataEventEmitter().subscribe(x => this.MTNOnameRight1 = x.items[0].ITDS);
      this.itemService.NowCheckStockRightDataEventEmitter().subscribe(x => this.StockSTAS = x.items[0].STAS);
      this.itemService.getStockRightDataEventEmitter2().subscribe(x => this.StockRight2 = Number(x.items[0].STQT).toFixed(0));
      this.itemService.getStockRightDataEventEmitter2().subscribe(x => this.MTNOnameRight2 = x.items[0].ITDS);
      this.itemService.setCheckConnectedOrdersRight(this.MTNORight, this.MFNORight)
      this.ConnectedOrderStatus = '';
      this.itemService.getConnectedOrderRightDataEventEmitter().subscribe(x => this.ConnectedOrderStatus = x.items[0].WHST)

      this.itemService.setCheckConnectedOrdersRight2(this.MFNORight)
      this.ConnectedOrderStatus2 = '';
      this.itemService.getConnectedOrderRight2DataEventEmitter().subscribe(x => this.ConnectedOrderStatus2 = x.items[0].TRQT)

      if (this.ExistingThTRight != "" && this.ExistingThTRight != "00-00-0000") {
         this.ExpirationDateRight = this.ExistingThTRight;
      }
      else {
         this.ExpirationDateRight = this.apiDateRight
      }


      this.isValid = true
   }

   async SetKarnummer(event: any) {
      this.Karnummer = this.KarnummerInput
   }

   async ReceiveQuantityRight(event: any) {
      this.startTime = new Date()
      this.stopTime = this.stopTime
      this.active = true
      this.timer()
      this.StockRight = "";
      this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight)
      this.itemService.setSelectedOrderRight(this.selectedProductionOrderNumberRight);

      this.isValid = false;

      if (this.ExistingThTRight != "00-00-0000") {
         this.ExpirationDateRight = this.ExistingThTRight
         this.apiDateRight = this.ExpirationDateRight;
         this.checkExpiDate = this.apiDateRight.substring(6, 10) + this.apiDateRight.substring(3, 5) + this.apiDateRight.substring(0, 2);
         this.ExpiApiDate = this.apiDateRight.substring(0, 2) + this.apiDateRight.substring(3, 5) + this.apiDateRight.substring(8, 10);
         this.WarningExpiDate = this.apiDateRight.substring(0, 2) + '-' + this.apiDateRight.substring(3, 5) + '-' + this.apiDateRight.substring(6, 10);
      } else {
         this.ExpirationDateRight = this.WarningExpiDate
      }
      if (this.ExistingLotcodeRight != "") {
         this.BANORight = this.ExistingLotcodeRight;
      }
      else {
         this.BANORight = this.apiBANORight
      }
      this.MAQA = Number(this.QuantityToReceiveRight);
      const MaxQtyToReceiveRight = Number(this.MaxQtyToReceiveRight);
      const CheckEmptyExpiDate = this.ExpirationDateRight
      this.itemService.setSelectedOrderRight(this.selectedProductionOrderNumberRight);
      this.itemService.setStockRight(this.MTNORight, this.itemService.MTNOStockLocationRight);
      this.itemService.setStockRight2(this.MTNORight2, this.itemService.MTNOStockLocationRight2);
      this.itemService.setCheckConnectedOrdersRight(this.MTNORight, this.MFNORight)
      this.itemService.setCheckConnectedOrdersRight2(this.MFNORight)

      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000)
      const MTNORight = this.selectedRow['VMMTNO'];
      const RemainToReceive = Number(this.RemainToReceiveRight);
      const AlreadyProduced = Number(this.AlreadyProducedRight);
      const FACI = this.FACI;
      const MFNO = this.selectedRow['VOMFNO'];
      const PRNO = this.selectedRow['VOPRNO'];
      const PREA = this.PREA;
      const RORN = this.MFNORight
      const NAPQTY = this.NAPQTY;
      const STAQ = Number(this.StockRight);
      const MTNOQtyRight = Number(this.MTNOQtyRight);
      const StockSTAS = this.StockSTAS;
      const STAQ2 = Number(this.StockRight2);
      const WHSL = this.itemService.MTNOStockLocationRight;
      const WHSL2 = this.itemService.MTNOStockLocationRight2;
      this.itemService.getConnectedOrderRightDataEventEmitter().subscribe(x => this.ConnectedOrderStatus = x.items[0].WHST)
      const VHWHST = this.VHWHST;
      const WHST = this.ConnectedOrderStatus;
      this.itemService.getConnectedOrderRight2DataEventEmitter().subscribe(x => this.ConnectedOrderStatus2 = x.items[0].TRQT)
      const WHST2 = this.ConnectedOrderStatus2
      const BRE2 = this.itemService.MachineRight;
      const D1QT = Number(this.D1QT);
      this.KarnummerInput = '';
      this.Karnummer = '';

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
               if ((this.itemService.MachineRight === "BSL" || this.itemService.MachineRight === "BCD") && (this.BANORight === '' || !this.BANORight)) {
                  this.showMessageModal2('Partijnummer niet gevuld', 'Lotcode not filled  ', 'ThT nie jest wypełniony');
                  this.isValid = true;
                  return;
               }
               if (this.itemService.MachineRight === "BSL" || this.itemService.MachineRight === "BCD") {
                  const NewBANO = (this.BANORight.substring(0, 6) + '-' + this.ExpiApiDate.substring(0, 2)).toUpperCase();
                  this.showMessageModal('ThT en Lotcode akkoord?', ' ThT and Lot code approved?', 'Zatwierdzone kody ThT i Lot?', 'ThT &emsp;&emsp;&emsp;:&ensp;' + this.WarningExpiDate, 'Lotcode &emsp;&nbsp;:&ensp;' + NewBANO);
               } else {
                  const NewBANO = this.selectedRow['V_3010'].substring(0, 7) + this.ExpiApiDate.substring(0, 2);
                  this.showMessageModal('ThT en Lotcode akkoord?', ' ThT and Lot code approved?', 'Zatwierdzone kody ThT i Lot?', 'ThT &emsp;&emsp;&emsp;:&ensp;' + this.WarningExpiDate, 'Lotcode &emsp;&nbsp;:&ensp;' + NewBANO);
               }

            } else {
               if (this.MAQA > RemainToReceive && NAPQTY > 0) {
                  this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight)
                  this.showMessageModal2('Aantal te groot! Op deze order kunnen nog maximaal ' + RemainToReceive + ' stuks worden ontvangen', 'Quantity to large! Max. ' + RemainToReceive + ' pieces can be received on this order', 'Ilość za duża! w ramach tego zamówienia może być maksymalnie ' + RemainToReceive + ' sztuk')
                  this.isValid = true;
                  return;
               } else {
                  if (this.MAQA > D1QT) {
                     this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight)
                     this.showMessageModal2('Aantal te groot! Maximaal ' + MaxQtyToReceiveRight + ' per pallet', 'Quantity too large! Maximum ' + MaxQtyToReceiveRight + ' per pallet', 'Ilość za duża! Maksymalnie ' + MaxQtyToReceiveRight + ' na paletę');
                  } else {
                     if (RORN != '' && (STAQ <= 0 || !STAQ)) {
                        if (WHST === "90") {
                           this.showMessageModal2('Gekoppelde order reeds afgesloten!', 'Connected order allready closed!', 'Blad przyporzadkowania zamówienia!');
                           this.isValid = true;
                           return;
                        } else {
                           if (!WHST) {
                              this.showMessageModal2('Gekoppelde order fout!', 'Connected order not OK!', 'Blad przyporzadkowania zamówienia!');
                              this.isValid = true;
                              return;
                           } else {
                              if (!WHST2) {
                                 this.showMessageModal2('Gekoppelde order nog niet actief!', 'Connected order not yet active!', 'Blad przyporzadkowania zamówienia!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 //set SPMT to 2
                                 if (this.MAQA <= MaxQtyToReceiveRight) {
                                    const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 } else {
                                    //extra enter tbv overproductie
                                    const mformsResponse2 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                 }
                              }
                           }
                        }
                     } else {
                        if ((this.itemService.MachineRight === "BSL" && STAQ <= 0) || (this.itemService.MachineRight === "BCD" && (STAQ <= 0 || STAQ2 <= 0))) {
                           this.showMessageModal2('Geen voorraad!', 'Not enough stock!', 'Wza mało zapasów!');
                           this.isValid = true;
                           return;
                        }
                        // if ((this.itemService.MachineRight === "BM1" || this.itemService.MachineRight === "BM2") && (STAQ2 <= 0)) {
                        //    this.showMessageModal2('Geen voorraad saus op machinelocatie!', 'No sauce stock at machine location!', 'Brak wywaru w miejscu maszyny!!');
                        //    this.isValid = true;
                        //    return;
                        // }
                        const MaxMAQA = STAQ / MTNOQtyRight
                        const MaxMAQA2 = STAQ2 / MTNOQtyRight
                        if ((this.itemService.MachineRight === "BSL" && MaxMAQA < this.MAQA)) {
                           this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                           this.isValid = true;
                           return;
                        }
                        if (this.itemService.MachineRight === "BCD" && (MaxMAQA < this.MAQA || MaxMAQA2 < this.MAQA)) {
                           if (MaxMAQA <= MaxMAQA2) {
                              this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                              this.isValid = true;
                              return;
                           } else {
                              this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA2 + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA2 + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA2 + ' sztuk');
                              this.isValid = true;
                              return;
                           }
                        }
                        if (StockSTAS === "3") { //&& this.itemService.MachineRight.startsWith("B")
                           this.showMessageModal2('Voorraad in trechter geblokkeerd!', 'Stock in funnel blocked!', 'Wsyp/podajnik w trakcie zablokowany!');
                           this.isValid = true;
                           return;
                        } else {
                           if (StockSTAS === "1") {
                              this.showMessageModal2('Voorraad in trechter onder inpectie!', 'Stock in funnel under inspection!', 'Wsyp/podajnik w trakcie sprawdzania!');
                              this.isValid = true;
                              return;
                           } else {
                              if (STAQ <= 0 || !STAQ) {
                                 this.showMessageModal2('Trechter leeg!', 'Funnel empty!', 'Wsyp/podajnik jest pusty!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 if (this.MBWHSL === "200PAST00") {
                                    this.ShowCAMU = true;
                                    await delay(500);
                                    const input = document.getElementById("input-Karnummer");
                                    input.focus();
                                    for (let i = 0; i < 100; i++) {
                                       input.focus();
                                       if (this.Karnummer == "" || !this.Karnummer) {
                                          await delay(1000);
                                          input.focus();
                                       }
                                    }
                                    this.ShowCAMU = false;
                                 }
                                 //set SPMT to 3 and WHSL to StockLocation
                                 this.StockFromFunnel = true
                                 if (this.MAQA <= MaxQtyToReceiveRight) {
                                    if (this.itemService.MachineRight === "BCD" || this.itemService.MachineRight === "BM1" || this.itemService.MachineRight === "BM2") {
                                       const mformsResponse5 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMMSEQ%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL2 + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                    } else {
                                       const mformsResponse3 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                    }
                                 } else {
                                    //extra enter tbv overproductie
                                    if (this.itemService.MachineRight === "BCD" || this.itemService.MachineRight === "BM1" || this.itemService.MachineRight === "BM2") {
                                       const mformsResponse6 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMMSEQ%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL2 + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                    }
                                    else {
                                       const mformsResponse4 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                    }
                                 }
                              }
                           }
                        }
                     }
                     for (let i = 0; i < 10; i++) {
                        this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight);
                        this.itemService.setSelectedOrderRight(this.selectedProductionOrderNumberRight);
                        this.StockRight = 0;
                        this.StockRight2 = 0;
                        this.itemService.setStockRight(MTNORight, this.itemService.MTNOStockLocationRight);
                        this.itemService.setStockRight2(this.MTNORight2, this.itemService.MTNOStockLocationRight2);
                        await delay(1000)
                        const StockBefore = Number(STAQ)
                        const StockAfter = Number(this.StockRight)
                        const AlreadyProducedAfter = Number(this.AlreadyProducedRight);

                        if ((AlreadyProducedAfter > AlreadyProduced && this.StockFromFunnel === false) || (AlreadyProducedAfter > AlreadyProduced && this.StockFromFunnel === true && StockAfter < StockBefore)) {
                           if (this.MBWHSL === "200PAST00") {
                              this.showMessageModal2(this.MAQA + ' stuks geregistreerd!', this.MAQA + ' pieces registered!', this.MAQA + ' liczba zarejestrowanych sztuk!')
                           } else {
                              this.showMessageModal2('Label voor ' + this.MAQA + ' stuks wordt geprint!', 'Label is printing!', 'Etykieta jest drukowana!')
                           }
                           this.messageModal2.afterClose(() => {
                           })
                           await delay(5000)
                           this.isValid = true;
                           return;
                        } else {
                           await delay(1500)
                        }
                     }

                     const StockBefore = Number(STAQ)
                     const StockAfter = Number(this.StockRight)
                     this.showMessageModal2('Ontvangst niet uitgevoerd! Probeer opnieuw of vraag hulp.', 'Reception not carried out! Please try again or ask for help.', 'Odbiór nie został przeprowadzony! Spróbuj ponownie lub poproś o pomoc.')
                     this.messageModal2.afterClose(() => {
                        this.isValid = true;
                     })
                  }
               }
            }
         }
         await delay(1000)
         this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight)
         this.itemService.setSelectedOrderRight(this.selectedProductionOrderNumberRight);
         this.itemService.setStockRight(MTNORight, WHSL);
         this.itemService.setStockRight2(this.MTNORight2, this.itemService.MTNOStockLocationRight2);
         await delay(1000)
         this.itemService.getStockRightDataEventEmitter().subscribe(x => this.StockRight = Number(x.items[0].STQT).toFixed(0));
         this.itemService.getStockRightDataEventEmitter2().subscribe(x => this.StockRight2 = Number(x.items[0].STQT).toFixed(0));
         // this.isValid = true
      }
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
                  const MaxQtyToReceiveRight = Number(this.MaxQtyToReceiveRight);
                  this.itemService.setSelectedOrderRight(this.selectedProductionOrderNumberRight);
                  this.itemService.setStockRight(this.MTNORight, this.itemService.MTNOStockLocationRight);
                  const delay = ms => new Promise(res => setTimeout(res, ms));
                  const MTNORight = this.selectedRow['VMMTNO'];
                  const RemainToReceive = Number(this.RemainToReceiveRight);
                  const AlreadyProduced = Number(this.AlreadyProducedRight);
                  const RORN = this.MFNORight
                  const NAPQTY = this.NAPQTY;
                  const STAQ = Number(this.StockRight);
                  const MTNOQtyRight = Number(this.MTNOQtyRight);
                  const StockSTAS = this.StockSTAS;
                  const STAQ2 = Number(this.StockRight2)
                  const checkExpiDate = this.checkExpiDate;
                  const THTMin = this.THTMin;
                  const THTMax = this.THTMAx;
                  const THTMinKB = this.THTMinKB;
                  const THTMaxKB = this.THTMaxKB;
                  const WHSL = this.itemService.MTNOStockLocationRight;
                  const WHSL2 = this.itemService.MTNOStockLocationRight2;
                  const WHST = this.ConnectedOrderStatus;
                  const WHST2 = this.ConnectedOrderStatus2
                  const BRE2 = this.itemService.MTNOStockLocationRight.substring(6, 12);
                  const D1QT = Number(this.D1QT);

                  //set ThT en BANO

                  if (this.ExistingThTRight != "00-00-0000") {
                     this.ExpirationDateRight = this.ExistingThTRight
                     this.apiDateRight = this.ExpirationDateRight;
                     this.checkExpiDate = this.apiDateRight.substring(6, 10) + this.apiDateRight.substring(3, 5) + this.apiDateRight.substring(0, 2);
                     this.ExpiApiDate = this.apiDateRight.substring(0, 2) + this.apiDateRight.substring(3, 5) + this.apiDateRight.substring(8, 10);
                     this.WarningExpiDate = this.apiDateRight.substring(0, 2) + '-' + this.apiDateRight.substring(3, 5) + '-' + this.apiDateRight.substring(6, 10);
                  } else {
                     this.ExpirationDateRight = this.WarningExpiDate
                  }

                  if ((!this.itemService.MachineRight.startsWith("B") && (checkExpiDate < THTMin || checkExpiDate > THTMax)) || (this.itemService.MachineRight.startsWith("B") && (checkExpiDate < THTMinKB || checkExpiDate > THTMaxKB))) {
                     this.showMessageModal2('ThT ' + this.WarningExpiDate + ' valt buiten bereik', 'Experation date ' + this.WarningExpiDate + ' is out of range', 'Data ważności ' + this.WarningExpiDate + ' jest poza zakresem');
                  } else {
                     if (this.itemService.MachineRight === "BCD" || this.itemService.MachineRight === "BSL") {
                        const NewBANO = (this.BANORight.substring(0, 6) + '-' + this.ExpiApiDate.substring(0, 2)).toUpperCase();
                        const mformsResponse = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WHFACI%22%3e' + FACI + '%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WHBANO%22%3e' + NewBANO + '%3c%2ffield%3e%3cfield+name%3d%22WWMEXP%22%3e' + EXPI + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                        await delay(500);
                     } else {
                        const NewBANO = this.selectedRow['V_3010'].substring(0, 7) + this.ExpiApiDate.substring(0, 2);
                        const mformsResponse = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WHFACI%22%3e' + FACI + '%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WHBANO%22%3e' + NewBANO + '%3c%2ffield%3e%3cfield+name%3d%22WWMEXP%22%3e' + EXPI + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                        await delay(500);
                     }




                     if (this.MAQA > RemainToReceive && NAPQTY > 0) {
                        this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight)
                        this.showMessageModal2('Aantal te groot! Op deze order kunnen nog maximaal ' + RemainToReceive + ' stuks worden ontvangen', 'Quantity to large! Max. ' + RemainToReceive + ' pieces can be received on this order', 'Ilość za duża! w ramach tego zamówienia może być maksymalnie ' + RemainToReceive + ' sztuk')
                     } else {
                        if (this.MAQA > D1QT) {
                           this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight)
                           this.showMessageModal2('Aantal te groot! Maximaal ' + MaxQtyToReceiveRight + ' per pallet', 'Quantity too large! Maximum ' + MaxQtyToReceiveRight + ' per pallet', 'Ilość za duża! Maksymalnie ' + MaxQtyToReceiveRight + ' na paletę');
                        } else {
                           if (RORN != '' && (STAQ <= 0 || !STAQ)) {
                              if (WHST === "90") {
                                 this.showMessageModal2('Gekoppelde order reeds afgesloten!', 'Connected order allready closed!', 'Blad przyporzadkowania zamówienia!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 if (!WHST) {
                                    this.showMessageModal2('Gekoppelde order fout!', 'Connected order not OK!', 'Blad przyporzadkowania zamówienia!');
                                    this.isValid = true;
                                    return;
                                 } else {
                                    if (!WHST2) {
                                       this.showMessageModal2('Gekoppelde order nog niet actief!', 'Connected order not yet active!', 'Blad przyporzadkowania zamówienia!');
                                       this.isValid = true;
                                       return;
                                    } else {
                                       //set SPMT to 2
                                       if (this.MAQA <= MaxQtyToReceiveRight) {
                                          const mformsResponse1 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                       } else {
                                          //extra enter tbv overproductie
                                          const mformsResponse2 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                       }
                                    }
                                 }
                              }
                           } else {
                              if ((this.itemService.MachineRight === "BSL" && STAQ <= 0) || (this.itemService.MachineRight === "BCD" && (STAQ <= 0 || STAQ2 <= 0))) {
                                 this.showMessageModal2('Geen voorraad!', 'Not enough stock!', 'Wza mało zapasów!');
                                 this.isValid = true;
                                 return;
                              }
                              // if ((this.itemService.MachineRight === "BM1" || this.itemService.MachineRight === "BM2") && (STAQ2 <= 0)) {
                              //    this.showMessageModal2('Geen voorraad saus op machinelocatie!', 'No sauce stock at machine location!', 'Brak wywaru w miejscu maszyny!!');
                              //    this.isValid = true;
                              //    return;
                              // }
                              const MaxMAQA = STAQ / MTNOQtyRight
                              const MaxMAQA2 = STAQ2 / MTNOQtyRight
                              if ((this.itemService.MachineRight === "BSL" && MaxMAQA < this.MAQA)) {
                                 this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                                 this.isValid = true;
                                 return;
                              }
                              if (this.itemService.MachineRight === "BCD" && (MaxMAQA < this.MAQA || MaxMAQA2 < this.MAQA)) {
                                 if (MaxMAQA <= MaxMAQA2) {
                                    this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA + ' sztuk');
                                    this.isValid = true;
                                    return;
                                 } else {
                                    this.showMessageModal2('Er kunnen maximaal ' + MaxMAQA2 + 'st. worden ontvangen', 'Quantity to large! Max. ' + MaxMAQA2 + ' pieces can be received with current stock', 'Ilość za duża! Maks. W aktualnych stanach magazynowych można otrzymać ' + MaxMAQA2 + ' sztuk');
                                    this.isValid = true;
                                    return;
                                 }
                              }
                              if (StockSTAS === "3") { //&& this.itemService.MachineRight.startsWith("B") {
                                 this.showMessageModal2('Voorraad in trechter geblokkeerd!', 'Stock in funnel blocked!', 'Wsyp/podajnik w trakcie zablokowany!');
                                 this.isValid = true;
                                 return;
                              } else {
                                 if (StockSTAS === "1") {
                                    this.showMessageModal2('Voorraad in trechter onder inpectie!', 'Stock in funnel under inspection!', 'Wsyp/podajnik w trakcie sprawdzania!');
                                    this.isValid = true;
                                    return;
                                 } else {
                                    if (STAQ <= 0 || !STAQ) {
                                       this.showMessageModal2('Trechter leeg!', 'Funnel empty!', 'Wsyp/podajnik jest pusty!');
                                       this.isValid = true;
                                       return;
                                    } else {
                                       if (this.MBWHSL === "200PAST00") {
                                          this.ShowCAMU = true;
                                          await delay(500);
                                          const input = document.getElementById("input-Karnummer");
                                          input.focus();
                                          for (let i = 0; i < 100; i++) {
                                             input.focus();
                                             if (this.Karnummer == "" || !this.Karnummer) {
                                                await delay(1000);
                                                input.focus();
                                             }
                                          }
                                          this.ShowCAMU = false;
                                       }
                                       //set SPMT to 3 and WHSL to StockLocation and delete WHRORN
                                       this.StockFromFunnel = true
                                       if (this.MAQA <= MaxQtyToReceiveRight) {
                                          if (this.itemService.MachineRight === "BM1" || this.itemService.MachineRight === "BM2") {
                                             const mformsResponse5 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMMSEQ%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL2 + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                          } else {
                                             const mformsResponse3 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                          }
                                       } else {
                                          //extra enter tbv overproductie
                                          if (this.itemService.MachineRight === "BM1" || this.itemService.MachineRight === "BM2") {
                                             const mformsResponse6 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMMSEQ%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL2 + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                          }
                                          else {
                                             const mformsResponse4 = this.formService.launch('mforms://_automation?data=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-8%22%3f%3e%3csequence%3e%3cstep+command%3d%22RUN%22+value%3d%22PMS100%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e11%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWFACI%22%3e200%3c%2ffield%3e%3cfield+name%3d%22WFWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22WTWHST%22%3e%3c%2ffield%3e%3cfield+name%3d%22W1OBKV%22%3e' + MFNO + '%3c%2ffield%3e%3cfield+name%3d%22W2OBKV%22%3e' + PRNO + '%3c%2ffield%3e%3cfield+name%3d%22WWPSEQ%22%3eE1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WWQTTP%22%3e2%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22SELROWS%22%3eR1%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22LSTOPT%22+value%3d%222%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WMWHSL%22%3e' + WHSL + '%3c%2ffield%3e%3cfield+name%3d%22WMSPMT%22%3e3%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+command%3d%22LSTOPT%22+value%3d%2251%22+%2f%3e%3cstep+command%3d%22AUTOSET%22%3e%3cfield+name%3d%22WLBRE2%22%3e' + BRE2 + '%3c%2ffield%3e%3cfield+name%3d%22WHCAMU%22%3e' + this.Karnummer + '%3c%2ffield%3e%3cfield +name%3d%22WHRVQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3cfield+name%3d%22WHMAQA%22%3e' + this.MAQA + '%3c%2ffield%3e%3c%2fstep%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22ENTER%22+%2f%3e%3cstep+command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep +command%3d%22KEY%22+value%3d%22F3%22+%2f%3e%3cstep+%2f%3e%3c%2fsequence%3e');
                                          }
                                       }
                                    }
                                 }
                              }
                           }
                           for (let i = 0; i < 10; i++) {
                              this.itemService.loadComponentRight(this.EANcodeRight, this.ProdApiDateRight);
                              this.itemService.setSelectedOrderRight(this.selectedProductionOrderNumberRight);
                              this.StockRight = 0;
                              this.itemService.setStockRight(MTNORight, WHSL);
                              this.itemService.setStockRight2(this.MTNORight2, this.itemService.MTNOStockLocationRight2);
                              await delay(1000)
                              const StockBefore = Number(STAQ)
                              const StockAfter = Number(this.StockRight)
                              const AlreadyProducedAfter = Number(this.AlreadyProducedRight);

                              if ((AlreadyProducedAfter > AlreadyProduced && this.StockFromFunnel === false) || (AlreadyProducedAfter > AlreadyProduced && this.StockFromFunnel === true && StockAfter < StockBefore)) {
                                 if (this.MBWHSL === "200PAST00") {
                                    this.showMessageModal2(this.MAQA + ' stuks geregistreerd!', this.MAQA + ' pieces registered!', this.MAQA + ' liczba zarejestrowanych sztuk!')
                                 } else {
                                    this.showMessageModal2('Label voor ' + this.MAQA + ' stuks wordt geprint!', 'Label is printing!', 'Etykieta jest drukowana!')
                                 }
                                 this.messageModal2.afterClose(() => {
                                 })
                                 await delay(5000)
                                 this.isValid = true;
                                 return;
                              } else {
                                 await delay(1500)
                              }
                           }

                           const StockBefore = Number(STAQ)
                           this.itemService.setStockRight(MTNORight, WHSL);
                           this.itemService.setStockRight2(this.MTNORight2, this.itemService.MTNOStockLocationRight2);
                           this.itemService.getStockRightDataEventEmitter().subscribe(x => this.StockRight = Number(x.items[0].STQT).toFixed(0));
                           this.itemService.getStockRightDataEventEmitter2().subscribe(x => this.StockRight2 = Number(x.items[0].STQT).toFixed(0));
                           const StockAfter = Number(this.StockRight)
                           this.showMessageModal2('Ontvangst niet uitgevoerd! Probeer opnieuw of vraag hulp.', 'Reception not carried out! Please try again or ask for help.', 'Odbiór nie został przeprowadzony! Spróbuj ponownie lub poproś o pomoc.')
                           this.messageModal2.afterClose(() => {
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
   startTime: Date;
   stopTime: Date;
   active: boolean = false
   get display() { return (this.startTime && this.stopTime) ? +this.stopTime - +this.startTime : 0 }

   timer() {
      if (this.active) {
         this.stopTime = new Date()
         setTimeout(() => {
            this.timer()
         }, 1000)
      }
   }
}
