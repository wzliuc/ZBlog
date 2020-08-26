import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Skill, SkillSet } from '../../about-me-sections.interface';
import { SkillService } from '../skill-services/skill.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'zblog-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent implements OnInit {
  skillForm: FormGroup;
  skill: Skill;
  isAdd = true;
  get sets() {
    return this.skillForm.get('sets') as FormArray;
  }

  constructor(private fb: FormBuilder,
            private route: ActivatedRoute,
            private router: Router,
            private skillService: SkillService) { }

  ngOnInit(): void {
    this.initialiseForm();
    this.route.paramMap.subscribe(para => {
      if (+para.get('id') !== 0) {
        this.isAdd = false;
        this.skillService.skills$.subscribe(skills => {
          this.skill = skills?.find(s => s.id == +para.get('id'));
          if (this.skill != null) {
            this.populateForm();
          }
        });
      }
    });
  }

  initialiseForm() {
    this.skillForm = this.fb.group({
      id: [{value: '', disabled: true}, Validators.required],
      type: ['', Validators.required],
      imgUrl: ['', Validators.required],
      sets: this.fb.array([]),
    });
    this.sets.push(this.fb.group({
      name: null,
      skills: null,
    }));
  }

  populateForm(): void {
    this.skillForm.get('id').setValue(this.skill.id);
    this.skillForm.get('type').setValue(this.skill.type);
    this.skillForm.get('imgUrl').setValue(this.skill.imgUrl);
    if (this.skill?.skillSets != null) {
      this.sets.removeAt(0);
      this.skill.skillSets.forEach(s => {
        this.sets.push(this.fb.group({
          name: s?.name,
          skills: s?.skills.join(';')
        }));
      });
    }
  }

  addSkillSet(): void {
    this.sets.push(this.fb.group({
      name: null,
      skills: null,
    }));
  }

  deleteSkillSet(index: number): void {
    this.sets.removeAt(index);
  }

  isValid(name: string): boolean {
    return this.skillForm.get(name).touched && this.skillForm.get(name).invalid;
  }

  delete(): void {
    this.skillService.Delete(this.skillForm.get('id').value);
    this.router.navigateByUrl('/aboutme/skill');
  }

  onSubmit(): void {
    let skillSets: SkillSet[] = this.skillForm.get('sets').value;
    skillSets.forEach(set => set.skills = (set.skills as unknown as string).split(';'));
    
    let skillToAdd: Skill = {
      id: this.skillForm.get('id').value,
      type: this.skillForm.get('type').value,
      imgUrl: this.skillForm.get('imgUrl').value,
      skillSets: this.skillForm.get('sets').value
    }
    console.log(skillToAdd);
    if (this.isAdd) {
      this.skillService.Add(skillToAdd);
    } else {
      this.skillService.Update(skillToAdd);
    }
    this.router.navigateByUrl('/aboutme/skill');
  }

}
