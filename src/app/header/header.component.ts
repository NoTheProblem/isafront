import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showADMIN = false;
  showUSER = false;
  showSupplier = false;
  username: string;
  role: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.role = this.tokenStorageService.getUserType();
      this.username = this.tokenStorageService.getUsername();
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
