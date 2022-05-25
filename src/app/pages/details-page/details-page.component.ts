import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArticle } from 'src/app/model/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  articleId!: string;
  routeSubscription = new Subscription();
  articleSubscription = new Subscription();
  article: IArticle = {
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

  constructor(private route: ActivatedRoute,
    private articlesService: ArticlesService) { }

  ngOnInit(): void {
   this.routeSubscription = this.route.paramMap.subscribe((params) => {
     this.articleId = params.get('id')!;
     this.articleSubscription = this.articlesService.getArticle(this.articleId).subscribe((response) => {
     this.article = response;
   })
   })
  }
}
