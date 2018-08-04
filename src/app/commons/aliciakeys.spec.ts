import {AliciaKeys} from './aliciakeys.pipe';

describe('AliciaKeys', () => {

  it('should return valued keys', () => {
    const aliciaKeys = new AliciaKeys();

    const result = aliciaKeys.transform({
      'validKey': {},
      'inValidKey': null,
      'anotherValidKey': 1
    }, null);

    expect(result).toEqual('validKey, anotherValidKey');
  });

  it('should return blank when input is falsy', () => {
    const aliciaKeys = new AliciaKeys();

    const result = aliciaKeys.transform(null, null);

    expect(result).toEqual('');
  });
});
