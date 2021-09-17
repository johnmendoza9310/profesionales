import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalService } from "../../services/personal.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  profesional:any=[];

  hidden:boolean=false;
  
   
  
  forma:FormGroup;
  

  constructor( private fb: FormBuilder, 
    private personalService:PersonalService,
    private router:Router) {

    this.createForm();
   }

  ngOnInit(){

    this.getProfesionals();
    
  }


  

  createForm(){

    this.forma = this.fb.group({

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


  getProfesionals(){
    this.personalService.getAllProfesionals()
    .subscribe ( resp=>{
      console.log(resp);
      this.profesional=resp;
      
      
      
    })
  }


 save(){

console.log("Datos",this.forma);


this.personalService.createProfesional(this.forma.value)
.subscribe( resp=>{

  this.getProfesionals();
  console.log(resp);
  
})


  }


  delete(id){
    this.personalService.deleteProfesional(id)
    .subscribe(resp=>{

      this.getProfesionals();
      console.log("resp");
      
    })
    

  }


  hide(resp){
    this.hidden=resp;


  }


  

  
  

}



