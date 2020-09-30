import React, { Component } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames'

export default class NewsBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSearchFocus: false,
            currentTab: -1,
            currentPage: 1,
            newsPerPage: 5
        }
        this.choosePage = this.choosePage.bind(this);
    }

    choosePage(event) {
        window.scrollTo(0,0);
        if (Number(event.target.id) === 0) {
            this.setState({
                currentPage: this.state.currentPage
            })
        } else if (Number(event.target.id) === -1) {
            if (this.state.currentPage > 1) {
                this.setState({
                    currentPage: this.state.currentPage - 1
                })
            } else {
                this.setState({
                    currentPage: 1
                })
            }
        } else if (Number(event.target.id) === 999) {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        } else {
            this.setState({
                currentPage: Number(event.target.id),
            })
        }
    }

    render() {
        const { news,  } = this.props;
        const { currentTab, currentTabText } = this.state;
        const topViews = (news.sort((a, b) => b.newView - a.newView)).slice(0,3); //Top view on Category
        
        //Filt Posts depend on Category
        var filterNews = [];
        if (currentTab === -1) {
            filterNews = news;
        } else if (currentTabText) {
            filterNews = news.filter((item) => {
                return item.newCate === currentTabText
            })
        } else {
            filterNews = news;
        }

        //Panigation
        let currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentNews = filterNews.slice(indexOfFirstNews, indexOfLastNews);
        const firstPost = currentNews[0]; //Post of big image
        const nextPosts = currentNews.slice(1);

        //Panigation button
        const pageNumbers = []; //Số trang được chia ra
        for (let i = 1; i <= Math.ceil(filterNews.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        const pages = [];
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage);
        } else {
            if (currentPage === 1 && pageNumbers.length === 1) {
                pages.push();
            } else if (currentPage === 1 && currentPage < pageNumbers.length) {
                pages.push(currentPage, currentPage + 1);
            }else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage);
            } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
                pages.push(currentPage -1, currentPage);
            } else if (currentPage === pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage);
            } else {
                pages.push(currentPage - 1, currentPage);
            }
        }

        //Get all category
        const cate = Object.values(news.reduce((a, {newCate}) => {
            a[newCate] = a[newCate] || {newCate, count: 0};
            a[newCate].count++;
            return a;
        }, Object.create(null)));
        //Sort and splice category by posts count
        cate.sort((a,b) =>  b.count - a.count)
        const splicedCate = cate.splice(0,5);
        splicedCate.sort((a, b) => b.count - a.count);
        
        const sortedCate = [];
        for (let i = 0; i < splicedCate.length; i++) {
            sortedCate.push(splicedCate[i].newCate);
        }

        return(
            <div className="NewsBody">
                <div className="newsbanner-nav">
                    <div
                        className={currentTab === -1 ? "newsbanner-nav-active" : ""}
                        onClick={() => {
                            this.setState({
                                currentTab: -1,
                                currentPage: 1
                            })
                        }}
                        >All Blog Posts
                    </div>
                    {sortedCate.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    id={index}
                                    className={currentTab === Number(index) ? "newsbanner-nav-active" : ""}
                                    onClick={(event) => {
                                        this.setState({
                                            currentTab: index, 
                                            currentTabText: event.currentTarget.textContent,
                                            currentPage: 1
                                        })
                                    }}
                                    >{item}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="newsbody-container">
                    <div className="newsbody-post">
                        <div className="newsbody-big flex-center">
                            <img className="newsbody-big-img" src={firstPost.newImg} alt="z"/>
                            <div className="newsbody-info flex-center">
                                <div className="newsbody-time">{firstPost.newTime}</div>
                                <div className="newsbody-cate">{firstPost.newCate}</div>
                            </div>
                            <div className="newsbody-title">{firstPost.newTitle}</div>
                            <div className="newsbody-content">{firstPost.newContent}</div>
                            <div className="newsbody-link">Read More</div>
                            <div className="newsbody-smaill-line"></div>
                        </div>
                        {nextPosts.map((item, index) => {
                            return (
                                <div className="newsbody-small" key={index}> 
                                    <div className="newsbody-small-container">
                                        <img className="newsbody-small-img" src={item.newImg} alt="z"/>
                                        <div className="newsbody-small-left">
                                            <div className="newsbody-small-info flex-center">
                                                <div className="newsbody-time">{item.newTime}</div>
                                                <div className="newsbody-cate">{item.newCate}</div>
                                            </div>
                                            <div className="newsbody-title">{item.newTitle}</div>
                                            <div className="newsbody-content">{item.newContent}</div>
                                            <div className="newsbody-link">Read More</div>
                                        </div>
                                    </div>
                                    <div className="newsbody-smaill-line"></div>
                                </div>
                            )
                        })}
                        <div className="newspagnigation-container">
                            <div className="newspagnigation" onClick={this.choosePage}>
                                <div id="-1" className={classNames({
                                    newspagnigation_disable: currentPage === 1
                                })}>←</div>
                                { pages.map(function(number, index) { 
                                    if (currentPage === number) {
                                        return (
                                            <div key={number} id={number} className="newspagnigation-active">
                                                {number}
                                            </div>
                                        )
                                    } else {
                                        return (
                                        <div 
                                            key={number}
                                            id={number}
                                            >
                                                {number}
                                        </div>
                                        )
                                    } 
                                })}
                                <div id="999" className={classNames({
                                    newspagnigation_disable: currentPage === pageNumbers.length
                                })}>→</div>
                            </div>
                        </div>
                    </div>
                    <div className="newsbody-widget">
                        <div className="widget-search">
                            <div className="widget-title">Search</div>
                            <form className={ this.state.isSearchFocus === true ? "widget-form widget_search_click" : "widget-form"} 
                                onMouseEnter={() => { this.setState({ isSearchFocus: true})}}
                                onMouseLeave={() => { this.setState({ isSearchFocus: false})}}>
                                <input placeholder="Search the site"></input>
                                <button>Search</button>
                            </form>
                        </div>
                        <div className="widget-pop">
                            <div className="widget-title">Popular Posts</div>
                            {
                                topViews.map((item, index) => {
                                    return(
                                        <div key={index} className="widget-post">
                                            <div className="widget-post-img" style={{backgroundImage: `url(${item.newImg})`}}></div>
                                            <div className="widget-post-info">
                                                <div className="widget-post-title">{item.newTitle}</div>
                                                <div className="widget-post-info2">
                                                    <span className="widget-post-time">{item.newTime}</span>
                                                    <span className="widget-post-view">{item.newView} view</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="widget-cate">
                            <div className="widget-title">Categorys</div>
                            {
                                splicedCate.map((item, index) => {
                                    return (
                                        <div key={index} className="widget-cate-container">
                                            <div className="widget-cate-div">
                                                <div>{item.newCate}</div>
                                                <div className="widget-cate-count">{item.count}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="widget-connect">
                            <div className="widget-title">Stay Connected</div>
                            <div className="widget-connect-container">
                                <div className="widget-icon">
                                    <FontAwesomeIcon icon={faFacebookF}/>
                                </div>
                                <div className="widget-icon">
                                    <FontAwesomeIcon icon={faTwitter}/>
                                </div>
                                <div className="widget-icon">
                                    <FontAwesomeIcon icon={faInstagram}/>
                                </div>
                                <div className="widget-icon">
                                    <FontAwesomeIcon icon={faGoogle}/>
                                </div>
                            </div>
                        </div>

                        <div className="widget-newsletter">
                            <div className="widget-title">Newsletter</div>
                            <form className={ this.state.isSearchFocus === true ? "widget-form widget_search_click" : "widget-form"} 
                                onMouseEnter={() => { this.setState({ isSearchFocus: true})}}
                                onMouseLeave={() => { this.setState({ isSearchFocus: false})}}>
                                <input placeholder="Enter your email"></input>
                                <button>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="newsbody-line"></div>
            </div>
        )
    }
}