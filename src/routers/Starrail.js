import localforage from "localforage";
import React, { useState, createContext, useContext } from "react";
import { groupBy } from "lodash";
import {
  Tabs,
  Image,
  Badge,
  Row,
  Col,
  FloatButton,
  Avatar,
  Upload,
} from "antd";
import { ShareAltOutlined, FileAddOutlined } from "@ant-design/icons";
import genCharacter from "../gen_character";
import ZhCn from "../zh-cn.json";
import ArtifactModal from "../components/ArtifactModal";
import {
  artifactTags,
  artifactIcons,
  positionToLocale,
  characters as charactersSuit,
  importScore,
} from "../starrail_utils";
import { v4 as uuidv4 } from "uuid";

const cloneCharacters = [];

const genCharacterObj = {};
for (const character of Object.values(genCharacter)) {
  genCharacterObj[ZhCn[character.nameLocale]] = character;
}

const allArts = window.StarrailArts ?? []; //解析出json对象

console.log(allArts);
console.log(charactersSuit);

for (const [character, { artifacts }] of Object.entries(charactersSuit)) {
  const arts = allArts
    .map(
      (art) =>
        (art._filter = Object.fromEntries(
          art.scores.map((score) => [score.characterName, score.score])
        )) && art
    )
    .filter((art) => art._filter[character]);
  console.log(arts);
  for (const { setNames, head, hands, body, feet } of artifacts) {
    console.log(character, setNames);
    // 所以可选套装
    for (const setName of setNames) {
      // .filter(({ scores }) => scores.find(({ characterName }) => characterName === character));
      // 保留两个评分最高的圣遗物
      for (const position of [
        "head",
        "hands",
        "body",
        "feet",
        "planarSphere",
        "linkRope",
      ]) {
        const artGroup = groupBy(
          arts.filter(
            (art) =>
              art.setName === setName && !art.save && art.position === position
          ),
          ({ mainTag }) => mainTag.name
        );
        console.log(artGroup);
        for (const artGroupSub of Object.values(artGroup)) {
          const [art1 = {}, art2 = {}] = artGroupSub.sort(
            (art1, art2) => art2._filter[character] - art1._filter[character]
          );
          console.log(art1, art2);
          art1.save = true;
          art2.save = true;
          if (setNames.length < 2 && Object.keys(artGroup).length < 2) {
            art2.save = true;
          }
        }
        if (!Object.keys(artGroup).length) {
          console.error(
            character,
            position,
            setName,
            ZhCn[artifactIcons[setName]?.nameLocale]
          );
        }
      }
    }
  }

  // for (const art of arts) {
  //   if (art.score < 30) {
  //     art.save = false;
  //   }
  // }
}

for (const nameLocale of Object.keys(charactersSuit)) {
  // console.log(nameLocale);
  cloneCharacters.push({
    ...charactersSuit[nameLocale],
    nameLocale,
    arts: [],
  });
}

for (const art of allArts) {
  // console.log(art.scores);
  for (const { characterName, score } of art.scores) {
    const character = cloneCharacters.find(
      ({ nameLocale }) => nameLocale === characterName
    );
    if (character) {
      character.arts.push({
        ...art,
        score,
      });
    }
  }
}
const cGroup = { All: cloneCharacters, ...groupBy(cloneCharacters, "element") };
console.log("cGroup\n", cGroup);

const artContext = createContext(null);

function Art({ name, source }) {
  console.log(name, source);
  const setArt = useContext(artContext);
  if (!source) {
    return <></>;
  }
  const { id, level, star, icon, setName, score, equip, save } = source;
  const onClick = () => {
    // console.log('onClick\n');
    setArt(source);
  };
  return (
    <div>
      <Badge
        color={level === 20 ? "#faad14" : "red"}
        count={`+${level}`}
        onClick={onClick}
      >
        <Image
          style={{
            background: save ? "rgb(211, 159, 81)" : "",
          }}
          className="art-img"
          preview={false}
          width={80}
          height={80}
          src={icon}
        />
        <div
          className="character-badge character-badge-b"
          style={{
            display: genCharacterObj[equip]?.avatar ? "" : "none",
          }}
        >
          <Avatar
            className="character-badge-a"
            src={genCharacterObj[equip]?.avatar}
          />
        </div>
        <div className="character-badge-txt">{score}分</div>
      </Badge>
    </div>
  );
}

