declare function DynamicParamsCurrying(): unknown;

declare function DynamicParamsCurrying<T extends (...args: any[]) => any>(fn: T): Curry<T>;

type Curry<T extends (...args: any[]) => any> = <P extends any[]>(
  ...args: P
) => P extends Partial<Parameters<T>>
  ? P['length'] extends Parameters<T>['length']
    ? ReturnType<T>
    : Curry<(...args: Drop<Parameters<T>, P['length']>) => ReturnType<T>>
  : T;

type Drop<T extends any[], N extends number, Acc extends '+'[] = []> = Acc['length'] extends N
  ? T
  : T extends [infer _, ...infer Rest]
    ? Drop<Rest, N, [...Acc, '+']>
    : T;

const originalCurry = (
  ingredient1: number,
  ingredient2: string,
  ingredient3: boolean,
  ingredient4: Date,
) => true;

const spikedCurry = DynamicParamsCurrying(originalCurry);

// Direct call
const t0 = spikedCurry(0, 'Ziltoid', true, new Date());

// Partially applied
const t1 = spikedCurry(1)('The', false, new Date());

// Another partial
const t2 = spikedCurry(0, 'Omniscient', true)(new Date());

// You can keep callin' until the cows come home: it'll wait for the last argument
const t3 = spikedCurry()()()()(0, 'Captain', true)()()()(new Date());

// currying is ok
const t4 = spikedCurry('Spectacular', 0, true);

// @ts-expect-error arguments provided in the wrong order
const e0 = spikedCurry('Nebulo9', 0, true)(new Date());
