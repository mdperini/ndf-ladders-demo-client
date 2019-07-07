import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  readonly serverUrl = environment.serverUrl + '/preferences';

  constructor(private http: HttpClient) { }

  getUserPreferences() {
    return this.http.get(this.serverUrl);
  }

  saveUserPreferences(layout) {
    return this.http.post(this.serverUrl, layout);
  }
}
