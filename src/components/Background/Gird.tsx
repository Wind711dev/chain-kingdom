import { useEffect, useMemo, useState } from 'react';

interface DiamondData {
  id: string;
  top: number;
  left: number;
  size: number;
  isVisible: boolean;
  clippedArea: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
}

interface GapArea {
  id: string;
  centerX: number;
  centerY: number;
  vertices: { x: number; y: number }[];
}

interface IDiamondHoneycombGrid {
  showGrid: boolean;
  onClickGrid: (value: DiamondData) => void;
}

const DiamondHoneycombGrid = ({ showGrid, onClickGrid }: IDiamondHoneycombGrid) => {
  if (!showGrid) {
    return;
  }
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const diamondData = useMemo(() => {
    const diamondSize = viewportSize.width / 6;
    const gapX = 16;
    const gapY = 16;

    const colWidth = diamondSize + gapX * 2;
    const rowHeight = (gapY * 2 + diamondSize) / 2;

    const cols = Math.ceil(viewportSize.width / colWidth) + 2;
    const rows = Math.ceil(viewportSize.height / rowHeight) + 2;

    const bufferRow = 2;
    const bufferCol = 2;

    const data: DiamondData[] = [];

    for (let row = -bufferRow; row < rows + bufferRow; row++) {
      for (let col = -bufferCol; col < cols + bufferCol; col++) {
        const top = (gapY * (2 * row + 1) + diamondSize * row) / 2;

        const offsetX = row % 2 === 0 ? 0 : colWidth / 2;
        const left = gapX * (2 * col + 1) + diamondSize * col + offsetX;

        const right = left + diamondSize;
        const bottom = top + diamondSize;

        const isFullyVisible =
          left >= 0 && top >= 0 && right <= viewportSize.width && bottom <= viewportSize.height;

        let clippedArea = null;
        if (!isFullyVisible) {
          const visibleLeft = Math.max(0, left);
          const visibleTop = Math.max(0, top);
          const visibleRight = Math.min(viewportSize.width, right);
          const visibleBottom = Math.min(viewportSize.height, bottom);

          if (visibleRight > visibleLeft && visibleBottom > visibleTop) {
            clippedArea = {
              left: visibleLeft - left,
              top: visibleTop - top,
              width: visibleRight - visibleLeft,
              height: visibleBottom - visibleTop,
            };
          }
        }

        data.push({
          id: `diamond-${row}-${col}`,
          top,
          left,
          size: diamondSize,
          isVisible: isFullyVisible || Boolean(clippedArea),
          clippedArea,
        });
      }
    }

    return data;
  }, [viewportSize]);

  const gapAreas = useMemo(() => {
    const gaps: GapArea[] = [];
    const rowGroups = diamondData.reduce(
      (groups, diamond) => {
        const y = Math.round(diamond.top / 5) * 5; // tăng độ nhạy nhóm
        if (!groups[y]) groups[y] = [];
        groups[y].push(diamond);
        return groups;
      },
      {} as Record<number, DiamondData[]>
    );

    Object.values(rowGroups).forEach((row, rowIndex) => {
      row.sort((a, b) => a.left - b.left);

      for (let i = 0; i < row.length - 1; i++) {
        const current = row[i];
        const next = row[i + 1];

        const gapWidth = next.left - (current.left + current.size);

        if (gapWidth > 5) {
          const centerX = current.left + current.size + gapWidth / 2;
          const centerY = current.top + current.size / 2;
          const halfDiagonal = gapWidth / Math.sqrt(2);

          gaps.push({
            id: `gap-${rowIndex}-${i}`,
            centerX,
            centerY,
            vertices: [
              { x: centerX, y: centerY - halfDiagonal },
              { x: centerX + halfDiagonal, y: centerY },
              { x: centerX, y: centerY + halfDiagonal },
              { x: centerX - halfDiagonal, y: centerY },
            ],
          });
        }
      }
    });

    return gaps;
  }, [diamondData]);

  const renderDiamond = (diamond: DiamondData) => {
    const isSelected = selectedItem === diamond.id;

    return (
      <div
        key={diamond.id}
        className={`absolute transition-all duration-300 ${isSelected ? 'z-10' : ''}`}
        onClick={() => {
          onClickGrid(diamond);
          setSelectedItem(diamond.id);
        }}
      >
        <div
          className={`absolute ${isSelected ? 'bg-blue-400' : ''} opacity-70 outline outline-black outline-dashed`}
          style={{
            width: `${diamond.size}px`,
            height: `${diamond.size}px`,
            transform: 'rotate(45deg)',
            top: `${diamond.top}px`,
            left: `${diamond.left}px`,
          }}
        />

        {diamond.clippedArea && (
          <div
            className='absolute opacity-50'
            style={{
              width: `${diamond.size}px`,
              height: `${diamond.size}px`,
              transform: 'rotate(45deg)',
              top: `${diamond.top}px`,
              left: `${diamond.left}px`,
              clipPath: `rect(
                ${diamond.clippedArea.top}px,
                ${diamond.clippedArea.left + diamond.clippedArea.width}px,
                ${diamond.clippedArea.top + diamond.clippedArea.height}px,
                ${diamond.clippedArea.left}px
              )`,
            }}
          />
        )}
      </div>
    );
  };

  const renderInfoPanel = () => {
    if (!selectedItem) return null;

    const diamond = diamondData.find((d) => d.id === selectedItem);
    const gap = gapAreas.find((g) => g.id === selectedItem);

    return (
      <div className='absolute top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-xs z-50'>
        {diamond && (
          <>
            <h3 className='font-bold mb-2'>Hình thoi {diamond.id}</h3>
            <p>
              Tọa độ: ({Math.round(diamond.left)}, {Math.round(diamond.top)})
            </p>
            <p>Kích thước: {Math.round(diamond.size)}px</p>
            {diamond.clippedArea && (
              <p className='text-red-400'>
                Bị cắt: {Math.round(diamond.clippedArea.width)}×
                {Math.round(diamond.clippedArea.height)}px
              </p>
            )}
          </>
        )}

        {gap && (
          <>
            <h3 className='font-bold mb-2'>Khoảng trống {gap.id}</h3>
            <p>
              Trung tâm: ({Math.round(gap.centerX)}, {Math.round(gap.centerY)})
            </p>
            <p>Kích thước: {Math.round(gap.vertices[1].x - gap.vertices[3].x)}px</p>
          </>
        )}

        <button className='mt-2 text-sm text-blue-400' onClick={() => setSelectedItem(null)}>
          Đóng
        </button>
      </div>
    );
  };

  return (
    <div className='relative w-screen h-screen overflow-hidden'>
      {diamondData.map(renderDiamond)}

      {renderInfoPanel()}
    </div>
  );
};

export default DiamondHoneycombGrid;
