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
    password: new FormControl<string>(
      '',
      [
        Validators.required,
        Validators.minLength(this.minSymbols),
      ]
    )
  });

  constructor() { }

  ngOnInit(): void { }

  get password() { return this.form.controls.password as FormControl }

  submit() {
    console.log(this.form.value);
    console.log(this.password.errors);
  }
}
