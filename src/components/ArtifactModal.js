import React, { useRef, useEffect, useState } from "react";
import {
  Col,
  Row,
  Avatar,
  Modal,
  Rate,
  Button,
  Popover,
  Space,
} from "antd";
import { ExclamationCircleOutlined, ZhihuCircleFilled } from "@ant-design/icons";
import {
  positionToLocale,
  artifactTags,
  getScore,
  artifactEff,
} from "../utils";
// import artifact from "../gen_artifact";
import artifactIcons from "../gen_artifact";
// import mona from "./mona.json";
import ZhCn from "../zh-cn.json";
import { uniqBy } from "lodash";

// console.log({ mona });

// console.log(Object.entries(mona));
const allArts = window.allArts ?? []; //解析出json对象

const Fixed = (artifact, v) => {
  // console.log(artifact);
  if (artifact?.percentage) {
    return (v * 100).toFixed?.(1) + "%";
  }
  return v;
};


function ArtifactModal({ art, setArt, changeRatingList = () => { } }) {
  const [isModalOpen, setIsModalOpenA] = useState(false);
  const [ModalData, setModalData] = useState({});
  function setIsModalOpen(v) {
    if (v) {
      setIsModalOpenA(v)
    } else {
      setIsModalOpenA(v);
      setArt(null)
    }
  }
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
        // console.log(v, i);
        if (i > index) {
          for (const av of artifactEff[5][name]) {
            // console.log(v, av);
            arr.push({
              v: v + av,
              i: i + 1,
            });
            if (name === "lifePercentage") {
              // console.log(`强化第${i + index + 1}次，是${(v + av) * 100}`);
            }
          }
        }
      }
      list = uniqBy(arr, "v");
      // console.log(props.tag);
    }
    // console.log(list);
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

  useEffect(() => {
    console.log('useEffect\n');
    console.log(art);
    if (art) {
      setModalData(JSON.parse(JSON.stringify(art)));
      setIsModalOpen(true);
    }
  }, [art]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    const { confirm } = Modal;
    const art = allArts.find(({ id }) => id === ModalData.id);
    if (art && ModalData.level !== art.level) {
      // console.log("关闭详情弹窗", ModalData);
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <>圣遗物已经强化，是否要更新数据！</>,
        onOk() {
          // console.log("OK");
          Object.assign(art, ModalData);
          changeRatingList();
          localStorage.setItem("allArts", JSON.stringify(allArts));
          setIsModalOpen(false);
        },
        onCancel() {
          // console.log("Cancel");
          setIsModalOpen(false);
        },
      });
    } else {
      setIsModalOpen(false);
    }
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
        <p>{ModalData.setNamePositionText ?? ZhCn[artifactIcons[ModalData.setName]?.[ModalData.position]?.text]}</p>
        <p>{ModalData.positionLocale ?? positionToLocale(ModalData.position)}</p>
        <p>{ModalData.mainTagName ?? artifactTags[ModalData.mainTag?.name]?.chs}</p>
        <p>
          {Fixed(
            ModalData.mainTagPercentage ? { percentage: true } : artifactTags[ModalData.mainTag?.name],
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
          const { name, chs, percentage, value } = tag;
          return (
            <div key={ModalData.id + name}>
              {(chs ?? artifactTags[name]?.chs) + " +"}
              {Fixed(percentage ? { percentage } : artifactTags[name], value)}
            </div>
          );
        })}
        <p>{ModalData.setNameText ?? ZhCn[artifactIcons[ModalData.setName]?.nameLocale]}</p>
        <p>2件套：{ZhCn[artifactIcons[ModalData.setName]?.effect2]}</p>
        <p>4件套：{ZhCn[artifactIcons[ModalData.setName]?.effect4]}</p>
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

    </div>
  );
}

export default ArtifactModal;
