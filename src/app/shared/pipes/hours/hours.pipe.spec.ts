import { HoursPipe } from './hours.pipe';

describe('HoursPipe', () => {
  let pipe: HoursPipe;

  beforeEach(() => {
    pipe = new HoursPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('sends 120 and should return "2 horas"', () => {
    expect(pipe.transform(120)).toEqual('2 horas');
  });

  it('sends 145 and should return "2 horas 25 minutos"', () => {
    expect(pipe.transform(145)).toEqual('2 horas 25 minutos');
  });

  it('sends 0 and should return "0 horas"', () => {
    expect(pipe.transform(0)).toEqual('0 horas');
  });

  it('sends 30 and should return "0 horas 30 minutos"', () => {
    expect(pipe.transform(30)).toEqual('0 horas 30 minutos');
  });
});
