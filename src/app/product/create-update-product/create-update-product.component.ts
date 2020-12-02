import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.css']
})
export class CreateUpdateProductComponent implements OnInit {

  productFormGroup: FormGroup;
  categorySelected: any;
  product: any = { image: '', isAvailable: true };
  categoryList: any;
  unitList = ["kilograma", "Quantidade", "Gramas"];
  unitSelected: any;
  isUpdate: boolean = false;
  displayedColumns: string[] = ["price", "quantity", "unit", "productSizeOptions"]
  displayedColumns2: string[] = ["name", "price", "productAdditionalOptions"]
  objProductSize: any = {};
  objProductAdditional: any = {};
  productSizesList: any = new MatTableDataSource([]);
  productAdditionalsList: any = new MatTableDataSource([]);


  constructor(private _dialogRef: MatDialogRef<any>, private snackBar: MatSnackBar, private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public productParam: any, private _formBuilder: FormBuilder, private productService: ProductService) {
    if (productParam) {
      this.getProductById(productParam.id);
      this.isUpdate = true;
    }
  }

  ngOnInit() {
    this.createFormProduct();
    this.getCategory();
  }

  createFormProduct() {
    this.productFormGroup = this._formBuilder.group({
      category: [this.categorySelected],
      description: [this.product.description],
      isFeatured: [this.product.isFeatured],
      isAvailable: [this.product.isAvailable],
      name: [this.product.name],
      priceDefault: [this.product.priceDefault],
      url: [this.product.image],
      productAdditionals: [this.product.productAdditionals],
      productSizes: [this.product.productSizes]
    })
  }

  postProduct() {
    if (this.productSizesList.data.length > 0) {
      if(this.product.image){
        let productSizeFinal = this.productSizesList.data;

        for (let i = 0; i < productSizeFinal.length; i++) {
          productSizeFinal[i].unit = this.toEnglish(productSizeFinal[i].unit)
        }
        let body = {
          category: this.categorySelected,
          description: this.product.description,
          isFeatured: this.product.isFeatured ? this.product.isFeatured : false,
          isAvailable: this.product.isAvailable ? this.product.isAvailable : false,
          productSizes: productSizeFinal,
          productAdditionals: this.productAdditionalsList.data,
          name: this.product.name,
          priceDefault: this.product.priceDefault,
          image: this.product.image
        }
        this.productService.postProduct(body).subscribe(() => {
          this.close();
          this.snackBar.open('Produto cadastrado com sucesso.', null, { duration: 3000, });
        }, error => {
          console.log(error);
          this.snackBar.open('Ocorreu um problema ao cadastrar o produto.', null, { duration: 5000, });
        })
      }else {
        this.snackBar.open('Adicione uma imagem.', null, { duration: 5000, });
      }
    } else {
      this.snackBar.open("Adicione Valor/ Quantidade", null, { duration: 5000, });
    }
  }

  putProduct() {
    if (this.productSizesList.data.length > 0) {

      if (!this.categorySelected.id) this.setCatagorySelected()
      let productSizeFinal = this.productSizesList.data;

      for (let i = 0; i < productSizeFinal.length; i++) {
        productSizeFinal[i].unit = this.toEnglish(productSizeFinal[i].unit)
      }

      let body = {
        category: this.categorySelected,
        description: this.product.description,
        isFeatured: this.product.isFeatured ? this.product.isFeatured : false,
        isAvailable: this.product.isAvailable ? this.product.isAvailable : false,
        productSizes: this.productSizesList.data,
        productAdditionals: this.productAdditionalsList.data,
        name: this.product.name,
        priceDefault: this.product.priceDefault,
        image: this.product.image
      }
      this.productService.putProduct(this.product.id, body).subscribe(() => {
        this.close();
        this.snackBar.open('Produto atualizado com sucesso.', null, { duration: 3000, });
      }, error => {
        console.log(error);
        this.snackBar.open('Ocorreu um problema ao atualizar os dados do produto.', null, { duration: 5000, });
      })
    } else {
      this.snackBar.open("Adicione Valor/ Quantidade", null, { duration: 5000, });
    }
  }

