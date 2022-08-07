import { getByTitle } from '@testing-library/react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinners from './Spinners'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        category: 'general',
        pageSize: 9
    }
    static propTypes = {}

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMonkey - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`
    }
    async componentDidMount() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f02319e73a294795ab492d73bacfb14c&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(80);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
        // console.log(parsedData.totalResults);
    }
    fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=f02319e73a294795ab492d73bacfb14c&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            page: this.state.page + 1
        });
    };
    handlePrev = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=155f7488ef7c4b548d2b808c762b5a4e&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, page: this.state.page - 1, loading: false })

    }
    handleNext = async () => {
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=155f7488ef7c4b548d2b808c762b5a4e&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, page: this.state.page + 1, loading: false })
    }
    render() {
        return (
            <div className='container my-3 '>
                <h3 className='text-center my-3'>NewsMonkey - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} headlines</h3>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    // inverse={true} //
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinners />}
                // scrollableTarget="scrollableDiv"
                >
                    {/* {this.state.loading && <Spinners />} */}
                    <div className='container'>
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} timeDate={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrev} className="btn btn-success">&larr; Previous</button>
                    <button disabled={this.state.totalResults <= (this.props.pageSize * this.state.page)} onClick={this.handleNext} className="btn btn-success">Nexr &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News