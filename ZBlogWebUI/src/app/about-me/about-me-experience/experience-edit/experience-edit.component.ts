import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from '../../about-me-sections.interface';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'zblog-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {
  expForm: FormGroup;
  exp: Experience;
  isAdd = false;
  get descriptions() {
    return this.expForm.get('descriptions') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private expService: ExperienceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(para => {
      if (+para.get('id') !== 0) {
        if (this.expService.exps$ === null) {
          this.expService.GetAll();
        }
        this.expService.exps$.subscribe(exps => {
          this.exp = exps?.find(exp => exp.id == +para.get('id'));
          this.initialiseForm();
        });
      } else {
        this.isAdd = true;
        this.initialiseForm();
      }
    });
  }

  initialiseForm() {
    this.expForm = this.fb.group({
      id: [{value: this.exp?.id, disabled: true}, Validators.required],
      companyName: [this.exp?.companyName, Validators.required],
      role: [this.exp?.role, Validators.required],
      location: [this.exp?.location, Validators.required],
      flag: this.exp?.flag,
      imgUrl: [this.exp?.imgUrl, Validators.required],
      startDate: [this.exp?.startDate, Validators.required],
      endDate: [this.exp?.endDate, Validators.required],
      descriptions: this.fb.array([]),
    });
    this.populateDescriptions();
  }

  populateDescriptions(): void {
    if (this.exp?.description != null) {
      this.exp.description.forEach(d => {
        this.descriptions.push(this.fb.group({
          intro: d?.intro,
          bulletPoints: this.fb.array(
            d?.bulletPoints
          ),
        }));
      });
    } else {
      this.descriptions.push(this.fb.group({
        intro: null,
        bulletPoints: this.fb.array([]),
      }));
    }
  }

  addDescription(): void {
    this.descriptions.push(this.fb.group({
      intro: null,
      bulletPoints: this.fb.array([]),
    }));
  }

  addBulletPoint(index: number): void {
    let pb = this.descriptions.controls[index].get('bulletPoints') as FormArray;
    pb.push(this.fb.control(''));
  }

  deleteDescription(index: number): void {
    this.descriptions.removeAt(index);
  }

  deleteBulletPoint(dIndex, bpIndex): void {
    let pb = this.descriptions.controls[dIndex].get('bulletPoints') as FormArray;
    pb.removeAt(bpIndex);
  }

  isValid(name: string): boolean {
    return this.expForm.get(name).touched && this.expForm.get(name).invalid;
  }

  delete(): void {
    this.expService.Delete(this.expForm.get('id').value);
    this.router.navigateByUrl('/aboutme/experience');
  }

  onSubmit(): void {
    let expToAdd: Experience = {
      id: this.expForm.get('id').value,
      companyName: this.expForm.get('companyName').value,
      role: this.expForm.get('role').value,
      location: this.expForm.get('location').value,
      flag: this.expForm.get('flag').value,
      imgUrl: this.expForm.get('imgUrl').value,
      startDate: this.expForm.get('startDate').value,
      endDate: this.expForm.get('endDate').value,
      description: this.expForm.get('descriptions').value
    }
    if (this.isAdd) {
      this.expService.Add(expToAdd);
    } else {
      this.expService.Update(expToAdd);
    }
    this.router.navigateByUrl('/aboutme/experience');
  }
}
