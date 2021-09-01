
import React from 'react'

const Wave = () => {
    return (
        <div style={{ height: 150 }} overflow="hidden" className="hero-wave">
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 500 150"
            style={{ height: "100%", width: "100%" }}
          >
            <path
              fill="#fff"
              d="M0 49.99c150 100.01 349.2-99.98 500 0V150H0z"
            ></path>
          </svg>
        </div>
      );
}

export default Wave
