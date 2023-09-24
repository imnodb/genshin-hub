import BigNumber from "bignumber.js";
import genCharacter from "./gen_character";
import ZhCn from "./zh-cn.json";

const genCharacterValues = Object.values(genCharacter).map((c) => ({ ...c, chs: ZhCn[c.nameLocale] }))

export function positionToLocale(name) {
  // eslint-disable-next-line default-case
  switch (name) {
    case "planarSphere":
      return "位面球";
    case "linkRope":
      return "连结绳";
    case "feet":
      return "脚部";
    case "body":
      return "躯干";
    case "hands":
      return "手部";
    case "head":
      return "头部";
  }
}
// 强化出新属性的权重
export const tagWeights = {
  other: {
    "hp": 100,
    "hp_": 100,
    "atk": 100,
    "atk_": 100,
    "def": 100,
    "def_": 100,
    "spd": 40,
    "critRate": 60,
    "critDMG": 60,
    "eff": 80,
    "effRes": 80,
    "break": 80,
    // "heal": 0,
    // "enerRegen": 0,
    // "physicalDmg": 0,
    // "fireDmg": 0,
    // "iceDmg": 0,
    // "lightningDmg": 0,
    // "windDmg": 0,
    // "quantumDmg": 0,
    // "imaginaryDmg": 0,
  },
};
export const artifactEff = {
  4: {
  },
  5: {
    "hp": [38],
    "hp_": [0.0389],
    "atk": [19],
    "atk_": [0.0389],
    "def": [19],
    "def_": [0.0486],
    "spd": [2.3],
    "critRate": [0.0292],
    "critDMG": [0.0583],
    "eff": [0.0389],
    "effRes": [0.0389],
    "break": [0.0583],
  },
};
export const artifactTags = {
  "hp": {
    "chs": "生命值"
  },
  "hp_": {
    percentage: true,
    "chs": "生命值"
  },
  "atk": {
    "chs": "攻击力"
  },
  "atk_": {
    percentage: true,
    "chs": "攻击力"
  },
  "def": {
    "chs": "防御力"
  },
  "def_": {
    percentage: true,
    "chs": "防御力"
  },
  "spd": {
    "chs": "速度"
  },
  "critRate": {
    percentage: true,
    "chs": "暴击率"
  },
  "critDMG": {
    percentage: true,
    "chs": "暴击伤害"
  },
  "eff": {
    percentage: true,
    "chs": "效果命中"
  },
  "effRes": {
    percentage: true,
    "chs": "效果抵抗"
  },
  "break": {
    percentage: true,
    "chs": "击破特攻"
  },
  "heal": {
    percentage: true,
    "chs": "治疗量加成"
  },
  "enerRegen": {
    percentage: true,
    "chs": "能量恢复效率"
  },
  "physicalDmg": {
    percentage: true,
    "chs": "物理属性伤害提高"
  },
  "fireDmg": {
    percentage: true,
    "chs": "火属性伤害提高"
  },
  "iceDmg": {
    percentage: true,
    "chs": "冰属性伤害提高"
  },
  "lightningDmg": {
    percentage: true,
    "chs": "雷属性伤害提高"
  },
  "windDmg": {
    percentage: true,
    "chs": "风属性伤害提高"
  },
  "quantumDmg": {
    percentage: true,
    "chs": "量子属性伤害提高"
  },
  "imaginaryDmg": {
    percentage: true,
    "chs": "虚数属性伤害提高"
  }
};
export const artifactIcons = {
  "GeniusofBrilliantStars": {
    nameLocale: '繁星璀璨的天才',
    head: {
      text: '天才的超距遥感',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/06/103492603/22c1c3cd4442d6ea08d74b0a8b6034ac_6025912481518515565.png",
    },
    hands: {
      text: '天才的频变捕手',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/06/103492603/da2b51b042e4f403ba9bbf5b17ecb87e_9073158946533473043.png",
    },
    body: {
      text: '天才的元域深潜',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/06/30/1805320/82a7f15593cccd60c78afbf987c02ff4_8114130671090575917.png",
    },
    feet: {
      text: '天才的引力漫步',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/06/30/1805320/fa01fc76bab567da35f3b7deffe0cc78_8494142529458914935.png",
    },
  },
  "RutilantArena": {
    planarSphere: {
      text: '泰科铵的镭射球场',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/4f248791b87b643733fceac410fd49a4_771678252497121589.png",
    },
    linkRope: {
      text: '泰科铵的弧光赛道',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/47650b0480c9ca973608adb318167a5d_6220153310523905992.png",
    },
  },
};
export const subStats = [
  "hp",
  "hp_",
  "atk",
  "atk_",
  "def",
  "def_",
  "spd",
  "critRate",
  "critDMG",
  "eff",
  "effRes",
  "break",
];
export const positions = ["flower", "feather", "sand", "cup", "head"];
export const characters = {
  "希儿": {
    weights: {
      "hp": 0,
      "hp_": 0,
      "atk": 0.75,
      "atk_": 0.75,
      "def": 0,
      "def_": 0,
      "spd": 1,
      "critRate": 1,
      "critDMG": 1,
      "eff": 0,
      "effRes": 0,
      "break": 0,
    },
    ace: 235,
    badge: 'https://act-upload.mihoyo.com/sr-wiki/2023/09/19/279865110/af90c6a64b2be8f65187bdd432819f2f_498164526560653278.png',
    artifacts: [
      {
        setNames: ["GeniusofBrilliantStars"],
        head: ["hp"],
        hands: ["atk"],
        body: ["critRate", "critDMG"],
        feet: ["atk_"],
      },
      {
        setNames: ["RutilantArena"],
        planarSphere: ["quantumDmg"],
        linkRope: ["atk_"],
      },
    ],
  },
};

