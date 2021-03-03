import React, { useEffect, MouseEventHandler } from "react";
import "./index.scss";
import { useStore } from "../../../../../common/store";
import { useObserver, useLocalStore } from "mobx-react";
import { useSwipeable } from "react-swipeable";
import { DownOutlined } from "@ant-design/icons/lib";

const IMG_ETH = require("../../../../static/images/logo-ethereum.png");
const IMG_IOTEX = require("../../../../static/images/logo-iotex.png");
const IMG_SWITCH = require("../../../../static/images/icon-arrow.png");

interface IComponentProps {
  onSwitch: Function;
  isERCXRC: boolean;
  toggleERC20List: Function;
  isShowERC20List: boolean;
}

export const SwitchHeader = (props: IComponentProps) => {
  const { lang } = useStore();
  const { onSwitch, toggleERC20List } = props;
  const store = useLocalStore(() => ({
    isERCXRC: props.isERCXRC,
    isShowERC20List: props.isShowERC20List,
    toggleERCXRC() {
      this.isShowERC20List = false;
      toggleERC20List(false);
      this.isERCXRC = !this.isERCXRC;
      setTimeout(() => {
        onSwitch();
      }, 400);
    },
    toggleERC20List() {
      this.isShowERC20List = !this.isShowERC20List;
      toggleERC20List(this.isShowERC20List);
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
    <div className={`page__home__component__switch_header ${store.isERCXRC ? "bg-secondary" : "bg-primary"}`}>
      <div
        {...ethHandlers}
        className={`page__home__component__switch_header__item page__home__component__switch_header__item--ethereum ${
          store.isERCXRC ? "page__home__component__switch_header__item--active" : "page__home__component__switch_header__item--inactive"
        } flex-1 flex flex-col justify-center items-center bg-primary c-white py-8 `}
      >
        <div
          className="flex items-center select-none flex-col"
          onClick={() => {
            if (store.isERCXRC) store.toggleERC20List();
          }}
        >
          <img
            src={IMG_ETH}
            className="h-20 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (!store.isERCXRC) store.toggleERCXRC();
            }}
          />
          <div className={`text-xl font-light -mt-2 flex items-center select-none flex-column ${store.isERCXRC ? "cursor-pointer" : ""}`}>
            <div className="w-10" />
            <div>{lang.t("token.ethereum")}</div>
            <div className="w-10">{store.isERCXRC && <DownOutlined className="ml-4 float-right c-gray" />}</div>
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
  ));
};
