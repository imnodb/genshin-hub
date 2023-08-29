import localforage from "localforage";
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
const allArts = window.allArts ?? []; //解析出json对象

// console.log(artifactIcons);

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
    // console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = async function (e) {
      try {
        const mona = JSON.parse(fileReader.result);
        // console.log(mona);
        // console.log(Object.entries(mona));
        const allArts = [];
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
            art.id = uuidv4();
            art.icon = artifactIcons[art.setName]?.[art.position]?.url;
            art.scores = importScore(art);
            allArts.push(art);
            // break;
          }
          // break;
        }
        await localforage.setItem("allArts", allArts);
        // console.log("allArts----\n", allArts);
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
    // console.log("positionHandleChange", value);
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

  // console.log("RatingList", RatingList);
  return (
    <div className="App">
      <Upload accept=".json" beforeUpload={beforeUpload}>
        <FloatButton
          ref={ref1}
          icon={<FileAddOutlined />}
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
                    <div>
                      <Image
                        style={{
                          background:
                            art.star === 5
                              ? "rgb(211, 159, 81)"
                              : "rgb(177, 135, 195)",
                          backgroundColor:
                            !!art.save === !!art.locked
                              ? "rgb(211, 159, 81)"
                              : "rgba(0, 0, 0, 0)",
                        }}
                        className="art-img"
                        preview={false}
                        width={80}
                        src={art.icon ?? 'https://upload-bbs.mihoyo.com/404.png'}
                      />
                      <div className="character-badge">
                        <Badge color={art.level === 20 ? "#faad14" : "red"} count={art.level} >
                          <Avatar
                            className="character-badge-a"
                            src={
                              art.scores?.[0].badge ||
                              `https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${art.scores?.[0].characterName}.png`
                            }
                          />
                        </Badge>
                      </div>
                      {
                        art.locked ? <div className="lock-badge">
                          <svg t="1693133826248" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4010" width="15" height="15"><path d="M812.802392 435.43316 741.491253 435.43316 609.755929 435.43316l0-0.031722L292.729529 435.401438 292.729529 323.715753c0.417509-31.329543 11.437493-187.474812 186.987718-187.474812 175.556365 0 186.576349 156.14527 186.992835 186.987718l0 43.385113 74.779124-6.835685 0-36.549427c0 0-0.031722-261.771959-261.772982-261.771959-261.73512 0-261.765819 261.771959-261.765819 261.771959l0 112.204501L105.741811 435.43316l0 523.580756 747.958036 0L853.699848 435.43316 812.802392 435.43316zM517.112949 724.234729l0 122.568547-74.78424 0L442.328709 724.234729c-22.24463-12.95915-37.388539-36.832883-37.388539-64.419172 0-41.339524 33.508161-74.814939 74.7781-74.814939 41.276079 0 74.783217 33.475416 74.783217 74.814939C554.53935 687.401846 539.395442 711.275579 517.112949 724.234729z" fill="#d81e06" p-id="4011"></path><path d="M740.745263 434.996209 740.745263 322.921667c0 0-0.030699-261.464967-261.464967-261.464967-261.429151 0-261.45985 261.464967-261.45985 261.464967l0 112.073518L105.741811 434.995185l0 522.966773 747.082086 0L852.823897 434.996209 740.745263 434.996209 740.745263 434.996209zM516.630972 723.460086l0 122.425284-74.696236 0L441.934736 723.460086c-22.219047-12.944823-37.34556-36.790928-37.34556-64.34447 0-41.291428 33.469276-74.727958 74.691119-74.727958 41.22696 0 74.696236 33.437553 74.696236 74.727958C554.013371 686.669158 538.886859 710.514239 516.630972 723.460086M666.055167 434.963463 292.511565 434.963463 292.511565 323.408761c0.417509-31.292704 11.42419-187.255825 186.769754-187.255825 175.349657 0 186.356338 155.963121 186.774871 186.768731L666.05619 434.963463 666.055167 434.963463zM666.055167 434.963463" p-id="4012" fill="#d81e06"></path></svg>
                        </div> : <></>
                      }

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
                    </div>
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
