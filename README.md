<h1 align="center">membership-login poroject </h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/aereeeee/membership-login#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/aereeeee/membership-login/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
</p>

> es6와 node.js express로 로그인 회원가입 프론트/백엔드 구현하기

> 백엔드:

```
.
├── apidoc                    # api document 페이지
├── public                    # 프론트엔드 정적 파일
├── test                      # 테스트코드
├── routes
|   └── users.js              # 유저 관련 api
├── models
|   └── users.js              # 유저 데이터 모델
├── views                     # 템플릿 뷰 (에러 페이지)
└── app.js
```

> 프론트엔드:

```
public
├── css                       # 컴포넌트 별 style sheet
├── images                    # 이미지 파일
├── src
|   ├── pages                 #회원가입, 로그인, 메인페이지 컴포넌트
|   ├── utils                 #유효성 체크, urlParser 등 유틸리티
|   └── components            #헤더, 푸터, 모달 등 컴포넌트
├── index.html
└── index.js                  #해시를 이용한 SPA 라우팅
```

### 🏠 [Homepage: https://aeree.herokuapp.com](https://aeree.herokuapp.com)

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

## Run tests

```sh
npm test
```

## Technologies

| **Tech**                                                                       | **Description**                                                                                                                                                  |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Node.js](https://nodejs.org/ko/)                                              | Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine                                                                                          |
| [Express](https://expressjs.com/)                                              | Fast, unopinionated, minimalist web framework for Node.js                                                                                                        |
| [nodemon](https://www.npmjs.com/package/nodemon)                               | nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected |
| [lowdb](https://github.com/typicode/lowdb)                                     | lowdb is a small local JSON database powered by Lodash (supports Node, Electron and the browser)                                                                 |
| [Bootstrap](https://getbootstrap.com/)                                         | Build responsive, mobile-first projects on the web with the world’s most popular front-end component library.                                                    |
| [ESLint](https://eslint.org/)                                                  | The pluggable linting utility for JavaScript and JSX                                                                                                             |
| [Husky](https://github.com/typicode/husky)                                     | Prevent bad git commit, git push and more 🐶 woof!                                                                                                               |
| [Commitlint](https://commitlint.js.org)                                        | Lint commit messages                                                                                                                                             |
| [apidoc](https://http://apidocjs.com)                                          | creates a documentation from API annotations in your source code.                                                                                                |
| [Standard Version](https://github.com/conventional-changelog/standard-version) | Automate versioning and CHANGELOG generation                                                                                                                     |

## Author

**aeree cho**

- Github: [@aereeeee](https://github.com/aereeeee)

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/aereeeee/membership-login/issues).

## Show your support

Give a ⭐️ if this project helped you!

---
