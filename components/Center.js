import styled from "styled-components"
import {width} from "@/lib/vars"

const StyledDiv = styled.div`
  max-width: ${width};
  margin: 0 auto;
  min-height: 100%;
` 
const Center = ({children}) => {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}

export default Center
