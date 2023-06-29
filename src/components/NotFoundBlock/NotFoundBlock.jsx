import React from "react";
import stylesNotFound from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={stylesNotFound.root}>
      {" "}
      <span>&#128529;</span>
      <h1 id={stylesNotFound.blink5}>Ничего не найдено! </h1>
      <p className={stylesNotFound.discription}>
        К сожалению данная страница отсутствует в нашем интернет-магазине!
      </p>
    </div>
  );
}

export default NotFoundBlock;
