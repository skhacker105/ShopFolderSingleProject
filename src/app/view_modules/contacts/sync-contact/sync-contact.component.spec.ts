import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncContactComponent } from './sync-contact.component';

describe('SyncContactComponent', () => {
  let component: SyncContactComponent;
  let fixture: ComponentFixture<SyncContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SyncContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
