import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  formUser?: FormGroup;
  title: string = '';
  idUser?: number;
  dataSource: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
     ) {

    this.formUser = this.fb.group({
      name:  ['',Validators.required,Validators.minLength(2)],
      phone: ['',Validators.required],
      age:   ['',[Validators.required,Validators.pattern(/\d/),Validators.min(18)]]
    });

    this.activatedRoute.params.subscribe({
      next: (params) => {
        //* Edición
        if(params['id']){
          this.idUser = params['id'];
          this.title = 'Editar Usuario';
          this.loadUser();

        }else{
          //* Creación
          this.title = 'Crear Usuario';
        }
      },
    });
   }

  ngOnInit(): void {}

  loadUser(): void {
    if(this.idUser){
      this.userService.getUser(this.idUser).subscribe({
        next:(user) =>{
          this.formUser?.patchValue(user);
        },
        error: () =>{
          alert('Ocurrió un error');
        },
      });
    }
  }

  save():void {
    const user: User = this.formUser?.value as User;

    if(this.idUser){
      //* Edición
      this.userService.editUser(user,this.idUser).subscribe({
        next: () => {
          console.log('USUARIO ADD')
          // this.router.navigateByUrl('/user');
        },
        error: () => {
          alert('Ocurrió un error');
        },
      })
    } else{

      this.userService.newUser(user).subscribe({
        next: () => {
          this.router.navigateByUrl('/users')
        },
        error: () => {
          alert('Ocurrió un error')
        }
      });
    }



  }
}



