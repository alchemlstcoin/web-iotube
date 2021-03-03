import React, { useEffect, MouseEventHandler } from "react";
import "./index.scss";
import { useStore } from "../../../../../common/store";
import { useObserver, useLocalStore } from "mobx-react";
import { useSwipeable } from "react-swipeable";
import { DownOutlined } from "@ant-design/icons/lib";

const IMG_ETH = require("../../../../static/images/logo-ethereum.png");
const IMG_IOTEX = require("../../../../static/images/logo-iotex.png");
const IMG_SWITCH = require("../../../../static/images/icon-arrow.png");
const IMG_HECO = require("../../../../static/images/logo-heco.png");
const IMG_BSC = require("../../../../static/images/logo-bsc.png");

interface IComponentProps {
  onSwitch: Function;
  isERCXRC: boolean;
}

export const SwitchHeader = (props: IComponentProps) => {
  const { lang } = useStore();
  const { onSwitch } = props;
  const store = useLocalStore(() => ({
    isERCXRC: props.isERCXRC,
    toggleERCXRC() {
      this.isERCXRC = !this.isERCXRC;
      setTimeout(() => {
        onSwitch();
      }, 400);
    },
  }));
  const ethHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (!store.isERCXRC) {
        store.toggleERCXRC();
      }
    },
    delta: 30,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const iotxHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (store.isERCXRC) {
        store.toggleERCXRC();
      }
    },
    delta: 30,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return useObserver(() => (
    <div style={{ position: "relative", zIndex: 100 }}>
      <div className={`page__home__component__switch_header ${store.isERCXRC ? "bg-secondary" : "bg-primary"}`}>
        <div
          {...ethHandlers}
          className={`page__home__component__switch_header__item page__home__component__switch_header__item--ethereum ${
            store.isERCXRC ? "page__home__component__switch_header__item--active" : "page__home__component__switch_header__item--inactive"
          } flex-1 flex flex-col justify-center items-center bg-primary c-white py-8 `}
        >
          <div className="flex items-center select-none flex-col">
            <img
              src={IMG_ETH}
              className={`h-20 ${!store.isERCXRC ? "cursor-pointer" : ""}`}
              onClick={() => {
                if (!store.isERCXRC) store.toggleERCXRC();
              }}
            />
            <div className="text-xl font-light -mt-2 flex items-center select-none flex-column cursor-pointer">
              <div className="w-10" />
              <div>{lang.t("token.ethereum")}</div>
              <div>
                <DownOutlined className="ml-4 float-right c-gray" />
              </div>
            </div>
          </div>
        </div>
        <img src={IMG_SWITCH} className="page__home__component__switch_header__switch cursor-pointer" onClick={store.toggleERCXRC} />
        <div
          {...iotxHandlers}
          className={`page__home__component__switch_header__item page__home__component__switch_header__item--iotex ${
            !store.isERCXRC ? "page__home__component__switch_header__item--active" : "page__home__component__switch_header__item--inactive"
          } flex-1 flex flex-col justify-center items-center bg-secondary c-white py-8`}
        >
          <div className="flex items-center flex-col select-none">
            <img
              src={IMG_IOTEX}
              className={`h-20 ${store.isERCXRC ? "cursor-pointer" : ""}`}
              onClick={() => {
                if (store.isERCXRC) store.toggleERCXRC();
              }}
            />
            <div className="text-xl font-light -mt-2">{lang.t("token.iotex")}</div>
          </div>
        </div>
      </div>
      <div className="erc20__dropdown">
        <div className="flex flex-column items-center text-center">
          <img src={IMG_ETH} />
          <div className="text-xl font-light text-center">Ethereum</div>
        </div>
        <div className="flex flex-column items-center text-center">
          <img src={IMG_HECO} />
          <div className="text-xl font-light text-center">Heco</div>
        </div>
        <div className="flex flex-column items-center text-center">
          <img src={IMG_BSC} />
          <div className="text-xl font-light text-center">BSC</div>
        </div>
      </div>
    </div>
  ));
};
