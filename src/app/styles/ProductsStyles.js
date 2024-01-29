import styled from 'styled-components'

export const ProductContainer = styled.div`
    padding: 16px;
    background-color: transparent;
    border-bottom: 1px solid #000;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex
`;

export const ProductImageProd = styled.img`
    width: 100%;
    max-width: 200px;
    height: auto;
`;

export const ProductImageCart = styled.img`
    width: 100%;
    max-width: 100px;
    height: auto;
`;

export const CardButton = styled.button`
  background-color: #D35400;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;


  &:hover{
   background-color: #DC7633;
   box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  }
`;