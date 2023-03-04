import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Image,
  Avatar,
  Modal,
  Rate,
  Divider,
  Badge,
  Select,
  Tag,
  Upload,
  FloatButton,
} from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import {
  mainStatMap,
  positionToLocale,
  artifactTags,
  getScore,
  characters,
} from "./utils";
import artifactIcons from "./gen_artifact_icon";
import artifact from "./gen_artifact";
import genCharacter from "./gen_character";
// import mona from "./mona.json";
import "./App.css";

// console.log({ mona });
console.log(artifact);

// console.log(Object.entries(mona));
let allArts = [];
try {
  var val = localStorage.getItem("allArts"); //获取存储的元素
  allArts = JSON.parse(val); //解析出json对象
} catch (error) {
  console.error(error);
}

console.log(artifactIcons);

const options = Object.entries(artifactIcons).map(([name, { art }]) => ({
  label: artifact[name]?.chs,
  value: name,
}));
const positionOptions = Object.keys(mainStatMap).map((name) => ({
  label: positionToLocale(name),
  value: name,
}));
const characterOptions = Object.keys(characters).map((name) => ({
  label: genCharacter[name]?.chs,
  value: name,
}));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalData, setModalData] = useState({});
  const [selectedValue, setSelectedValue] = useState([]);
  const [positionValue, setPositionValue] = useState([]);
  const [characterValue, setCharacterValue] = useState([]);
  const [RatingList, setRatingList] = useState([]);

  const beforeUpload = (file) => {
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function (e) {
      try {
        const mona = JSON.parse(fileReader.result);
        console.log(mona);
        console.log(Object.entries(mona));
        const allArts = [];
        for (const [pos, arts] of Object.entries(mona)) {
          if (pos === "version") {
            continue;
          }
          console.log([pos, arts]);
          for (const art of arts) {
            art.id = uuidv4();
            art.icon = artifactIcons[art.setName]?.[art.position]?.url;
            art.scores = getScore(art);
            art.maxScore = getScore(art)?.[0]?.score;
            allArts.push(art);
            // break;
          }
          // break;
        }
        localStorage.setItem("allArts", JSON.stringify(allArts));
        console.log("allArts----\n", allArts);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };
    return false;
  };

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
  const handleChange = (value) => {
    setSelectedValue(value);
    changeRatingList({ setV: value });
  };
  const positionHandleChange = (value) => {
    setPositionValue(value);
    changeRatingList({ pos: value });
  };
  const characterHandleChange = (value) => {
    setCharacterValue(value);
    changeRatingList({ names: value });
  };
  const changeRatingList = (options = {}) => {
    const names = options.names ?? characterValue;
    const pos = options.pos ?? positionValue;
    const setV = options.setV ?? selectedValue;

    const arts1 = [];
    const arts2 = [];
    const arts3 = [];
    const arts4 = [];
    for (const art of allArts) {
      if (
        (setV.length && !setV.includes(art.setName)) ||
        (pos.length && !pos.includes(art.position)) ||
        (names.length &&
          !art.scores?.find(({ characterName }) =>
            names.includes(characterName)
          ))
      ) {
        continue;
      }
      const score = names?.length
        ? Math.max(
            ...(art.scores
              ?.filter(({ characterName }) => names.includes(characterName))
              .map(({ score }) => score) ?? [])
          )
        : art.maxScore;
      // console.log(score);
      art.score = score ?? 0;
      if (score >= 48) {
        arts1.push(art);
      } else if (score >= 36) {
        arts2.push(art);
      } else if (score >= 21) {
        arts3.push(art);
      } else {
        arts4.push(art);
      }
    }
    setRatingList([
      {
        txt: "极品",
        arts: arts1.sort((a, b) => b.score - a.score),
      },
      {
        txt: "顶尖",
        arts: arts2.sort((a, b) => b.score - a.score),
      },
      {
        txt: "一般",
        arts: arts3.sort((a, b) => b.score - a.score),
      },
      {
        txt: "鸡肋",
        arts: arts4.sort((a, b) => b.score - a.score),
      },
    ]);
  };
  if (!RatingList.length) {
    changeRatingList();
  }
  console.log("RatingList", RatingList);
  return (
    <div className="App">
      <Upload accept=".json" beforeUpload={beforeUpload}>
        <FloatButton
          icon={<FileAddOutlined />}
          onClick={() => console.log("click")}
        />
      </Upload>
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
      圣遗物总数： {RatingList.reduce((p, { arts }) => p + arts.length, 0)}
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={[]}
        onChange={handleChange}
        options={options}
        tagRender={({ label, value, closable, onClose }) => {
          const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
          };
          return (
            <Tag
              onMouseDown={onPreventMouseDown}
              closable={closable}
              onClose={onClose}
              style={{ marginRight: 3 }}
            >
              <Avatar src={artifactIcons[value]?.head.url} />
              {label}
            </Tag>
          );
        }}
      />
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={[]}
        onChange={positionHandleChange}
        options={positionOptions}
      />
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        defaultValue={[]}
        onChange={characterHandleChange}
        options={characterOptions}
      />
      {RatingList.map(({ txt, arts }) => (
        <div key={txt} style={{ textAlign: "center" }}>
          <Divider />
          <Row gutter={0}>
            <Col span={2}>
              {txt}({arts.length})
            </Col>
            <Col span={22}>
              <Row gutter={0}>
                {arts.map((art) => (
                  <Col
                    flex
                    key={art.id}
                    onClick={() => showModal(art)}
                    style={{ marginTop: "5px", marginLeft: "20px" }}
                  >
                    <Badge
                      color={art.level === 20 ? "#faad14" : "red"}
                      count={`+${art.level}`}
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
                      <div className="character-badge">
                        <Avatar
                          className="character-badge-a"
                          src={
                            art.scores?.[0].badge ||
                            `https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${art.scores?.[0].characterName}.png`
                          }
                        />
                      </div>

                      {characterValue.length ? (
                        <Row className="bottom-character">
                          {art.scores
                            ?.filter(({ characterName }) =>
                              characterValue.includes(characterName)
                            )
                            .map(({ characterName, badge, score }) => {
                              return (
                                <Col
                                  key={art.id + "selected" + characterName}
                                  style={{ textAlign: "center" }}
                                >
                                  <Avatar
                                    className="bottom-character-a"
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
                      ) : (
                        <div className="character-badge-txt">
                          {art.scores?.[0].score}分
                        </div>
                      )}
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
