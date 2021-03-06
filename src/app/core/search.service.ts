import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp, Response } from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
 
import { ISearchService } from '../shared/interfaces'; 
import { duckduckgoSearch } from './duckduckgoSearch.service'; 
import { wikipediaSearch } from './wikipediaSearch.service'; 
 
import { forkJoin } from 'rxjs/observable/forkJoin';
 

 
@Injectable()
export class SearchService {

  
  duckduckService:ISearchService;
  wikipediaService:ISearchService;  
  constructor(private jsonp: Jsonp) {
   //Ideally search Agents should be injected though dependency injection
   this.duckduckService = new duckduckgoSearch(this.jsonp);
   this.wikipediaService = new wikipediaSearch(this.jsonp);
   }
 

 
  search(term: string) {
   
    var observer1=this.duckduckService.fetchData(term);
    var observer2=this.wikipediaService.fetchData(term);
    const combined =forkJoin(
      observer1,observer2   
  );

  return combined;
}
   
}


