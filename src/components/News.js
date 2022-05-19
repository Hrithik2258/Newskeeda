import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static PropsType = {
    country: PropTypes.string,

    pageSize: this.PropsType,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0,
    };
    document.title = `${this.props.category} - NewsKeeda`;
  }
  async updateNews() {
    const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c98d2cffaf444aab87c99f8b71b91db5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResult,
      loading: false,
      
    })
  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    console.log("previous");

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    console.log("Next");

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
 this.setState({page:this.state.page + 1})
 const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c98d2cffaf444aab87c99f8b71b91db5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
 this.setState({ loading: true });
 let data = await fetch(url);
 let parsedData = await data.json();
 console.log(parsedData);
 this.setState({
   articles: this.state.articles.concat(parsedData.articles),
   totalResults: parsedData.totalResult,
   loading: false,
   
 })
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          NewsKeeda-Top Headlines {this.props.category} category
        </h1>
        {/* { this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : " "}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
          
          })}
        </div>
        </div>

        </InfiniteScroll>
        {/*  */}
      </>
    )
  }
}

export default News;
