import { useEffect, useState } from 'react';
import MainCharMsg from './components/MainCharMsg';
import MonsterMsg from './components/MonsterMsg';
import MonsterTeam from './components/MonsterTeam';

const messages: {
  side: 'left' | 'right';
  text: string;
  isAttack?: boolean;
}[] = [
  {
    side: 'right',
    text: 'Lorem ipsum dolor sit amet consectetur.',
    isAttack: false,
  },
  {
    side: 'left',
    text: 'Posuere blandit mauris tellus enim platea consequat nulla consequat.',
    isAttack: false,
  },
  {
    side: 'right',
    text: 'Posuere blandit mauris tellus enim platea consequat nulla consequat.',
    isAttack: false,
  },
  {
    side: 'left',
    text: 'Do you want to hit it?',
    isAttack: true,
  },
];

interface MonsterTeamProps {
  isShow?: boolean;
  defendRef: React.RefObject<HTMLDivElement | null>;
  showReward: () => void;
}

export default function DefendComponent({ isShow, defendRef, showReward }: MonsterTeamProps) {
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
        showReward();
      }, 4000);
      setTimeout(() => {
        setIsAttack(false);
        setIsWin(false);
        setIndex(0);
      }, 4500);
    }
  }, [isAttack]);

  useEffect(() => {
    if (isShow) {
      setIsMsg(true);
    }
  }, [isShow]);

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
          <MainCharMsg
            text={currentMessage.text}
            onNext={handleNext}
            isAttack={currentMessage.isAttack}
            onAttack={onClickAttack}
          />
        ) : (
          <MonsterMsg text={currentMessage.text} onNext={handleNext} />
        ))}
    </div>
  );
}
