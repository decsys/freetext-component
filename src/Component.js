import React, { useState, useEffect } from "react";
import * as props from "./Component.props";
import styled from "styled-components";
import { InfoCircle } from "styled-icons/fa-solid/InfoCircle";
import {
  Box,
  Typography,
  Textarea,
  colorYik,
  colorVariant
} from "@smooth-ui/core-sc";
import stats from "./Component.stats";

// Build a React component for our FreeText question type
const Component = ({ maxLength, text, logResults, setNextEnabled }) => {
  const threshold = maxLength / 10; // right now we fix this at 10% MaxLength

  const [badgeVariant, setBadgeVariant] = useState("info");
  const [value, setValue] = useState(text);
  useEffect(() => {
    setValue(text);
    setNextEnabled(true);
  }, [text]);

  const handleInput = ({ target }) => {
    setValue(target.value);
    const count = maxLength - target.value.length;
    if (count === 0) {
      setBadgeVariant("danger");
    } else if (count <= threshold) {
      setBadgeVariant("warning");
    } else {
      setBadgeVariant("info");
    }
  };

  const handleBlur = e => {
    e.persist();
    logResults({ text: e.target.value });
  };

  // TODO: take this re-usably from the Survey Platform's UI, one day...
  const Badge = styled(Typography).attrs(
    ({ backgroundColor = "info", ...p }) => ({
      display: "inline",
      px: 1,
      borderRadius: 8,
      textAlign: "center",
      backgroundColor: backgroundColor,
      color: colorYik(colorVariant(backgroundColor)(p))(p)
    })
  )``;

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" p=".1em">
        <Badge p=".2em" backgroundColor={badgeVariant}>
          <InfoCircle size="1em" /> Characters remaining:{" "}
          {maxLength - value.length}/{maxLength}
        </Badge>
      </Box>
      <Textarea
        value={value}
        maxLength={maxLength}
        name="FreeText"
        onChange={handleInput}
        onBlur={handleBlur}
      />
    </Box>
  );
};

Component.params = props.params;
Component.propTypes = props.propTypes;
Component.defaultProps = props.defaultProps;
Component.stats = stats;

export default Component;
