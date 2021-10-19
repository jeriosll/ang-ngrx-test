import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { AppState } from "../store/reducers";
import { loadProducts, productsLoaded } from "./store/action/product.actions";
import { areProductsLoaded } from "./store/selector/product.selectors";

@Injectable()
export class ProductResolver implements Resolve<Observable<any>> {

    constructor(private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
        return this.store.pipe(
            select(areProductsLoaded),
            tap((productsLoaded) => {
                if(!productsLoaded) {
                    this.store.dispatch(loadProducts())
                }
            }),
            filter(productsLoaded => productsLoaded),
            first()
        );
    }

}