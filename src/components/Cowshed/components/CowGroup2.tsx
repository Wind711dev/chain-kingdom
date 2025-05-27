import React from 'react';
import Cow from '../../../assets/object/cow.png';
import Cow2 from '../../../assets/object/cow2.png';

const CowGroup2 = React.memo(() => {
  return (
    <>
      {[...Array(2)].map((_, index) => {
        const randomSrc = Math.random() > 0.5 ? Cow : Cow2;
        return <img key={index} className={`cow cow-g-2-${index + 1}`} src={randomSrc} alt='cow' />;
      })}
    </>
  );
});

export default CowGroup2;
