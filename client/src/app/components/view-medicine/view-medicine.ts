import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { MedicineService }
from '../../services/medicine.service';

@Component({
  selector: 'app-view-medicine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-medicine.html',
  styleUrls: ['./view-medicine.css']
})
export class ViewMedicineComponent
implements OnInit {

  medicine: any;

  constructor(
  private route: ActivatedRoute,
  private medicineService: MedicineService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.medicineService
        .getMedicineById(id)
        .subscribe({

      next: (data) => {

  console.log(data);

  this.medicine = data;

  this.cdr.detectChanges();
},

      error: (err) => {

        console.log(err);
      }
    });
  }

  getExpiryStatus(date: string) {

    const today =
      new Date();

    const expiry =
      new Date(date);

    const diffDays =
      Math.ceil(

        (
          expiry.getTime() -
          today.getTime()

        ) /

        (1000 * 60 * 60 * 24)
      );

    if(diffDays < 10) {

      return 'Expired';
    }

    if(diffDays <= 30) {

      return 'Expiring Soon';
    }

    return 'Valid';
  }
}