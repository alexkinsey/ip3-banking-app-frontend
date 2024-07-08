import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';

const InputErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;

  &.scrollable:not(.scrolled-left)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    pointer-events: none;
  }

  &.scrollable:not(.scrolled-right)::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
    pointer-events: none;
  }
`;

const StyledInput = styled.input`
  font-weight: ${({ $weight, theme }) =>
    theme.fonts.weights[$weight] || 'normal'};
  color: ${({ $color, theme }) => theme.colors['text' + $color] || 'black'};
  line-height: 1.5;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  min-width: 50px;
  text-align: right;
  cursor: ${({ readOnly }) => (readOnly ? 'default' : 'text')};
  user-select: ${({ readOnly }) => (readOnly ? 'none' : 'auto')};
  white-space: nowrap;
  overflow: hidden;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 14px;
  margin: 0 8px;
`;

export const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  readOnly = false,
  ...props
}) => {
  const inputRef = useRef();

  useEffect(() => {
    const inputEl = inputRef.current;
    const wrapperEl = inputEl.parentElement;

    const updateScrollableState = () => {
      if (inputEl.scrollWidth > inputEl.clientWidth) {
        wrapperEl.classList.add('scrollable');
      } else {
        wrapperEl.classList.remove('scrollable');
      }

      if (inputEl.scrollLeft === 0) {
        wrapperEl.classList.add('scrolled-left');
      } else {
        wrapperEl.classList.remove('scrolled-left');
      }

      if (inputEl.scrollLeft >= inputEl.scrollWidth - inputEl.clientWidth - 1) {
        wrapperEl.classList.add('scrolled-right');
      } else {
        wrapperEl.classList.remove('scrolled-right');
      }
    };

    updateScrollableState();
    inputEl.addEventListener('scroll', updateScrollableState);
    window.addEventListener('resize', updateScrollableState);

    return () => {
      inputEl.removeEventListener('scroll', updateScrollableState);
      window.removeEventListener('resize', updateScrollableState);
    };
  }, [value]);

  return (
    <InputErrorContainer>
      {error && <ErrorText>{error}</ErrorText>}
      <Card row>
        <div style={{ flexGrow: 1 }}>
          <Text fullWidth>{label}</Text>
        </div>
        <div style={{ flexGrow: 2 }}>
          <InputWrapper>
            <StyledInput
              ref={inputRef}
              name={name}
              value={value}
              onChange={onChange}
              readOnly={readOnly}
              {...props}
            />
          </InputWrapper>
        </div>
      </Card>
    </InputErrorContainer>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  readOnly: PropTypes.bool,
};
