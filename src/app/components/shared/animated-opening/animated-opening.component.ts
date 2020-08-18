import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Film} from "../model/film";

@Component({
  selector: 'app-animated-opening',
  templateUrl: './animated-opening.component.html',
  styleUrls: ['./animated-opening.component.scss']
})
export class AnimatedOpeningComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Film) {}

}
