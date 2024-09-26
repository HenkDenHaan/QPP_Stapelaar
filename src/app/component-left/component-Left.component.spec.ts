import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLeftComponent } from './component-Left.component';

describe('ComponentLeftComponent', () => {
   let component: ComponentLeftComponent;
   let fixture: ComponentFixture<ComponentLeftComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ComponentLeftComponent]
      })
         .compileComponents();

      fixture = TestBed.createComponent(ComponentLeftComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
