import { Component, OnInit } from '@angular/core';
import { Education } from '../../about-me-sections.interface';
import { EducationService } from '../education-services/education.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'zblog-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.css']
})
export class EducationEditComponent implements OnInit {
  eduForm: FormGroup;
  edu: Education;
  isAdd = true;
  toPresent = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private eduService: EducationService) { }

  ngOnInit(): void {
    this.initialiseForm();
    this.route.paramMap.subscribe(para => {
      if (+para.get('id') !== 0) {
        this.isAdd = false;
        this.eduService.edus$.subscribe(edus => {
          this.edu = edus?.find(edu => edu.id == +para.get('id'));
          if (this.edu != null) {
            this.populateForm();
          }
        });
      }
    });
  }

  initialiseForm() {
    this.eduForm = this.fb.group({
      id: [{value: '', disabled: true}, Validators.required],
      uniName: ['', Validators.required],
      degree: ['', Validators.required],
      courseName: ['', Validators.required],
      location: ['', Validators.required],
      flag: '',
      award: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      subjects: ['', Validators.required],
      imgCaption: ['', Validators.required],
      imgUrl: ['', Validators.required],
    });
  }

  populateForm(): void {
    this.eduForm.get('id').setValue(this.edu.id);
    this.eduForm.get('uniName').setValue(this.edu.uniName);
    this.eduForm.get('degree').setValue(this.edu.degree);
    this.eduForm.get('courseName').setValue(this.edu.courseName);
    this.eduForm.get('location').setValue(this.edu.location);
    this.eduForm.get('flag').setValue(this.edu.flag);
    this.eduForm.get('award').setValue(this.edu.award);
    this.eduForm.get('startDate').setValue(this.edu.startDate);
    this.eduForm.get('endDate').setValue(this.edu.endDate);
    this.eduForm.get('subjects').setValue(this.edu.subjects.join(';'));
    this.eduForm.get('imgCaption').setValue(this.edu.imgCaption);
    this.eduForm.get('imgUrl').setValue(this.edu.imgUrl);

    if (this.edu !== undefined ) {
      let date = this.edu.endDate as unknown as string;
      this.toPresent = date.includes('1000') ? true : false;
      this.toggleToPresent(this.toPresent);
    }
  }

  toggleToPresent(value: boolean): void {
    const endDateControl = this.eduForm.get('endDate');
    this.toPresent = value;
    if (this.toPresent) {
      endDateControl.disable();
    } else {
      endDateControl.enable();
    }
  }

  isValid(name: string): boolean {
    return this.eduForm.get(name).touched && this.eduForm.get(name).invalid;
  }

  toUtc(date: string): number {
    let dateArr = date.split('-');
    let year = parseInt(dateArr[0], 10);
    let month = parseInt(dateArr[1], 10);
    let day = parseInt(dateArr[2], 10);

    return Date.UTC(year, month-1, day);
  }

  delete(): void {
    this.eduService.Delete(this.eduForm.get('id').value);
    this.router.navigateByUrl('/aboutme/education');
  }

  onSubmit(): void {
    let startStr = this.eduForm.get('startDate').value;
    let endStr = this.eduForm.get('endDate').value;
    if (this.toPresent) {
      endStr='1000-01-01';
    }
    let eduToAdd: Education = {
      id: this.eduForm.get('id').value,
      uniName: this.eduForm.get('uniName').value,
      degree: this.eduForm.get('degree').value,
      courseName: this.eduForm.get('courseName').value,
      location: this.eduForm.get('location').value,
      flag: this.eduForm.get('flag').value,
      award: this.eduForm.get('award').value,
      startDate: new Date(this.toUtc(startStr)),
      endDate: new Date(this.toUtc(endStr)),
      subjects: this.eduForm.get('subjects').value.split(';'),
      imgCaption: this.eduForm.get('imgCaption').value,
      imgUrl: this.eduForm.get('imgUrl').value
    }
    if (this.isAdd) {
      this.eduService.Add(eduToAdd);
    } else {
      this.eduService.Update(eduToAdd);
    }
    this.router.navigateByUrl('/aboutme/education');
  }
}
