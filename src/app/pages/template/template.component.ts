import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class TemplateComponent implements OnInit {

  user = {
    name: 'Test name',
    surname: 'Surname',
    email: 'email@test.com',
    gender: 'F',
    country: 'ESP'
  };

  countries: any[] = [];

  constructor( private countryService: CountryService ) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe( countries => {
      this.countries = countries;
      this.countries.unshift({
        name: '[Select Country]',
        code: ''
      })
    });
  }

  save( form: NgForm ) {
    if(form.invalid) {
      Object.values(form.controls).forEach ( control => {
        control.markAsTouched();
      });
      return;
    }
  }

}
