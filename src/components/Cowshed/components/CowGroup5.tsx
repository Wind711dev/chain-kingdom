import React from 'react';
import Cow from '../../../assets/object/cow.png';
import Cow2 from '../../../assets/object/cow2.png';

const CowGroup5 = React.memo(function CowGroup5() {
  return (
    <>
      {[...Array(5)].map((_, index) => {
        const randomSrc = Math.random() > 0.5 ? Cow : Cow2;
        return (
          <img key={index} className={`cow cow-g-5-${index + 1}`} src={randomSrc} alt={'cow'} />
        );
      })}
    </>
  );
});

export default CowGroup5;
