import React from 'react';
import Logo from "./logo";
import i18n from "../util/i18n";

class Page extends React.Component {

    static defaultProps = {
        title: 'CMF'
    };

    render() {
        return (
            <div className="page">
                <div className="page__visual">
                    <div className="hero">
                        {i18n.get('snippets.baseline')}
                    </div>
                </div>
                <div className="page__content">
                    <div className="page__logo">
                        <Logo name={this.props.title} />
                    </div>
                    <div className="page__box">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Page;
