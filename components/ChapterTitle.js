import { blockGap } from "@/lib/vars";
import styled, { css } from "styled-components";

const Title = css`
  font-size: 2rem;
  font-weight: normal;
  text-align: center;
  width: max-content;
  padding: 10px 10px 5px;
  margin: ${blockGap} auto 25px auto;
`

const ChapterTitle = styled.h2`
  ${Title}
`

export default ChapterTitle;