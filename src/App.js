import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Col, Row, Image, Avatar, Modal, Rate, Divider, Badge } from "antd";
import { positionToLocale, artifactTags, getScore } from "./utils";
import artifactIcons from "./gen_artifact_icon";
import artifact from "./gen_artifact";
import mona from "./mona.json";
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
    art.id = uuidv4();
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
    // console.log(artifact);
    if (artifact?.percentage) {
      return (v * 100).toFixed?.(1) + "%";
    }
    return v;
  };
  return (
    <div className="App">
      <Modal
        width="80vw"
        style={{ top: "50px" }}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{artifact[ModalData.setName]?.[ModalData.position]?.chs}</p>
        <p>{positionToLocale(ModalData.position)}</p>
        <p>{artifactTags[ModalData.mainTag?.name]?.chs}</p>
        <p>
          {Fixed(
            artifactTags[ModalData.mainTag?.name],
            ModalData.mainTag?.value
          )}
        </p>
        <Rate disabled value={ModalData.star} />
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
        <Row>
          {ModalData.scores?.map(({ characterName, badge, score }) => {
            return (
              <Col
                key={ModalData.id + characterName}
                style={{ textAlign: "center" }}
              >
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
        <div key={txt} style={{ textAlign: "center" }}>
          <Divider />
          <Row gutter={0}>
            <Col span={4}>
              {txt}({arts.length})
            </Col>
            <Col span={20}>
              <Row gutter={0}>
                {arts
                  .sort((a, b) => b.scores?.[0].score - a.scores?.[0].score)
                  .map((art) => (
                    <Col
                      flex
                      key={art.id}
                      onClick={() => showModal(art)}
                      offset={1}
                    >
                      <Badge
                        color={art.level === 20 ? "#faad14" : "red"}
                        count={"+" + art.level}
                      >
                        <Image
                          style={{
                            background:
                              art.star === 5
                                ? "rgb(211, 159, 81)"
                                : "rgb(177, 135, 195)",
                          }}
                          className="art-img"
                          preview={false}
                          width={80}
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
                      </Badge>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}

export default App;
