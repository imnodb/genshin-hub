import React, { useRef, useState } from "react";
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
  Button,
  Tour,
  Cascader,
  Popover,
  Space,
  message,
} from "antd";
import { FileAddOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  mainStatMap,
  positionToLocale,
  artifactTags,
  getScore,
  characters,
  artifactEff,
} from "./utils";
import artifactIcons from "./gen_artifact_icon";
import artifact from "./gen_artifact";
import genCharacter from "./gen_character";
// import mona from "./mona.json";
import "./App.css";
import { uniqBy } from "lodash";

// console.log({ mona });
console.log(artifact);

// console.log(Object.entries(mona));
const val = localStorage.getItem("allArts"); //获取存储的元素
const allArts = val ? JSON.parse(val) : []; //解析出json对象

console.log(artifactIcons);

const options = Object.entries(artifactIcons).map(([name, { art }]) => ({
  label: artifact[name]?.chs,
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
const characterOptions = Object.keys(characters).map((name) => ({
  label: genCharacter[name]?.chs,
  value: name,
}));

const Fixed = (artifact, v) => {
  // console.log(artifact);
  if (artifact?.percentage) {
    return (v * 100).toFixed?.(1) + "%";
  }
  return v;
};

function App() {
  const ref1 = useRef(null);
  const [open, setOpen] = useState(!localStorage.getItem("steps"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalData, setModalData] = useState({});
  const [selectedValue, setSelectedValue] = useState([]);
  const [positionValue, setPositionValue] = useState([]);
  const [characterValue, setCharacterValue] = useState([]);
  const [RatingList, setRatingList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

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
            art.scores = getScore(art);
            if (art.max_score !== art.scores?.[0]?.score) {
              console.log("圣遗物最大分数不一致\n", art);
              messageApi.open({
                type: "error",
                content: "圣遗物最大分数不一致",
              });
              return;
            }
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
  // 快捷强化按钮组
  function SplitRise(props) {
    const { ModalData, tag } = props;
    const { name, value } = props.tag;

    let list = [
      ...artifactEff[5][name].map((v) => ({
        v,
        i: 1,
      })),
    ];
    const count = Math.ceil((20 - props.level) / 4) - 1;
    for (let index = 0; index < count; index++) {
      const arr = [...list];
      for (const { v, i } of list) {
        console.log(v, i);
        if (i > index) {
          for (const av of artifactEff[5][name]) {
            console.log(v, av);
            arr.push({
              v: v + av,
              i: i + 1,
            });
            if (name === "lifePercentage") {
              console.log(`强化第${i + index + 1}次，是${(v + av) * 100}`);
            }
          }
        }
      }
      list = uniqBy(arr, "v");
      console.log(props.tag);
    }
    console.log(list);
    return list.map(({ v, i }) => (
      <Button
        key={"rise" + ModalData.id + name + v}
        onClick={() => {
          ModalData.level = ModalData.level + 4 * i;
          ModalData.level = ModalData.level > 20 ? 20 : ModalData.level;
          tag.value = value + v;
          ModalData.scores = getScore(ModalData);
          setModalData({
            ...ModalData,
          });
        }}
      >
        {Fixed(artifactTags[name], value + v)}
      </Button>
    ));
  }
  // 快捷强化按钮组
  function WillTags(props) {
    const { ModalData } = props;
    const { mainTag, normalTags } = ModalData;
    // console.log(ModalData);
    // 原本存在的属性
    const existingTags = [mainTag.name, ...normalTags.map(({ name }) => name)];
    const list = Object.keys(artifactEff[5]).filter(
      (t) => !existingTags.includes(t)
    );
    // console.log(existingTags);
    // console.log(list);
    return list.map((name) => (
      <div key={"WillTags" + ModalData.id + name}>
        {artifactTags[name]?.chs + "+"}
        {artifactEff[5][name].map((value) => (
          <Button
            key={"WillTags" + ModalData.id + name + value}
            onClick={() => {
              ModalData.level = ModalData.level + 4;
              normalTags.push({
                name,
                value,
              });
              ModalData.scores = getScore(ModalData);
              setModalData({
                ...ModalData,
              });
            }}
          >
            {Fixed(artifactTags[name], value)}
          </Button>
        ))}
      </div>
    ));
  }

  const showModal = (art) => {
    console.log(art);
    setModalData(JSON.parse(JSON.stringify(art)));
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    const { confirm } = Modal;
    const art = allArts.find(({ id }) => id === ModalData.id);
    if (ModalData.level !== art.level) {
      console.log("关闭详情弹窗", ModalData);
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <>圣遗物已经强化，是否要更新数据！</>,
        onOk() {
          console.log("OK");
          Object.assign(art, ModalData);
          changeRatingList();
          localStorage.setItem("allArts", JSON.stringify(allArts));
          setIsModalOpen(false);
        },
        onCancel() {
          console.log("Cancel");
          setIsModalOpen(false);
        },
      });
    } else {
      setIsModalOpen(false);
    }
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
      {contextHolder}
      <Upload accept=".json" beforeUpload={beforeUpload}>
        <FloatButton
          ref={ref1}
          icon={<FileAddOutlined />}
          onClick={() => console.log("click")}
        />
      </Upload>
      <Tour open={open} onClose={onCloseSteps} steps={steps} />
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
        <div>
          <Space wrap>
            <div>+{ModalData.level}</div>
            {ModalData.star === 5 && ModalData.level < 20 ? (
              <Popover
                content={
                  ModalData.normalTags.length < 4 ? (
                    <WillTags ModalData={ModalData} />
                  ) : (
                    ModalData.normalTags?.map((tag) => {
                      const { name, value } = tag;
                      return (
                        <div key={ModalData.id + name}>
                          {artifactTags[name]?.chs + "+"}
                          {Fixed(artifactTags[name], value)}
                          <SplitRise
                            ModalData={ModalData}
                            level={ModalData.level}
                            tag={tag}
                          />
                        </div>
                      );
                    })
                  )
                }
                title="强化"
                trigger="click"
              >
                <Button type="primary">强化</Button>
              </Popover>
            ) : (
              <></>
            )}
          </Space>
        </div>

        {ModalData.normalTags?.map((tag) => {
          const { name, value } = tag;
          return (
            <div key={ModalData.id + name}>
              {artifactTags[name]?.chs + "+"}
              {Fixed(artifactTags[name], value)}
            </div>
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

export default App;
