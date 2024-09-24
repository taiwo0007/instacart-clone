import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { createAddressStart, updateAddressStart } from 'src/app/auth/store/auth.actions';
import { Address } from 'src/app/home/models/address.interface';
import { AppState } from 'src/app/store/app.reducer';


@Component({
  selector: 'app-address-edit-form',
  templateUrl: './address-edit-form.component.html',
  styleUrls: ['./address-edit-form.component.css']
})
export class AddressEditFormComponent implements OnInit, AfterViewInit {
  addressForm: FormGroup;
  @Input() addressToEdit: Address | undefined;
  address: Address | undefined;
  email: string | undefined;
  userSub: Subscription | undefined;
  loading: boolean = false
  setAsPrimaryAddress = false;
  primaryAddress: Address | undefined;
  primaryAddressSub: Subscription | undefined;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,

  ) {
    this.addressForm = this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: [''],
      country: [''],
      isPrimaryAddress: [false],

    });
  }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {



    this.userSub = this.store
      .select('auth')
      .subscribe(state => {

        if (state.user) {
          this.email = state.user.email
        }
        if (state.primaryAddress) {

          this.primaryAddress = state.primaryAddress;
        }

        this.loading = state.addressLoading

      })




    if (this.addressToEdit) {
      this.addressForm.patchValue({
        addressLine1: this.addressToEdit.addressLine1 || '',
        addressLine2: this.addressToEdit.addressLine2 || '',
        city: this.addressToEdit.city || '',
        state: this.addressToEdit.state || '',
        postalCode: this.addressToEdit.postalCode || '',
        country: this.addressToEdit.country || '',
        isPrimaryAddress: this.primaryAddress?.id === this.addressToEdit.id
      });

      if (this.addressToEdit.id === this.primaryAddress?.id) {
        this.addressForm.get('isPrimaryAddress')?.disable();
      } else {
        this.addressForm.get('isPrimaryAddress')?.enable();
      }


    }



  }

  // @ts-ignore
  public handleAddressChange(place: google.maps.places.PlaceResult) {
    // Do some stuff
    console.log(place)
  }


  onSubmit() {


    console.log("onSubmit")


    console.log("this.addressForm.valid", this.addressForm.valid)
    console.log("this.email", this.email)
    console.log("this.addressToEdit", this.addressToEdit)

    if (this.addressForm.valid && this.email && !this.addressToEdit) {

      const formValues = this.addressForm.value;
      this.address = {
        id: null,
        formattedAddress: `${formValues.addressLine1}, ${formValues.addressLine1},${formValues.townCity}`,
        addressLine1: formValues.addressLine1,
        addressLine2: formValues.addressLine2,
        city: formValues.city,
        state: formValues.state,
        postalCode: formValues.postalCode,
        country: formValues.country,
        longitude: null,
        latitude: null
      }

      console.log("in if check")

      this.store.dispatch(createAddressStart({ address: this.address, email: this.email }))
    }

    if (this.addressToEdit && this.addressForm.valid && this.email) {

      const formValues = this.addressForm.value;
      this.address = {
        id: this.addressToEdit.id,
        formattedAddress: `${formValues.addressLine1}, ${formValues.addressLine1},${formValues.townCity}`,
        addressLine1: formValues.addressLine1,
        addressLine2: formValues.addressLine2,
        city: formValues.city,
        state: formValues.state,
        postalCode: formValues.postalCode,
        country: formValues.country,
        longitude: null,
        latitude: null
      }

      console.log("set as primar", formValues.isPrimaryAddress)

      this.store.dispatch(
        updateAddressStart(
          {
            address: this.address,
            email: this.email,
            setAsPrimaryAddress: formValues.isPrimaryAddress
          }))


    }


    console.log("EBNFD")

  }



}
