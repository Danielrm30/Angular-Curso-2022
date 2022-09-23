import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns = ['id','name', 'phone','age','actions']
  idUser?: number;
  title='';


  constructor(
    private userService:UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.activatedRoute.params.subscribe({
      next: (params) => {
        //* Edición
        if(params['id']){
          this.idUser = params['id'];
          this.title = 'Editar Usuario';
          if(this.idUser) {

            this.delete(this.idUser);
          }
        }else{
          this.loadUsers();

          //* Creación
          this.title = 'Crear Usuario';
        }
      },
    });
    // this.loadUsers()

  }

  delete(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {

        console.log('Usuario Eliminado');
        this.router.navigateByUrl('/users');
      },
      error: () => {
        alert('Ocurrió un error al eliminar el usuario ');
      }
    })
  }

  ngOnInit(): void {
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
      },
      error: (err) => {
        alert("Ocurrio un error");
      },
    });
  }
}
