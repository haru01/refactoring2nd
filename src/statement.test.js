const statement = require('./statement');

test('ステートメントが出力できることその１（本に載っているサンプル例）', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
  };

  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
      {
        playID: 'as-like',
        audience: 35,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  };

  const expected =
`Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;
  const result = statement(invoice, plays);
  expect(result).toEqual(expected);
});

test('ステートメントが出力できることその２（本とは異なるパターン）', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as-like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' },
  };

  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 30,
      },
      {
        playID: 'as-like',
        audience: 20,
      },
      {
        playID: 'othello',
        audience: 40,
      },
    ],
  };

  const expected =
`Statement for BigCo
  Hamlet: $400.00 (30 seats)
  As You Like It: $360.00 (20 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,260.00
You earned 14 credits
`;
  const result = statement(invoice, plays);
  expect(result).toEqual(expected);
});


test('typeが不正で例外が発生するケース', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'badType' }, // badType
  };

  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
    ],
  };

  expect(() => {
    statement(invoice, plays);
  }).toThrow('unknown type: badType');
});
