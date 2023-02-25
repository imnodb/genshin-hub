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
  },
};

export function expectScore(art) { }

export function calScore(art) {
  let scores = [];

  const normalTags = Object.assign(
    Object.fromEntries(subStats.map((name) => [name, 0])),
    Object.fromEntries(art.normalTags.map(({ name, value }) => [name, value]))
  );
  console.log(normalTags);

  for (const [characterName, { weights: w, badge }] of Object.entries(
    characters
  )) {
    let score = 0;

    for (const name of subStats) {
      console.log(name);
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
    // 双暴头修正分数
    if (art.position === 'head' && ['critical', 'criticalDamage'].includes(art.mainTag.name)) {
      if (!w.critical) {
        score = 0;
      } else {
        score += (10 * w.critical);
      }
    }
    // 杯子
    if (art.position === 'cup' && !w[art.mainTag.name]) {
        score = 0;
    }
    // 大攻击、大生命、大防御、元素精通、充能效率、治疗加成 的 沙漏、杯子、头
    for (const iterator of ['attackPercentage', 'lifePercentage', 'defendPercentage', 'elementalMastery', 'recharge', 'cureEffect']) {
      if (art.mainTag.name === iterator && (!w[iterator] || w[iterator] < 0.6)) {
        score = 0;
      }
    }
    scores.push({ characterName, badge, score: Math.floor(score) });
  }
  return scores.sort((a, b) => b.score - a.score);
}

export function getScore(art) {
  return art.star === 5 && art.level === 20 ? calScore(art) : expectScore(art);
}