// 满足2+2套
function setNamesCount(tmpCol, setNames) {
  const obj = {};
  for (const art of tmpCol) {
    if (setNames.includes(art.setName)) {
      if (obj[art.setName]) {
        obj[art.setName] = obj[art.setName] + 1;
      } else {
        obj[art.setName] = 1;
      }
    }
  }
  return obj;
}
// 满足2+2+2套
function has2_2_2(tmpCol, setNames) {
  const obj = setNamesCount(tmpCol, setNames);
  return Object.values(obj).filter((a) => a > 1).length > 2;
}
// 满足2+2+1套
function has2_2_1(tmpCol, setNames) {
  const obj = setNamesCount(tmpCol, setNames);
  return (
    Object.values(obj).filter((a) => a > 1).length > 1 &&
    Object.values(obj).filter((a) => a > 0).length > 2
  );
}

const artCount = {};
const artColObj = {};
cloneCharacters.forEach(({ name, nameLocale, avatar, arts }) => {
  console.log(nameLocale);
  console.log(charactersSuit[nameLocale]);
  console.log(arts);
  console.log(arts.filter((a) => artCount[a.id]));

  const artsGroup = groupBy(
    arts.filter((a) => !artCount[a.id]).sort((a, b) => -a.score + b.score),
    "position"
  );
  console.log("artsGroup\n", artsGroup);
  const { artifacts } = charactersSuit[nameLocale];

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
      ...Object.fromEntries(col.map((art) => [art.position, art])),
      score: col.map(({ score }) => score).reduce((pre, curr) => pre + curr),
      hash,
    });
    for (const art of col) {
      art.save = true;
    }
  }
  for (const { setNames, head, hands, body, feet } of artifacts) {
    // 只有两种套装说明是内外圈唯一组合
    if (setNames?.length === 2) {
      const tmpCol = Object.values(artsGroup)
        .map((a) => a.find?.((b) => setNames?.includes(b.setName)))
        .filter((a) => a); // 挑出当前套装最好的部位
      console.log("setNames", setNames);
      console.log("tmpCol", tmpCol);
      pushArtCol(tmpCol);
    } else {
      // 2+2+2组合
      const tmpCol = Object.values(artsGroup).map(
        (a) => a.find?.((b) => setNames?.includes(b.setName)) ?? a[0]
      ); // 挑出当前套装最好的部位
      console.log("tmpCol", tmpCol);
      if (has2_2_2(tmpCol, setNames)) {
        pushArtCol(tmpCol);
        // 符合2+2+2 说明满足
      } else {
        // 最好的套装都不符合2+2+2，需要找到最优解
        const obj = setNamesCount(tmpCol, setNames);
        if (has2_2_1(tmpCol, setNames)) {
          const seto1s = Object.entries(obj)
            .filter(([a, b]) => b === 1)
            .map(([a]) => a); // 找到缺1件的套装
          // console.log('缺少', seto1s);
          for (const setNameo1 of seto1s) {
            tmpCol.forEach((art, i) => {
              if (art.setName !== setNameo1) {
                const colart = artsGroup[art?.position].find(
                  (a) => a.setName === setNameo1
                );
                if (colart) {
                  const col = [...tmpCol];
                  col[i] = { ...colart };
                  col[i].color = "red";
                  if (has2_2_2(col, setNames)) {
                    pushArtCol(col);
                  }
                }
              }
            });
          }
          // pushArtCol(tmpCol);
        } else {
          
        }
      }
      if (artCol.length < 1) {
        pushArtCol(tmpCol);
      }
    }
  }

  console.log("artCol\n", artCol);
  // 当前角色的套装按照分数排序
  artCol = artCol.sort((a, b) => b.score - a.score);
  if (artCol.length) {
    // 从组中删除最好的一套圣遗物防止下一个角色使用
    for (const art of Object.values(artCol[0])) {
      if (typeof art === "object") {
        if (art.level < 20 || nameLocale !== art.equip) {
          const character =
            cloneCharacters.find((c) => c.nameLocale === nameLocale) ?? {};
          character.equip = true;
        }
      }
      artCount[art.id] = (artCount[art.id] ?? 0) + 1;
    }
    console.log("artCount\n", artCount);
  } else {
    const character =
      cloneCharacters.find((c) => c.nameLocale === nameLocale) ?? {};
    character.equip = true;
  }
  artColObj[nameLocale] = artCol;
});

