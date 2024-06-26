import React, { useState, createContext, useContext } from "react";
import { groupBy } from "lodash";
import { Tabs, Image, Badge, Row, Col, FloatButton, Avatar, Space } from 'antd';
import { ShareAltOutlined } from "@ant-design/icons";
import genCharacter from "../gen_character";
import ZhCn from "../zh-cn.json";
import ArtifactModal from "../components/ArtifactModal";
import artifactIcons from "../gen_artifact";


const cloneCharacters = [];

const genCharacterObj = {}
for (const character of Object.values(genCharacter)) {
  genCharacterObj[ZhCn[character.nameLocale]] = character;
}

let charactersSuit = localStorage.getItem("characters"); //获取存储的元素
const allArts = window.allArts ?? []; //解析出json对象

charactersSuit = charactersSuit ? Object.fromEntries(JSON.parse(charactersSuit)) : {}; //解析出json对象
console.log(allArts);
console.log(charactersSuit);

for (const [character, setNames] of Object.entries(charactersSuit)) {
  // console.log(character, setNames);

  const arts = allArts.map(art => (
    art._filter = Object.fromEntries(art.scores.map(score => [score.characterName, score.score]))
  ) && art).filter(art => art._filter[character]);

  // 所以可选套装
  for (const setName of setNames) {
    // .filter(({ scores }) => scores.find(({ characterName }) => characterName === character));
    // 保留两个评分最高的圣遗物
    for (const position of ['flower', 'feather']) {
      const [art1 = {}, art2 = {}] = arts.filter(art => art.setName === setName && !art.save && art.position === position).sort((art1, art2) => art2._filter[character] - art1._filter[character])
      // console.log(art1, art2);
      art1.save = true;
      art1.saveKEY = character;
      if (setNames.length < 2) {
        art2.save = true;
        art2.saveKEY = character;
      }
      if (!art1.position) {
        console.error(character, position, setName, ZhCn[artifactIcons[setName]?.nameLocale]);
      }
    }
    // 保留两个评分最高的圣遗物
    for (const position of ['sand', 'cup', 'head']) {
      // console.log(setName, position);
      const artGroup = groupBy(
        arts.filter(art => art.setName === setName && !art.save && art.position === position),
        ({ mainTag }) => mainTag.name
      );
      // console.log(artGroup);
      for (const artGroupSub of Object.values(artGroup)) {
        const [art1 = {}, art2 = {}] = artGroupSub.sort((art1, art2) => art2._filter[character] - art1._filter[character])
        // console.log(art1, art2);
        art1.save = true;
        art1.saveKEY = character;
        if (setNames.length < 2 && Object.keys(artGroup).length < 2) {
          art2.save = true;
          art2.saveKEY = character;
        }
      }
      if (!Object.keys(artGroup).length) {
        console.error(character, position, setName, ZhCn[artifactIcons[setName]?.nameLocale]);
      }

    }
  }
  // 保留一个非套装分最高的圣遗物
  for (const position of ['sand', 'cup', 'head']) {
    const [art1 = {}, art2 = {}] = arts.filter(art => !art.save && art.position === position).sort((art1, art2) => art2._filter[character] - art1._filter[character])
    // console.log(art1, art2);
    art1.save = true;
    art1.saveKEY = character;
    if (!art1.position) {
      console.error(character, position);
    }
  }
  for (const art of arts) {
    if (art.score < 30) {
      art.save = false;
    }
  }
}


for (const nameLocale of Object.keys(charactersSuit)) {
  // console.log(nameLocale);
  cloneCharacters.push({
    ...genCharacterObj[nameLocale],
    nameLocale,
    arts: []
  });
}

for (const art of allArts) {
  // console.log(art.scores);
  for (const { characterName, score } of art.scores) {
    const character = cloneCharacters.find(({ nameLocale }) => nameLocale === characterName);
    if (character) {
      character.arts.push({
        ...art,
        score,
      });
    }
  }
}
const cGroup = { 'All': cloneCharacters, ...groupBy(cloneCharacters, "element"), '保留': cloneCharacters, };
// console.log(cGroup);

const artContext = createContext(null)

function Art({ name, source }) {
  const setArt = useContext(artContext)
  if (!source) {
    return <></>
  }
  const { id, level, star, icon, setName, score, equip, save } = source;
  const onClick = () => {
    // console.log('onClick\n');
    setArt(source)
  }
  return (
    <div>
      <Badge
        color={level === 20 ? "#faad14" : "red"}
        count={`+${level}`}
        onClick={onClick}
      >
        <Image
          style={{
            background: save ? "rgb(211, 159, 81)" : '',
          }}
          className="art-img"
          preview={false}
          width={80}
          src={icon}
        />
        <div className="character-badge character-badge-b">
          <Avatar
            className="character-badge-a"
            src={genCharacterObj[equip]?.avatar}
          />
        </div>
        <div className="character-badge-txt">
          {score}分
        </div>
      </Badge>
    </div>
  )
}

