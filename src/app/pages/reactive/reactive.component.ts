import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent implements OnInit {

  form: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private validators: ValidatorsService) { 
    this.createForm();
    this.loadFormData();
    this.createListeners();
  }

  ngOnInit(): void {
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  get invalidName(){
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get invalidSurname(){
    return this.form.get('surname').invalid && this.form.get('surname').touched;
  }

  get invalidEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get invalidUser(){
    return this.form.get('user').invalid && this.form.get('user').touched;
  }

  get invalidDistrict(){
    return this.form.get('address.district').invalid && this.form.get('address.district').touched;
  }

  get invalidCity(){
    return this.form.get('address.city').invalid && this.form.get('address.city').touched;
  }

  get invalidPass1(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }

  get invalidPass2(){
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    return ( pass1 === pass2 ) ? false : true;
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      surname: ['', [Validators.required, this.validators.noTest]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      user: ['', , this.validators.existsUser], 
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      address: this.formBuilder.group({
        district: ['', Validators.required ],
        city: ['', Validators.required ],
      }),
      hobbies: this.formBuilder.array([])
    }, {
      validators: this.validators.samePasswords('pass1', 'pass2')
    });
  }

  createListeners() {
    this.form.get('name').valueChanges.subscribe( console.log );
  }

  loadFormData() {
    this.form.reset({
      name: 'Test name',
      surname: 'Surname',
      email: 'email@test.com',
      pass1: '123',
      pass2: '123',
      address: {
        district: 'District',
        city: 'City'
      }
    });
  }

  addHobby(){
    this.hobbies.push(this.formBuilder.control(''));
  }

  deleteHobby( i: number ) {
    this.hobbies.removeAt(i);
  }

  save() {
    if(this.form.invalid) {
      return Object.values(this.form.controls).forEach ( control => {
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    this.form.reset({
      name:'Without name'
    });
  }

}
