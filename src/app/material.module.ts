import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatSelectFilterModule } from 'mat-select-filter';
@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatListModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTreeModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule, MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatListModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTreeModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCheckboxModule,
    MatPaginatorModule, MatDialogModule,
  ],
  providers: [
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class MaterialModule { }