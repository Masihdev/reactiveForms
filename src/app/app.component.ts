import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactiveForms';

  reactiveForm: FormGroup;

  gender = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' },
    { id: '3', value: 'Other' }
  ]

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null, [Validators.required, Validators.minLength(5), this.noSpaceAllowed]),
        lastname: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
        email: new FormControl(null, [Validators.required, Validators.email])
      }),
      
      gender: new FormControl('Female'),
      country: new FormControl('usa'),
      hobbies: new FormControl(null),
      
      skills: new FormArray([
        new FormControl(null, Validators.required),
      ])
    });

    // this.reactiveForm.get('personalDetails.firstname').valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    // this.reactiveForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.reactiveForm.statusChanges.subscribe((value) => {
      console.log(value);
      
    });
  }

  onSubmit() {
    console.log(this.reactiveForm);
  }

  addSkill() {
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }

  noSpaceAllowed(control: FormControl) {
    if(control.value != null && control.value.indexOf(' ') != -1) {
      return {noSpaceAllowed: true}
    }
    return null;
  }


}
