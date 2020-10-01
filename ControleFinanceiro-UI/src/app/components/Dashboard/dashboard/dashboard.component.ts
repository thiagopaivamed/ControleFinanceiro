import { AuthGuardService } from './../../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdministrador: boolean;

  constructor(private authGuard: AuthGuardService) { }

  ngOnInit(): void {
    this.isAdministrador = this.authGuard.VerificarAdministrador();
  }

}
