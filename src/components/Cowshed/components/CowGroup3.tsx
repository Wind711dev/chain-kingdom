import React, { useMemo } from 'react';
import Cow from '../../../assets/object/cow.png';
import Cow2 from '../../../assets/object/cow2.png';

const CowGroup3 = React.memo(function CowGroup3() {
  const cowImages = useMemo(() => {
    return Array.from({ length: 3 }, () => (Math.random() > 0.5 ? Cow : Cow2));
  }, []);

  return (
    <>
      {cowImages.map((src, index) => (
        <img key={index} className={`cow cow-g-3-${index + 1}`} src={src} alt='cow' />
      ))}
    </>
  );
});

export default CowGroup3;
