import React, { useState } from "react";
import { Col, Row, Image, Avatar, Modal, Rate } from "antd";
import { positionToLocale, artifactTags, getScore } from "./utils";
import artifactIcons from "./gen_artifact_icon";
import artifact from "./gen_artifact";
import mona from "./artifacts_mona.json";
import "./App.css";

console.log({ mona });
console.log(artifact);

const list = [
  {
    txt: "极品",
    arts: [],
  },
  {
    txt: "顶尖",
    arts: [],
  },
  {
    txt: "一般",
    arts: [],
  },
  {
    txt: "鸡肋",
    arts: [],
  },
];

console.log(Object.entries(mona));
for (const [pos, arts] of Object.entries(mona)) {
  if (pos === "version") {
    continue;
  }
  console.log([pos, arts]);
  for (const art of arts) {
    if (art.level < 16) {
      continue;
    }
    // if (art.setName !== 'crimsonWitch') {
    //   continue;
    // }
    console.log(art);
    art.icon = artifactIcons[art.setName]?.[art.position]?.url;
    art.scores = getScore(art);
    const maxScore = getScore(art)?.[0]?.score;
    if (maxScore >= 48) {
      list[0].arts.push(art);
    } else if (maxScore >= 36) {
      list[1].arts.push(art);
    } else if (maxScore >= 21) {
      list[2].arts.push(art);
    } else {
      list[3].arts.push(art);
    }
    // break;
  }
  // break;
}
console.log(list);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalData, setModalData] = useState({});

  const showModal = (art) => {
    console.log(art);
    setModalData(art);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const Fixed = (artifact, v) => {
    console.log(artifact);
    if (artifact?.percentage) {
      return (v * 100).toFixed?.(1) + '%';
    }
    return v;
  };
  return (
    <div className="App">
      <Modal
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{artifact[ModalData.setName]?.[ModalData.position]?.chs}</p>
        <p>{positionToLocale(ModalData.position)}</p>
        <p>{artifactTags[ModalData.mainTag?.name]?.chs}</p>
        <p>
          {Fixed(artifactTags[ModalData.mainTag?.name], ModalData.mainTag?.value)}
        </p>
        <Rate disabled defaultValue={ModalData.star} />
        <p>+{ModalData.level}</p>
        {ModalData.normalTags?.map(({ name, value }) => {
          return (
            <p key={ModalData.id + name}>
              {artifactTags[name]?.chs + "+" + Fixed(artifactTags[name], value)}
            </p>
          );
        })}
        <p>{artifact[ModalData.setName]?.chs}</p>
        <p>2件套：{artifact[ModalData.setName]?.effect2}</p>
        <p>4件套：{artifact[ModalData.setName]?.effect4}</p>
        <Row >
          {ModalData.scores?.map(({ characterName, badge, score }) => {
            return (
              <Col key={ModalData.id + characterName}>
                <Avatar
                  src={
                    badge ||
                    `https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${characterName}.png`
                  }
                />
                <br />
                {score}
              </Col>
            );
          })}
        </Row>
      </Modal>
      {list.map(({ txt, arts }) => (
        <Row key={txt} gutter={10}>
          <Col span={2}>
            {txt}({arts.length})
          </Col>
          <Col span={20}>
            <Row gutter={10}>
              {arts
                .sort((a, b) => b.scores?.[0].score - a.scores?.[0].score)
                .map((art) => (
                  <Col key={art.id} onClick={() => showModal(art)}>
                    <Image
                      className="art-img"
                      preview={false}
                      width={100}
                      src={art.icon}
                    />
                    <Avatar
                      className="character-badge"
                      src={
                        art.scores?.[0].badge ||
                        `https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${art.scores?.[0].characterName}.png`
                      }
                    />
                    <div>{art.scores?.[0].score}分</div>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default App;
