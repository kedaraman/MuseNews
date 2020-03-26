import React, {Component} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import NewsArticle from './NewsArticle.js';
import './../App.css';

const GoogleNewsRss = require('google-news-rss');

const googleNews = new GoogleNewsRss();

class NewsGrid extends Component{

    constructor(props){
        super(props);
        this.state = {
            terms: this.props.terms,
            page: this.props.page,
            articles: [
                {title: 'ERROR', preview: 'Something went wrong', img: './../newsImage.jpg'},
                {title: 'ERROR', preview: 'Something went wrong', img: './../newsImage.jpg'},
                {title: 'ERROR', preview: 'Something went wrong', img: './../newsImage.jpg'},
                {title: 'ERROR', preview: 'Something went wrong', img: './../newsImage.jpg'}
            ]
        }
        this.getNews(this.state.terms);
        this.forceUpdate();
    }

    getNews(q, page){
        let apikey = "bc2ebdb795c5488bb34601ca89a75e7f"
        let requestURL = "http://newsapi.org/v2/everything?q=" + q + "&page=" + page + "&apiKey=" + apikey;
        var outData = "Empty";
        const resp =  fetch(requestURL).then(
            response=>{
                return response.json();
            }).then(
            data=> {
                console.log(data);
                var newArticles = []
                for(var i = 0; i < 20; i++){
                    newArticles.push({key: i, title: data.articles[i].title, preview: data.articles[i].description, img: data.articles[i].urlToImage});
                }
                this.setState({articles: newArticles}, () => this.forceUpdate());
            }

        );
        console.log(this.state);
    }

    componentDidUpdate(){
        if(this.state.terms !== this.props.terms){
            this.setState({
                terms: this.props.terms,
                page: this.props.page
            }, () => this.getNews(this.state.terms, this.state.page));
        }
        else if(this.state.page !== this.props.page){
            this.setState({
                page: this.props.page
            }, ()=> this.getNews(this.state.terms, this.state.page));
        }
    }

    // TODO change this to show more cards instead of a hardcoded table
    render(){
        var cards = [];
        for(var i = 0; i < this.state.articles.length; i++){
            cards.push(<NewsArticle title={this.state.articles[i].title} preview={this.state.articles[i].preview} img={this.state.articles[i].img} />)
        }
        var grid = []
        for(var r = 0; r < 5; r++){
            var row = [];
            for(var c = 0; c < 4; c++){
                var col = <Col>{cards[r*4 + c]}</Col>;
                row.push(col);
            }
            grid.push(<Row>{row}</Row>);
        }
        return(
            <div style={{marginLeft:20}}>
                {grid}
            </div>
        );
    }
}
export default NewsGrid;
