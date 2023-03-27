import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
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
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // to: Mail[] = [];
  // cc: Mail[] = [];
  to: any = [];
  cc: any = [];
  constructor(private httpService: HttpService, private snackBar: MatSnackBar, private http: HttpClient) {
    // this.filteredList1 = this.factoryList.slice();

    if (this.landscape != '' || this.typeOfFactory != '') {
      this.islandscape = true;
      // console.log('kitekitekitekietekierelkitekitekitekitekite')
    }

  }
  onIPLChange(event: any) {

  }
  onIPUChange(event: any) {

  }
  onIPRChange(event: any) {

  }
  onNewChrChange(event: any) {

  }
  ngOnInit(): void {
    this.filteredList1 = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.factoryList.filter((option: any) => option.toString().toLowerCase().includes(filterValue));
  }
  onfactorychange(event: any) {

    // console.log("fbdjlllll", event.value)
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
        // console.log(this.factoryData[this.factoryList[0]], "ppppppppp")
        // console.log(Object.keys(this.factoryList), "ffff");
        // console.log(res, "keys")

      }
    }, (err: any) => {
      this.isLoader = false;

    })

  }
  sapupload(event: any) {
    this.sapExtractFile = event.target.files[0].name
    // console.log(event, "eee")
  }
  fetchQOneExtract() {
    this.isLoader = true;

    let body = new FormData();
    body.append('factoryname', this.factoryData[this.factoryselection])
    // console.log("res")

    this.httpService.post('data_extract', body).subscribe((res: any) => {
      console.log(res, "rrrrrrr")
      if (res) {
        this.isLoader = false;

        this.snackBar.open("Fetch QOne Extract Successfully!", " ", { 'duration': 2000, panelClass: 'blue-snackbar' });
      }
      // else {
      //   this.isLoader = false;

      //   this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });

      // }
    }, (err: any) => {
      this.isLoader = false;

      this.snackBar.open("Something Went Wrong...", " ", { 'duration': 2000, panelClass: 'red-snackbar' });
    })
  }
  onlandscapechange() {
    this.isfactories = false;
  }
  authentication() {
    this.httpService.get('email_notification').subscribe((res: any) => {
      if (res) {
        console.log(res, "res")
        let newtab: any = window.open(res.url);
        // newtab.document.write(res.message)
        // newtab.document.querySelector("#otc").innerHTML = "Hello World!";
        console.log(newtab, "newtab")
        let test: any = newtab.document.getElementById("otc") as HTMLInputElement | null
        console.log(test, "test")
        newtab.document.getElementById("otc").text = res.message
        // this.http.get("https://aadcdn.msauth.net/ests/2.1/content/cdnbundles/ux.converged.login.strings-en.min_9rx-kmbsmdm6rixjlx4bhq2.js").subscribe((res: any) => {
        //   if (res.status == 200) {
        //     console.log("status")
        //   }
        // })

        // this.httpService.get("https://aadcdn.msauth.net/ests/2.1/content/cdnbundles/ux.converged.login.strings-en.min_9rx-kmbsmdm6rixjlx4bhq2.js").subscribe((res: any) => {
        //   if (res.status == 200) {
        //     console.log("status")
        //   }
        // })
      }
    })
  }
  sendResultsFile() {
    // console.log(this.to, this.cc, "kjhukgk")
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
  // edit(mail: any, event: MatChipInputEvent) {
  //   const value = event.value.trim();

  //   // Remove fruit if it no longer has a name
  //   if (!value) {
  //     this.remove(mail);
  //     return;
  //   }

  //   // Edit existing fruit
  //   const index = this.to.indexOf(mail);
  //   if (index >= 0) {
  //     this.to[index].name = value;
  //   }
  // }
}
