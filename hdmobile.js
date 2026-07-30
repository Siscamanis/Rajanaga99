(function () {
  const css = `
    @media (max-width:991px){
      .c-ptpKx{
        background:url("https://plcl.me/images/qQwnv.jpg") center/cover no-repeat!important;
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
