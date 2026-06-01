// @gurt/visualizations — Observable Plot + D3 Komponenten.
// Jede Komponente liefert einen barrierefreien Tabellen-Fallback (siehe docs/06).
export { DataTable } from './components/data-table';
export type { DataTableProps } from './components/data-table';
export { ObservablePlot } from './components/observable-plot';
export { BarChart } from './components/bar-chart';
export type { BarChartProps } from './components/bar-chart';
export { LineChart } from './components/line-chart';
export type { LineChartProps } from './components/line-chart';
export { WaffleChart } from './components/waffle-chart';
export type { WaffleChartProps } from './components/waffle-chart';
export { allocateWaffle } from './components/waffle';
export type { WaffleSlice } from './components/waffle';
export { PositionMatrix } from './components/position-matrix';
export type { PositionMatrixProps } from './components/position-matrix';
export { buildMatrix, haltungStyle } from './components/matrix';
export type { Haltung, Matrix, MatrixPosition } from './components/matrix';
export type { Cell, Column, Row } from './lib/types';
