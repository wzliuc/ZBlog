import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experience } from '../../about-me-sections.interface';
import { ExperienceService } from '../experience-services/experience.service';

@Component({
  selector: 'zblog-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.css']
})
export class ExperienceEditComponent implements OnInit {
  expForm: FormGroup;
  exp: Experience;
  isAdd = true;
  toPresent = false;
  get descriptions() {
    return this.expForm.get('descriptions') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private expService: ExperienceService) { }

  ngOnInit(): void {
    this.initialiseForm();
    this.route.paramMap.subscribe(para => {
      if (+para.get('id') !== 0) {
        this.isAdd = false;
        this.expService.exps$.subscribe(exps => {
          this.exp = exps?.find(exp => exp.id == +para.get('id'));
          if (this.exp != null) {
            this.populateForm();
          }
        });
      }
    });
  }

  initialiseForm() {
    this.expForm = this.fb.group({
      id: [{value: '', disabled: true}, Validators.required],
      companyName: ['', Validators.required],
      role: ['', Validators.required],
      location: ['', Validators.required],
      flag: '',
      imgUrl: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      descriptions: this.fb.array([]),
    });
    this.descriptions.push(this.fb.group({
      intro: null,
      bulletPoints: this.fb.array([]),
    }));
  }

  populateForm(): void {
    this.expForm.get('id').setValue(this.exp.id);
    this.expForm.get('companyName').setValue(this.exp.companyName);
    this.expForm.get('role').setValue(this.exp.role);
    this.expForm.get('location').setValue(this.exp.location);
    this.expForm.get('flag').setValue(this.exp.flag);
    this.expForm.get('imgUrl').setValue(this.exp.imgUrl);
    this.expForm.get('startDate').setValue(this.exp.startDate);
    this.expForm.get('endDate').setValue(this.exp.endDate);
    if (this.exp?.description != null) {
      this.descriptions.removeAt(0);
      this.exp.description.forEach(d => {
        this.descriptions.push(this.fb.group({
          intro: d?.intro,
          bulletPoints: this.fb.array(
            d?.bulletPoints
          ),
        }));
      });
    }

    if (this.exp !== undefined ) {
      let date = this.exp.endDate as unknown as string;
      this.toPresent = date.includes('1000') ? true : false;
      this.toggleToPresent(this.toPresent);
    }
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

  toUtc(date: string): number {
    let dateArr = date.split('-');
    let year = parseInt(dateArr[0], 10);
    let month = parseInt(dateArr[1], 10);
    let day = parseInt(dateArr[2], 10);

    return Date.UTC(year, month-1, day);
  }

  delete(): void {
    this.expService.Delete(this.expForm.get('id').value);
    this.router.navigateByUrl('/aboutme/experience');
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
    this.router.navigateByUrl('/aboutme/experience');
  }
}