  getProductById(id) {
    this.productService.getProductById(id).subscribe(product => {
      product.productSizes.forEach(element => {
        element.unit = this.toPortuguese(element.unit);
      });
      this.product = product;
      this.categorySelected = this.product.category.name
      this.productAdditionalsList.data = product.productAdditionals;
      this.productSizesList.data = product.productSizes;
    }, (error) => {
      console.log(error);
      this.snackBar.open('Ocorreu um problema ao buscar o produto.', null, { duration: 5000, });
    })
  }


  getCategory() {
    this.categoryService.getCategory().subscribe(result => {
      this.categoryList = result;
    }, error => {
      console.log(error);
      this.snackBar.open('Ocorreu um problema ao buscar as categorias.', null, { duration: 5000, });
    })
  }

  addProductAdditional() {
    if (this.objProductAdditional.price && this.objProductAdditional.name) {
      let newItem = {
        price: this.objProductAdditional.price,
        name: this.objProductAdditional.name
      }
      this.productAdditionalsList.data.push(newItem);
      this.objProductAdditional = new Object();
      this.productAdditionalsList = new MatTableDataSource(this.productAdditionalsList.data);
    } else {
      this.snackBar.open('Preencha todos os campos.', null, { duration: 5000, });
    }
  }

  removeProductAdditional(productAdditional) {
    const index = this.productAdditionalsList.data.indexOf(productAdditional);
    this.productAdditionalsList.data.splice(index, 1);
    this.productAdditionalsList = new MatTableDataSource(this.productAdditionalsList.data);
  }

  addProductSize() {
    if (this.objProductSize.price && this.objProductSize.quantity && this.unitSelected) {
      let newItem = {
        price: this.objProductSize.price,
        quantity: this.objProductSize.quantity,
        unit: this.unitSelected
      }
      this.productSizesList.data.push(newItem);
      this.objProductSize = new Object();
      this.productSizesList = new MatTableDataSource(this.productSizesList.data);
    } else {
      this.snackBar.open('Preencha todos os campos.', null, { duration: 5000, });
    }
  }

  removeProductSize(productSize) {
    const index = this.productSizesList.data.indexOf(productSize);
    this.productSizesList.data.splice(index, 1);
    this.productSizesList = new MatTableDataSource(this.productSizesList.data);
  }

  edit(productSize) {
    const index = this.productSizesList.data.indexOf(productSize);
  }

  onselectFile(image) {
    if (image.target.files) {
      if (image.target.files[0].type == "image/jpeg") {
        var reader = new FileReader();
        reader.readAsDataURL(image.target.files[0]);
        reader.onload = (event: any) => {
          //carrega imagem na tela pela url
          this.product.image = event.target.result
          //obtem as dimensões daimagem
          var image = new Image();
          let self = this;
          image.src = event.target.result;
          image.onload = function () {
            console.log(image.width);
            console.log(image.height);
            if(image.width !== 200 || image.height !== 132) {
              self.product.image = ''
              self.snackBar.open('As dimenções da imagem devem ser 200 x 132.', null, { duration: 5000, });
            }
          };
        }
      } else {
        this.snackBar.open('Só são aceitas imagens do tipo JPEG.', null, { duration: 5000, });
      }
    }
  }

  validForm(action) {
    if (this.productFormGroup.valid) {
      if (action == 'update') this.putProduct();
      else this.postProduct();
    }
    else
      this.snackBar.open('Preencha os campos obrigatórios.', null, { duration: 3000, });
  }

  checkFormProductSizes(stepper) {
    if (this.productSizesList.data.length > 0)
      stepper.next();
    else
      this.snackBar.open("Adicione Valor/ Quantidade", null, { duration: 5000, });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2
  }

  reset() {
    this.productFormGroup.reset();
  }

  close(): void {
    this._dialogRef.close();
  }

  setCatagorySelected() {
    this.categoryList.forEach(element => {
      if (element.name == this.product.category.name)
        this.categorySelected = element;
    });
  }

  toPortuguese(text) {
    switch (text) {
      case 'QUANTITY': return 'Quantidade'; break;
      case 'GRAMS': return 'Gramas'; break;
      case 'KILOGRAM': return 'kilograma'; break;
    }
  }

  toEnglish(text) {
    switch (text) {
      case 'Quantidade': return 'QUANTITY'; break;
      case 'Gramas': return 'GRAMS'; break;
      case 'kilograma': return 'KILOGRAM'; break;
    }
  }
}
