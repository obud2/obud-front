/**
 *
 * @param {*} header : 제목 )
 * @param {*} text : 내용 ) <b> HighLight </b>
 * @param {*} cancelButtonText : 취소버튼 영역
 * @param {*} confirmButtonText : 확인버튼 영역
 * @param {*} _select : 선택한 결과 콜백
 *
 *
 *     Ex)
 *     Alert('잘 둘러보고 계신가요?', '소도시라이프를 더욱 즐기고 싶으시다면 <br /> 로그인 해주세요!', '아니요', '예', (res) => {
 *
 *     });
 *
 *
 */
const alert = (header, text, cancelButtonText, confirmButtonText, _select) => {
  const select = _select;

  const alertCreate = (header, text, cancelButtonText, confirmButtonText) => {
    let button = '<button id="customBtnSelect"><p>확인</p></button>';

    if (cancelButtonText && confirmButtonText) {
      button = `
                <button id="customBtnSelect"><p>${confirmButtonText}</p></button>
                <button id="customBtnClose"><p>${cancelButtonText}</p></button>`;
    }

    const ele = document.querySelector('body');
    const alertEle = document.createElement('div');

    alertEle.className = 'alertBg show-alert';
    alertEle.id = 'alertBg';
    alertEle.innerHTML = `<div class="custom-alert">
                              <div class="alert-text">
                                  <p>${header}</p>
                                  <p>${text}</p>
                              </div>
                              <div class="alert-footer">
                                 ${button}
                              </div>
                          </div>`;
    ele.appendChild(alertEle);

    if (confirmButtonText && document.getElementById('customBtnClose')) {
      document.getElementById('customBtnClose').onclick = () => selectAlert(false);
    }

    document.getElementById('customBtnSelect').onclick = () => selectAlert(true);
  };

  const selectAlert = (_res) => {
    const child = document.getElementById('alertBg');

    if (select) select(_res);
    if (child) child.parentNode.removeChild(child);
  };

  if (!document.getElementById('alertBg')) {
    alertCreate(header, text, cancelButtonText, confirmButtonText);
  }
};

export default alert;
