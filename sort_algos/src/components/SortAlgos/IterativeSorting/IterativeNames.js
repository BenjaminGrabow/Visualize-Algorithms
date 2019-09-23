import React, { useState } from 'react';
  import IterativeTabs from './IterativeTabs';
  
  const IterativeNames = () => {
    const [index, setIndex] = useState(0);
    return (
      <IterativeTabs
        style={{ alignSelf: 'flex-end' }}
        tabs={[
          { label: 'Specs' },
          { label: 'Comparison' },
          { label: 'Reviews' },
          { label: 'Return Policy' },
        ]}
        value={index}
        onChange={(e, i) => setIndex(i)}
      />
    );
  }
  
  export default IterativeNames;