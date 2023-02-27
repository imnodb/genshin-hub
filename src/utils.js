import tf from "./gen_tf";

console.log(tf);
export function positionToLocale(name) {
  // eslint-disable-next-line default-case
  switch (name) {
    case "flower":
      return "生之花";
    case "feather":
      return "死之羽";
    case "sand":
      return "时之沙";
    case "cup":
      return "空之杯";
    case "head":
      return "理之冠";
  }
}
// 强化出新属性的权重
export const tagWeights = {
  lifeStatic: {
    lifeStatic: 0,
    attackStatic: 1579,
    defendStatic: 1579,
    lifePercentage: 1053,
    attackPercentage: 1053,
    defendPercentage: 1053,
    recharge: 1053,
    elementalMastery: 1053,
    critical: 789,
    criticalDamage: 789,
  },
  attackStatic: {
    lifeStatic: 1579,
    attackStatic: 0,
    defendStatic: 1579,
    lifePercentage: 1053,
    attackPercentage: 1053,
    defendPercentage: 1053,
    recharge: 1053,
    elementalMastery: 1053,
    critical: 789,
    criticalDamage: 789,
  },
  lifePercentage: {
    lifeStatic: 1500,
    attackStatic: 1500,
    defendStatic: 1500,
    lifePercentage: 0,
    attackPercentage: 1000,
    defendPercentage: 1000,
    recharge: 1000,
    elementalMastery: 1000,
    critical: 750,
    criticalDamage: 750,
  },
  attackPercentage: {
    lifeStatic: 1500,
    attackStatic: 1500,
    defendStatic: 1500,
    lifePercentage: 1000,
    attackPercentage: 0,
    defendPercentage: 1000,
    recharge: 1000,
    elementalMastery: 1000,
    critical: 750,
    criticalDamage: 750,
  },
  defendPercentage: {
    lifeStatic: 1500,
    attackStatic: 1500,
    defendStatic: 1500,
    lifePercentage: 1000,
    attackPercentage: 1000,
    defendPercentage: 0,
    recharge: 1000,
    elementalMastery: 1000,
    critical: 750,
    criticalDamage: 750,
  },
  recharge: {
    lifeStatic: 1500,
    attackStatic: 1500,
    defendStatic: 1500,
    lifePercentage: 1000,
    attackPercentage: 1000,
    defendPercentage: 1000,
    recharge: 0,
    elementalMastery: 1000,
    critical: 750,
    criticalDamage: 750,
  },
  elementalMastery: {
    lifeStatic: 1500,
    attackStatic: 1500,
    defendStatic: 1500,
    lifePercentage: 1000,
    attackPercentage: 1000,
    defendPercentage: 1000,
    recharge: 1000,
    elementalMastery: 0,
    critical: 750,
    criticalDamage: 750,
  },
  critical: {
    lifeStatic: 1463,
    attackStatic: 1463,
    defendStatic: 1463,
    lifePercentage: 976,
    attackPercentage: 976,
    defendPercentage: 976,
    recharge: 976,
    elementalMastery: 976,
    critical: 0,
    criticalDamage: 732,
  },
  criticalDamage: {
    lifeStatic: 1463,
    attackStatic: 1463,
    defendStatic: 1463,
    lifePercentage: 976,
    attackPercentage: 976,
    defendPercentage: 976,
    recharge: 976,
    elementalMastery: 976,
    critical: 732,
    criticalDamage: 0,
  },
  other: {
    lifeStatic: 1364,
    attackStatic: 1364,
    defendStatic: 1364,
    lifePercentage: 909,
    attackPercentage: 909,
    defendPercentage: 909,
    recharge: 909,
    elementalMastery: 909,
    critical: 682,
    criticalDamage: 682,
  },
};
export const artifactEff = {
  4: {
    critical: [0.022, 0.025, 0.028, 0.031],
    lifePercentage: [0.033, 0.037, 0.042, 0.047],
    attackPercentage: [0.033, 0.037, 0.042, 0.047],
    recharge: [0.036, 0.041, 0.047, 0.052],
    defendPercentage: [0.041, 0.047, 0.053, 0.058],
    criticalDamage: [0.044, 0.05, 0.056, 0.062],
    attackStatic: [11, 12, 14, 16],
    defendStatic: [13, 15, 17, 19],
    elementalMastery: [13, 15, 17, 19],
    lifeStatic: [167, 191, 215, 239],
  },
  5: {
    critical: [0.027, 0.031, 0.035, 0.039],
    lifePercentage: [0.041, 0.047, 0.053, 0.058],
    attackPercentage: [0.041, 0.047, 0.053, 0.058],
    recharge: [0.045, 0.052, 0.058, 0.065],
    defendPercentage: [0.051, 0.058, 0.066, 0.073],
    criticalDamage: [0.054, 0.062, 0.07, 0.078],
    attackStatic: [14, 16, 18, 19],
    defendStatic: [16, 19, 21, 23],
    elementalMastery: [16, 19, 21, 23],
    lifeStatic: [209, 239, 269, 299],
  },
};
export const artifactTags = {
  cureEffect: {
    name: "cureEffect",
    chs: "治疗加成",
    percentage: true,
    max: {
      4: 0.268,
      5: 0.359,
    },
  },
  criticalDamage: {
    name: "criticalDamage",
    chs: "暴击伤害",
    percentage: true,
    max: {
      4: 0.464,
      5: 0.622,
    },
  },
  critical: {
    name: "critical",
    chs: "暴击率",
    percentage: true,
    max: {
      4: 0.232,
      5: 0.311,
    },
  },
  attackStatic: {
    name: "attackStatic",
    chs: "攻击力",
    percentage: false,
    max: {
      4: 232,
      5: 311,
    },
  },
  attackPercentage: {
    name: "attackPercentage",
    chs: "攻击力%",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
  elementalMastery: {
    name: "elementalMastery",
    chs: "元素精通",
    percentage: false,
    max: {
      4: 139,
      5: 187,
    },
  },
  recharge: {
    name: "recharge",
    chs: "元素充能效率",
    percentage: true,
    max: {
      4: 0.387,
      5: 0.518,
    },
  },
  lifePercentage: {
    name: "lifePercentage",
    chs: "生命值%",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
  defendPercentage: {
    name: "defendPercentage",
    chs: "防御力%",
    percentage: true,
    max: {
      4: 0.435,
      5: 0.583,
    },
  },
  lifeStatic: {
    name: "lifeStatic",
    chs: "生命值",
    percentage: false,
    max: {
      4: 3571,
      5: 4780,
    },
  },
  defendStatic: {
    name: "defendStatic",
    chs: "防御力",
    percentage: false,
    max: {
      4: 19,
      5: 23,
    },
  },
  thunderBonus: {
    name: "thunderBonus",
    chs: "雷元素伤害加成",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
  fireBonus: {
    name: "fireBonus",
    chs: "火元素伤害加成",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
  waterBonus: {
    name: "waterBonus",
    chs: "水元素伤害加成",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
  iceBonus: {
    name: "iceBonus",
    chs: "冰元素伤害加成",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
  windBonus: {
    name: "windBonus",
    chs: "风元素伤害加成",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
  rockBonus: {
    name: "rockBonus",
    chs: "岩元素伤害加成",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
  physicalBonus: {
    name: "physicalBonus",
    chs: "物理伤害加成",
    percentage: true,
    max: {
      4: 0.435,
      5: 0.583,
    },
  },
  dendroBonus: {
    name: "dendroBonus",
    chs: "草元素伤害加成",
    percentage: true,
    max: {
      4: 0.348,
      5: 0.466,
    },
  },
};
export const mainStatMap = {
  flower: ["lifeStatic"],
  feather: ["attackStatic"],
  sand: [
    "attackPercentage",
    "lifePercentage",
    "defendPercentage",
    "elementalMastery",
    "recharge",
  ],
  cup: [
    "thunderBonus",
    "fireBonus",
    "waterBonus",
    "iceBonus",
    "windBonus",
    "rockBonus",
    "dendroBonus",
    "physicalBonus",
    "attackPercentage",
    "lifePercentage",
    "defendPercentage",
    "elementalMastery",
  ],
  head: [
    "critical",
    "criticalDamage",
    "attackPercentage",
    "cureEffect",
    "elementalMastery",
    "lifePercentage",
    "defendPercentage",
  ],
};
export const subStats = [
  "critical",
  "criticalDamage",
  "attackStatic",
  "attackPercentage",
  "lifeStatic",
  "lifePercentage",
  "defendStatic",
  "defendPercentage",
  "elementalMastery",
  "recharge",
];
export const positions = ["flower", "feather", "sand", "cup", "head"];
export const characters = {
  Diluc: {
    weights: {
      fireBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    badge: tf.DilucDefault.badge,
    artifacts: [
      {
        setNames: ["crimsonWitch4"],
        sand: ["attackPercentage", "elementalMastery"],
        cup: ["fireBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  HuTao: {
    weights: {
      fireBonus: 2,
      critical: 1,
      criticalDamage: 1,
      lifeStatic: 0.8,
      lifePercentage: 0.8,
      elementalMastery: 0.75,
      attackStatic: 0.5,
      attackPercentage: 0.5,
    },
    ace: 226,
    badge: tf.HuTaoDefault.badge,
    artifacts: [
      {
        setNames: ["crimsonWitch4", "shimenawaReminiscence4"],
        sand: ["lifePercentage", "elementalMastery"],
        cup: ["fireBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Klee: {
    weights: {
      fireBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    badge: tf.KleeDefault.badge,
    artifacts: [
      {
        setNames: ["crimsonWitch4"],
        sand: ["attackPercentage"],
        cup: ["fireBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Yoimiya: {
    weights: {
      fireBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    badge: tf.YoimiyaDefault.badge,
    artifacts: [
      {
        setNames: ["EchoesOfAnOffering4", "shimenawaReminiscence4"],
        sand: ["attackPercentage"],
        cup: ["fireBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Amber: {
    weights: {
      fireBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 195,
    badge: tf.AmberDefault.badge,
    artifacts: [
      {
        setNames: ["EchoesOfAnOffering4"],
        sand: ["attackPercentage"],
        cup: ["fireBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Bennett: {
    weights: {
      fireBonus: 2,
      cureEffect: 2,
      critical: 0.5,
      criticalDamage: 0.5,
      lifeStatic: 1,
      lifePercentage: 1,
      recharge: 1,
      attackStatic: 0.5,
      attackPercentage: 0.5,
    },
    ace: 160,
    badge: tf.BennettDefault.badge,
    artifacts: [
      {
        setNames: ["noblesseOblige4"],
        sand: ["recharge"],
        cup: ["fireBonus"],
        head: ["critical", "criticalDamage"],
      },
      {
        setNames: ["noblesseOblige4"],
        sand: ["recharge"],
        cup: ["lifePercentage"],
        head: ["cureEffect"],
      },
    ],
  },
  Thoma: {
    weights: {
      lifeStatic: 1,
      lifePercentage: 1,
      recharge: 0.9,
      critical: 0.5,
      criticalDamage: 0.5,
      attackStatic: 0.5,
      attackPercentage: 0.5,
    },
    ace: 193,
    badge: tf.ThomaDefault.badge,
    artifacts: [
      {
        setNames: ["emblemOfSeveredFate2", "tenacityOfTheMillelith2"],
        sand: ["recharge"],
        cup: ["lifePercentage"],
        head: ["critical", "criticalDamage", "lifePercentage"],
      },
    ],
  },
  Xiangling: {
    weights: {
      fireBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
      recharge: 0.55,
    },
    ace: 226,
    badge: tf.XianglingDefault.badge,
    artifacts: [
      {
        setNames: ["emblemOfSeveredFate4"],
        sand: ["recharge", "elementalMastery"],
        cup: ["fireBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Xinyan: {
    weights: {
      physicalBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      defendStatic: 0.75,
      defendPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 206,
    badge: tf.XinyanDefault.badge,
    artifacts: [
      {
        setNames: ["paleFlame2", "bloodstainedChivalry2"],
        sand: ["attackPercentage"],
        cup: ["physicalBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Yanfei: {
    weights: {
      fireBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 195,
    badge: tf.YanfeiDefault.badge,
    artifacts: [
      {
        setNames: ["wandererTroupe4"],
        sand: ["attackPercentage"],
        cup: ["fireBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Aloy: {
    weights: {
      iceBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
    },
    ace: 180,
    badge: tf.AloyDefault.badge,
    artifacts: [
      {
        setNames: [
          "blizzardStrayer2",
          "gladiatorFinale2",
          "EchoesOfAnOffering2",
          "shimenawaReminiscence2",
          "VermillionHereafter2",
        ],
        sand: ["attackPercentage"],
        cup: ["iceBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Eula: {
    weights: {
      physicalBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.3,
    },
    ace: 206,
    badge: tf.EulaDefault.badge,
    artifacts: [
      {
        setNames: ["paleFlame2", "bloodstainedChivalry2"],
        sand: ["attackPercentage"],
        cup: ["physicalBonus"],
        head: ["critical", "criticalDamage"],
      },
      {
        setNames: ["paleFlame4"],
        sand: ["attackPercentage"],
        cup: ["physicalBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Ganyu: {
    weights: {
      iceBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    badge: tf.GanyuDefault.badge,
    artifacts: [
      {
        setNames: ["blizzardStrayer4"],
        sand: ["attackPercentage"],
        cup: ["iceBonus"],
        head: ["critical", "criticalDamage"],
      },
      {
        setNames: ["wandererTroupe4"],
        sand: ["attackPercentage", "elementalMastery"],
        cup: ["iceBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  KamisatoAyaka: {
    weights: {
      iceBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.3,
    },
    ace: 206,
    badge: tf.KamisatoAyakaDefault.badge,
    artifacts: [
      {
        setNames: ["blizzardStrayer4"],
        sand: ["attackPercentage"],
        cup: ["iceBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Qiqi: {
    weights: {
      cureEffect: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 1,
      attackPercentage: 1,
      recharge: 0.55,
    },
    ace: 196,
    badge: tf.QiqiDefault.badge,
    artifacts: [
      {
        setNames: ["oceanHuedClam4"],
        sand: ["attackPercentage"],
        cup: ["attackPercentage"],
        head: ["cureEffect"],
      },
    ],
  },
  Shenhe: {
    weights: {
      critical: 0.5,
      criticalDamage: 0.5,
      attackStatic: 1,
      attackPercentage: 1,
      recharge: 1,
    },
    ace: 170,
    badge: tf.ShenheDefault.badge,
    artifacts: [
      {
        setNames: [
          "gladiatorFinale2",
          "EchoesOfAnOffering2",
          "shimenawaReminiscence2",
          "VermillionHereafter2",
        ],
        sand: ["attackPercentage"],
        cup: ["attackPercentage"],
        head: ["attackPercentage"],
      },
    ],
  },
  Chongyun: {
    weights: {
      iceBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
      recharge: 0.55,
    },
    ace: 226,
    badge: tf.ChongyunDefault.badge,
    artifacts: [
      {
        setNames: ["blizzardStrayer2", "noblesseOblige2"],
        sand: ["attackPercentage"],
        cup: ["iceBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Diona: {
    weights: {
      lifeStatic: 1,
      lifePercentage: 1,
      recharge: 0.9,
      critical: 0.5,
      criticalDamage: 0.5,
      attackStatic: 0.5,
      attackPercentage: 0.5,
    },
    ace: 183,
    badge: tf.DionaDefault.badge,
    artifacts: [
      {
        setNames: ["maidenBeloved2", "tenacityOfTheMillelith2"],
        sand: ["lifePercentage"],
        cup: ["lifePercentage"],
        head: ["lifePercentage"],
      },
      {
        setNames: ["noblesseOblige4"],
        sand: ["recharge"],
        cup: ["lifePercentage"],
        head: ["lifePercentage"],
      },
    ],
  },
  Kaeya: {
    weights: {
      iceBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
    },
    ace: 180,
    badge: tf.KaeyaDefault.badge,
    artifacts: [
      {
        setNames: ["emblemOfSeveredFate4"],
        sand: ["attackPercentage", "recharge"],
        cup: ["iceBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Layla: {
    weights: {
      critical: 1,
      criticalDamage: 1,
      lifeStatic: 1,
      lifePercentage: 1,
      attackStatic: 0.55,
      attackPercentage: 0.55,
      recharge: 0.55,
    },
    ace: 207,
    artifacts: [
      {
        setNames: ["tenacityOfTheMillelith4"],
        sand: ["lifePercentage"],
        cup: ["lifePercentage"],
        head: ["lifePercentage"],
      },
    ],
  },
  Rosaria: {
    weights: {
      iceBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 191,
    badge: tf.RosariaDefault.badge,
    artifacts: [
      {
        setNames: ["noblesseOblige4"],
        sand: ["attackPercentage"],
        cup: ["iceBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Jean: {
    weights: {
      cureEffect: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 191,
    badge: tf.JeanDefault.badge,
    artifacts: [
      {
        setNames: ["viridescentVenerer4"],
        sand: ["attackPercentage", "recharge"],
        cup: ["attackPercentage"],
        head: ["cureEffect"],
      },
    ],
  },
  KaedeharaKazuha: {
    weights: {
      critical: 1,
      criticalDamage: 1,
      elementalMastery: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 180,
    badge: tf.KaedeharaKazuhaDefault.badge,
    artifacts: [
      {
        setNames: ["viridescentVenerer4"],
        sand: ["elementalMastery"],
        cup: ["elementalMastery"],
        head: ["elementalMastery"],
      },
    ],
  },
  Venti: {
    weights: {
      windBonus: 2,
      critical: 1,
      criticalDamage: 1,
      elementalMastery: 0.75,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 226,
    artifacts: [
      {
        setNames: ["viridescentVenerer4"],
        sand: ["recharge", "attackPercentage"],
        cup: ["windBonus"],
        head: ["critical", "criticalDamage"],
      },
      {
        setNames: ["viridescentVenerer4"],
        sand: ["elementalMastery", "recharge"],
        cup: ["elementalMastery"],
        head: ["elementalMastery"],
      },
    ],
  },
  Wanderer: {
    weights: {
      windBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
    },
    ace: 200,
    artifacts: [
      {
        setNames: ["DesertPavilionChronicle4"],
        sand: ["attackPercentage"],
        cup: ["windBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Xiao: {
    weights: {
      windBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 211,
    artifacts: [
      {
        setNames: ["VermillionHereafter4"],
        sand: ["attackPercentage"],
        cup: ["windBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Faruzan: {
    weights: {
      windBonus: 2,
      critical: 1,
      criticalDamage: 1,
      recharge: 0.75,
      attackStatic: 0.55,
      attackPercentage: 0.55,
    },
    ace: 211,
    artifacts: [
      {
        setNames: ["tenacityOfTheMillelith4"],
        sand: ["recharge"],
        cup: ["windBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Sayu: {
    weights: {
      cureEffect: 2,
      elementalMastery: 1,
      recharge: 0.55,
      critical: 0.5,
      criticalDamage: 0.5,
      attackStatic: 0.5,
      attackPercentage: 0.5,
    },
    ace: 186,
    artifacts: [
      {
        setNames: ["viridescentVenerer4"],
        sand: ["elementalMastery"],
        cup: ["attackPercentage"],
        head: ["cureEffect"],
      },
    ],
  },
  ShikanoinHeizou: {
    weights: {
      windBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 195,
    badge: tf.ShikanoinHeizouDefault.badge,
    artifacts: [
      {
        setNames: ["viridescentVenerer4"],
        sand: ["attackPercentage"],
        cup: ["windBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Sucrose: {
    weights: {
      critical: 1,
      criticalDamage: 1,
      elementalMastery: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 211,
    artifacts: [
      {
        setNames: ["viridescentVenerer4"],
        sand: ["recharge"],
        cup: ["elementalMastery"],
        head: ["elementalMastery"],
      },
    ],
  },
  Cyno: {
    weights: {
      thunderBonus: 2,
      critical: 1,
      criticalDamage: 1,
      elementalMastery: 0.75,
      attackStatic: 0.75,
      attackPercentage: 0.75,
    },
    ace: 215,
    artifacts: [
      {
        setNames: ["GildedDreams4"],
        sand: ["elementalMastery", "attackPercentage"],
        cup: ["thunderBonus"],
        head: ["critical", "criticalDamage"],
      },
      {
        setNames: ["thunderingFury4"],
        sand: ["elementalMastery"],
        cup: ["thunderBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Keqing: {
    weights: {
      thunderBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    artifacts: [
      {
        setNames: ["thunderingFury4"],
        sand: ["attackPercentage"],
        cup: ["thunderBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  RaidenShogun: {
    weights: {
      thunderBonus: 2,
      critical: 1,
      criticalDamage: 1,
      recharge: 0.75,
      attackStatic: 0.75,
      attackPercentage: 0.75,
    },
    ace: 215,
    badge: tf.RaidenShogunDefault.badge,
    artifacts: [
      {
        setNames: ["emblemOfSeveredFate4"],
        sand: ["recharge"],
        cup: ["thunderBonus", "attackPercentage"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  YaeMiko: {
    weights: {
      thunderBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    badge: tf.YaeMikoDefault.badge,
    artifacts: [
      {
        setNames: ["GildedDreams4"],
        sand: ["attackPercentage"],
        cup: ["thunderBonus"],
        head: ["critical", "criticalDamage"],
      },
      {
        setNames: [
          "thunderingFury2",
          "gladiatorFinale2",
          "EchoesOfAnOffering2",
          "shimenawaReminiscence2",
          "VermillionHereafter2",
        ],
        sand: ["attackPercentage"],
        cup: ["thunderBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Beidou: {
    weights: {
      thunderBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
      recharge: 0.5,
    },
    ace: 205,
    artifacts: [
      {
        setNames: ["emblemOfSeveredFate4"],
        sand: ["recharge"],
        cup: ["thunderBonus", "attackPercentage"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Dori: {
    weights: {
      cureEffect: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      lifeStatic: 0.75,
      lifePercentage: 0.75,
      recharge: 0.55,
    },
    ace: 196,
    artifacts: [
      {
        setNames: ["oceanHuedClam4"],
        sand: ["recharge", "lifePercentage"],
        cup: ["lifePercentage"],
        head: ["cureEffect"],
      },
    ],
  },
  Fischl: {
    weights: {
      thunderBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    artifacts: [
      {
        setNames: [
          "thunderingFury2",
          "gladiatorFinale2",
          "EchoesOfAnOffering2",
          "shimenawaReminiscence2",
          "VermillionHereafter2",
        ],
        sand: ["attackPercentage"],
        cup: ["thunderBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  KujouSara: {
    weights: {
      thunderBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 191,
    badge: tf.KujouSaraDefault.badge,
    artifacts: [
      {
        setNames: ["emblemOfSeveredFate4"],
        sand: ["recharge"],
        cup: ["thunderBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  KukiShinobu: {
    weights: {
      cureEffect: 2,
      lifeStatic: 1,
      lifePercentage: 1,
      critical: 1,
      criticalDamage: 1,
      elementalMastery: 1,
      recharge: 0.55,
    },
    ace: 206,
    badge: tf.KukiShinobuDefault.badge,
    artifacts: [
      {
        setNames: ["GildedDreams4"],
        sand: ["elementalMastery"],
        cup: ["elementalMastery"],
        head: ["elementalMastery", "cureEffect"],
      },
      {
        setNames: ["FlowerOfParadiseLost4"],
        sand: ["elementalMastery"],
        cup: ["elementalMastery"],
        head: ["elementalMastery"],
      },
    ],
  },
  Lisa: {
    weights: {
      thunderBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 195,
    artifacts: [
      {
        setNames: [
          "thunderingFury2",
          "gladiatorFinale2",
          "EchoesOfAnOffering2",
          "shimenawaReminiscence2",
          "VermillionHereafter2",
        ],
        sand: ["attackPercentage"],
        cup: ["thunderBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Razor: {
    weights: {
      physicalBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
    },
    ace: 180,
    artifacts: [
      {
        setNames: ["gladiatorFinale4"],
        sand: ["attackPercentage"],
        cup: ["physicalBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  KamisatoAyato: {
    weights: {
      waterBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      lifeStatic: 0.5,
      lifePercentage: 0.5,
    },
    ace: 210,
    badge: tf.KamisatoAyatoDefault.badge,
    artifacts: [
      {
        setNames: ["EchoesOfAnOffering4", "heartOfDepth4"],
        sand: ["attackPercentage"],
        cup: ["waterBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Mona: {
    weights: {
      waterBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
      recharge: 0.75,
    },
    ace: 230,
    artifacts: [
      {
        setNames: ["emblemOfSeveredFate4"],
        sand: ["attackPercentage"],
        cup: ["waterBonus"],
        head: ["critical", "criticalDamage"],
      },
      {
        setNames: ["noblesseOblige4"],
        sand: ["recharge"],
        cup: ["waterBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Nilou: {
    weights: {
      critical: 1,
      criticalDamage: 1,
      lifeStatic: 1,
      lifePercentage: 1,
      elementalMastery: 0.75,
    },
    ace: 200,
    artifacts: [
      {
        setNames: ["tenacityOfTheMillelith2", "wandererTroupe2"],
        sand: ["lifePercentage"],
        cup: ["lifePercentage"],
        head: ["lifePercentage"],
      },
    ],
  },
  SangonomiyaKokomi: {
    weights: {
      waterBonus: 2,
      cureEffect: 2,
      lifeStatic: 1,
      lifePercentage: 1,
      recharge: 0.55,
      attackStatic: 0.5,
      attackPercentage: 0.5,
      elementalMastery: 0.55,
    },
    ace: 177,
    badge: tf.SangonomiyaKokomiDefault.badge,
    artifacts: [
      {
        setNames: ["tenacityOfTheMillelith4"],
        sand: ["lifePercentage"],
        cup: ["lifePercentage"],
        head: ["cureEffect"],
      },
      {
        setNames: ["oceanHuedClam4"],
        sand: ["lifePercentage"],
        cup: ["waterBonus"],
        head: ["cureEffect"],
      },
    ],
  },
  Tartaglia: {
    weights: {
      waterBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    artifacts: [
      {
        setNames: [
          "heartOfDepth2",
          "wandererTroupe2",
          "gladiatorFinale2",
          "EchoesOfAnOffering2",
          "shimenawaReminiscence2",
          "VermillionHereafter2",
        ],
        sand: ["attackPercentage"],
        cup: ["waterBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Yelan: {
    weights: {
      waterBonus: 2,
      critical: 1,
      criticalDamage: 1,
      lifeStatic: 0.8,
      lifePercentage: 0.8,
      recharge: 0.55,
    },
    ace: 212,
    badge: tf.YelanDefault.badge,
    artifacts: [
      {
        setNames: ["emblemOfSeveredFate4"],
        sand: ["lifePercentage", "recharge"],
        cup: ["waterBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Barbara: {
    weights: {
      cureEffect: 2,
      lifeStatic: 1,
      lifePercentage: 1,
      critical: 1,
      criticalDamage: 1,
      recharge: 0.55,
      attackStatic: 0.5,
      attackPercentage: 0.5,
    },
    ace: 196,
    artifacts: [
      {
        setNames: ["maidenBeloved4"],
        sand: ["lifePercentage"],
        cup: ["lifePercentage"],
        head: ["cureEffect"],
      },
    ],
  },
  Candace: {
    weights: {
      lifeStatic: 1,
      lifePercentage: 1,
      critical: 1,
      criticalDamage: 1,
      recharge: 0.55,
    },
    ace: 196,
    artifacts: [
      {
        setNames: ["noblesseOblige4"],
        sand: ["lifePercentage", "recharge"],
        cup: ["lifePercentage"],
        head: ["critical", "criticalDamage", "lifePercentage"],
      },
    ],
  },
  Xingqiu: {
    weights: {
      waterBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 211,
    artifacts: [
      {
        setNames: ["heartOfDepth2", "noblesseOblige2"],
        sand: ["attackPercentage"],
        cup: ["waterBonus"],
        head: ["critical", "criticalDamage"],
      },
      {
        setNames: ["emblemOfSeveredFate4"],
        sand: ["recharge"],
        cup: ["waterBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Albedo: {
    weights: {
      rockBonus: 2,
      critical: 1,
      criticalDamage: 1,
      defendStatic: 1,
      defendPercentage: 1,
    },
    ace: 205,
    artifacts: [
      {
        setNames: [
          "huskOfOpulentDreams4",
          "archaicPetra4",
          "tenacityOfTheMillelith4",
        ],
        sand: ["defendPercentage"],
        cup: ["rockBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  AratakiItto: {
    weights: {
      rockBonus: 2,
      critical: 1,
      criticalDamage: 1,
      defendStatic: 1,
      defendPercentage: 1,
      attackStatic: 0.5,
      attackPercentage: 0.5,
      recharge: 0.3,
    },
    ace: 221,
    badge: tf.AratakiIttoDefault.badge,
    artifacts: [
      {
        setNames: ["huskOfOpulentDreams4"],
        sand: ["defendPercentage"],
        cup: ["rockBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Zhongli: {
    weights: {
      rockBonus: 2,
      critical: 1,
      criticalDamage: 1,
      lifeStatic: 0.8,
      lifePercentage: 0.8,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      recharge: 0.55,
    },
    ace: 197,
    artifacts: [
      {
        setNames: ["tenacityOfTheMillelith4"],
        sand: ["lifePercentage"],
        cup: ["lifePercentage"],
        head: ["lifePercentage"],
      },
      {
        setNames: ["archaicPetra2", "noblesseOblige2"],
        sand: ["lifePercentage"],
        cup: ["rockBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Gorou: {
    weights: {
      rockBonus: 2,
      defendStatic: 1,
      defendPercentage: 1,
      recharge: 0.9,
      critical: 0.5,
      criticalDamage: 0.5,
      attackStatic: 0.5,
      attackPercentage: 0.5,
    },
    ace: 183,
    artifacts: [
      {
        setNames: ["noblesseOblige4"],
        sand: ["recharge"],
        cup: ["rockBonus"],
        head: ["critical"],
      },
    ],
  },
  Ningguang: {
    weights: {
      rockBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
    },
    ace: 200,
    artifacts: [
      {
        setNames: [
          "archaicPetra2",
          "gladiatorFinale2",
          "EchoesOfAnOffering2",
          "shimenawaReminiscence2",
          "VermillionHereafter2",
        ],
        sand: ["attackPercentage"],
        cup: ["rockBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Noelle: {
    weights: {
      rockBonus: 2,
      critical: 1,
      criticalDamage: 1,
      defendStatic: 1,
      defendPercentage: 1,
      recharge: 0.55,
      attackStatic: 0.5,
      attackPercentage: 0.5,
    },
    ace: 206,
    badge: tf.NoelleDefault.badge,
    artifacts: [
      {
        setNames: ["huskOfOpulentDreams4"],
        sand: ["defendPercentage"],
        cup: ["rockBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Yunjin: {
    weights: {
      defendStatic: 1,
      defendPercentage: 1,
      recharge: 0.9,
      critical: 0.5,
      criticalDamage: 0.5,
    },
    ace: 183,
    artifacts: [
      {
        setNames: ["huskOfOpulentDreams4"],
        sand: ["defendPercentage"],
        cup: ["defendPercentage"],
        head: ["critical", "defendPercentage"],
      },
    ],
  },
  Alhaitham: {
    weights: {
      dendroBonus: 2,
      critical: 1,
      criticalDamage: 1,
      elementalMastery: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
    },
    ace: 210,
    badge: tf.AlhaithamDefault.badge,
    artifacts: [
      {
        setNames: ["GildedDreams4"],
        sand: ["elementalMastery"],
        cup: ["dendroBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Nahida: {
    weights: {
      critical: 1,
      criticalDamage: 1,
      elementalMastery: 1,
      attackStatic: 0.55,
      attackPercentage: 0.55,
    },
    ace: 200,
    artifacts: [
      {
        setNames: ["DeepwoodMemories4"],
        sand: ["elementalMastery"],
        cup: ["elementalMastery"],
        head: ["elementalMastery"],
      },
    ],
  },
  Tighnari: {
    weights: {
      dendroBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
    },
    ace: 215,
    artifacts: [
      {
        setNames: ["GildedDreams4", "wandererTroupe4"],
        sand: ["elementalMastery"],
        cup: ["dendroBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Collei: {
    weights: {
      dendroBonus: 2,
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
      recharge: 0.55,
    },
    ace: 226,
    artifacts: [
      {
        setNames: ["DeepwoodMemories4", "noblesseOblige4"],
        sand: ["attackPercentage"],
        cup: ["dendroBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
  Yaoyao: {
    weights: {
      cureEffect: 2,
      critical: 0.5,
      criticalDamage: 0.5,
      attackStatic: 0.5,
      attackPercentage: 0.5,
      lifeStatic: 1,
      lifePercentage: 1,
      recharge: 0.75,
    },
    ace: 180,
    artifacts: [
      {
        setNames: ["tenacityOfTheMillelith4"],
        sand: ["lifePercentage"],
        cup: ["lifePercentage"],
        head: ["cureEffect"],
      },
    ],
  },
  PlayerGirl: {
    weights: {
      // 草
      critical: 1,
      criticalDamage: 1,
      attackStatic: 0.75,
      attackPercentage: 0.75,
      elementalMastery: 0.75,
      recharge: 0.55,
    },
    ace: 206,
    artifacts: [
      // 草
      {
        setNames: ["DeepwoodMemories4"],
        sand: ["elementalMastery"],
        cup: ["dendroBonus"],
        head: ["critical", "criticalDamage"],
      },
    ],
  },
};

export function calScore(art) {
  let scores = [];

  const normalTags = Object.assign(
    Object.fromEntries(subStats.map((name) => [name, 0])),
    Object.fromEntries(art.normalTags.map(({ name, value }) => [name, value]))
  );
  // console.log(normalTags);

  for (const [
    characterName,
    { weights: w, badge, artifacts },
  ] of Object.entries(characters)) {
    let score = 0;

    // 只计算需要套装的花跟羽毛
    if (
      ["flower", "feather"].includes(art.position) &&
      artifacts?.length &&
      !artifacts
        .reduce((p, { setNames }) => p.concat(setNames), [])
        .find((n) => n.startsWith(art.setName))
    ) {
      continue;
    }
    // 只计算主属性正确的 沙漏、杯子、头
    if (
      ["sand", "cup", "head"].includes(art.position) &&
      artifacts?.length &&
      !artifacts
        .reduce((p, v) => p.concat(v[art.position]), [])
        .includes(art.mainTag.name)
    ) {
      continue;
    }
    // 双暴头修正分数
    if (
      art.position === "head" &&
      ["critical", "criticalDamage"].includes(art.mainTag.name)
    ) {
      if (!w.critical) {
        continue;
      } else {
        score += 10 * w.critical;
      }
    }
    // 杯子
    if (art.position === "cup" && !w[art.mainTag.name]) {
      continue;
    }
    // 大攻击、大生命、大防御、元素精通、充能效率、治疗加成 的 沙漏、杯子、头
    for (const iterator of [
      "attackPercentage",
      "lifePercentage",
      "defendPercentage",
      "elementalMastery",
      "recharge",
      "cureEffect",
    ]) {
      if (
        art.mainTag.name === iterator &&
        (!w[iterator] || w[iterator] < 0.6)
      ) {
        continue;
      }
    }
    for (const name of subStats) {
      // console.log(name);
      const weights = Object.assign(
        Object.fromEntries(subStats.map((name) => [name, 0])),
        w
      );
      switch (name) {
        case "critical":
          score += 100 * normalTags[name] * 2 * weights[name];
          break;
        case "criticalDamage":
          score += 100 * normalTags[name] * 1 * weights[name];
          break;
        case "elementalMastery":
          score += normalTags[name] * 0.33 * weights[name];
          break;
        case "recharge":
          score += 100 * normalTags[name] * 1.1979 * weights[name];
          break;
        case "attackPercentage":
          score += 100 * normalTags[name] * 1.33 * weights[name];
          break;
        case "lifePercentage":
          score += 100 * normalTags[name] * 1.33 * weights[name];
          break;
        case "defendPercentage":
          score += 100 * normalTags[name] * 1.06 * weights[name];
          break;
        case "attackStatic":
          score += normalTags[name] * 0.398 * 0.5 * weights[name];
          break;
        case "lifeStatic":
          score += normalTags[name] * 0.026 * 0.66 * weights[name];
          break;
        case "defendStatic":
          score += normalTags[name] * 0.335 * 0.66 * weights[name];
          break;

        default:
          break;
      }
    }
    scores.push({ characterName, badge, score: Math.floor(score) });
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

export function getScore(art) {
  if (art.star === 4) {
    return undefined;
  }
  if (art.star === 5 && art.level < 20) {
    const normalTags = art.normalTags.map((tag) => Object.assign({}, tag));
    // console.log("art-------\n");
    // console.log(art);
    // 每个副属性强化一次的预期值
    const AverageEff = Object.fromEntries(
      Object.entries(artifactEff[5]).map(([eff, values]) => [
        eff,
        values.reduce((p, v) => p + v) / values.length,
      ])
    );
    // 需要强化的次数
    const tagCount = Math.ceil((20 - art.level) / 4);
    // console.log(tagCount);
    // 原本存在的属性
    const existingTags = [
      art.mainTag.name,
      ...normalTags.map(({ name }) => name),
    ];
    for (let index = 0; index < tagCount; index++) {
      console.log(`强化第${index + 1}次`);
      if (normalTags.length === 3) {
        // console.log("补一条属性", art.mainTag.name);
        // console.log(AverageEff);
        // console.log(existingTags);
        // 强化可能新增的属性
        const wishTags = Object.entries(AverageEff).filter(
          ([eff]) => !existingTags.includes(eff)
        );
        // console.log(wishTags.map(([eff]) => eff));
        const tagWeight = tagWeights[art.mainTag.name] || tagWeights.other;
        const weightCount = wishTags.reduce(
          (p, [eff]) => p + tagWeight[eff],
          0
        );
        // console.log(weightCount);

        wishTags.forEach(([eff, v]) => {
          // console.log([eff, v]);
          normalTags.push({
            name: eff,
            value: (v * tagWeight[eff]) / weightCount,
          });
        });
      } else {
        for (const tag of normalTags) {
          if (normalTags.length > 4) {
            if (existingTags.includes(tag.name)) {
              tag.value += AverageEff[tag.name] / 4;
            } else {
              // 补齐的部分词条单独计算概率
              tag.value += AverageEff[tag.name] / 4 / (normalTags.length - 3);
            }
          } else {
            tag.value += AverageEff[tag.name] / normalTags.length;
          }
          // console.log(tag, "tag");
        }
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
