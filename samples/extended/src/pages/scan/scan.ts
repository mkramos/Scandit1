import { Component, NgZone, ViewChild } from '@angular/core';
import { Content, Events } from 'ionic-angular';

import { Enums } from '../../providers/enums';
import { Scanner } from '../../providers/scanner';

@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {
  @ViewChild(Content) content: Content;

  public isScanning: boolean;
  public scannedCodes;

  public scannerPlaceholderHeight = '200px';

  private onStateChangeHandler: Function;

  private shouldBeScanning: boolean;

  private ScannerState;

  constructor(
    private zone: NgZone,
    private events: Events,
    private scanner: Scanner,
    private enums: Enums,
  ) {
    this.ScannerState = this.enums.ScannerState;

    this.onStateChangeHandler = (state) => {
      this.handleStateChange(state);
    }

    this.isScanning = false;
  }

  public ionViewWillEnter(): void {
    this.subscribe();
    this.scanner.didScan = (session) => {
      this.handleScan(session);
    }
  }
  
  public onPause(): void {
    this.shouldBeScanning = false;
  }
  
  public onResume(): void {
    this.shouldBeScanning = true;
  }

  public ionViewDidEnter(): void {
    this.startScanner();
    this.setScannerConstraints();
  }

  public ionViewWillLeave(): void {
    this.unsubscribe();
  }

  public continueScanning(): void {
    this.setScannedCodes(undefined);
    this.scanner.resume();
  }

  private subscribe(): void {
    this.events.subscribe(this.scanner.event.stateChange, this.onStateChangeHandler);
    document.addEventListener('pause', this.onPause, false);
    document.addEventListener('resume', this.onResume, false);
  }

  private unsubscribe(): void {
    this.events.unsubscribe(this.scanner.event.stateChange, this.onStateChangeHandler);
  }

  private startScanner(): void {
    const checkScannerIsActive = () => {
      setTimeout(() => {
        if (this.shouldBeScanning && this.scanner.isStopped()) {
          this.startScanner();
          console.warn('expected scanner state to be active, starting scanner again...');
          // this could happen e.g. when when stop/start is called quickly after each other, such as when changing tabs quickly
        }
      }, 1000);
    };

    this.setScannedCodes(undefined);
    this.setScannerConstraints();

    this.scanner.start();

    checkScannerIsActive();
  }

  private setScannerConstraints(): void {
    const top = this.content.contentTop;
    if (top === undefined) {
      setTimeout(this.setScannerConstraints.bind(this), 500);
    }

    const topConstraint = top || 0;
    const rightConstraint = 0;
    const bottomConstraint = '50%';
    const leftConstraint = 0;

    this.scannerPlaceholderHeight = `calc(50vh - ${top}px)`;

    this.scanner.setConstraints(topConstraint, rightConstraint, bottomConstraint, leftConstraint);
    this.scanner.clampActiveScanningArea();
  }

  private handleScan(session): void {
    this.setScannedCodes(session.newlyRecognizedCodes);
    this.scanner.pause();
  }

  private setScannedCodes(codes: any[]): void {
    this.zone.run(() => {
      this.scannedCodes = codes;
    });
  }

  private handleStateChange(state): void {
    this.zone.run(() => {
      this.isScanning = state === this.ScannerState.active;
    });
  }
}
