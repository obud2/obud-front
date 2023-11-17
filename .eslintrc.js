module.exports = {
  root: true,
  env: {
    // 전역 변수 사용을 정의합니다. 추가하지 않으면 ESLint 규칙에 걸리게 됩니다.
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'next',
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // 해당 플러그인의 권장 규칙을 사용합니다.
  ],
  parser: '@typescript-eslint/parser', // ESLint 파서를 지정합니다.
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // JSX를 파싱할 수 있습니다.
    },
    ecmaVersion: 12, // Modern ECMAScript를 파싱할 수 있습니다.
    sourceType: 'module', // import, export를 사용할 수 있습니다.
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'functional'],

  rules: {
    'linebreak-style': 0, // window / mac 라인 스타일 제어

    'jsx-a11y/anchor-is-valid': 'off',
    'react-hooks/exhaustive-deps': 'off',

    'no-unexpected-multiline': 'error',
    'jsx-a11y/media-has-caption': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    'react/no-children-prop': 'off',

    // General
    'no-var': 'error', // var 금지
    'no-multiple-empty-lines': 'error', // 여러 줄 공백 금지
    'no-console': 'warn',
    'dot-notation': 'error', // 가능하다면 dot notation 사용

    'no-unused-vars': 'off', // 사용하지 않는 변수 금지
    '@typescript-eslint/no-unused-vars': ['error'], // 사용하지 않는 변수 금지

    'unused-imports/no-unused-imports': 'error', // 사용안하는 imports 체크
    'operator-linebreak': 'off', // 'a' + 'b' 사용 금지
    'import/extensions': 'off', // 확장자 붙이기
    'implicit-arrow-linebreak': 'off', // arrow function 라인 브레이크
    'import/prefer-default-export': 'off', // export 단일 인 경우 export default 사용 권장
    'no-shadow': 'off', // 외부에서 변수 선언 시 내부에서 변수 선언 금지

    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', 'tsx'] }],
    'react/self-closing-comp': 'off', // 빈요소  /> 으로 닫기
    'max-len': 'off', // 줄 체크
    'no-use-before-define': 'off',
    'arrow-body-style': 'off', // 에로우 펑션 중괄호 금지
    'react/function-component-definition': 'off', // 함수형 컴포넌트 선언
    'react/no-unused-prop-types': 'off', // 사용하지 않는 prop-types 금지
    indent: 'off',
    'object-curly-newline': 'off',
    'jsx-a11y/label-has-associated-control': 'off', // 라벨 태그 컨트롤 강제
    'jsx-a11y/click-events-have-key-events': 'off', // onClick를 onKeyUp, onKeyDown, onKeyPress 없이 사용했을 때
    'jsx-a11y/no-noninteractive-element-interactions': 'off', // <button>가 사용되면 포커스가 있을 때 Enter 키 누름에도 응답
    'jsx-a11y/no-noninteractive-tabindex': 'off', // 요소들에 tabIndex=0 추가
    'react/button-has-type': 'off', //  리액트 버튼 타입 지정
    'jsx-a11y/control-has-associated-label': 'off', // label controll 강제 사용
    'jsx-a11y/no-static-element-interactions': 'off', // div태그나 span태그는 태그 자체로써의 의미가 없다. 이러한 경우 role 속성을 추가함으로써, 의미를 부여할 수 있는데. 이를 강제하는 규약
    'no-plusplus': 'off', // 단항 연산자 ++ 및 -- 를 for 루프 의 사후 (최종 표현식)에 허용
    'default-case': 'off', // swich문 default-case 강제
    'no-else-return': 'off', // else 문에 return 제약
    'no-restricted-globals': 'off',
    'consistent-return': 'off', // 항상 return이 있는 function 인지 체크
    'prefer-destructuring': 'off',
    'react/no-danger': 'off',

    'react/jsx-props-no-spreading': 'off', // JSX 속성에 대한 확산이 없도록 강제
    'react/jsx-one-expression-per-line': 'off',
    'react/require-default-props': 'off',

    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/named': 'off',
    'no-param-reassign': 'off',

    'import/no-extraous-dependencies': 'off',
    'import/no-extraneous-dependencies': 'off',

    'prefer-promise-reject-errors': 'off',

    'import/no-unresolved': 'off',
    'import/no-relative-packages': 'off',
    'import/no-self-import': 'off',
    'import/no-duplicates': 'off',

    'import/order': 'off',

    'react/display-name': 'off',
    'no-await-in-loop': 'off',
    'no-restricted-syntax': 'off',
    'react/no-array-index-key': 'off',

    // React
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-fragments': 'off',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-uses-react': 'off',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'valid-typeof': 'off',
    'no-case-declarations': 'off',
  },
  settings: {
    react: {
      version: 'detect', // 현재 사용하고 있는 react 버전을 eslint-plugin-react가 자동으로 감지합니다.
    },
  },
};
