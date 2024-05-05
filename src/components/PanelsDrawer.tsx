'use client';
import type { CalcResult } from '../types';

interface PanelsDrawerPros {
  roofHeight: number;
  roofWidth: number;
  panels: CalcResult['recs'];
}

export default function PanelsDrawer({
  roofHeight,
  roofWidth,
  panels,
}: PanelsDrawerPros) {
  const scale = Math.min(
    Math.floor(Math.min(window.innerWidth, 800) / roofWidth),
    Math.floor(window.innerHeight / roofHeight),
  );
  return (
    <div
      style={{
        height: roofHeight * scale,
        width: roofWidth * scale,
        margin: 20,
      }}
    >
      <div
        style={{
          position: 'absolute',
          height: roofHeight * scale,
          width: roofWidth * scale,
          border: '1px solid blue',
          boxSizing: 'content-box',
        }}
      >
        {panels.map((panel, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: panel.x * scale,
              top: panel.y * scale,
              height: panel.height * scale,
              width: panel.width * scale,
              paddingBottom: 1,
              paddingRight: 1,
              paddingTop: panel.y === 0 ? 1 : 0,
              paddingLeft: panel.x === 0 ? 1 : 0,
            }}
          >
            <div
              style={{
                height: '100%',
                border: '1px solid #000',
                fontSize: '0.8rem',
                paddingLeft: 2,
              }}
            >
              {i + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
