import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appToggleDisableButton],',
})
export class ToggleDisableButtonDirective {
  private elementRef = inject(ElementRef);

  @Input() set disabled(isDisabled: boolean) {
    const submitButton = this.elementRef.nativeElement as HTMLButtonElement;

    if (isDisabled) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }
}
