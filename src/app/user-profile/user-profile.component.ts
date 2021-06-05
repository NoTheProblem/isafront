import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../services/userProfile.service';
import {UserModel} from '../model/user.model';
import {TokenStorageService} from '../_services/token-storage.service';
import {PasswordChangerModel} from '../model/passwordChanger.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: UserModel;
  showPWChange = false;
  form: any = {};
  private pw: PasswordChangerModel;
  error = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit(): void {
    this.userProfileService.getUserInfo(this.tokenStorageService.getUsername())
      .subscribe((userModel: UserModel) => {
        this.user = userModel;
      });
  }

  updateProfile(form: any): void {
    if ( form.lastName){
      this.user.lastName = form.lastName;
    }
    if (form.firstName){
      this.user.firstName = form.firstName;
    }
    if (form.username){
      this.user.username = form.username;
    }
    if (form.email){
      this.user.email = form.email;
    }
    if (form.phoneNumber){
      this.user.phoneNumber = form.phoneNumber;
    }
    if (form.address){
      this.user.address = form.address;
    }
    if (form.city){
      this.user.city = form.city;
    }
    if (form.country){
      this.user.country = form.country;
    }
    this.userProfileService.updateProfile(this.user);

  }

  resetPassword(): void {
    this.error = false;
    if (this.form.confrmPassword !== this.form.password){
      this.error = true;
      return;
    }
    this.pw = new PasswordChangerModel(this.form.oldPassword, this.form.password);
    this.userProfileService.changePassword(this.pw);
    this.showPWChange = false;
  }
}
