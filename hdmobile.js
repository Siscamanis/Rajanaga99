(function () {
  const css = `
    @media (max-width:991px){
      .c-ptpKx{
        background:url("http://plcl.me/images/3YFtU.jpg") center/cover no-repeat!important;
      }
      .c-ptpKx img[alt="header-bg"]{
        display:none!important;
      }
    }
  `;

  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);
})();
