import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinners from './Spinners'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `NewsMonkey - ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`
    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=155f7488ef7c4b548d2b808c762b5a4e&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
        updateNews();
    }, [])

    // const componentDidMount = async () => {
    //     props.setProgress(0);
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.akiKey}&page=1&pageSize=${props.pageSize}`;
    //     // apiKey = f02319e73a294795ab492d73bacfb14c
    //     let data = await fetch(url);
    //     props.setProgress(50);
    //     let parsedData = await data.json();
    //     props.setProgress(80);
    //     setArticles(parsedData.articles)
    //     setTotalResults(parsedData.totalResults)
    //     setLoading(false)
    //     props.setProgress(100);
    // }
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=155f7488ef7c4b548d2b808c762b5a4e&pageSize=${props.pageSize}&page=${page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setTotalResults(parsedData.totalResults)
        setArticles(articles.concat(parsedData.articles))
        setPage(page + 1)
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     page: this.state.page + 1
        // });
    }
    // handlePrev = async () => {
    //     this.setState({ loading: true })
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=155f7488ef7c4b548d2b808c762b5a4e&pageSize=${props.pageSize}&page=${this.state.page - 1}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({ articles: parsedData.articles, page: this.state.page - 1, loading: false })

    // }
    // handleNext = async () => {
    //     this.setState({ loading: true })
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=155f7488ef7c4b548d2b808c762b5a4e&pageSize=${props.pageSize}&page=${this.state.page + 1}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({ articles: parsedData.articles, page: this.state.page + 1, loading: false })
    // }
    return (
        <div className='container my-3 '>
            <h3 className='text-center my-3'>NewsMonkey - {props.category.charAt(0).toUpperCase() + props.category.slice(1)} headlines</h3>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                // inverse={true} //
                hasMore={articles.length < totalResults}
                loader={<Spinners />}
            >
                {/* {this.state.loading && <Spinners />} */}
                <div className='container'>
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} timeDate={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrev} className="btn btn-success">&larr; Previous</button>
                    <button disabled={this.state.totalResults <= (props.pageSize * this.state.page)} onClick={this.handleNext} className="btn btn-success">Nexr &rarr;</button>
                </div> */}
        </div>
    )

}

News.defaultProps = {
    category: 'general',
    pageSize: 9
}

export default News