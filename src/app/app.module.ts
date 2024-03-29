//Native angular packages
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';

//Angular material packages
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';

import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

//Application packages
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { CustomDialogComponent } from './views/generic/dialog/custom-dialog.component';
import { PageNotFoundComponent } from './views/generic/page-not-found/page-not-found.component';

import { FinancialsListComponent } from './views/financial-manager/financials-list/financials-list.component';
import { FinancialsNewComponent } from './views/financial-manager/financials-new/financials-new.component';
import { FinancialsReportComponent } from './views/financial-manager/financials-report/financials-report.component';
import { FinancialsTagsComponent } from './views/financial-manager/financials-tags/financials-tags.component';
import { FinancialsTagNewComponent } from './views/financial-manager/financials-tag-new/financials-tag-new.component';

import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UserUpdateInfoComponent } from './views/user/user-change-pass/user-update-info.component';
import { UserNewComponent } from './views/user/user-new/user-new.component';
import { ReleaseNotesComponent } from './views/generic/release-notes/release-notes.component';
import { UserDialogComponent } from './views/generic/user-dialog-report/user-dialog-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //User
    UserLoginComponent,
    UserNewComponent,
    UserUpdateInfoComponent,
    //Generic
    CustomDialogComponent,
    UserDialogComponent,
    PageNotFoundComponent,
    ReleaseNotesComponent,
    //Financials
    FinancialsListComponent,
    FinancialsNewComponent,
    FinancialsReportComponent,
    FinancialsTagsComponent,
    FinancialsTagNewComponent,
    //Footer and header
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    ClipboardModule,
    FlexLayoutModule,
    CdkTableModule,
    CdkTreeModule,
    CdkTreeModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatTooltipModule,
    MatBadgeModule,
    MatCheckboxModule,
    NgChartsModule,
    MatSortModule,
    MarkdownModule.forRoot({ loader: HttpClient, sanitize: SecurityContext.NONE })
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }