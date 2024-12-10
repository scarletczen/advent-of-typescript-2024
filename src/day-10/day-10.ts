enum Gift {
  // unique
  Coal = 0,
  Train = 1,
  Bicycle = Train << 1,
  SuccessorToTheNintendoSwitch = Bicycle << 1,
  TikTokPremium = SuccessorToTheNintendoSwitch << 1,
  Vape = TikTokPremium << 1,

  // combo
  Traditional = Train | Bicycle,
  OnTheMove = Coal | Bicycle | TikTokPremium | Vape,
  OnTheCouch = ((Coal | TikTokPremium | Vape) & ~Bicycle) | SuccessorToTheNintendoSwitch,
}

const test = <F extends Gift>(flag: F) => flag;

test<Gift.Coal>(0);
test<Gift.Train>(1);
test<Gift.Bicycle>(2);
test<Gift.SuccessorToTheNintendoSwitch>(4);
test<Gift.TikTokPremium>(8);
test<Gift.Vape>(16);
test<Gift.Traditional>(3);
test<Gift.OnTheMove>(26);
test<Gift.OnTheCouch>(28);

// @ts-expect-error
test<Gift.Coal>(10);
// @ts-expect-error
test<Gift.Train>(11);
// @ts-expect-error
test<Gift.Bicycle>(12);
// @ts-expect-error
test<Gift.SuccessorToTheNintendoSwitch>(14);
// @ts-expect-error
test<Gift.TikTokPremium>(18);
// @ts-expect-error
test<Gift.Vape>(116);
// @ts-expect-error
test<Gift.Traditional>(13);
// @ts-expect-error
test<Gift.OnTheMove>(126);
// @ts-expect-error
test<Gift.OnTheCouch>(124);