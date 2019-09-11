import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import {QuestionsService, Question} from '../questions.service'
import {CategoriesService, Category} from '../categories.service'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styles: []
})
export class QuestionsComponent implements OnInit {
  subscribtions = []
  questionFormModalRef: BsModalRef;
  previewQuestionsModalRef: BsModalRef;
  questionForm:FormGroup
  questions:Observable<Question[]>
  categories: Observable<Category[]>
  selectAll:boolean = false
  selectedQuestions: Observable<Question[]>
  selectedQuestionsSource = new BehaviorSubject<Question[]>([])


  @ViewChild('questionFormTemplate') questionFormTemplate: TemplateRef<any>
  @ViewChild('questionsPreviewTemplate') questionsPreviewTemplate: TemplateRef<any>

  constructor(
    private questionsService:QuestionsService,
    private categoriesSerice: CategoriesService,
    private modalService: BsModalService,
    private fb:FormBuilder) {
      this.buildQuestionForm()
      this.questions = this.questionsService.questionsChanges
      this.categories = this.categoriesSerice.categoriesChanges
      this.selectedQuestions = this.selectedQuestionsSource.asObservable()
    }

  onPreview(){
    this.previewQuestionsModalRef = this.modalService.show(this.questionsPreviewTemplate)
  }

  onChangeSelectAll(ev){
    let checked = ev.target.checked
    this.selectAll = checked
    console.log('this.selectAll', this.selectAll)
  }

  onChangeSelectedQuestion(ev, question:Question){
    let checked = ev.target.checked
    let selectedQuestions = this.selectedQuestionsSource.value;
    let idx = selectedQuestions.indexOf(question)
    if(checked && idx === -1){
      selectedQuestions.push(question)
      if(this.questionsService.getQuestions().length === this.selectedQuestionsSource.value.length){
        this.selectAll = true
      }
    } else {
      if(idx !== -1){
        selectedQuestions.splice(idx, 1)
      }
      this.selectAll = false;
    }
  }

  onQuestionFormSubmit(){
    let question = this.questionForm.value
    this.questionsService.addQuestion(question)
    this.questionForm.reset()
    this.questionFormModalRef.hide()
  }

  buildQuestionForm(){
    this.questionForm = this.fb.group({
      categoryId: ['', Validators.required],
      question: ['', Validators.required]
    })
  }
 
  openModal(template: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(template);
  }

  onAddNewQuestion(){
    this.questionFormModalRef = this.modalService.show(this.questionFormTemplate)
  }

  ngOnInit() {

  }

}
