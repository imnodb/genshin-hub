import React, { useRef, useEffect, useState, createContext, useContext } from "react";
import { groupBy } from "lodash";
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
const allArts = val ? JSON.parse(val) : []; //解析出json对象
// console.log(allArts);

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
  const { id, level, star, icon, setName, score } = source;
  const setArt = useContext(artContext)
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
              star === 5
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


const items = Object.keys(cGroup).map((key) => {
  const characters = cGroup[key].map(({ name, nameLocale, avatar, arts }) => {

    const artsGroup = groupBy(arts, 'position');

    return {
      key: name,
      label:
        (< Image
          preview={false}
          width={50}
          src={avatar}
        />),
      children:
        <Row>
          {Object.entries(artsGroup).map(([position, arts]) => (
            <Col key={position} span={4}>
              <Row>
                {arts.sort((a, b) => -a.score + b.score).map((source) => (
                  <Col key={source.id}>
                    <Art name={name} source={source}></Art>
                  </Col>
                ))}
              </Row>
            </Col>
          ))}
        </Row>
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
