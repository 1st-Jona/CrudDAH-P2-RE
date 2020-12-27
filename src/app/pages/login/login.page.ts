import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "src/app/models/usuario";
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public users:Usuario[];
  public myForm:FormGroup; 
  public user:Usuario;
  public mensaje="";

  constructor(private userService:UsuarioService, private fb:FormBuilder,private router:Router,public toastController: ToastController) { 
    this.userService.getUsers().subscribe(data =>{
      this.users=data.map(e=>{
        return{
          id:e.payload.doc.id,
          email:e.payload.doc.get("email"),
          password:e.payload.doc.get("password")
        }as Usuario
      })
    });
   
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      email:[""],
      password:[""]
    });
  }

  join() {
    console.log(this.users);
    this.user={
      email:this.myForm.controls.email.value,
      password:this.myForm.controls.password.value
    }
    
    const tempUser = this.users.find(user => user.email === this.user.email);
    if(tempUser!=null){
    if(tempUser.password === this.user.password){
      //Usuario válido
      this.mensaje="Bienvenido";
      this.presentToast();
      this.router.navigate(['/tabs/tab1'])

      console.log("Válido");
    
    }else{
      //Usuario no válido
      console.log("No Válido");
      this.mensaje="Contraseña incorrecta."
      this.presentToast();
      
    }
  }else{
    this.mensaje="No existe ningún usuario registrado con este correo"
    this.presentToast();
  }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 2000
    });
    toast.present();
  }

}
