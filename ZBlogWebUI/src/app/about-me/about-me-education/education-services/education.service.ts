import { Injectable } from '@angular/core';
import { Education } from '../../about-me-sections.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private eduUrl = 'http://localhost:7070/education';
  public edusSubj = new BehaviorSubject<Education[]>(null);
  public edus$: Observable<Education[]> = this.edusSubj.asObservable();

  constructor(private http: HttpClient) { 
  }

  public GetAll(): void {
    this.http.get<Education[]>(this.eduUrl).subscribe( 
      data => {
        this.edusSubj.next(data);
      }, 
      err => {
        console.log("Failed to get education: ", err)
      }
    );
  }

  public Add(eduToAdd: Education): void {
    this.http.post<Education>(this.eduUrl, eduToAdd).subscribe( 
      data => {
        this.GetAll();
      }, 
      err => {
        console.log("Failed to add education: ", err)
    });
  }

  public Update(eduToUpdate: Education): void {
    const putUrl = this.eduUrl + '/' + eduToUpdate.id;
    this.http.put<Education>(putUrl, eduToUpdate).subscribe( 
      data => {
        this.GetAll();
      },
      err => {
        console.log("Failed to update education: ", err)
    });
  }

  public Delete(eduId: number): void {
    const deleteUrl = this.eduUrl + '/' + eduId;
    this.http.delete(deleteUrl).subscribe( 
      data => {
        this.GetAll();
      },
      err => {
        console.log("Failed to delete education: ", err)
    });
  }
}
