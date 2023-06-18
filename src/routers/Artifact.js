import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Image,
  Avatar,
  Divider,
  Badge,
  Select,
  Tag,
  Upload,
  FloatButton,
  Tour,
  Cascader,
} from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import {
  mainStatMap,
  positionToLocale,
  artifactTags,
  importScore,
} from "../utils";
import artifactIcons from "../gen_artifact";
import genCharacter from "../gen_character";
// import mona from "./mona.json";
import ZhCn from "../zh-cn.json";
import ArtifactModal from "../components/ArtifactModal";

// console.log({ mona });

// console.log(Object.entries(mona));
const val = localStorage.getItem("allArts"); //获取存储的元素
const allArts = val ? JSON.parse(val) : []; //解析出json对象

console.log(artifactIcons);

const options = Object.entries(artifactIcons).map(([name, { nameLocale }]) => ({
  label: ZhCn[nameLocale],
  value: name,
}));
const positionOptions = Object.keys(mainStatMap).map((name) => ({
  label: positionToLocale(name),
  value: name,
  children: mainStatMap[name].map((n) => ({
    label: artifactTags[n].chs,
    value: n,
  })),
}));
const characterOptions = Object.keys(genCharacter).map((name) => ({
  label: ZhCn[genCharacter[name]?.nameLocale],
  value: ZhCn[genCharacter[name]?.nameLocale],
}));



function Artifact() {
  const ref1 = useRef(null);
  const [open, setOpen] = useState(!localStorage.getItem("steps"));
  const [selectedValue, setSelectedValue] = useState([]);
  const [positionValue, setPositionValue] = useState([]);
  const [characterValue, setCharacterValue] = useState([]);
  const [RatingList, setRatingList] = useState([]);

  const steps = [
    {
      title: "Upload File",
      description: "点击右下角按钮上传圣遗物数据！",
      target: () => ref1.current,
    },
  ];
  const onCloseSteps = () => {
    setOpen(false);
    localStorage.setItem("steps", "1");
  };
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
            art.scores = importScore(art);
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

  const [modalArt, setModalArt] = useState(null);

  const showModal = (art) => {
    setModalArt(art)
  };

  const handleChange = (value) => {
    setSelectedValue(value);
    changeRatingList({ setV: value });
  };
  const positionHandleChange = (value) => {
    console.log("positionHandleChange", value);
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
        (pos.length &&
          !pos.find(
            ([p, t]) =>
              p === art.position && (t ? t === art.mainTag.name : true)
          )) ||
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
        : art.scores?.[0]?.score;
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
          ref={ref1}
          icon={<FileAddOutlined />}
          onClick={() => console.log("click")}
        />
      </Upload>
      <Tour open={open} onClose={onCloseSteps} steps={steps} />
      <ArtifactModal art={modalArt} setArt={setModalArt} changeRatingList={changeRatingList}></ArtifactModal>

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
      <Cascader
        style={{ width: "100%" }}
        allowClear
        placeholder="Please select"
        options={positionOptions}
        onChange={positionHandleChange}
        multiple
        expandTrigger="hover"
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

export default Artifact;
