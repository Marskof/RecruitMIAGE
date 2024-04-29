import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationProjetComponent } from './creation-projet.component';

describe('CreationProjetComponent', () => {
  let component: CreationProjetComponent;
  let fixture: ComponentFixture<CreationProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreationProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
