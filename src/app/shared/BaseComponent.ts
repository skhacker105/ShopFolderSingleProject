import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BaseService } from '../services';
import { IMoreAction } from '../interfaces';

@Directive()
export class BaseComponent implements OnInit, OnDestroy {
    
    isActive = new Subject<boolean>();
    route: ActivatedRoute;
    baseService: BaseService;


    constructor(
        route: ActivatedRoute,
        baseService: BaseService
    ) {
        this.route = route;
        this.baseService = baseService;
    }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.baseService.page = {
                title: data['title'],
                subTitle: data['subTitle'],
                moreActions: data['moreActions'] as IMoreAction[]
            };
        });
    }

    ngOnDestroy(): void {
        this.isActive.next(true);
        this.isActive.complete();
    }
}