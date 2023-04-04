import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpService } from '../http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
// import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
// import { Client } from '@microsoft/microsoft-graph-client';
// export interface Mail {
//   name: string;
// }
@Component({
  selector: 'app-comparefiles',
  templateUrl: './comparefiles.component.html',
  styleUrls: ['./comparefiles.component.scss']
})
export class ComparefilesComponent implements OnInit {
  isIPL: any = false;
  isIPU: any = false;
  isIPR: any = false;
  isNewchr: any = false;
  typeOfFactory: any = '';
  landscape: any = '';
  landscapelist = ['Cordillera', 'Siruis', 'U2K2', 'Fusion'];
  factoryselection: any;
  isfactories = false;
  factoryList: any = [];
  sapExtractFile: any = '';
  islandscape = false;
  factoryData: any;
  isLoader = false;
  filteredList1: any;
  msadService: any;
  myControl = new FormControl();
  removable = true;
  addOnBlur = true;
  visible = true;
  selectable = true;
  mappingFile: any = ''
  reviewedFile: any = ''
  charIPLFile: any = '';
  charIPUFile: any = '';
  charIPRFile: any = '';
  newcharFile: any = '';
  loaderslist: any = []; headerfileslist: any = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // to: Mail[] = [];
  // cc: Mail[] = [];
  to: any = [];
  cc: any = [];
  filteredOptions: any;
  filteredOptions1: any;
  sapmaterials = [];
  q1materials = [];
  sapselectedOption: any = 'saplist';
  q1selectedOption: any = 'q1list';

  isSelected = false;
  sapmaterialList: any;
  q1materialList: any;
  selectedSAPMaterials: any = [];
  selectedQ1Materials: any = [];
  teamInitial = '';
  teamInitial1 = '';
  isSuccess = false;
  selectedInfoField: any;
  infofields = ['COA', 'Others']
  @ViewChild('select') select!: MatSelect;

  allSelected = false;
  @ViewChild('select1') select1!: MatSelect;

  allSelected1 = false;
  saptoq1data: any;

  //compare upload
  uploadForm: FormGroup;
  sapFile: any;
  q1File: any;
  isFilesSelected = false;
  // isLoader = false;
  selectedFactory = '';
  factories = ['Jefferson city', 'Valinhos', 'Amli'];
  sapColNames: any;
  qoneColNames: any;
  isdownloadQone = false;
  isdownload = false;
  constructor(private httpService: HttpService, private snackBar: MatSnackBar, private http: HttpClient, private fb: FormBuilder,) {
    // this.filteredList1 = this.factoryList.slice();
    this.uploadForm = this.fb.group({
      sapData: ['', Validators.required],
      qOneData: ['', Validators.required],
      factory: ['', Validators.required]
    })
    if (this.landscape != '' || this.typeOfFactory != '') {
      this.islandscape = true;
    }

  }

