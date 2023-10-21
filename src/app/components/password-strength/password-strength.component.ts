import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-password-strength',
  styleUrls: ['./password-strength.component.css'],
  templateUrl: './password-strength.component.html',
})
export class PasswordStrengthComponent implements OnChanges {
  private gray = 'gray';
  private red = 'red';
  private yellow = 'yellow';
  private green = 'green';

  bar0: string = '';
  bar1: string = '';
  bar2: string = '';

  @Input() public passwordToCheck: string = '';

  constructor() { }

  private colors = [this.red, this.yellow, this.green];

  checkStrength(password: string) {
    let force = 0;

    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);

    const flags: boolean[] = [lowerLetters, numbers, symbols];

    flags.map((flag) => {
      if (flag) {
        force += 1;
      }
    });

    return force;
  }

  private getColor(strength: number) {
    return {
      index: strength,
      color: this.colors[strength - 1],
    };
  }

  private setBarColors(count: number, color: string) {
    for (let i = 0; i < count; i++) {
      (this as any)['bar' + i] = color;
    }
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;

    this.setBarColors(3, this.gray);

    if (password.length > 0 && password.length <= 7) {
      this.setBarColors(3, this.red);
      console.log('too short');
    }
    
    if (password.length >= 8) {
      console.log('cheking...');
      const { index, color } = this.getColor(this.checkStrength(password));
      this.setBarColors(index, color);
    }
  }
}
