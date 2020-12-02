import { Component, OnInit, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title: String = "Produtos";
  productName: String;
  dataSource: any = new MatTableDataSource([]);
  dataSourceAux: any = new MatTableDataSource([]);
  displayedColumns: String[] = ['id', 'name', 'description', 'category', 'priceDefault', 'isFeatured', 'isAvailable', 'options']

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(){
    this.productService.getProducts(0,20).subscribe(result => {
      this.dataSource.data = result;
      this.dataSourceAux = this.dataSource;
    }, error => {
      console.log(error);     
    }) 
  }

  filter(){
    if(this.productName){
      this.dataSource = new MatTableDataSource([]);
      this.dataSourceAux.data.forEach( product =>{
        if(product.name.toLowerCase( ).match(this.productName.toLowerCase()))
        this.dataSource.data.push(product)
      })
    }else {
      this.loadProducts();
    }
  }
  
}
