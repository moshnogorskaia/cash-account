import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Pencil } from "../Pencil";

const List = styled.ol`
  list-style: none;

  & li + li {
    border-top: 1px solid var(--black-5, rgba(0, 0, 0, 0.05));
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
  background: var(--light-gray);
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
  color: var(--black-60, rgba(0, 0, 0, 0.6));
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
  color: var(--black);
  line-height: 20px;
  letter-spacing: 0.15px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  background: var(--white);
  border: 1px solid var(--medium-gray);
  color: var(--black);
  padding: 4px 8px;
  border-radius: 4px;
  
  ${props => props.$hasError && `
    border: 1px solid red;
  `}
  
  :invalid {
    border: 1px solid red;
  }
  
  :focus {
    outline: none;
    border-color: var(--emerald);
    box-shadow: 0 0 0 2px rgba(61, 220, 151, 0.2);
  }
`;


export const PortfolioName: React.FunctionComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [portfolioName, setPortfolioName] = useState("Example Portfolio");
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <List>
        <ListItem>
          <RowContent onSubmit={handleSubmit}>
            <RowLabel htmlFor='portfolioName'>Portfolio name</RowLabel>
            <RowValue>{isEditing
              ? <Input
                ref={inputRef}
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
            {!isEditing && <EditButton type="button" onClick={handleEditClick}>
              <Pencil title="Edit Portfolio Name" />
            </EditButton>}
          </RowContent>
        </ListItem>
      </List>
    </>
  );
};
