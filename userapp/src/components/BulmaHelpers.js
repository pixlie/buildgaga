import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';


export const Hero = ({ heroSize = "", children }) => (
  <section className={`hero ${heroSize}`}>
    <div className="hero-body">
      <div className="container">
        {children}
      </div>
    </div>
  </section>
);


export const Section = ({ size = "", children }) => (
  <section className={`section ${size}`}>
    <div className="container">
      { children }
    </div>
  </section>
);


export const Hx = ({ x = "3", titleClass = "title", children }) => {
  return React.createElement(`h${x}`, {className: `${titleClass} is-${x}`}, children);
}


export const CellBox = withRouter(({ title, message, colSize = 4, url, history, children }) => {
  if (url !== undefined) {
    const handleRoute = event => {
      event.preventDefault();
      history.push(url);
    }
    return (
      <div className={`column is-${colSize}`}>
        <div className="box" onClick={handleRoute}>
          { title ? <Hx x="4" titleClass="subtitle">{title}</Hx> : null }
          { message ? (
            <p>{message}</p>
          ) : null }
          { children }
        </div>
      </div>
    );
  }

  return (
    <div className={`column is-${colSize}`}>
      <div className="box">
        { title ? <Hx x="4" titleClass="subtitle">{title}</Hx> : null }
        { message ? (
          <p>{message}</p>
        ) : null }
        { children }
      </div>
    </div>
  );
});


const TabContent = ({ tabName, currentTab, children }) => (
  <Fragment>
    { tabName === currentTab ? (
      <Fragment>
        {children}
      </Fragment>
    ) : null }
  </Fragment>
);


const TabLink = ({ tabName, currentTab, handleClick, children }) => {
  if (tabName === currentTab) {
    return (
      <li className="is-active"><a onClick={handleClick} href={`#${tabName}`} data-tab={tabName}>{children}</a></li>
    );
  } else {
    return (
      <li><a onClick={handleClick} href={`#${tabName}`} data-to={tabName}>{children}</a></li>
    );
  }
}