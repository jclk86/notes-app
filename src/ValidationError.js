import React, { Component } from "react";

export default function ValidationError(props) {
  if (props.message) {
    return (
      <div className="error" aria-invalid="true">
        {props.message}
      </div>
    );
  }
  return <div />;
}
