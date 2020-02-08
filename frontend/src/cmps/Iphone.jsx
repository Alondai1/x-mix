import React from 'react'

export default function Iphone(props) {
    return (
        <figure className="iphone">
        <div className="side-buttons">
          <div></div>
        </div>
        <div className="phone">
          <div className="top">
            <div>
              <span className="camera"></span>
              <span className="speaker"></span>
            </div>
          </div>
  
  
          {props.children}
  
          <div className="bottom">
            <div></div>
          </div>
        </div>
  
  
  
  
      </figure>
    )
}
