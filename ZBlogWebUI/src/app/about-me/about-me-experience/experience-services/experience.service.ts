import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Experience } from '../../about-me-sections.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private expUrl = 'http://localhost:7070/experience';
  public expsSubj = new BehaviorSubject<Experience[]>(null);
  public exps$: Observable<Experience[]> = this.expsSubj.asObservable();

  constructor(private http: HttpClient) { 
  }

  public GetAll(): void {
    this.http.get<Experience[]>(this.expUrl).subscribe( 
      data => {
        this.expsSubj.next(data);
      }, 
      err => {
        console.log("Failed to get experience: ", err)
      }
    );
  }

  public Add(expToAdd: Experience): void {
    this.http.post<Experience>(this.expUrl, expToAdd).subscribe( 
      data => {
        this.GetAll();
      }, 
      err => {
        console.log("Failed to add experience: ", err)
    });
  }

  public Update(expToUpdate: Experience): void {
    const putUrl = this.expUrl + '/' + expToUpdate.id;
    this.http.put<Experience>(putUrl, expToUpdate).subscribe( 
      data => {
        this.GetAll();
      },
      err => {
        console.log("Failed to update experience: ", err)
    });
  }

  public Delete(expId: number): void {
    const deleteUrl = this.expUrl + '/' + expId;
    this.http.delete(deleteUrl).subscribe( 
      data => {
        this.GetAll();
      },
      err => {
        console.log("Failed to delete experience: ", err)
    });
  }
}
