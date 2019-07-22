
export const commonCss = `

.icon {
    width:20px;
    text-align: center;
    padding-left: 5px;
    padding-right: 2px;
    border:none;
}

:host {
    border-width:1px;
    border-style: solid;
    padding: 1px 0;
    display: inline-block;
}

:host(.input-focus) {
    outline:none;
}

:host /deep/ input {
    border:none;
    outline: none;
    height: 100%;
    margin: 1px 0;
    box-sizing: border-box;
}

`;

