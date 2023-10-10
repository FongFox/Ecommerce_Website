import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup!: FormGroup;
  billingAddressStates: any;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddress: State[] = [];
  billingAddress: State[] = [];


  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService){ }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required,
                                        Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('',  [Validators.required,
                                        Validators.minLength(2),
                                        Luv2ShopValidators.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required,
                                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]) //regex code
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: new FormControl('',  [Validators.required,
                                      Validators.minLength(2),
                                      Luv2ShopValidators.notOnlyWhiteSpace]),
        city: new FormControl('',  [Validators.required,
                                    Validators.minLength(2),
                                    Luv2ShopValidators.notOnlyWhiteSpace]),
        state: [''],
        zipCode: new FormControl('', [Validators.required,
                                      Validators.minLength(2),
                                      Luv2ShopValidators.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cartType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log(`Retrive credit card months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      }
    );

    //populate credit card year
    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log(`Retrieved credit card year: ${JSON.stringify(data)}`);
        this.creditCardYears = data;
      }
    );

    //populate countries
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );
  }

  onSubmit() {
    console.log('Handle Submit button!!!');

    if(this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(`The Email address is ${this.checkoutFormGroup.get('customer')?.value.email}`);

    console.log(`The Shipping address country is ${this.checkoutFormGroup.get('shippingAddress')?.value.country.name}`);
    console.log(`The Shipping address state is ${this.checkoutFormGroup.get('shippingAddress')?.value.state.name}`);
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  copyShippingAddressToBillingAddress(event: Event) {
    if((event.target as HTMLInputElement).checked) {
        this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
        //bug fix code
        this.billingAddress = this.shippingAddress;
    } else {
        this.checkoutFormGroup.controls['billingAddress'].reset();
        //bug fix for states
        this.billingAddress = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    //if the current year equals the selected year, then start with the current month
    let startMonth: number;
    if(currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log(`Retrive credit card months: ${JSON.stringify(data)}`);
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddress = data;
        } else {
          this.billingAddress = data;
        }
        //select first item by default
        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }
}
