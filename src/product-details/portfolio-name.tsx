import React, { useState } from "react";
import styled from "styled-components";
import { Pencil } from "../Pencil";

const List = styled.ol`
  list-style: none;

  & li + li {
    border-top: 1px solid var(--white-5, rgba(255, 255, 255, 0.05));
  }

  & li:first-child {
    border-top-left-radius: calc(var(--spacing) * 1);
    border-top-right-radius: calc(var(--spacing) * 1);
  }
  & li:last-child {
    border-bottom-left-radius: calc(var(--spacing) * 1);
    border-bottom-right-radius: calc(var(--spacing) * 1);
  }
`;

const ListItem = styled.li`
  display: flex;
  height: 57px;
  min-height: 57px;
  padding: 0 calc(var(--spacing) * 2);
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  background: var(--Greys-Positive-Jet, #191a1c);
`;

const RowContent = styled.form`
  display: flex;
  padding: 16px 0;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  font-size: var(--font-size-sm);
`;

const RowLabel = styled.label`
  color: var(--White-60, rgba(255, 255, 255, 0.6));
  font-style: normal;
  font-weight: var(--font-weight-normal);
  line-height: normal;
`;

const RowValue = styled.span`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: calc(var(--spacing) * 0.5);
  flex: 1 0 0;
  font-weight: var(--font-weight-semi-bold);
  color: var(--white);
  line-height: 20px;
  letter-spacing: 0.15px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  ${props => props.$hasError && `
    border: 1px solid red;
  `}
  
  :invalid {
    border: 1px solid red;
  }
`;


export const PortfolioName: React.FunctionComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [portfolioName, setPortfolioName] = useState("Broker Portfolio");
  const [hasError, setHasError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioName(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (portfolioName.length > 0) {
      setIsEditing(false);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  return (
    <>
      <List>
        <ListItem>
          <RowContent onSubmit={handleSubmit}>
            <RowLabel htmlFor='portfolioName'>Portfolio name</RowLabel>
            <RowValue>{isEditing
              ? <Input
                type="text"
                id="portfolioName"
                value={portfolioName}
                onChange={handleChange}
                onBlur={() => handleSubmit()}
                minLength={1}
                required
                $hasError={hasError}
              />
              : portfolioName}
            </RowValue>
            {!isEditing && <EditButton type="button" onClick={() => setIsEditing(true)}>
              <Pencil />
            </EditButton>}
          </RowContent>
        </ListItem>
      </List>
    </>
  );
};
