import '../../assets/css/pages/Articles.css';
import react from 'react';

const Articles = () => {

    return (
        <div className='content-load pt-70'>
            <div className='page-body'>
                <section className='articles'>
                    <div className='container'>
                        <div className='row mb-3'>
                            <div className='col-12'>
                                <h4 className='page-title'>Articles</h4>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col col-md-4 card'>
                                <div className="card-box">
                                    <img src={"/images/articles/articles1.jpg"} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title mb-4">Agriculture Organic Farming – Livestock and Vegetable Crops</h6>
                                        <a href="https://www.capel.ac.uk/course/agriculture/agriculture-organic-farming-livestock-and-vegetable-crops-award-level-1/" className="btn btn-primary" target='_blank'>Read More</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col col-md-4 card'>
                                <div className="card-box">
                                    <img src={"/images/articles/articles2.jpg"} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title mb-4">The Competitive Economics Of Vertical And Greenhouse Farming</h6>
                                        <a href="https://aigrow.lk/" className="btn btn-primary" target='_blank'>Read More</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col col-md-4 card'>
                                <div className="card-box">
                                    <img src={"/images/articles/articles3.jpg"} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title mb-4">New Farming Frontiers—Heat, Pesticides, and Virtual Reality</h6>
                                        <a href="https://daily.jstor.org/sustainability-now-new-farming-frontiers-heat-pesticides-virtual-reality/" className="btn btn-primary" target='_blank'>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )

}

export default Articles;