import {AuthService} from '../service/auth-service.service';
import {TokenStorage} from '../core/token.storage';
import {UsuarioLogado} from '../core/usuario-logado';
import {AuthModel} from '../shared/models/Auth.model';
import {UsuarioLoginAuthService} from '../service/UsuarioLoginAuth.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioLogado, FormBuilder, UsuarioLoginAuthService, AuthModel]
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              public dialog: MatDialog,
              private authService: AuthService,
              private token: TokenStorage,
              private usuarioLogado: UsuarioLogado,
              private usuarioService: UsuarioLoginAuthService,
              public authModel: AuthModel) {
  }

  ngOnInit() {
    this.usuarioLogado.verificarUsuarioLogado();

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  login(): void {
    this.authService.attemptAuth(this.authModel).subscribe(
      data => {
        console.log(data.token)
        this.token.saveToken(data.token);
        this.token.saveQuantityOrders(0)   
        this.router.navigate(['home']);
      }
      , error => {
        console.log(error);
        this.snackBar.open("Não foi possivel realizar o acesso. Verifique os dados informados", '', {duration: 3000});
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    //this.verificarUsuario();
    this.login();
  }

  verificarUsuario() {
    this.usuarioService.verificarUsuario(this.authModel).subscribe(
      data => {
        this.token.salvarUsuario(data);
      }, error => {
        console.log(error);
        this.snackBar.open(error.error.message, 'Erro', {duration: 3000});
      });
  }


}
