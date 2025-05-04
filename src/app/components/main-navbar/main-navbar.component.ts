import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {

  constructor(private modalService: NgbModal) {}

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });

    modalRef.result.then(
      (result) => {
        console.log(`Modal closed with: ${result}`);
      },
      (reason) => {
        console.log(`Modal dismissed: ${reason}`);
      }
    );
  }

}
