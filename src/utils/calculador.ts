import type { Box, Rec, CalcResult } from '../types';

function computePanelsRec(roof: Rec, panel: Box, rotated: boolean): CalcResult {
  if (
    Math.min(panel.width, panel.height) > Math.min(roof.width, roof.height) ||
    Math.max(panel.width, panel.height) > Math.max(roof.width, roof.height)
  ) {
    return {
      count: 0,
      recs: [],
    };
  }
  let proposal1: CalcResult | null = null;
  if (panel.width <= roof.width && panel.height <= roof.height) {
    const numPanelsInFirstRow = Math.floor(roof.width / panel.width);
    const panelsInFirstRow = Array.from(
      { length: numPanelsInFirstRow },
      (_, i) => ({
        x: panel.width * i + roof.x,
        y: roof.y,
        width: panel.width,
        height: panel.height,
      }),
    );
    const filledWith = panel.width * numPanelsInFirstRow;
    const bottomRoof = {
      x: roof.x,
      y: panel.height + roof.y,
      width: filledWith,
      height: roof.height - panel.height,
    };
    const rightRoof = {
      x: filledWith + roof.x,
      y: roof.y,
      width: roof.width - filledWith,
      height: roof.height,
    };
    const solForBottomRoof = computePanelsRec(bottomRoof, panel, false);
    const solForRightRoof = computePanelsRec(rightRoof, panel, false);
    proposal1 = {
      count:
        numPanelsInFirstRow + solForBottomRoof.count + solForRightRoof.count,
      recs: panelsInFirstRow
        .concat(solForBottomRoof.recs)
        .concat(solForRightRoof.recs),
    };
  }
  const proposal2 = !rotated
    ? computePanelsRec(roof, { height: panel.width, width: panel.height }, true)
    : null;
  if (proposal1 && proposal2) {
    return proposal1.count > proposal2.count ? proposal1 : proposal2;
  }
  return (
    proposal1 ||
    proposal2 || {
      count: 0,
      recs: [],
    }
  );
}

export function computePanels(roof: Box, panel: Box) {
  return computePanelsRec(
    { x: 0, y: 0, width: roof.width, height: roof.height },
    panel,
    false,
  );
}
