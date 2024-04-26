import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: []
})

export class BasicPageComponent implements OnInit {
  ngOnInit(): void {
    // this.myForm.reset({

    // });
  }

  public isValidField(field:string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getFieldError(field:string):string | null {
    if(!this.myForm.controls[field]) return null;

    //in case we did not find the error, the value would be null, so return an object to avoid null reference exceptions
    const errors = this.myForm.controls[field].errors || {};
    console.info("Errors",errors);

    //Obtenemos las llaves del objeto para recorrerlas.
    for(const key of Object.keys(errors)) {
      console.info("key",key);
      switch (key) {
        case "required":
          return "Este campo es requerido."
        case "minlength":
          return `Este campo requiere mínimo ${errors['minlength'].requiredLength} letras.`
        case "min":
          return `Este campo debe ser ${errors['min'].min} o mayor.`
      }
    }
    return null;
  }


  constructor(private formBuilder:FormBuilder){}

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('',[],[])
  // })

  public myForm: FormGroup = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })


  onSave():void{
    console.info("OnSave");
    console.info("My form", this.myForm);
    if(this.myForm.invalid) {
      //Podemos marcar que todos los controles han sido tocados por el usuario para lanzar los mensajes
      //de las validaciones.
      this.myForm.markAllAsTouched();
      return;
    }

    console.log("Saving changes");
    console.log("myForm",this.myForm.value);

    this.myForm.reset({price:0,inStorage:0});
  }
}
