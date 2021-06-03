import styled from 'styled-components';

const CartStyles = styled.div`
    padding: 20px;
    position: relative;
    background: white;
    position: fixed;
    display: ${(props) => props.open && `none`};
    height: auto;
    top: 0;
    right: 0;
    min-width: 300px;
    bottom: 0;
    transform: translateX(100%);
    -moz-transform: translateX(100%);
    -ms-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transition: all 0.3s;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
    z-index: 5;
    display: grid;
    overflow-x: scroll;
    grid-template-rows: auto 1fr auto;
    ${(props) =>
        props.open &&
        `transform: translateX(0); -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -webkit-transform: translateX(0);
`};
    transition: all 0.3s;
    header {
        border-bottom: 5px solid #333;
    }
    footer {
        border-top: 1px double #333;
        display: grid;
        grid-template-columns: auto auto;
        // align-items: center;
        font-size: 3rem;
        font-weight: 900;
        p {
            margin: 0;
        }
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: hidden;
        display: grid;
        grid-template-columns: 150px 150px 150px 150px;
        @media (max-width: 430px) {
            display: grid;
            grid-template-columns: 150px 150px;
        }
        @media (max-width: 860px) {
            display: grid;
            grid-template-columns: 150px 150px;
        }
    }
    @media (max-width: 430px) {
        padding: 10px;
        width: 90%;
    }
    li {
        display: flex;
        flex-direction: column;
        gap: 3px;
        margin: 9px;
        /* background-color: #eeeeee6b; */
        /* padding: 10px; */
        border-radius: 10px;
    }
    img {
        width: 87%;
        height: 87px;
        object-fit: cover;
    }
    button {
        background-color: #cb436b;
        border: none;
        padding: 10px;
        color: #fff;
    }
    /* h3 {
    text-align: center;
    color: #fff;
    /* background-color: #cb436b; */
    /* border: none;
  } */
    h4 {
        font-size: 19px;
        text-transform: uppercase;
        @media (max-width: 1041px) {
            font-size: 18.5px;
        }
    }
    h2 {
        text-align: center;
        font-size: 14px;
        text-transform: uppercase;
    }
`;

export default CartStyles;
