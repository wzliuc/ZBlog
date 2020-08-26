import { Injectable } from '@angular/core';
import { Skill } from '../../about-me-sections.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private skillUrl = 'http://localhost:7070/skill';
  public skillSubj = new BehaviorSubject<Skill[]>(null);
  public skills$: Observable<Skill[]> = this.skillSubj.asObservable();

  constructor(private http: HttpClient) { 
  }

  public GetAll(): void {
    this.http.get<Skill[]>(this.skillUrl).subscribe( 
      data => {
        this.skillSubj.next(data);
      }, 
      err => {
        console.log("Failed to get skill: ", err)
      }
    );
  }

  public Add(skillToAdd: Skill): void {
    this.http.post<Skill>(this.skillUrl, skillToAdd).subscribe( 
      data => {
        this.GetAll();
      }, 
      err => {
        console.log("Failed to add skill: ", err)
    });
  }

  public Update(skillToUpdate: Skill): void {
    const putUrl = this.skillUrl + '/' + skillToUpdate.id;
    this.http.put<Skill>(putUrl, skillToUpdate).subscribe( 
      data => {
        this.GetAll();
      },
      err => {
        console.log("Failed to update skill: ", err)
    });
  }

  public Delete(skillId: number): void {
    const deleteUrl = this.skillUrl + '/' + skillId;
    this.http.delete(deleteUrl).subscribe( 
      data => {
        this.GetAll();
      },
      err => {
        console.log("Failed to delete skill: ", err)
    });
  }
}
