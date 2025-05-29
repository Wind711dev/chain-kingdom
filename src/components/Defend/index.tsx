import { useEffect, useState } from 'react';
import LeftMsg from './components/LeftMsg';
import MonsterTeam from './components/MonsterTeam';
import RightMsg from './components/RightMsg';

const messages: {
  side: 'left' | 'right';
  text: string;
  isAttack?: boolean;
}[] = [
  {
    side: 'left',
    text: 'Lorem ipsum dolor sit amet consectetur. Posuere blandit mauris tellus enim platea consequat nulla consequat.',
    isAttack: false,
  },
  {
    side: 'right',
    text: 'Lorem ipsum dolor sit amet consectetur. Posuere blandit mauris tellus enim platea consequat nulla consequat.',
    isAttack: false,
  },
  {
    side: 'left',
    text: 'Lorem ipsum dolor sit amet consectetur. Posuere blandit mauris tellus enim platea consequat nulla consequat.',
    isAttack: false,
  },
  {
    side: 'right',
    text: 'Do you want to hit it?',
    isAttack: true,
  },
];

interface MonsterTeamProps {
  isShow?: boolean;
  defendRef: React.RefObject<HTMLDivElement | null>;
}

export default function DefendComponent({ isShow, defendRef }: MonsterTeamProps) {
  const [index, setIndex] = useState(0);
  const [isMsg, setIsMsg] = useState(true);
  const [isWin, setIsWin] = useState(false);
  const [isAttack, setIsAttack] = useState(false);

  const currentMessage = messages[index];

  const handleNext = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
    }
  };

  const onClickAttack = () => {
    setIsMsg(false);
    setIsAttack(true);
  };

  useEffect(() => {
    if (isAttack) {
      setTimeout(() => {
        setIsAttack(false);
        setIsWin(true);
      }, 4000);
    }
  }, [isAttack]);

  return (
    <div style={{ display: isShow ? 'block' : 'none' }}>
      <MonsterTeam
        msg={currentMessage.side}
        isMsg={isMsg}
        isWin={isWin}
        isAttack={isAttack}
        defendRef={defendRef}
      />
      {isMsg &&
        (currentMessage.side === 'left' ? (
          <LeftMsg text={currentMessage.text} onNext={handleNext} />
        ) : (
          <RightMsg
            text={currentMessage.text}
            onNext={handleNext}
            isAttack={currentMessage.isAttack}
            onAttack={onClickAttack}
          />
        ))}
    </div>
  );
}
