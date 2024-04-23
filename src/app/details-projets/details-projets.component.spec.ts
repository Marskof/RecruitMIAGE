import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjetsComponent } from './details-projets.component';

describe('DetailsProjetsComponent', () => {
  let component: DetailsProjetsComponent;
  let fixture: ComponentFixture<DetailsProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsProjetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
