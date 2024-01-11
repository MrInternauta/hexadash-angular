import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { AppsService } from '../../../shared/services/apps.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactGrid } from '../../../shared/interfaces/contacts-grid.type';
import { TableService } from '../../../shared/services/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable, map } from 'rxjs';
import { AppState, ModalInfoService } from 'src/app/core';
import { WorkoutService } from '../services/workout.service';
import { Article } from '../models';
import { ProductsFilterDto } from '../models/productFilter.dto';
import { loadedExercise } from '../state/workout.actions';

@Component({
  templateUrl: './list.component.html',
  styles: [
    `
      ::ng-deep .ant-modal-content .ant-modal-close {
        @apply bg-transparent text-primary dark:bg-primary;
      }
    `,
  ],
})
export class ProductsListComponent implements OnDestroy, OnInit {
  view: string = 'contactGridView';
  ContactGridRaw: ContactGrid[];
  ContactGrid: ContactGrid[];
  searchInput: string;
  isLoading = true;
  showContent = false;
  startValue: Date | null = null;
  endValue: Date | null = null;

  //
  $susctiption!: Subscription;
  $susctiptionSearch!: Subscription;
  $susctiptionParams!: Subscription;
  productSuscription$!: Subscription;
  public $observable!: Observable<any>;
  public tempProduc$!: Observable<any> | null;
  public searchValue!: string | null;
  message =
    'This modal example uses the modalController to present and dismiss modals.';

  public historyWorkout!: Array<any>;

  constructor(
    private ContactGridSvc: AppsService,
    private modalService: NzModalService,
    private tablesvc: TableService,
    //
    private store: Store<AppState>,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private exercisesService: WorkoutService,
    private modalInfoService: ModalInfoService
  ) {
    this.$susctiptionParams = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const productFilter: ProductsFilterDto = {
          limit: params?.['limit'] || 1000,
          maxPrice: params?.['maxPrice'] || 9999,
          minPrice: params?.['minPrice'] || 0,
          offset: params?.['offset'] || 0,
        };
        this.productSuscription$ = this.exercisesService
          .getProducts(productFilter)
          .subscribe(
            (response) => {
              if (response)
                this.store.dispatch(loadedExercise({ Exercise: response }));
            },
            (error) => {
              this.modalInfoService.error('Something is wrong!', error);
            }
          );
      }
    );
    //TODO: fix
    this.$observable = this.store.select('exercises');
    this.$observable.subscribe((value) => {
      console.log(value?.Exercise);
    });
  }

  ngOnInit(): void {
    this.ContactGridSvc.getContactGridJson().subscribe((data) => {
      this.ContactGridRaw = data;
      this.ContactGrid = data;
    });
    // Simulate loading time
    this.loadData();
  }
  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  search() {
    const data = this.ContactGridRaw;
    this.ContactGrid = this.tablesvc.search(this.searchInput, data);
  }

  showNewContact(newContactContent: TemplateRef<{}>) {
    const modal = this.modalService.create({
      nzTitle: 'Contact Information',
      nzContent: newContactContent,
      nzFooter: [
        {
          label: 'Add New Contact',
          type: 'primary',
          onClick: () =>
            this.modalService.confirm({
              nzTitle: 'Are you sure you want to create this project?',
              nzOnOk: () => this.modalService.closeAll(),
            }),
        },
      ],
      nzWidth: 620,
    });
  }

  // Checkbox
  log(value: string[]): void {
    console.log(value);
  }

  // Calendar
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }
  async scanCode() {
    // try {
    //   const barcodeData = await this.barcodeScanner.scan();
    //   console.log('Barcode data', barcodeData);
    //   if (!barcodeData.text) {
    //     console.log('Invalid code');
    //   }
    //   this.searchbyCode(barcodeData.text || '');
    // } catch (error) {
    //   console.log('Error', error);
    // }
  }

  searchFunction($termSearch: any) {
    const value = $termSearch?.target?.value;
    if (!value || value?.length < 3) {
      this.tempProduc$ = null;
      return;
    }
    this.tempProduc$ = this.$observable.pipe(
      map((item_) =>
        item_?.Exercise?.products.filter(
          (item: any) =>
            String(item.name)
              .toLocaleLowerCase()
              .includes(String(value).toLocaleLowerCase()) ||
            String(item.description)
              .toLocaleLowerCase()
              .includes(String(value).toLocaleLowerCase())
        )
      )
    );
  }

  searchbyCode(code: string) {
    if (!code || code?.length < 3) {
      this.searchValue = null;
      this.tempProduc$ = null;
      return;
    }

    this.$susctiptionSearch = this.$observable
      .pipe(
        map((item_) =>
          item_?.Exercise?.products.filter((item: any) =>
            String(item.code)
              .toLocaleLowerCase()
              .includes(String(code).toLocaleLowerCase())
          )
        )
      )
      .subscribe((products: Array<Article> | null) => {
        if (!products?.length || !products[0]) {
          return;
        }
        this.addToCard(products[0], 1);
      });
  }

  addToCard(article: Article, quantity: number) {
    //this.store.dispatch(AddProductCart({ article, quantity }));
    this.presentToast();
    this.router.navigate(['tabs', 'tab4'], { replaceUrl: true });
  }

  hideSearch() {
    this.searchValue = null;
    this.tempProduc$ = null;
  }
  async presentToast() {
    console.log('Product added');

    // const toast = await this.toastController.create({
    //   message: 'Product added',
    //   duration: 1500,
    //   position: 'top',
    // });

    // await toast.present();
  }

  addPrice(product: Article) {
    this.presentAlert(product);
  }

  async presentAlert(product: Article) {
    console.log(product);

    // const ok_buttons: AlertButton = {
    //   text: 'OK',
    //   handler: (val) => {
    //     //TODO: Create input_products
    //     console.log(product);
    //     console.log(val);
    //   },
    // };
    // const cancel_buttons: AlertButton = {
    //   text: 'Cancel',
    // };

    // const alert = await this.alertController.create({
    //   header: 'Please enter the product info',
    //   buttons: [cancel_buttons, ok_buttons],
    //   inputs: [
    //     {
    //       type: 'number',
    //       label: 'Stock',
    //       placeholder: 'Stock',
    //       min: 1,
    //       max: 1000,
    //       value: Number(product.stock) || 0,
    //     },
    //     {
    //       type: 'number',
    //       label: 'Buying price',
    //       placeholder: 'Buying price',
    //       min: 1,
    //       max: 1000,
    //       value: Number(product.price) || 0,
    //     },
    //     {
    //       type: 'number',
    //       label: 'Selling price',
    //       placeholder: 'Selling price',
    //       min: 1,
    //       max: 1000,

    //       value: Number(product.priceSell) || 0,
    //     },
    //   ],
    // });

    // await alert.present();
  }
  ngOnDestroy(): void {
    this.$susctiption?.unsubscribe();
    this.$susctiptionSearch?.unsubscribe();
    this.$susctiptionParams?.unsubscribe();
    this.productSuscription$?.unsubscribe();
  }
}
