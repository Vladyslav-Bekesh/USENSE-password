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
  bar0: string = '';
  bar1: string = '';
  bar2: string = '';

  @Input() public passwordToCheck: string = '';

  @Output() passwordStrength = new EventEmitter<boolean>();

  private gray = 'bg-gray-400';
  private red = 'bg-red-600';
  private yellow = 'bg-yellow-500';
  private green = 'bg-green-600';

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
    }
    if (password.length >= 8) {
      const { index, color } = this.getColor(this.checkStrength(password));
      this.setBarColors(index, color);
    }
  }
}
