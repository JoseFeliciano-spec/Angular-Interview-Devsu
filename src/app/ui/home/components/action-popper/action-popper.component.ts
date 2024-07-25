import {
  Component,
  Input,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActionPopperService } from '@/app/ui/home/services/action-popper.service';

@Component({
  selector: 'action-popper',
  standalone: true,
  imports: [],
  templateUrl: './action-popper.component.html',
  styleUrl: './action-popper.component.css',
})
export class ActionPopperComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Acciones';
  @Input() id!: string;
  isOpen = false;
  private subscription!: Subscription;

  constructor(
    private el: ElementRef,
    private popperManager: ActionPopperService
  ) {}

  ngOnInit() {
    this.subscription = this.popperManager.activePopper$.subscribe(
      (activePopper) => {
        if (activePopper !== this.id) {
          this.isOpen = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggle(event: Event) {
    event.stopPropagation();
    if (!this.isOpen) {
      this.popperManager.setActivePopper(this.id);
      this.isOpen = true;
    } else {
      this.popperManager.setActivePopper(null);
      this.isOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.popperManager.setActivePopper(null);
    }
  }
}
