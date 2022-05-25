import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IArticle } from 'src/app/model/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  articleList: IArticle[] = [];
  filteredArticleList: IArticle[] = [];
  numberOfArticlesDisplayed = 3;
  startIndex = 0;
  endIndex = this.numberOfArticlesDisplayed;
  articleSubscription = new Subscription();
  isModalOpen = false;
  selectedArticle: IArticle = {
    id: 0,
    title: '',
    tag: '',
    author: '',
    date: '',
    imgUrl: '',
    saying: '',
    summary: '',
    content: '',
  }

  constructor(private articleServie: ArticlesService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.articleSubscription = this.articleServie.getArticles().subscribe((response) => {
      this.articleList = response;
      this.filteredArticleList = response.filter((article, index) => index >= this.startIndex && index < this.endIndex)
    });
  }

  resetSelectedArticle() {
    this.selectedArticle = {
      id: 0,
      title: '',
      tag: '',
      author: '',
      date: '',
      imgUrl: '',
      saying: '',
      summary: '',
      content: '',
    }
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  toggleModal(state: boolean) {
    this.isModalOpen = state;
  }

  selectArticle(selectedArticle: IArticle) {
    this.selectedArticle = selectedArticle;
    this.toggleModal(true);
  }

  prevArticles() {
    this.startIndex = this.startIndex - this.numberOfArticlesDisplayed;
    this.endIndex = this.endIndex - this.numberOfArticlesDisplayed;
    this.filteredArticleList = this.articleList.filter((article, index) => index >= this.startIndex && index < this.endIndex)
  }

  nextArticles() {
    this.startIndex = this.startIndex + this.numberOfArticlesDisplayed;
    this.endIndex = this.endIndex + this.numberOfArticlesDisplayed;
    this.filteredArticleList = this.articleList.filter((article, index) => index >= this.startIndex && index < this.endIndex)
  }
}