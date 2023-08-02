import { headerActionText, headerBackground, headerText, primary } from "@/lib/colors";
import { useRouter } from "next/router";
import styled from "styled-components";
import {useContext} from "react";
import { radius } from "@/lib/vars";
import { CartContext } from "./CartContext";

const Form = styled.form`
  display: flex;
  justify-content: center;
  gap: 0;
  padding: 0 0 1px 0;
  height: 2.5rem;
  background-color: ${headerBackground};
  border-bottom: 1px solid ${headerText};
  & input {
    width: 10rem;
    margin: 0;
    color: white;
    padding: 0px;
    background: none;
    border: none;
    font-size: 1.2rem;
    &:focus{
      outline: none;
    }
    @media screen and (max-width: 950px) {
      width: 7rem;
    }
  }
  & button {
    width: max-content;
    height: 100%;
    border: none;
    color: red;
    background: none;
    border-radius: ${radius};
    &:hover{
      background: ${headerActionText};
    }
  }
`

const Find = () => {
  const {query, setQuery} = useContext(CartContext);

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/products?query=${query}`);
  };
  return (
    <Form onSubmit={submitHandler}>
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        value={query}
        className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
        placeholder="пошук..."/>
      <button>
        <svg width="24" height="26" viewBox="0 0 24 26" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1 11.6529C1 5.91266 5.30926 1.25928 10.625 1.25928C15.9407 1.25928 20.25 5.91266 20.25 11.6529C20.25 17.3931 15.9407 22.0465 10.625 22.0465C5.30926 22.0465 1 17.3931 1 11.6529ZM10.625 2.48206C5.93464 2.48206 2.13235 6.58799 2.13235 11.6529C2.13235 16.7178 5.93464 20.8238 10.625 20.8238C15.3154 20.8238 19.1176 16.7178 19.1176 11.6529C19.1176 6.58799 15.3154 2.48206 10.625 2.48206Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M16.9177 18.4481C17.1412 18.2067 17.5037 18.2067 17.7272 18.4481L22.7073 23.826C22.9309 24.0674 22.9309 24.4588 22.7073 24.7002C22.4838 24.9416 22.1213 24.9416 21.8978 24.7002L16.9177 19.3223C16.6941 19.0809 16.6941 18.6895 16.9177 18.4481Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </Form>
  )
}

export default Find