export function calScore(art) {
  let scores = [];

  const normalTags = Object.assign(
    Object.fromEntries(subStats.map((name) => [name, BigNumber(0)])),
    Object.fromEntries(art.normalTags.map(({ name, value }) => [name, BigNumber(value)]))
  );
  console.log("scores");
  console.log(normalTags);

  for (const [
    characterName,
    { weights, badge, artifacts },
  ] of Object.entries(characters)) {
    let score = BigNumber(0);
    const artifact = artifacts.find((a) =>
      a.setNames.includes(art.setName) && a[art.position]?.includes(art.mainTag.name)
    )
    console.log(characterName, weights, badge, artifacts, artifact);
    // 只计算需要套装
    if (!artifact) {
      continue;
    }
    if (['body', 'planarSphere'].includes(art.position)) {
      score = BigNumber.minimum(15.83, BigNumber(5.83).multipliedBy(weights[art.mainTag.name] ?? 1).plus(9.9))
    }
    if (['feet', 'linkRope'].includes(art.position)) {
      score = BigNumber.minimum(15.83, BigNumber(5.83).multipliedBy(weights[art.mainTag.name] ?? 1))
    }
    for (const name of subStats) {
      console.log("subStats", name, normalTags[name].toNumber());
      switch (name) {
        case "critRate":
          score = BigNumber(normalTags[name]).multipliedBy(100).multipliedBy(2).multipliedBy(weights[name]).plus(score);
          break;
        case "critDMG":
          score = BigNumber(normalTags[name]).multipliedBy(100).multipliedBy(1).multipliedBy(weights[name]).plus(score);
          break;
        case "hp_":
          score = BigNumber(normalTags[name]).multipliedBy(100).multipliedBy(1.5).multipliedBy(weights[name]).plus(score);
          break;
        case "atk_":
          score = BigNumber(normalTags[name]).multipliedBy(100).multipliedBy(1.5).multipliedBy(weights[name]).plus(score);
          break;
        case "def_":
          score = BigNumber(normalTags[name]).multipliedBy(100).multipliedBy(1.19).multipliedBy(weights[name]).plus(score);
          break;
        case "spd":
          score = BigNumber(normalTags[name]).multipliedBy(2.53).multipliedBy(weights[name]).plus(score);
          break;
        case "break":
          score = BigNumber(normalTags[name]).multipliedBy(100).multipliedBy(1).multipliedBy(weights[name]).plus(score);
          break;
        case "eff":
          score = BigNumber(normalTags[name]).multipliedBy(100).multipliedBy(1.49).multipliedBy(weights[name]).plus(score);
          break;
        case "effRes":
          score = BigNumber(normalTags[name]).multipliedBy(100).multipliedBy(1.49).multipliedBy(weights[name]).plus(score);
          break;
        case "hp":
          score = BigNumber(normalTags[name]).multipliedBy(0.3 * 0.5).multipliedBy(weights[name]).plus(score);
          break;
        case "atk":
          score = BigNumber(normalTags[name]).multipliedBy(0.3 * 0.5).multipliedBy(weights[name]).plus(score);
          break;
        case "def":
          score = BigNumber(normalTags[name]).multipliedBy(0.153 * 0.5).multipliedBy(weights[name]).plus(score);
          break;
        default:
          break;
      }
      console.log("分数", score.toNumber());
    }
    scores.push({ characterName, badge, score: Number(score.toFixed(1, 0)) });
  }
  return scores.length
    ? scores.sort((a, b) => b.score - a.score)
    : [
      {
        characterName: "",
        badge: "https://www.miyoushe.com/mainPage/ys-logo-v2.png",
        score: 0,
      },
    ];
}

