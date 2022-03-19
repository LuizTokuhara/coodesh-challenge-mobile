import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.hideSplash();
  }

  async hideSplash() {
    if (this.platform.ready() && this.platform.is('hybrid')) {
      if (this.platform.is('android')) {
        await StatusBar.setOverlaysWebView({ overlay: true });
      }
      await StatusBar.setStyle({ style: Style.Light });
      await SplashScreen.hide({
        fadeOutDuration: 2000,
      });
    }
  }
}
