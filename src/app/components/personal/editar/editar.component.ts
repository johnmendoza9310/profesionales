import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from "../../../services/personal.service";
import { ActivatedRoute } from '@angular/router';
import { PersonalComponent } from "./../personal.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  idProfesional;



  profesionals:any=[];
  profesional:any=[];
   
  
  forma:FormGroup;
  

  constructor( private fb: FormBuilder, 
               private personalService:PersonalService,
               private route:ActivatedRoute,
               private personalComponent:PersonalComponent) {


                this.idProfesional = this.route.snapshot.paramMap.get("id");

                this.createForm();
                
                this.getProfesionals();
                this.getProfesional();
                
        

    this.idProfesional = this.route.snapshot.paramMap.get("id");
    
   
    

    
   }

  ngOnInit(){

    //this.getProfesional();
    
  }


  

  createForm(){

    this.forma = this.fb.group({
      _method: "PUT",
      municipality  : ['',   [Validators.required]  ],
      gender : ['',   [Validators.required] ],
      career : ['',   [Validators.required, Validators.minLength(1)]  ],
      first_name  : ['',   [Validators.required, Validators.minLength(1)]  ],
      second_name  : ['',   [Validators.required, Validators.minLength(1)]  ],
      first_lastname  : ['',   [Validators.required, Validators.minLength(1)]  ],
      second_lastname  : ['',   [Validators.required, Validators.minLength(1)]  ],
      document_number  : ['',   [Validators.required, Validators.minLength(1)]  ],
      birth  : ['',   [Validators.required]  ],
      celphone  : ['',   [Validators.required, Validators.minLength(1)]  ],
      telephone  : ['',   [Validators.required, Validators.minLength(1)]  ],

      vehicle: this.fb.group({
        name:['',Validators.required],
        brand  :['',Validators.required]
      }),


   
      

    })

  }




  getProfesional(){
    console.log("imprimiendo id", this.idProfesional);
    
    this.personalService.getOneprofesional(this.idProfesional)
    .subscribe ( (resp:any)=>{
      this.profesional=resp.data;
      this.cargarData();
      console.log("un profesional",resp.data);
      
      
      
      
    })
  }



getProfesionals(){
  this.personalService.getAllProfesionals()
  .subscribe ( resp=>{
    console.log(resp);
    this.profesionals=resp;
    
    
    
  })
}


 


 save(){




  if (this.forma.invalid) {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Faltan Campos por llenar',
    })

    console.log("formulario invalido");
    

    return Object.values(this.forma.controls).forEach(
      control=>{

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(  control=>{ control.markAllAsTouched()})
          
        }else{
          control.markAsTouched();
        }
      }
    )
    
  }





Swal.fire({
  title: 'Espere',
  text: 'Actualizando datos',
  icon: 'info',
  allowOutsideClick: false
});
Swal.showLoading();


this.personalService.updateProfesional(this.forma.value,this.idProfesional)
.subscribe( resp=>{
  console.log(resp);

  this.personalComponent.ngOnInit();



  if (resp) {
    Swal.fire(
      'Acci??n Correcta',
      'La informaci??n ha sido actualizada',
      'success'
    );
  
  
    }
  
})







  }





  cargarData(){

  
    


    this.forma.reset({

      _method: "PUT",
      career : "Digitar carrera",
      first_name  : this.profesional.first_name,
      second_name  : this.profesional.second_name,
      first_lastname  : this.profesional.first_lastname,
      second_lastname  : this.profesional.second_lastname,
      document_number  : this.profesional.document_number,
      celphone  : this.profesional.celphone,
      telephone  : this.profesional.telephone,
      birth: this.profesional.birth

   

    })
  }









}