const items = Object.keys(cGroup).map((key) => {
  const characters = cGroup[key].map(
    ({ name, nameLocale, badge: avatar, equip }) => {
      const artCol = artColObj[nameLocale];
      console.log(name, nameLocale, avatar, equip);
      console.log(artCol);
      return {
        key: nameLocale,
        label: (
          <Badge dot={equip}>
            <Avatar shape="square" size={60} src={avatar} />
          </Badge>
        ),
        children: artCol.map((arts, i) => (
          <Row style={{ marginBottom: "20px" }} key={"artCol" + i}>
            <Col span={3}>
              <Art source={arts.head}></Art>
            </Col>
            <Col span={3}>
              <Art source={arts.hands}></Art>
            </Col>
            <Col span={3}>
              <Art source={arts.body}></Art>
            </Col>
            <Col span={3}>
              <Art source={arts.feet}></Art>
            </Col>
            <Col span={3}>
              <Art source={arts.planarSphere}></Art>
            </Col>
            <Col span={3}>
              <Art source={arts.linkRope}></Art>
            </Col>
            <Col span={3}>{arts.score}</Col>
          </Row>
        )),
      };
    }
  );
  return {
    key,
    label: key,
    children: (
      <Tabs
        prefixCls="character-tabs"
        defaultActiveKey="1"
        items={characters}
      />
    ),
  };
});

function Starrail() {
  const [art, setArt] = useState(null);
  const beforeUpload = (file) => {
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = async function (e) {
      try {
        const mona = JSON.parse(fileReader.result);
        // console.log(mona);
        // console.log(Object.entries(mona));
        const StarrailArts = [];
        for (const [pos, arts] of Object.entries(mona)) {
          if (pos === "version") {
            continue;
          }
          if (pos === "characters") {
            localStorage.setItem("characters", JSON.stringify(arts));
            continue;
          }
          // console.log([pos, arts]);
          for (const art of arts) {
            art.icon = artifactIcons[art.setName]?.[art.position]?.url;
            art.setNameText = artifactIcons[art.setName]?.nameLocale;
            art.setNamePositionText =
              artifactIcons[art.setName]?.[art.position]?.text;
            art.positionLocale = positionToLocale(art.position);
            art.mainTagName = artifactTags[art.mainTag.name]?.chs;
            art.mainTagPercentage = artifactTags[art.mainTag.name]?.percentage;
            art.normalTags = art.normalTags.map((a) =>
              Object.assign(a, {
                chs: artifactTags[a.name]?.chs,
                percentage: !!artifactTags[a.name]?.percentage,
              })
            );
            art.id = uuidv4();
            art.scores = importScore(art) || [];
            StarrailArts.push(art);
            // break;
          }
          // break;
        }
        console.log("StarrailArts----\n", StarrailArts);
        await localforage.setItem("StarrailArts", StarrailArts);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };
    return false;
  };
  const exportJSON = () => {
    console.log("click");
    const content = JSON.stringify(
      allArts.map(({ token, save = false }) => ({ token, save }))
    );
    var a = document.createElement("a");
    var file = new Blob([content], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = "lock.json";
    a.click();
  };
  return (
    <div style={{ paddingLeft: "20px" }}>
      <FloatButton.Group shape="circle">
        <Upload accept=".json" beforeUpload={beforeUpload}>
          <FloatButton icon={<FileAddOutlined />} />
        </Upload>
        <FloatButton onClick={exportJSON} icon={<ShareAltOutlined />} />
      </FloatButton.Group>

      <artContext.Provider value={setArt}>
        <ArtifactModal art={art} setArt={setArt}></ArtifactModal>
        <Tabs defaultActiveKey="1" size="large" type="card" items={items} />
      </artContext.Provider>
    </div>
  );
}
export default Starrail;
