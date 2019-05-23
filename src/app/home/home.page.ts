import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalComponent } from "app/modal/modal.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private modal: ModalController) {}

  async openModal() {
    console.log("here");
    const modal = await this.modal.create({
      component: ModalComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