// 满足2+2套
function setNamesCount(tmpCol, setNames) {
  const obj = {};
  for (const art of tmpCol) {
    if (setNames.includes(art.setName)) {
      if (obj[art.setName]) {
        obj[art.setName] = obj[art.setName] + 1
      } else {
        obj[art.setName] = 1;
      }
    }
  }
  return obj
}
// 满足2+2套
function has2_2(tmpCol, setNames) {
  const obj = setNamesCount(tmpCol, setNames);
  return Object.values(obj).filter(a => a > 1).length > 1
}
// 满足2+1套
function has2_1(tmpCol, setNames) {
  const obj = setNamesCount(tmpCol, setNames);
  return (Object.values(obj).filter(a => a > 1).length > 0) && Object.values(obj).filter(a => a > 0).length > 1
}

const artCount = {};
const artColObj = {};
cloneCharacters.forEach(({ name, nameLocale, avatar, arts }) => {
  // console.log(nameLocale);
  // console.log(charactersSuit[nameLocale]);
  // console.log(arts);
  // console.log(arts.filter(a => artCount[a.id]));

  const artsGroup = groupBy(arts.filter(a => !artCount[a.id]).sort((a, b) => -a.score + b.score), 'position');
  // console.log(artsGroup);
  const setNames = charactersSuit[nameLocale];
  let artCol = [];
  function pushArtCol(col) {
    if (!col.length) {
      return;
    }
    const hash = col.map(({ id }) => id).reduce((pre, curr) => pre + curr);
    // 如果当前套装已经添加过了，放弃
    if (artCol.find(({ hash: h }) => h === hash)) {
      return;
    }
    // 将筛选出来的套装纳入列表
    artCol.push({
      ...Object.fromEntries(col.map(art => [art.position, art])),
      score: col.map(({ score }) => score).reduce((pre, curr) => pre + curr),
      hash,
    });
    for (const art of col) {
      if (!art.save) {
        art.save = true;
        art.saveKEY = nameLocale;
      }
    }
  }

  if (nameLocale === '枫原万叶') {
    // 只有一种套装说明是四件套
    const setName = setNames?.[0];
    const tmpCol = Object.values(artsGroup).map((a) => a.find?.(b => setName?.includes(b.setName)) ?? a[0]); // 挑出当前套装最好的部位
    // console.log(setName);
    // console.log(tmpCol);
    tmpCol.forEach((art, i) => {
      // console.log(art);
      const col = [...tmpCol];
      if (['flower', 'feather'].includes(art?.position)) {
        for (const oneallart of allArts.filter(a => !artCount[a.id])) {
          if (oneallart.position === art?.position) {
            const { value: oldelementalMastery } = col[i].normalTags.find(({ name }) => name === 'elementalMastery') ?? { value: 0 };
            const { value: newelementalMastery } = oneallart.normalTags.find(({ name }) => name === 'elementalMastery') ?? { value: 0 };
            col[i].score = oldelementalMastery;
            if (oldelementalMastery < newelementalMastery) {
              col[i] = { ...oneallart, score: newelementalMastery }; // 将当前部位换成分数最高的圣遗物
              col[i].color = 'red';
              // console.log(col[i]);
            }
          }
        }
      }
      let count = 0;
      // 统计当前组合的套装数量
      for (const { setName: tmpName } of col) {
        if (setName?.startsWith(tmpName)) {
          count++
        }
      }
      // 如果套装不足四件套，放弃
      if (count < 4) {
        return;
      }
      // console.log(count);
      pushArtCol(col);
    });
  } else if (setNames?.length === 1) {
    // 只有一种套装说明是四件套
    const setName = setNames?.[0];
    const tmpCol = Object.values(artsGroup).map((a) => a.find?.(b => setName?.includes(b.setName)) ?? a[0]); // 挑出当前套装最好的部位
    // console.log(setName);
    // console.log(tmpCol);
    tmpCol.forEach((art, i) => {
      // console.log(art);
      const col = [...tmpCol];
      col[i] = { ...artsGroup[art?.position]?.[0] }; // 将当前部位换成分数最高的圣遗物
      col[i].color = 'red';
      let count = 0;
      // 统计当前组合的套装数量
      for (const { setName: tmpName } of col) {
        if (setName?.startsWith(tmpName)) {
          count++
        }
      }
      // 如果套装不足四件套，放弃
      if (count < 4) {
        return;
      }
      // console.log(count);
      pushArtCol(col);
    });
  } else {
    // 2+2组合
    const tmpCol = Object.values(artsGroup).map((a) => a.find?.(b => setNames?.includes(b.setName)) ?? a[0]); // 挑出当前套装最好的部位
    // console.log(tmpCol);
    if (has2_2(tmpCol, setNames)) {
      pushArtCol(tmpCol);
      // 符合2+2 说明有一件装备有可能更换成更好的，还会满足
      tmpCol.forEach((art, i) => {
        const col = [...tmpCol];
        col[i] = { ...artsGroup[art?.position]?.[0] };
        col[i].color = 'red';
        if (has2_2(col, setNames)) {
          pushArtCol(col);
        }
      });
    } else {
      // 最好的套装都不符合2+2，需要找到最优解
      const obj = setNamesCount(tmpCol, setNames);
      if (has2_1(tmpCol, setNames)) {
        const seto1s = Object.entries(obj).filter(([a, b]) => b === 1).map(([a]) => a); // 找到缺1件的套装
        // console.log('缺少', seto1s);
        for (const setNameo1 of seto1s) {
          tmpCol.forEach((art, i) => {
            if (art.setName !== setNameo1) {
              const colart = artsGroup[art?.position].find(a => a.setName === setNameo1);
              if (colart) {
                const col = [...tmpCol];
                col[i] = { ...colart };
                col[i].color = 'red';
                if (has2_2(col, setNames)) {
                  pushArtCol(col);
                }
              }
            }
          });
        }
        // pushArtCol(tmpCol);
      }
    }
    if (artCol.length < 1) {
      pushArtCol(tmpCol);
    }
  }

  // console.log(artCol);
  // 当前角色的套装按照分数排序
  artCol = artCol.sort((a, b) => b.score - a.score);
  if (artCol.length) {
    // 从组中删除最好的一套圣遗物防止下一个角色使用
    for (const art of Object.values(artCol[0])) {
      if (typeof art === 'object') {
        if (art.level < 20 || nameLocale !== art.equip) {
          const character = cloneCharacters.find(c => c.nameLocale === nameLocale) ?? {}
          character.equip = true
        }
      }
      artCount[art.id] = (artCount[art.id] ?? 0) + 1
    }
    // console.log(artCount);
  } else {
    const character = cloneCharacters.find(c => c.nameLocale === nameLocale) ?? {}
    character.equip = true
  }
  artColObj[nameLocale] = artCol;
})

