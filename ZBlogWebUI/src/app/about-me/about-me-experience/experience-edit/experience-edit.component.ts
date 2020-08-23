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
  toPresent = false;
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
    if (this.exp !== undefined) {
      let date = this.exp.endDate as unknown as string;
      console.log(date.includes('1000'))
      this.toPresent = date.includes('1000') ? true : false;
    }
    this.expForm = this.fb.group({
      id: [{value: this.exp?.id, disabled: true}, Validators.required],
      companyName: [this.exp?.companyName, Validators.required],
      role: [this.exp?.role, Validators.required],
      location: [this.exp?.location, Validators.required],
      flag: this.exp?.flag,
      imgUrl: [this.exp?.imgUrl, Validators.required],
      startDate: [this.exp?.startDate, Validators.required],
      endDate: [{value: this.exp?.endDate, disabled: this.toPresent}, Validators.required],
      descriptions: this.fb.array([]),
    });
    this.populateDescriptions();
  }

  toggleToPresent(value: boolean): void {
    const endDateControl = this.expForm.get('endDate');
    this.toPresent = value;
    if (this.toPresent) {
      endDateControl.disable();
    } else {
      endDateControl.enable();
    }
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

  toUtc(date: string): number {
    let dateArr = date.split('-');
    let year = parseInt(dateArr[0], 10);
    let month = parseInt(dateArr[1], 10);
    let day = parseInt(dateArr[2], 10);

    return Date.UTC(year, month-1, day);
  }

  onSubmit(): void {
    let startStr = this.expForm.get('startDate').value;
    let endStr = this.expForm.get('endDate').value;
    if (this.toPresent) {
      endStr='1000-01-01';
    }
    let expToAdd: Experience = {
      id: this.expForm.get('id').value,
      companyName: this.expForm.get('companyName').value,
      role: this.expForm.get('role').value,
      location: this.expForm.get('location').value,
      flag: this.expForm.get('flag').value,
      imgUrl: this.expForm.get('imgUrl').value,
      startDate: new Date(this.toUtc(startStr)),
      endDate: new Date(this.toUtc(endStr)),
      description: this.expForm.get('descriptions').value
    }
    if (this.isAdd) {
      this.expService.Add(expToAdd);
    } else {
      this.expService.Update(expToAdd);
    }
    // this.router.navigateByUrl('/aboutme/experience');
  }
}
