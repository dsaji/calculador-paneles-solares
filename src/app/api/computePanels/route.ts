import type { NextRequest } from 'next/server';
import { computePanels } from '../../../utils/calculador';
import { computePanelsSchema } from '../../../validation/computePanels.schema';

export async function GET(request: NextRequest) {
  const params = await computePanelsSchema.validate(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  const roof = {
    height: params.roofHeight,
    width: params.roofWidth,
  };
  const panel = {
    height: params.panelHeight,
    width: params.panelWidth,
  };
  const result = computePanels(roof, panel);
  return Response.json(result);
}
