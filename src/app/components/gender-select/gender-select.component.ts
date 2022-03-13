import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-gender-select',
  templateUrl: './gender-select.component.html',
  styleUrls: ['./gender-select.component.scss'],
})
export class GenderSelectComponent implements OnInit {
  public popoverItems = [
    {
      icon: 'male-outline',
      name: 'Male',
    },
    {
      icon: 'female-outline',
      name: 'Female',
    },
    {
      icon: 'trash-outline',
      name: 'Clear filters',
    },
  ];

  @Input() itemSelected: string = '';

  constructor(public popoverCtrl: PopoverController) {}

  ngOnInit() {
    console.log('component - ', this.itemSelected);
  }

  selectGender(item) {
    if (item.name === 'Clear filters') {
      this.itemSelected = 'clear';
    } else {
      this.itemSelected = item.name;
    }

    this.popoverCtrl.dismiss(this.itemSelected);
  }
}
