import React, { Component } from 'react'

export class NewsItem extends Component {
  
  
    render()
     {
        let {title,description, imageUrl , newsUrl , author ,date}= this.props;
      
        return (
                <div className="my-3">
            <div className="card" >
    <img src={!imageUrl?"https://images.indianexpress.com/2018/07/tnpsc-counselling.jpg":imageUrl} className="card-img-top" alt="..."/>
    <div className="card-body">
        <h5 className="card-title">{title}</h5><span className="badge bg-dark">new</span>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">By {!author?"Unknown" :author} on {new Date(date).toGMTString()}</small></p>
 
        
        <a rel="noreferrer" href={newsUrl} target="_blank" className=" btn btn-sm btn-primary">Read-more</a>
    </div>
    </div>
            </div>
        )
    }
}

export default NewsItem
