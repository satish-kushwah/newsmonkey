// import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NewsItem extends Component {
    // static propTypes = {}

    render() {
        let { title, desc, imageUrl, url, author, timeDate } = this.props;
        return (
            <div className='my-3'>
                {/* <span class="badge rounded-pill text-bg-primary">Primary</span> */}
                <div className="card">
                    <div className="d-flex">
                        <span class="badge text-bg-danger" style={{ position: 'absolute' }}>{source}</span>
                        <img src={imageUrl} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{desc}</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(timeDate).toGMTString()}</small></p>
                        <a target="_blank" href={url} className="btn btn-sm btn-success">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
