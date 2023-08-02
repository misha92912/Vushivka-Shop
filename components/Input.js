import { radius } from "@/lib/vars";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: ${radius};
  box-sizing:border-box;
`;

export default function Input(props) {
  return <StyledInput {...props} />
}