import { Component } from '@angular/core';
import { EstudianteService } from "../services/estudiante.service";
import { Estudiante } from '../models/estudiante';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page  {

  public students:Estudiante[];
  public index:boolean[];

  constructor(private service:EstudianteService) {
    this.service.getStudents().subscribe(data=>{
      this.students=data.map(e=>{
        return{
          id:e.payload.doc.id,
          name:e.payload.doc.get("name"),
          controlnumber:e.payload.doc.get("controlnumber"),
          curp:e.payload.doc.get("curp"), 
          age:e.payload.doc.get("age"),
          active:e.payload.doc.get("active")
        }as Estudiante
      })
     this.index= new Array(this.students.length).fill(false);
    })
    
  }

  mostrarInfo(index:number) {
   
    console.log(this.index+" "+index);
    this.index[index]=!this.index[index];
  }




}
 