npm 또는 yarn 서치

yarn 설치
윈도우 환경
(npm은 Node.js를 설치하면 가능)

```
# cmd
npm install -g yarn

# 설치 잘 되었는지 확인
yarn --version

# yarn 기준으로 설명할 것

# project directory 만들기
mkdir vuepress-starter
cd vuepress-starter

# package.json 생성
yarn init -y

# vuepress를 devDependency로 추가
yarn add -D vuepress
```

초기 package.json 파일 내용

```json
{
  "name": "vuepress-starter",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "vuepress": "^1.8.1"
  }
}
```

package.json 파일 수정

```json
// package.json 파일 수정
{
  "name": "TIL",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/pul8219/TIL", // 생략 가능
  "author": "Wol-dan", // 생략 가능
  "scripts": {
    "docs:dev": "vuepress dev --port 8000",
    "docs:build": "vuepress build"
  },
  "license": "MIT",
  "devDependencies": {
    "vuepress": "^1.8.1"
  }
}
```

// "repository": "https://github.com/pul8219/TIL",
// "author": "Wol-dan",
