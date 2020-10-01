import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarCartaoComponent } from './atualizar-cartao.component';

describe('AtualizarCartaoComponent', () => {
  let component: AtualizarCartaoComponent;
  let fixture: ComponentFixture<AtualizarCartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarCartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
