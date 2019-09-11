import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/distinctUntilChanged'

import {CategoriesService} from './categories.service'

export interface Question {
  id:string;
  question:string;
  categoryId:string;
  category?:any
}

const QUESTIONS:any[] = [
  {id: '1', question: 'What is OOPs?', categoryId: '1', category: {id: '1', name: 'Java'}}
]

const state = {
  questions: QUESTIONS
}

let nextId = QUESTIONS.length

const store = new BehaviorSubject<Question[]>(QUESTIONS)

@Injectable()
export class QuestionsService {

  questionsChanges = store.asObservable().distinctUntilChanged()

  constructor(
    private categoriesService: CategoriesService
  ) { }

  getQuestions() {
    return store.value || []
  }

  addQuestion(question){
    question.id = String(++nextId)
    let questions = this.getQuestions()
    question.category = this.categoriesService.getCategoryById(question.categoryId)
    questions.push(question)
    this.setQuestions(questions)
  }

  setQuestions(questions){
    store.next([...questions])
  }

}
