import { Component, NgZone, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

import { Scanner } from '../../providers/scanner';

@Component({
  selector: 'page-pickers',
  templateUrl: 'pickers.html'
})
export class PickersPage {
  @ViewChild(Content) content: Content;

  public scannedCodes;

  constructor(
    private zone: NgZone,
    private scanner: Scanner,
  ) {
  }

  public ionViewWillEnter(): void {
    this.scanner.didScan = (session) => {
      this.handleScan(session);
    }
  }

  public ionViewDidEnter(): void {
    this.stopScanning();
    this.setScannedCodes(undefined);
  }

  public startFullscreenScanner($event: MouseEvent): void {
    $event.stopPropagation();
    this.startScanner(0, 0, 0, 0);
  }

  public startCroppedScanner($event: MouseEvent): void {
    $event.stopPropagation();
    this.startScanner(
      this.content.contentHeight * 0.2,
      this.content.contentWidth * 0.2,
      this.content.contentHeight * 0.2,
      this.content.contentWidth * 0.2,
    );
  }

  public startLRCroppedScanner($event: MouseEvent): void {
    $event.stopPropagation();
    this.startScanner(
      0,
      this.content.contentWidth * 0.2,
      0,
      this.content.contentWidth * 0.2,
    );
  }

  public startTBCroppedScanner($event: MouseEvent): void {
    $event.stopPropagation();
    this.startScanner(
      this.content.contentHeight * 0.2,
      0,
      this.content.contentHeight * 0.2,
      0,
    );
  }

  public stopScanning(): void {
    this.scanner.stop();
  }

  private startScanner(top: Margin, right: Margin, bottom: Margin, left: Margin): void {
    this.scanner.setConstraints(top, right, bottom, left, 0.1);
    this.scanner.clampActiveScanningArea();
    this.scanner.start();
  }

  private setScannedCodes(codes: any[]): void {
    this.zone.run(() => {
      this.scannedCodes = codes;
    });
  }

  private handleScan(session): void {
    this.setScannedCodes(session.newlyRecognizedCodes);
    this.scanner.stop();
  }
}
