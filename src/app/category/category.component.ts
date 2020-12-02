import { Component, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from '../service/category.service';
import { PeriodicElement } from '../home/home.component';
import { MatTable, MatDialog, MatSnackBar } from '@angular/material';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { CreateUpdateCategoryComponent } from './create-update-category/create-update-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  dataSource = [];
  dataSourceAux = [];
  categoryName: String;
  objectPosition: any = {} ;
  displayedColumns: string[] = ["id", "name", "isAvailable", "categoryOptions"];
  listPosition: any = [];

  @ViewChild('table', { static: false }) table: MatTable<PeriodicElement>;

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar, private categoryService: CategoryService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadCategory();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  loadCategory() {
    this.categoryService.getCategory().subscribe(result => {
      this.dataSource = result;
      this.dataSourceAux = this.dataSource;
    }, error => {
      console.log(error);
    })
  }

  createArrayPositionId(array) {
    this.listPosition = new Map();
    for (let i = 0; i < array.length; i++) {  
        this.listPosition[array[i].id] =  i + 1;
    }  
  }

  putPosition(){
    if(this.listPosition.length === 0){
      this.snackBar.open('Não houveram alterações para ser salvas.', null, { duration: 3000, });
    } else {
      this.categoryService.putPosition(this.listPosition).subscribe(() => {
        this.snackBar.open('A ordem das categorias foi atualizada com sucesso.', null, { duration: 3000, });
      }, error => {
        console.log(error);
        this.snackBar.open('Ocorreu um problema ao atualizar a ordem das catagorias.', null, { duration: 3000, });
      })
    }
  }

  putStatusCategory(id) {
    this.categoryService.putCategoryChangeStatus(id).subscribe(() => {
      this.snackBar.open('Status da categoria atualizado com sucesso.', null, { duration: 3000, });
      this.loadCategory()
    }, error => {
      console.log(error);
      this.snackBar.open('Ocorreu um problema ao atualizar o status catagorias.', null, { duration: 3000, });
    })
  }

  filter(){
    if(this.categoryName){
      this.dataSource = [];
      this.dataSourceAux.forEach( category =>{
        if(category.name.toLowerCase( ).match(this.categoryName.toLowerCase()))
        this.dataSource.push(category)
      })
    }else {
      this.loadCategory();
    }
  }

  openDialogConfirmation(message, id, action, subtract = false){
    let dialogRef = this.matDialog.open(DialogConfirmationComponent, {
      data: { 
        message: message, 
        id: id, 
        action: action, 
        subtract: subtract,
        quantityOrdersWAITING: null 
      }
    })
    dialogRef.beforeClose().subscribe(() => {this.loadCategory()})
  }

  createUpdateCategory(category?){
    let dialogRef = this.matDialog.open(CreateUpdateCategoryComponent, {
      width: '450px',
      data: category ? category : ''
    })
    dialogRef.beforeClose().subscribe(() => {this.loadCategory()})
  }

  dropTable(event: CdkDragDrop<PeriodicElement[]>) {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    this.createArrayPositionId(event.container.data);
  }
  
}
