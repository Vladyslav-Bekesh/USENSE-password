import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  minSymbols = 8;
  form = new FormGroup({
    title: new FormControl<string>(
      '',
      [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(this.minSymbols),
      ]
    )
  });

  constructor() { }

  ngOnInit(): void { }

  get title() { return this.form.controls.title as FormControl }

  submit() {
    console.log(this.form.value);
    console.log(this.title.errors);
  }
}
