<div align="center">
  <img src="https://github.com/user-attachments/assets/fcbe381a-189e-4d70-ac82-722e12acfd9c" alt="Logo" width="100" >
  <h1>WingTerView</h1>
  <p>
    <a href="https://wingterview.netlify.app/">서비스 바로가기</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details align="right">
  <summary>Table of Contents</summary>
    <div><a href="#프로젝트-소개">프로젝트 소개</a></div>
    <div><a href="#주요-기능">주요 기능</a></div>
    <div><a href="#팀원-소개">팀원 소개</a></div>
    <div><a href="#기술-스택">기술 스택</a></div>
    <div><a href="#개발-일정">개발 일정</a></div>
    <div><a href="#아키텍처-구조">아키텍처 구조</a></div>
    <div><a href="#api-명세서">API 명세서</a></div>
</details>

# 📖 프로젝트 소개

### 프로젝트 이름

윙터뷰 (Wingterview), 면접에 날개를 달자! 🪽

### 프로젝트 기간

2025.03.31 ~ 2025.08.01

### 프로젝트 설명

카부캠 교육생들을 위한 1:1 모의면접 자동 매칭 서비스.<br/>
희망직무와 기술스택이 비슷한 사람끼리 랜덤 매칭이 이루어지고 면접관과 면접자 역할을 번갈아가며 모의면접을할 수 있게 도와주는 서비스입니다. 면접이 진행되는 동안 AI 기술을 활용하여 실제 기술 면접과 유사한 질문을 자동 생성하고 면접자의 답변에 따른 꼬리질문도 제공됩니다. 면접이 끝난 후에는 진행했던 면접과 관련된 복습 퀴즈를 풀어볼 수 있습니다.

> ### 윙터뷰🪽는 이런 사람들에게 필요해요!<br/>
>
> ✔️ 카카오테크 부트캠프에 참여중인 누구나<br/>
> ✔️ 모의면접 중에 받았던 질문이나 피드백을 다시 복기해보고 싶은 사람<br/>
> ✔️ 모의면접 중에 면접관으로써 할 질문(혹은 꼬리질문)이 잘 떠오르지 않는 사람<br/>
> ✔️ 답변한 내용에 대해 좀 더 구체적인 피드백을 받아보고 싶은 사람<br/>
> ✔️ 면접 질문과 관련된 퀴즈를 풀며 복습하고 싶은 사람

### 프로젝트 주요 기능

- 카카오 로그인 (최초 가입 시, 온보딩 페이지에서 추가 정보 입력)
- 실시간 1:1 모의 면접 매칭 : 매칭 신청자에 한하여 1:1 매칭 실시간으로 랜덤 진행
- AI 기반 맞춤형 면접 질문 제공 : 직무/스택 기반으로 맞춤형 면접질문 생성
- 꼬리질문 생성 prompt : 면접관이 면접자의 답변을 참고해서 꼬리질문 prompt를 작성하여 꼬리질문 생성
- 면접관 및 AI 음성분석 피드백 제공 : 면접 종료 후, 면접관이 작성한 피드백 혹은 AI 음성 분석 피드백 전송
- AI 기반 복습 퀴즈 제공 : 과거에 진행했던 면접 질문/피드백을 분석하여 데일리 복습 퀴즈 10개 생성

<br>

## 👥 팀원 소개

<table>
<thead>
  <tr>
    <th align="center">🩷팀장🩷 AI</th>
    <th align="center">AI</th>
    <th align="center">AI</th>
    <th align="center">FRONTEND</th>
    <th align="center">BACKEND</th>
    <th align="center">CLOUD</th>
    <th align="center">CLOUD</th>
  </tr>
</thead>
  <tr>
    <th align="center"><a href="https://github.com/sde00">eunice.song</a></th>
    <th align="center"><a href="https://github.com/tykong08">tommy.kong</a></th>
    <th align="center"><a href="https://github.com/chan-980730">david.lee</a></th>
    <th align="center"><a href="https://github.com/devjoylee">joy.lee</a></th>
    <th align="center"><a href="https://github.com/imleokkkk">leo.kim</a></th>
    <th align="center"><a href="https://github.com/year99">ken.kim</a></th>
    <th align="center"><a href="https://github.com/kim-jihoo">jihoo.kim</a></th>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/sde00">
        <img src="https://avatars.githubusercontent.com/sde00" width="100px;" heightalt="" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/tykong08">
        <img src="https://avatars.githubusercontent.com/tykong08" width="100px;" alt="" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/chan-980730">
        <img src="https://avatars.githubusercontent.com/chan-980730" width="100px;" alt="" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/devjoylee">
        <img src="https://avatars.githubusercontent.com/devjoylee" width="100px;" alt="" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/imleokkkk">
        <img src="https://avatars.githubusercontent.com/imleokkkk" width="100px;" alt="" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/year99">
        <img src="https://avatars.githubusercontent.com/year99" width="100px;" alt="" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kim-jihoo">
        <img src="https://avatars.githubusercontent.com/kim-jihoo" width="100px;" alt="" />
      </a>
    </td>
  </tr>
</table>

<br>

## 🛠 기술 스택

### 프론트엔드

| 기술 영역     | 선택한 기술                                   | 선택 이유 및 장점                                                                                             |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| FE 프레임워크 | `React`(v19) + `Typescript`(v.5) + `Vite`(v6) | - 동적 상호작용이 많은 CSR 위주 서비스에 최적화 <br/> - React 동시성기능 + Vite의 빠른 빌드 = 사용자경험 향상 |
| 상태 관리     | `Zustand` (v5.0.3)                            | - Context API 대비 불필요한 리렌더링 감소로 성능 향상 <br/> - Redux보다 낮은 학습 곡선 + 간결한 API           |
| 스타일링      | `CSS Modules` + `SCSS`                        | - 스타일링 커스텀의 자유도가 높음. 스타일 컴포넌트화 <br/> - Sass의 변수, 믹스인, 중첩 규칙 등 활용 가능      |
| 폼 관리       | `React Hook Form` (v.7.50.0)                  | - 불필요한 리렌더링 최소화로 성능 최적화 <br/> - 폼 유효성 검증 & 상태 관리 편리함                            |
| Data Fetching | `Tanstack Query` (v.5.36.0)                   | - 서버 상태 관리 및 자동 캐싱 기능 <br/> - 데이터 상태(로딩, 에러, 성공) 관리 간소화                          |
