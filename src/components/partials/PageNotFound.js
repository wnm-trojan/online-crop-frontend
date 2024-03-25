import '../../assets/css/partials/PageNotFound.css';
import React from 'react';

class PageNotFound extends React.Component
{

render() {
    return (
        <div className="page-not-found">
            <div className="content-load text-center">
                <h1>404</h1>
                <h3>Page Not Found</h3>
            </div>
        </div>
    )
    }
}

export default PageNotFound;