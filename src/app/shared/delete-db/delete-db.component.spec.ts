import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDBComponent } from './delete-db.component';

describe('DeleteDBComponent', () => {
  let component: DeleteDBComponent;
  let fixture: ComponentFixture<DeleteDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
