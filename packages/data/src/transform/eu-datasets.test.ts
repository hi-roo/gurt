import { describe, expect, it } from 'vitest';
import { aggregateByCountry } from './eu-datasets';

describe('aggregateByCountry', () => {
  it('zählt nach Land, sortiert absteigend und begrenzt auf topN', () => {
    const records = [
      { land: 'Dänemark', jahr: '2022' },
      { land: 'Deutschland', jahr: '2021' },
      { land: 'Dänemark', jahr: '2020' },
      { land: 'Frankreich', jahr: '2023' },
      { land: 'Dänemark', jahr: '2019' },
      { land: 'Deutschland', jahr: '2024' },
    ];
    expect(aggregateByCountry(records, 2)).toEqual([
      { land: 'Dänemark', anzahl: 3 },
      { land: 'Deutschland', anzahl: 2 },
    ]);
  });
});
