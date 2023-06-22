import React, { useRef, useEffect, useState, createContext, useContext } from "react";
import { groupBy, includes } from "lodash";
import { Tabs, Image, Badge, Row, Col } from 'antd';
import genCharacter from "../gen_character";
import ZhCn from "../zh-cn.json";
import ArtifactModal from "../components/ArtifactModal";


const cloneCharacters = [];

for (const character of Object.values(genCharacter)) {
  cloneCharacters.push({
    ...character,
    nameLocale: ZhCn[character.nameLocale],
    arts: []
  });
}

const val = localStorage.getItem("allArts"); //获取存储的元素
let charactersSuit = localStorage.getItem("characters"); //获取存储的元素
const allArts = val ? JSON.parse(val) : []; //解析出json对象
charactersSuit = charactersSuit ? Object.fromEntries(JSON.parse(charactersSuit)) : {}; //解析出json对象
// console.log(allArts);
console.log(charactersSuit);

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
const cGroup = groupBy(cloneCharacters, "element");
console.log(cGroup);

const artContext = createContext(null)

function Art({ name, source }) {
  const setArt = useContext(artContext)
  if (!source) {
    return <></>
  }
  const { id, level, star, icon, setName, score, color } = source;
  const onClick = () => {
    console.log('onClick\n');
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
            background:
              !color
                ? "rgb(211, 159, 81)"
                : "rgb(177, 135, 195)",
          }}
          className="art-img"
          preview={false}
          width={80}
          src={icon}
        />
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


const items = Object.keys(cGroup).map((key) => {
  const characters = cGroup[key].map(({ name, nameLocale, avatar, arts }) => {
    console.log(nameLocale);
    console.log(charactersSuit[nameLocale]);

    const artsGroup = groupBy(arts.sort((a, b) => -a.score + b.score), 'position');
    console.log(artsGroup);
    const setNames = charactersSuit[nameLocale];
    const artCol = [];
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
    }

    if (setNames?.length === 1) {
      // 只有一种套装说明是四件套
      const setName = setNames?.[0];
      const tmpCol = Object.values(artsGroup).map((a) => a.find?.(b => setName?.includes(b.setName)) ?? a[0]); // 挑出当前套装最好的部位
      console.log(setName);
      console.log(tmpCol);
      tmpCol.forEach((art, i) => {
        console.log(art);
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
        console.log(count);
        pushArtCol(col);
      });
      console.log(artCol);
    } else {
      // 2+2组合
      const tmpCol = Object.values(artsGroup).map((a) => a.find?.(b => setNames?.includes(b.setName)) ?? a[0]); // 挑出当前套装最好的部位
      console.log(tmpCol);
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
          console.log('缺少', seto1s);
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
        pushArtCol(tmpCol);
      }
      console.log(artCol);
    }

    return {
      key: name,
      label:
        (< Image
          preview={false}
          width={50}
          src={avatar}
        />),
      children:
        artCol.sort((a, b) => -a.score + b.score).map((arts, i) => (
          <Row key={'artCol' + i}>
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
    children: <Tabs defaultActiveKey="1" items={characters} />,
  }
});

function Dashboard() {
  const [art, setArt] = useState(null);

  return (
    <div>
      <artContext.Provider value={setArt}>
        <ArtifactModal art={art} setArt={setArt}></ArtifactModal>
        <Tabs defaultActiveKey="1" items={items} />
      </artContext.Provider>
    </div>
  );
}
export default Dashboard;
