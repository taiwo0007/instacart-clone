import { selectBranchCart } from './../../cart/store/cart.selector';
import { BranchCart } from './../../cart/store/cart.state';
import { selectBranchId } from 'src/app/branch/store/branch.selector';
import { CreateOrderRequest } from './../../order/models/create-order-request';
import { Address } from 'src/app/home/models/address.interface';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updateCustomer } from 'src/app/auth/store/auth.actions';
import { Customer } from 'src/app/auth/models/customer.model';
import { OrderService } from 'src/app/order/services/order.service';
import { Router } from '@angular/router';
import { removeBranchCart } from 'src/app/cart/store/cart.actions';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  @Input() calculatedFee: any;

  error: string | null = null;
  stepsCompleted = [true, false, false, false, false];
  branchCart:BranchCart | null | undefined
  customerState:Customer | null | undefined;
  createOrderRequest:CreateOrderRequest | undefined;
  selectedDate:string | undefined;
  form: FormGroup = this.fb.group({
    deliveryTime: [null, Validators.required], // You can further customize this based on the structure of the selected date
    mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    paymentMethod: ["cash", Validators.required],
  });;
  email:string  | undefined;
  panelOpenState = true;
  authSub:Subscription | null = null;
  priamryAddress:Address | null | undefined ;
  branchId:number | null = null;
  constructor(private fb: FormBuilder,private store:Store<AppState>, private uiService:UiServiceService,
    private orderService:OrderService, private router: Router) {

  }

  ngOnInit(): void {
    this.store.select(selectBranchId).subscribe((branchId:number) => {   
      if(branchId){
       this.branchId = branchId
       this.store.select(selectBranchCart(branchId)).subscribe(data => {
        this.branchCart = data
         console.log("cartBranch",data)
                
        })
      }

    });


    this.authSub = this.store.select("auth").subscribe(auth => {
      this.priamryAddress = auth.primaryAddress;
      this.customerState = auth.customer;
      this.email = auth?.user?.email;

      if(this.customerState){
        this.form.patchValue({
        mobileNumber: this.customerState?.phoneNumber || '',
        firstName: this.customerState?.firstName || '',
        lastName: this.customerState?.lastName || '',
        
      });
      }
    })

    // this.uiService.placeOrder.subscribe(data => {
      
    //   if(data){
    //     this.onSubmit()
    //   }
    // })

    this.form.patchValue({
    
      deliveryTime: this.selectedDate,
      
    });

  }

  onSubmit() {

    console.log("customer state",this.customerState )

    if(!this.form.valid  && !this.customerState?.firstName){
      this.uiService.placeOrder.next(false)

      this.error = "Form is not valid";
      console.log("not valid form")
      console.log("not valid form",this.form.value)
      return;
    }


    let updatedCustomer: Customer | null = null;

      if(!this.customerState) {
        updatedCustomer = {
          id: null,
          phonePrefix: this.form.get('mobileNumber')?.value.substring(0,3),
          // Here you can include the updated properties from the form, for example:
          firstName: this.form.get('firstName')?.value,
          lastName: this.form.get('lastName')?.value,
          phoneNumber: this.form.get('mobileNumber')?.value,
          // Add other updated fields as needed
        };
    
        this.store.dispatch(updateCustomer({ customer: updatedCustomer }));
      }

      const order_items = this.branchCart?.cartItems?.map(item => {


        return {
          product:item.product,
          variation:item.product.variations.find(variation => variation.id === item.variation_id),
          quantity:item.quantity,
          total: item.total
        }

      })

      console.log("order_items",this.selectedDate)


    this.createOrderRequest = {
      branch_id: this.branchId ,
      quantity: this.branchCart?.quantity || 0,
      customer_email: this.email || '',
      order_items,
      customer: updatedCustomer,
      fees: this.calculatedFee,
      orderDate:this.selectedDate || ''
    }
    console.log("created order", this.createOrderRequest)

    this.orderService.createOrder(this.createOrderRequest).subscribe(data => {
      console.log("createOrDER",data)

      if(this.branchId){
        this.store.dispatch(removeBranchCart({branch_id:this.branchId}))

      }

      this.uiService.placeOrder.next(false)
      this.router.navigate(['order-complete'])
    })

    console.log(this.form.value);
  }

  opoenAddressModal(){
    this.uiService.isAddressModalOpened.next(true)
  }

  handleSelectedDate(date: any) {

    this.selectedDate = date.date
    this.form.patchValue({
      deliveryTime: date.date,
    });
  }
  
  completeStep(index: number): void {
    if (index < this.stepsCompleted.length - 1) {
      this.stepsCompleted[index + 1] = true;
    }
  }

}
