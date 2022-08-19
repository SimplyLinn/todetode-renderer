import React from 'react';

import Radical from '../components/Radical';

export default function Page() {
  return (
    <div>
      <h1>Hello World</h1>
      <svg>
        <Radical
          radical="FLY_WINGED"
          size={100}
          strokeWidth={2}
          stroke="black"
          fill="none"
          transform="translate(10, 10)"
        />
      </svg>
    </div>
  );
}
