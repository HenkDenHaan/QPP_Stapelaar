import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentRightComponent } from './component-Right.component';

describe('ComponentRightComponent', () => {
   let component: ComponentRightComponent;
   let fixture: ComponentFixture<ComponentRightComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [ComponentRightComponent]
      })
         .compileComponents();

      fixture = TestBed.createComponent(ComponentRightComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
