/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

export type Props = {
  className?: string;
  graphic?: React.ReactNode;
  header?: React.ReactNode;
  message?: React.ReactNode;
  style?: React.CSSProperties;
  title?: React.ReactNode;
};

export default function ErrorPage({ className, graphic, header, message, style, title }: Props) {
  return (
    <div className={cx(`${prefix}--bmrg-error-page`, className)} style={style}>
      {header && <header className={`${prefix}--bmrg-error-page__header`}>{header}</header>}
      {title && <h1 className={`${prefix}--bmrg-error-page__title`}>{title}</h1>}
      {message && <section className={`${prefix}--bmrg-error-page__message`}>{message}</section>}
      {graphic && <section className={`${prefix}--bmrg-error-page__graphic`}>{graphic}</section>}
    </div>
  );
}
