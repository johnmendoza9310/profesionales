import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from "../../../services/personal.service";
import { ActivatedRoute } from '@angular/router';
import { PersonalComponent } from "./../personal.component";

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
      first_name  : ['',   [Validators.required, Validators.minLength(3)]  ],
      second_name  : ['',   [Validators.required, Validators.minLength(3)]  ],
      first_lastname  : ['',   [Validators.required, Validators.minLength(3)]  ],
      second_lastname  : ['',   [Validators.required, Validators.minLength(3)]  ],
      document_number  : ['',   [Validators.required, Validators.minLength(3)]  ],
      birth  : ['',   [Validators.required]  ],
      celphone  : ['',   [Validators.required, Validators.minLength(5)]  ],
      telephone  : ['',   [Validators.required, Validators.minLength(5)]  ],

      vehicle: this.fb.group({
        name:['',Validators.required],
        brand  :['',Validators.required]
      }),


   
      

    })

  }




  getProfesional(){
    console.log("imprimiendo id", this.idProfesional);
    
    this.personalService.getOneprofesional(this.idProfesional)
    .subscribe ( resp=>{
      console.log("uno",resp);
      this.profesional=resp;
      
      
      
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

console.log("Datos",this.forma);


this.personalService.updateProfesional(this.forma.value,this.idProfesional)
.subscribe( resp=>{
  console.log(resp);

  this.personalComponent.ngOnInit();
  
})


  }









}