import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public myForm:FormGroup;
  public student:Estudiante;
  public validationMessages;

  constructor(private studentService:EstudianteService, private fb: FormBuilder) {
    this.validationMessages = {
      name: [
          { type: 'required', message: 'Se requiere un nombre.' },
          { type: 'minlength', message: 'El nombre debe ser mayor de 3 caracteres.' },
          { type: 'maxlength', message: 'El nombre no debe exceder de 150 caracteres.' }
      ],
      controlnumber: [
        { type: 'required', message: 'Se requiere un número de control.' },
        { type: 'minlength', message: 'El número de control debe ser de 10 caracteres.' },
        { type: 'maxlength', message: 'El número de control debe ser de 10 caracteres.' }
      ],
      curp: [
        { type: 'required', message: 'Se requiere un curp.' },
        { type: 'pattern', message: 'El formate debe ser correcto (LLLLNNNNNNLLLLLLNN)' }
      ],
      age: [
          { type: 'required', message: 'Se requiere una edad.' }
      ],
      active: [
        { type: 'required', message: 'Se requiere un estatus.' }
      ]    
    };
  }

  ngOnInit(){

    
    this.myForm = this.fb.group({
      name:["",Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
        ])
      ],
      controlnumber:["",Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
        ])
      ],
      curp:["",Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9][0-9][0-9][0-9][0-9][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][0-9][0-9]')
        ])
      ],
      age:[0,Validators.compose([
        Validators.required
        ])],
      active:[false,Validators.compose([
        Validators.required
        ])]
    });

  }

  create(){
    this.student = {
      name:this.myForm.controls.name.value,
      controlnumber:this.myForm.controls.controlnumber.value,
      curp:this.myForm.controls.curp.value,
      age:this.myForm.controls.age.value,
      active:this.myForm.controls.active.value
    }
    this.studentService.createStudent(this.student);
  }

}