  mappingFileupload(event: any) {
    this.mappingFile = event.target.files[0];
  }
  reviewedFileupload(event: any) {
    this.reviewedFile = event.target.files[0];
  }
  iplupload(event: any) {
    this.charIPLFile = event.target.files[0];

  }
  ipuupload(event: any) {
    this.charIPUFile = event.target.files[0];

  }
  iprupload(event: any) {
    this.charIPRFile = event.target.files[0];

  }
  newcharupload(event: any) {
    this.newcharFile = event.target.files[0];

  }
  ngOnInit(): void {
    this.filteredList1 = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => this._filter(value))
      );
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter1(value))
      );
    this.filteredOptions1 = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter2(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.factoryList.filter((option: any) => option.toString().toLowerCase().includes(filterValue));
  }
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.sapmaterials.filter((option: any) => option.toString().toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.q1materials.filter((option: any) => option.toString().toLowerCase().includes(filterValue));
  }
  onfactorychange(event: any) {
    this.factoryselection = event.value;
    console.log("fbdjlllll", event.value)
  }
  getFactorylist() {
    this.isLoader = true;
    let body = new FormData()
    body.append('factory', this.typeOfFactory)
    body.append('landscape', this.landscape)
    this.httpService.post('factory_list', body).subscribe((res: any) => {
      if (res) {
        // this.filteredList1 = this.factoryList.slice();
        this.isLoader = false;
        this.isfactories = true;
        this.factoryData = res;

        this.factoryList = Object.keys(res);


      }
    }, (err: any) => {
      this.isLoader = false;

    })

  }
  sapupload(event: any) {
    this.sapExtractFile = event.target.files[0].name

  }
  fetchQOneExtract() {
    this.isLoader = true;

    let body = new FormData();
    console.log(this.factoryselection, "factory selected")
    console.log(this.factoryData, "factory selected............")

    body.append('factoryname', this.factoryData[this.factoryselection])
    // console.log("res")

    this.httpService.post('data_extract', body).subscribe((res: any) => {
      console.log(res, "rrrrrrr")
      if (res == 'yes') {
        this.isLoader = false;
        this.isdownloadQone = true;
        this.snackBar.open("Fetch QOne Extract Successfully!", " ", { 'duration': 2000, panelClass: 'blue-snackbar' });

      }
      else {
        this.isLoader = false;

        this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });

      }
    }, (err: any) => {
      this.isLoader = false;

      this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });
    })
  }
  qonedownload() {
    window.open('http://127.0.0.1:5000/Q1_download');
  }
  onlandscapechange() {
    this.isfactories = false;
  }
  authentication() {
    this.httpService.get('email_notification').subscribe((res: any) => {
      if (res) {
        console.log(res, "res")
        let newtab: any = window.open(res.url);

        console.log(newtab, "newtab")
        let test: any = newtab.document.getElementById("otc") as HTMLInputElement | null
        console.log(test, "test")
        newtab.document.getElementById("otc").text = res.message

      }
    })
  }
  sendResultsFile() {

    let body: any = new FormData();
    body.append('to_list', this.to);
    body.append('cc_list', this.cc);
    body.append('subject', 'RE:Outputfiles')

    this.httpService.post('send_mail', body).subscribe((res: any) => {
      if (res) {
        console.log(res.result, "result")
      }
    })
  }
  sendingloaders() {
    this.isLoader = true;
    if (this.isIPL == true) {
      this.loaderslist.push('Inspection_loader')
      this.headerfileslist.push(this.charIPLFile)
    }
    if (this.isIPR == true) {
      this.loaderslist.push('Requirement_loader')
      this.headerfileslist.push(this.charIPRFile)
    }
    if (this.isIPU == true) {
      this.loaderslist.push('Updated_loader')
      this.headerfileslist.push(this.charIPUFile)
    }

    if (this.isNewchr == true) {
      this.loaderslist.push('NewChar_loader')
      this.headerfileslist.push(this.newcharFile)
    }
    let body = new FormData();
    this.headerfileslist.forEach((file: any) => {
      body.append('header_file[]', file);
    });
    body.append('mappingfile', this.mappingFile);
    body.append('reviewedfile', this.reviewedFile);
    body.append('loader_list', this.loaderslist);
    // body.append('header_file[]', this.headerfileslist);
    this.httpService.post('loaders_api', body).subscribe((res: any) => {
      console.log(res, "res")
      if (res == 'yes') {
        this.isLoader = false;
        this.snackBar.open("Loaders pushed successfully.Please check in QualityOne...", " ", { 'duration': 2000, panelClass: 'blue-snackbar' });
      }
      else {
        this.isLoader = false;
        this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });
      }
    }, (err: any) => {
      this.isLoader = false;
      this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });
    })
  }
  // sendResultsFile() {
  //   let header = {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   };
  //   this.httpService.authorizeUser('https://login.microsoftonline.com/432a4219-1a46-4b7f-92ce-aae7bc705c26/oauth2/v2.0/authorize?response_type=code&client_id=4cd18089-4802-40ee-9ecf-1928718eb68f&redirect_uri=http://localhost:8080/&scope=offline_access%20Mail.Send%20User.Read.All', header).subscribe((res: any) => {
  //     if (res) {
  //       console.log(res, "code")
  //     }
  //   })
  // }
  // sendResultsFile() {
  // var authProvider = '';
  // this.msadService = this.adalSvc
  //   .acquireToken("https://graph.microsoft.com")
  //   .subscribe((token: string) => {
  //     if (token) {
  //       authProvider = token;
  //       sessionStorage.setItem("msad-token", token);

  //     }

  //   });
  // const headers = {
  //   'Authorization': authProvider,

  //   'Content-type': 'application/json'
  // };
  // var body = {
  //   "message": {
  //     "subject": "Meet for lunch?",
  //     "body": {
  //       "contentType": "Text",
  //       "content": "The new cafeteria is open."
  //     },
  //     "toRecipients": [
  //       {
  //         "emailAddress": {
  //           "address": "nagatriveni.singareddy@carbynetech.com"
  //         }
  //       }
  //     ],
  //     // "ccRecipients": [
  //     //   {
  //     //     "emailAddress": {
  //     //       "address": "danas@contoso.onmicrosoft.com"
  //     //     }
  //     //   }
  //     // ]
  //   },
  //   "saveToSentItems": "false"
  // }
  // this.httpService.post('https://graph.microsoft.com/v1.0/madhuri.jijjarapu@carbynetech.com/sendMail', body, headers).subscribe((res: any) => {
  //   // console.log(res)
  // })

  // var require: any;
  // const {
  //   Client
  // } = require("@microsoft/microsoft-graph-client");
  // const {
  //   TokenCredentialAuthenticationProvider
  // } = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
  // const {
  //   ClientSecretCredential
  // } = require("@azure/identity");
  // const tenantId = '432a4219-1a46-4b7f-92ce-aae7bc705c26';
  // const clientId = 'f195751e-8079-45bd-bf6f-a0f73b0bb91b';
  // const clientSecret = '07U8Q~gA16tRn4CR0ux.BbiTwbqqG~e7aVpKza~V';
  // const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
  // const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  //   scopes: ["user.read", "mail.send"]
  // });

  // const client = Client.initWithMiddleware({
  //     debugLogging: true,
  //     authProvider
  //     // Use the authProvider object to create the class.
  // });
  // console.log(authProvider, "authentication")
  // const options: any = {
  //   authProvider,
  // };

  // const client = Client.init(options);
  // console.log("options")
  // const sendMail = {
  //   message: {
  //     subject: 'Meet for lunch?',
  //     body: {
  //       contentType: 'Text',
  //       content: 'The new cafeteria is open.'
  //     },
  //     toRecipients: [
  //       {
  //         emailAddress: {
  //           address: 'nagatriveni.singareddy@carbynetech.com'
  //         }
  //       }
  //     ],
  //     // ccRecipients: [
  //     //   {
  //     //     emailAddress: {
  //     //       address: 'danas@contoso.onmicrosoft.com'
  //     //     }
  //     //   }
  //     // ]
  //   },
  //   saveToSentItems: 'false'
  // };

  // client.api('/madhuri.jijjarapu@carbynetech.com/sendMail')
  //   .post(sendMail);
  // }


  //share Results 




  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.to.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  ccadd(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.cc.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(mail: any): void {
    const index = this.to.indexOf(mail);

    if (index >= 0) {
      this.to.splice(index, 1);
    }
  }
  ccremove(mail: any): void {
    const index = this.cc.indexOf(mail);

    if (index >= 0) {
      this.cc.splice(index, 1);
    }
  }
  // compare files
  sapoptionSelection(event: any) {
    if (event.value != '') {
      this.isSelected = false;

    }
  }
  q1optionSelection(event: any) {
    if (event.value != '') {
      this.isSelected = false;

    }
  }
  sapmaterialSelection(event: any) {
    this.selectedSAPMaterials = event.value;
  }
  q1materialSelection(event: any) {
    this.selectedQ1Materials = event.value;
  }
  compareSAPQ1() {
    this.isLoader = true;
    var SAPprimarykeySet: any = ['Material', 'Characterstic', 'Vendor'];
    var QOneprimarykeyset: any = ['Material', 'Inspection', 'supply_vendor'];

    if (this.sapselectedOption != '') {
      this.isSelected = false;
      let body = new FormData();

      if (this.sapselectedOption == 'saplist' || this.q1selectedOption == 'q1list' || this.sapselectedOption == 'sapselection' || this.q1selectedOption == 'q1selection') {
        // this.selectedSAPMaterials = [];
        // this.selectedQ1Materials = [];
        if (this.sapmaterialList != undefined) {
          let sapelements = this.sapmaterialList.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/g, '')
          let saplist: any = [];
          saplist.push(sapelements);
          body.append('Materials SAP', saplist)
        }
        else if (this.q1materialList != undefined) {
          let q1elements = this.q1materialList.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/g, '')
          let q1list: any = [];
          q1list.push(q1elements)
          body.append('Materials QA', q1list)
        }

        // body.append('Info Field', this.selectedInfoField)

        // }
        else {
          if (this.allSelected && this.allSelected1) {
            body.append('Materials SAP', "ALL")
            body.append('Materials QA', 'ALL')
          }
          else if (this.allSelected1) {
            body.append('Materials SAP', "")
            body.append('Materials QA', "ALL")
          }
          else if (this.allSelected) {
            body.append('Materials SAP', "ALL")
            body.append('Materials QA', "")

          }
          else {
            let obj: any = {
              'sapkeys': SAPprimarykeySet, 'qonekeys': QOneprimarykeyset
            }
            body.append('Materials SAP', this.selectedSAPMaterials)
            body.append('Materials QA', this.selectedQ1Materials)
            body.append('PrimaryKeySet', obj)
          }

        }
        body.append('Info Field', this.selectedInfoField)

        this.teamInitial = '';
        this.teamInitial1 = '';
        this.selectedSAPMaterials = [];
        this.selectedQ1Materials = [];

      }

      this.httpService.post("getdetails", body,).subscribe((response: any) => {

        console.log(response, "res")
        if (response) {
          this.isLoader = false;
          this.isSuccess = true;
          this.isdownload = true;
          this.saptoq1data = response
          // this.router.navigate(['/main/saptoq1'])


        }
      }, (err: any) => {
        this.isSuccess = false;

        this.isLoader = false;
        console.log(err, "error")
      })
      // this.httpService.post('getdetails1', body).subscribe((res: any) => {
      //   if (res) {
      //     this.q1tosapdata = res
      //     console.log(res, "q1tosap")
      //   }
      // })
    }
    else {
      this.isSelected = true;
      this.isLoader = false;
      this.isSuccess = false;


    }
    this.isSuccess = false;
  }
  compareData() {
    this.isLoader = true;
    if (this.sapselectedOption != '' || this.q1selectedOption != '') {
      let body = new FormData();

      if (this.sapselectedOption == 'saplist' || this.q1selectedOption == 'q1list') {
        if (this.sapmaterialList != undefined) {
          let sapelements = this.sapmaterialList.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/g, '')
          let saplist: any = [];
          saplist.push(sapelements);
          body.append('Materials SAP', saplist)
        }
        else if (this.q1materialList != undefined) {
          let q1elements = this.q1materialList.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/g, '')
          let q1list: any = [];
          q1list.push(q1elements)
          body.append('Materials QA', q1list)
        }

      }
      // else if (this.q1selectedOption == 'q1list') {
      //   if (this.q1materialList != undefined) {
      //     let q1elements = this.q1materialList.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/g, '')
      //     let q1list: any = [];
      //     q1list.push(q1elements)
      //     body.append('Materials QA', q1list)
      //   }
      // }
      else if (this.sapselectedOption == 'sapselection') {
        if (this.allSelected) {
          body.append('Materials SAP', 'ALL')
        }
        else {
          body.append('Materials SAP', this.selectedSAPMaterials)
        }
      }
      else if (this.q1selectedOption == 'q1selection') {
        if (this.allSelected) {
          body.append('Materials QA', 'ALL')
        }
        else {
          body.append('Materials QA', this.selectedQ1Materials)
        }
      }
      body.append('Info Field', this.selectedInfoField);
      let sap_list: any = ['Material', 'Material Type.1', 'Optional/required characteristics', 'Upper limit', 'Lower limit', 'Insp. Method', 'InfoField1']
      let qone_list: any = ['id', 'characteristic__v.name__v', 'ctq__v', 'inspection_plan__v.name__v', 'lsl__v', 'usl__v', 'test_method_phd2__c.name__v', 'test_method_phd2__c.external_id__c']
      body.append('SAP list', sap_list);
      body.append('QOne list', qone_list);
      this.httpService.post("getdetails", body,).subscribe((response: any) => {

        console.log(response, "res")
        if (response) {
          console.log(response, "response")
          this.isLoader = false;
          this.snackBar.open("Compare files successfully!", " ", { 'duration': 2000, panelClass: 'blue-snackbar' });

          // this.isSuccess = true;
          // this.dataService.saptoq1data = response
          // this.router.navigate(['/home/result'])


        }
        else {
          this.isLoader = false;
          this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });

        }
      }, (err: any) => {
        this.isLoader = false;
        this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });
      })
    }

  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }
  toggleAllSelection1() {
    if (this.allSelected1) {
      this.select1.options.forEach((item: MatOption) => item.select());
    } else {
      this.select1.options.forEach((item: MatOption) => item.deselect());
    }
  }
  onSAPFileSelected(event: any) {
    this.sapFile = event.target.files[0]

  }
  onQ1FileSelected(event: any) {
    this.q1File = event.target.files[0]

  }
  //upload files
  onUploadSAPQ1Files() {
    // if (this.uploadForm.valid) {
    this.isFilesSelected = true;
    let body = new FormData();
    this.isLoader = true;
    body.append('SAP data', this.sapFile)
    body.append('QA data', this.q1File)
    body.append('CITY', this.selectedFactory)

    this.httpService.post("upload", body).subscribe((res: any) => {
      if (res.sap.length > 0 && res.Qone.length > 0) {
        this.sapmaterials = res.sap;
        this.q1materials = res.Qone;
        // this.sapColNames = res.sap_columns;
        // this.qoneColNames = res.qone_columns;
        this.isLoader = false;
        this.snackBar.open("Files Uploaded Successfully!", " ", { 'duration': 2000, panelClass: 'blue-snackbar' });
        // this.router.navigate(['/home/mappingSelection'])
      }
      else {
        this.isLoader = false;
        this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });
      }

    }, (err: any) => {
      this.isLoader = false;
      this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });
    });
    // }
    // else {
    //   this.isFilesSelected = true
    // }
    // )
  }
  comparedownload() {
    window.open('http://127.0.0.1:5000/download1')
  }
}
