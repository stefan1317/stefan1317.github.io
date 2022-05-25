import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendURL } from '../constants';
import { IArticle } from '../model/iarticle';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get<IArticle[]>(backendURL.articles);
  }

  addArticles(article: IArticle) {
    return this.http.post<IArticle>(backendURL.articles, article);
  }

  updateArticles(article: IArticle) {
    return this.http.put<IArticle>(backendURL.articles + '/' + article.id, article);
  }

  deleteArticles(id: number) {
    return this.http.delete<IArticle>(backendURL.articles + '/' + id);
  }
}
