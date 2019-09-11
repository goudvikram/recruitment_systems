import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

export interface Category {
  id:string
  name:string
}

const CATEGORIES = [
  {id: '1', name: 'Java'},
  {id: '2', name: 'Dot.Net'},
  {id: '3', name: 'Front end'}
]

const categoriesMaps = {}

const store = new BehaviorSubject<Category[]>(CATEGORIES)

let nextId = CATEGORIES.length

@Injectable()
export class CategoriesService {

  categoriesChanges = store.asObservable().distinctUntilChanged()

  constructor() { }

  getCategories(){
    return store.value || []
  }

  getCategoryById(id){
    return this.getCategories().find(category => category.id === id)
  }

  addCategory(category){
    const categories = this.getCategories()
    category.id = String(++nextId)
    this.setCategories(categories)
  }

  setCategories(categories){
    store.next([...categories])
  }

}
