import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-create-update-category',
  templateUrl: './create-update-category.component.html',
  styleUrls: ['./create-update-category.component.css']
})
export class CreateUpdateCategoryComponent implements OnInit {
  category: any = { isAvailable: true };
  isUpdate: boolean = false;
  categoryFormGroup: FormGroup;
  constructor(private _dialogRef: MatDialogRef<any>, private _formBuilder: FormBuilder,
    private categoryService: CategoryService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public categoryParam: any) {
    if (categoryParam){
      this.category = categoryParam;
      this.isUpdate = true;
    }
  }

  ngOnInit() {
    this.createCategoryForm();
  }

  createCategoryForm() {
    this.categoryFormGroup = this._formBuilder.group({
      name: [this.category.name],
      isAvailable: [this.category.isAvailable]
    })
  }

  postCategory() {
    if (this.categoryFormGroup.valid) {
      this.categoryService.postCategory(this.category).subscribe(() => {
        this.close();
        this.snackBar.open('Categoria cadastrada com sucesso.', null, { duration: 3000, });
      }, error => {
        console.log(error);
        this.snackBar.open('Ocorreu um erro ao cadastrar a categoria.', null, { duration: 5000, });
      })
    }
  }

  
  putCategory() {
    if (this.categoryFormGroup.valid) {
      this.categoryService.putCategory(this.category.id, this.category).subscribe(() => {
        this.close();
        this.snackBar.open('Categoria atualizada com sucesso.', null, { duration: 3000, });
      }, error => {
        console.log(error);
        this.snackBar.open('Ocorreu um erro ao atualizar a categoria.', null, { duration: 5000, });
      })
    }
  }

  close(): void {
    this._dialogRef.close();
  }
}
