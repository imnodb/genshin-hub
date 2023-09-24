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
  "BandofSizzlingThunder": {
    nameLocale: '激奏雷电的乐队',
    head: {
      text: '乐队的偏光墨镜',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/6e20183a67eb927b3c23b9308a9da91b_7812984376646176330.png",
    },
    hands: {
      text: '乐队的巡演手绳',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/12410f854b9eddb75ec38f7f3e16d5fd_7711211065263794649.png",
    },
    body: {
      text: '乐队的钉刺皮衣',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/c9724c332dfebb04f16dce15b02a85a4_9003859473022510185.png",
    },
    feet: {
      text: '乐队的铆钉短靴',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/64e5915b92e9a6e35e724b68b6eae004_539148985831296684.png",
    },
  },
  "ChampionofStreetwiseBoxing": {
    nameLocale: '街头出身的拳王',
    head: {
      text: '拳王的冠军护头',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/9f44db61cf624c73ab4f3682c5bee592_1808502902416218882.png",
    },
    hands: {
      text: '拳王的重炮拳套',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/67b25fc9f25b106006f15a7ea06f40e9_7418656370712408780.png",
    },
    body: {
      text: '拳王的贴身护胸',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/cd9815b8c2fa8a77445a77fdad02dce0_1228034803015687226.png",
    },
    feet: {
      text: '拳王的弧步战靴',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/5e2116a2fb1baff365b74900fd6e1101_4431259695801478805.png",
    },
  },
  "LongevousDisciple": {
    nameLocale: '宝命长存的莳者',
    head: {
      text: '莳者的复明义眼',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/fb8dfb3e7fa8e62817f348dbee58be16_5337577755356282471.png",
    },
    hands: {
      text: '莳者的机巧木手',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/6c4380994d47ab36ca22778f016b7853_4419114290717065647.png",
    },
    body: {
      text: '莳者的承露羽衣',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/3888c6f10e832399378e9a9fbfc22c6c_3081701743416012482.png",
    },
    feet: {
      text: '莳者的天人丝履',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/6233622c52202bbeea46bee59044eb0c_4826254037059564030.png",
    },
  },
  "GuardofWutheringSnow": {
    nameLocale: '戍卫风雪的铁卫',
    head: {
      text: '铁卫的铸铁面盔',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/a13e3165e90f5e6fe466040a4d6181da_3732618150981867022.png",
    },
    hands: {
      text: '铁卫的银鳞手甲',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/52879f61e037aaffd1e115fb8eb1c07a_6416284694980007542.png",
    },
    body: {
      text: '铁卫的旧制军服',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/23f4b6e965199a646572bc430f378a86_4077959702314813919.png",
    },
    feet: {
      text: '铁卫的白银护胫',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/c9a3ccc62bb84257ef6f269d45ed2841_6086081394345194799.png",
    },
  },
  "PasserbyofWanderingCloud": {
    nameLocale: '云无留迹的过客',
    head: {
      text: '过客的逢春木簪',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/3d95aa036af8eb639fbdbb672e4340c7_4059323445916151987.png",
    },
    hands: {
      text: '过客的游龙臂鞲',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/3a83f6ee081076cb2ad3b9381d37c598_1560405117955572776.png",
    },
    body: {
      text: '过客的残绣风衣',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/14/1805320/43d54456dcec404285221c6baa6a889c_4266562248261367330.png",
    },
    feet: {
      text: '过客的蹀血游履',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/14/1805320/6d1e02ad5e92e27ab454ecddaec47a16_1935595535032382025.png",
    },
  },
  "RutilantArena": {
    nameLocale: '繁星竞技场',
    planarSphere: {
      text: '泰科铵的镭射球场',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/4f248791b87b643733fceac410fd49a4_771678252497121589.png",
    },
    linkRope: {
      text: '泰科铵的弧光赛道',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/47650b0480c9ca973608adb318167a5d_6220153310523905992.png",
    },
  },
  "SpaceSealingStation": {
    nameLocale: '太空封印站',
    planarSphere: {
      text: '「黑塔」的空间站点',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/80aae6c09efeb5779516fb7b6bd77733_5301553828507482825.png",
    },
    linkRope: {
      text: '「黑塔」的漫历轨迹',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/adf08daa7c2832f2656e422343884e7a_2895538925902926887.png",
    },
  },
  "InertSalsotto": {
    nameLocale: '停转的萨尔索图',
    planarSphere: {
      text: '萨尔索图的移动城市',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/24b08fae098716e2e22159c501ab7b31_273868093771541485.png",
    },
    linkRope: {
      text: '萨尔索图的晨昏界线',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/5d5a0014e6da1371a4c013a771bc5617_5461272683252669791.png",
    },
  },
  "BrokenKeel": {
    nameLocale: '折断的龙骨',
    planarSphere: {
      text: '伊须磨洲的残船鲸落',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/afeb5486a10b86ae06be97d397d4e840_287880299346553354.png",
    },
    linkRope: {
      text: '伊须磨洲的坼裂缆索',
      url: "https://act-upload.mihoyo.com/sr-wiki/2023/07/17/75216984/ecb905d5313a2d20a57cd93da75dd0a6_2977861339214131503.png",
    },
  },
  "FleetoftheAgeless": {
    nameLocale: '不老者的仙舟',
    planarSphere: {
      text: '罗浮仙舟的天外楼船',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/7ff3f64fee9c41700666eae65c682693_855537188673048360.png",
    },
    linkRope: {
      text: '罗浮仙舟的建木枝蔓',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/407cd5269240e7ec73d8544cff23c9f3_7426246078000311751.png",
    },
  },
  "PanGalacticCommercialEnterprise": {
    nameLocale: '泛银河商业公司',
    planarSphere: {
      text: '公司的巨构总部',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/9b153e5eb9122992f358c2d933629878_6592530249071403503.png",
    },
    linkRope: {
      text: '公司的贸易航道',
      url: "https://uploadstatic.mihoyo.com/sr-wiki/2023/02/07/103492603/a7994f7bff5ededc4e513b66bc655b70_496556679066015838.png",
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
        setNames: ["GeniusofBrilliantStars", "RutilantArena"],
        head: ["hp"],
        hands: ["atk"],
        body: ["critRate", "critDMG"],
        feet: ["atk_"],
        planarSphere: ["quantumDmg"],
        linkRope: ["atk_"],
      },
    ],
  },
  "卡芙卡": {
    weights: {
      "hp": 0,
      "hp_": 0,
      "atk": 1,
      "atk_": 1,
      "def": 0,
      "def_": 0,
      "spd": 1,
      "critRate": 0.5,
      "critDMG": 0,
      "eff": 0.75,
      "effRes": 0,
      "break": 0.5,
    },
    ace: 226,
    badge: 'https://act-upload.mihoyo.com/sr-wiki/2023/08/09/279865110/080fa5ed1cb5d3d40dfcf1dc10549ca2_6303402650588045559.png',
    artifacts: [
      {
        setNames: ["BandofSizzlingThunder", "SpaceSealingStation"],
        head: ["hp"],
        hands: ["atk"],
        body: ["atk_"],
        feet: ["spd"],
        planarSphere: ["lightningDmg"],
        linkRope: ["atk_", "enerRegen"],
      },
    ],
  },
  "克拉拉": {
    weights: {
      "hp": 0.45,
      "hp_": 0.45,
      "atk": 0.75,
      "atk_": 0.75,
      "def": 0.35,
      "def_": 0.35,
      "spd": 0,
      "critRate": 1,
      "critDMG": 1,
      "eff": 0,
      "effRes": 0,
      "break": 0,
    },
    ace: 225,
    badge: 'https://act-upload.mihoyo.com/sr-wiki/2023/08/25/299598919/1abe5e0d3a46527366806879e8e4c051_7215228569782958459.png',
    artifacts: [
      {
        setNames: ["ChampionofStreetwiseBoxing", "InertSalsotto"],
        head: ["hp"],
        hands: ["atk"],
        body: ["critRate", "critDMG"],
        feet: ["atk_"],
        planarSphere: ["physicalDmg"],
        linkRope: ["atk_", "enerRegen"],
      },
      {
        setNames: ["LongevousDisciple", "InertSalsotto"],
        head: ["hp"],
        hands: ["atk"],
        body: ["critRate", "critDMG"],
        feet: ["atk_"],
        planarSphere: ["physicalDmg"],
        linkRope: ["atk_", "enerRegen"],
      },
      {
        setNames: ["ChampionofStreetwiseBoxing", "GuardofWutheringSnow", "InertSalsotto"],
        head: ["hp"],
        hands: ["atk"],
        body: ["critRate", "critDMG"],
        feet: ["atk_"],
        planarSphere: ["physicalDmg"],
        linkRope: ["atk_", "enerRegen"],
      },
    ],
  },
  "符玄": {
    weights: {
      "hp": 1,
      "hp_": 1,
      "atk": 0,
      "atk_": 0,
      "def": 0.75,
      "def_": 0.75,
      "spd": 1,
      "critRate": 0,
      "critDMG": 0,
      "eff": 0,
      "effRes": 0.75,
      "break": 0,
    },
    ace: 209,
    badge: 'https://act-upload.mihoyo.com/sr-wiki/2023/09/19/279865110/bed9e6ced420be2318de111dd96681ca_1167960718750842288.png',
    artifacts: [
      {
        setNames: ["GuardofWutheringSnow", "PasserbyofWanderingCloud", "BrokenKeel"],
        head: ["hp"],
        hands: ["atk"],
        body: ["hp_"],
        feet: ["spd"],
        planarSphere: ["hp_"],
        linkRope: ["enerRegen"],
      },
      {
        setNames: ["GuardofWutheringSnow", "PasserbyofWanderingCloud", "FleetoftheAgeless"],
        head: ["hp"],
        hands: ["atk"],
        body: ["hp_"],
        feet: ["spd"],
        planarSphere: ["hp_"],
        linkRope: ["enerRegen"],
      },
      {
        setNames: ["GuardofWutheringSnow", "LongevousDisciple", "BrokenKeel"],
        head: ["hp"],
        hands: ["atk"],
        body: ["hp_"],
        feet: ["spd"],
        planarSphere: ["hp_"],
        linkRope: ["enerRegen"],
      },
      {
        setNames: ["GuardofWutheringSnow", "LongevousDisciple", "FleetoftheAgeless"],
        head: ["hp"],
        hands: ["atk"],
        body: ["hp_"],
        feet: ["spd"],
        planarSphere: ["hp_"],
        linkRope: ["enerRegen"],
      },
    ],
  },
  "银狼": {
    weights: {
      "hp": 0,
      "hp_": 0,
      "atk": 0.75,
      "atk_": 0.75,
      "def": 0,
      "def_": 0,
      "spd": 0.75,
      "critRate": 1,
      "critDMG": 1,
      "eff": 1,
      "effRes": 0,
      "break": 0,
    },
    ace: 239,
    badge: 'https://act-upload.mihoyo.com/sr-wiki/2023/08/25/299598919/d8dc3ca987dd2b9911893718bb610375_7218912827536937727.png',
    artifacts: [
      {
        setNames: ["GeniusofBrilliantStars", "PanGalacticCommercialEnterprise"],
        head: ["hp"],
        hands: ["atk"],
        body: ["critRate", "critDMG"],
        feet: ["spd"],
        planarSphere: ["quantumDmg"],
        linkRope: ["enerRegen", "atk_"],
      },
    ],
  },
  "白露": {
    weights: {
      "hp": 1,
      "hp_": 1,
      "atk": 0,
      "atk_": 0,
      "def": 0.5,
      "def_": 0.5,
      "spd": 1,
      "critRate": 0,
      "critDMG": 0,
      "eff": 0,
      "effRes": 0.75,
      "break": 0,
    },
    ace: 200,
    badge: 'https://act-upload.mihoyo.com/sr-wiki/2023/08/07/103492603/72c982ccd25802a32d0b89bf03d70d20_1097752465552406625.png',
    artifacts: [
      {
        setNames: ["PasserbyofWanderingCloud", "BrokenKeel"],
        head: ["hp"],
        hands: ["atk"],
        body: ["heal"],
        feet: ["spd"],
        planarSphere: ["hp_"],
        linkRope: ["enerRegen"],
      },
      {
        setNames: ["PasserbyofWanderingCloud", "FleetoftheAgeless"],
        head: ["hp"],
        hands: ["atk"],
        body: ["heal"],
        feet: ["spd"],
        planarSphere: ["hp_"],
        linkRope: ["enerRegen"],
      },
      {
        setNames: ["PasserbyofWanderingCloud", "LongevousDisciple", "BrokenKeel"],
        head: ["hp"],
        hands: ["atk"],
        body: ["heal"],
        feet: ["spd"],
        planarSphere: ["hp_"],
        linkRope: ["enerRegen"],
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
