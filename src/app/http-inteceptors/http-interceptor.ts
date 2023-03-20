import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
// import { DialogService } from "../services/dialog/dialog.service";
// import { messages } from "../config/messages";
@Injectable()
export class HttpInterceptor {
    constructor() { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let request = req.clone();
        const token = sessionStorage.getItem("msad-token");
        if (token) {
            request = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(request).pipe(
            catchError((error, caught) => {
                if (error.status === 403) {


                    return EMPTY;
                }
                console.log("Error Occurred");
                console.log(error);
                return throwError(error);
            }) as any
        );
    }

}