const items = Object.keys(cGroup).map((key) => {

  const characters = cGroup[key].map(({ name, nameLocale, avatar, equip }) => {


    if (key === '保留') {
      const { arts } = cloneCharacters.find(
        (a) => nameLocale === a.nameLocale
      );
      // console.log(arts);
      return {
        key: key + nameLocale,
        label: (
          <Badge dot={equip}>
            <Avatar shape="square" size={60} src={avatar} />
          </Badge>
        ),
        children: (<Row style={{ marginBottom: "20px" }}>
          {
            arts.filter(art => art.saveKEY === nameLocale).map((art, i) => (
              <Col span={3} key={key + nameLocale + i}>
                <Art source={art}></Art>
              </Col>
            ))
          }
        </Row>),
      };
    }




    const artCol = artColObj[nameLocale];
    return {
      key: key + name,
      label:
        (<Badge dot={equip}>
          < Avatar
            shape="square"
            size={60}
            src={avatar}
          />
        </Badge>),
      children:
        artCol.map((arts, i) => (
          <Row
            style={{ marginBottom: '20px' }}
            key={key + name + 'artCol' + i}>
            <Col span={4}><Art source={arts.flower}></Art></Col>
            <Col span={4}><Art source={arts.feather}></Art></Col>
            <Col span={4}><Art source={arts.sand}></Art></Col>
            <Col span={4}><Art source={arts.cup}></Art></Col>
            <Col span={4}><Art source={arts.head}></Art></Col>
            <Col span={4}>{arts.score}</Col>
          </Row>
        ))
      ,
    }
  });
  return {
    key,
    label: key,
    children: <Tabs prefixCls="character-tabs" defaultActiveKey="1" items={characters} />,
  }
});

function Dashboard() {
  const [art, setArt] = useState(null);
  const exportJSON = () => {
    // console.log('click')
    const content = JSON.stringify(allArts.map(({ token, save = false }) => ({ token, save })))
    var a = document.createElement("a");
    var file = new Blob([content], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'lock.json';
    a.click();
  }
  return (
    <div style={{ paddingLeft: '20px' }}>
      <FloatButton onClick={exportJSON} icon={<ShareAltOutlined />} />
      <artContext.Provider value={setArt}>
        <ArtifactModal art={art} setArt={setArt}></ArtifactModal>
        <Tabs defaultActiveKey="1"
          size="large"
          type="card"
          items={items} />
      </artContext.Provider>
    </div>
  );
}
export default Dashboard;
