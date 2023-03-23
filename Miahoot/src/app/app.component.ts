import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Miahoot';
  public readonly user: Observable<User | null> = EMPTY;
  public isCharging: boolean;


  constructor(private auth: Auth,private router: Router) {
      this.user = authState(this.auth);
      this.isCharging=false;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
  }

  async login() {
    this.isCharging=true;
    const val = await signInWithPopup(this.auth, new GoogleAuthProvider());
    this.isCharging=false;
    return val;
  }

  async logout() {
    return signOut(this.auth);
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
