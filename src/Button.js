import styled, { css } from 'styled-components';

const Button = styled.button`
    color: red;

    ${props => props.primary && css`
        background: blue;
        color: white;
    `}
`;

export default Button;