export function importScore(art) {
  if (art.star === 4) {
    return undefined;
  }

  if (art.star === 5 && art.level < 15) {
    const normalTags = art.normalTags.map((tag) => Object.assign({}, tag, { value: BigNumber(tag.value) }));
    // console.log("art-------\n");
    // console.log(art);
    // 每个副属性强化一次的预期值
    const AverageEff = Object.fromEntries(
      Object.entries(artifactEff[5]).map(([eff, values]) => [
        eff,
        BigNumber(values.reduce((p, v) => p + v)).div(values.length),
      ])
    );
    console.log("每个副属性强化一次的预期值");
    Object.entries(AverageEff).map(([a, b]) => console.log(a, b.toNumber()))
    // 需要强化的次数
    const tagCount = Math.ceil((15 - art.level) / 3);
    console.log('需要强化的次数', tagCount);
    // 原本存在的属性
    const existingTags = [
      art.mainTag.name,
      ...normalTags.map(({ name }) => name),
    ];
    for (let index = 0; index < tagCount; index++) {
      console.log(`强化第${index + 1}次`);
      if (normalTags.length === 3) {
        console.log("补一条属性，主属性：", art.mainTag.name);
        console.log("排除属性", existingTags);
        // 强化可能新增的属性
        const wishTags = Object.entries(AverageEff).filter(
          ([eff]) => !existingTags.includes(eff)
        );
        console.log("强化可能新增的属性", wishTags.map(([eff]) => eff));
        const tagWeight = tagWeights.other;
        const weightCount = wishTags.reduce(
          (p, [eff]) => p + tagWeight[eff],
          0
        );
        console.log("新词条总权重和", weightCount);

        wishTags.forEach(([eff, v]) => {
          console.log([eff, v]);
          console.log(tagWeight[eff]);
          normalTags.push({
            name: eff,
            value: BigNumber((v * tagWeight[eff])).div(weightCount),
          });
        });
        console.log("补充全词条后的副属性");
        normalTags.map(a => console.log(a.name, a.value.toNumber()))
      } else {
        for (const tag of normalTags) {
          if (normalTags.length > 4) {
            if (existingTags.includes(tag.name)) {
              tag.value = tag.value.plus(BigNumber(AverageEff[tag.name]).div(4));
            } else {
              // 补齐的部分词条单独计算概率
              tag.value = tag.value.plus(BigNumber(AverageEff[tag.name]).div(4).div(normalTags.length - 3));
            }
          } else {
            tag.value = tag.value.plus(BigNumber(AverageEff[tag.name]).div(normalTags.length));
          }
          // console.log(tag, "tag");
        }
        console.log("强化完成后的副属性");
        normalTags.map(a => console.log(a.name, a.value.toNumber()))
      }
    }
    // console.log(normalTags, "normalTags");
    return calScore(
      Object.assign({}, art, {
        normalTags,
      })
    );
  }
  return calScore(art);
}

export function importScore1(art) {

  return art.scores.length
    ? art.scores.map(([characterName, score]) => ({ characterName, badge: genCharacterValues.find(({ chs, avatar }) => chs === characterName)?.avatar ?? "https://www.miyoushe.com/mainPage/ys-logo-v2.png", score })).sort((a, b) => b.score - a.score)
    : [
      {
        characterName: "",
        badge: "https://www.miyoushe.com/mainPage/ys-logo-v2.png",
        score: 0,
      },
    ];
}
