import { API } from '@/api/endpoints'
import { DUMMY_HISTORY_DETAIL, DUMMY_HISTORY_LIST } from '@/constants/history'
import { http, HttpResponse } from 'msw'

export const handlers = [
  // 카카오 로그인
  http.post(API.LOGIN.KAKAO, () => {
    return HttpResponse.json(
      {
        message: 'authorization_code_send_done',
        data: {
          accessToken: 'qoerigj240t124t0ij24',
          isNewUser: true,
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }),

  // 회원 프로필 전송
  http.put(API.PROFILE.SUBMIT, async () => {
    return HttpResponse.json(
      {
        message: 'user_info_send_done',
        data: null,
      },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }),

  // 내 정보 조회
  http.get(API.PROFILE.ME, () => {
    return HttpResponse.json(
      {
        message: 'userinfo_fetch_done',
        data: {
          nickname: 'joy.lee',
          email: 'joylee.dev@gmail.com',
          name: '노데이터이주영',
          curriculum: '풀스택',
          seatCode: 'B-03-M',
          jobInterest: ['프론트엔드 개발자', '풀스택 개발자'],
          techStack: ['Javascript', 'React'],
          interviewCnt: 12,
          profileImageUrl: '',
        },
      },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }),

  // 자리 배치도 전체 조회
  http.get(API.SEAT.ALL, () => {
    return HttpResponse.json({
      message: 'seat_fetch_done',
      data: {
        seats: {
          a: [
            [false, false, false],
            [false, false, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
          ],
          b: [
            [true, true, true],
            [false, false, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
          ],
          c: [
            [true, true, true],
            [false, false, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
            [true, true, true],
          ],
        },
        mySeatPosition: {
          section: 'B',
          seat: [1, 1],
        },
      },
    })
  }),

  // 임시 자리 막기
  http.put(API.SEAT.EACH(':seatId'), () => {
    return HttpResponse.json({
      message: 'seat_block_done',
      data: null,
    })
  }),

  // 자리 점유 여부 확인
  http.get(API.SEAT.EACH(':seatId'), () => {
    return HttpResponse.json({
      message: 'seat_status_check_done',
      data: {
        isSelected: false,
      },
    })
  }),

  // 매칭 큐 진입
  http.post(API.MATCH.ENQUEUE, () => {
    return HttpResponse.json({
      message: 'enqueue_done',
      data: null,
    })
  }),

  // 매칭 신청자 수 조회
  http.get(API.MATCH.STAT, () => {
    return HttpResponse.json({
      message: 'applicant_count_fetch_done',
      data: {
        count: 32,
      },
    })
  }),

  // 매칭 결과 조회
  http.get(API.MATCH.RESULT, () => {
    const isMatched = true

    if (isMatched)
      return HttpResponse.json(
        {
          message: 'matching_result_fetch_done',
          data: {
            isFirstInterviewer: false,
            isAiInterview: false,
            interviewer: {
              nickname: 'eunice.song',
              name: '송동은',
              curriculum: '인공지능',
              profileImageUrl: '',
              jobInterest: ['프론트엔드 개발자', '백엔드 개발자'],
              techStack: ['Java', 'Javascript'],
              seatCode: 'A-12-L',
            },
            interviewee: {
              nickname: 'joy.lee',
              name: '이주영',
              curriculum: '풀스택',
              profileImageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeiMOk4yAUOjDYIglZphMwDt3E1uO0a-2iw&s',
              jobInterest: ['프론트엔드 개발자', '백엔드 개발자'],
              techStack: ['Java', 'Javascript'],
            },
            interviewId: 'de305d54-75b4-431b-adb2-eb6b9e546014',
          },
        },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
  }),

  // 면접 상태 업데이트
  http.put(API.INTERVIEW.CHANGE_STATUS(':interviewId'), () => {
    return HttpResponse.json({
      message: 'interview_phase_updated',
      data: {
        currentRound: 2,
        currentPhase: 'PROGRESS',
      },
    })
  }),

  // // 질문 생성
  // http.post(API.INTERVIEW.GET_QUESTIONS(':interviewId'), () => {
  //   return HttpResponse.json({
  //     message: 'question_fetch_done',
  //     data: {
  //       questions: [
  //         'Java의 버전별 차이를 설명하시오.',
  //         'Spring Boot와 Spring의 차이를 설명하시오.',
  //         'TCP와 UDP의 차이를 설명하시오.',
  //         'Transaction에 대해 설명하시오.',
  //       ],
  //     },
  //   })
  // }),

  // 질문 선택
  http.post(API.INTERVIEW.PICK_QUESTION(':interviewId'), () => {
    return HttpResponse.json({
      message: 'question_selection_send_done',
      data: null,
    })
  }),

  // 현재 면접 정보 조회
  http.get(API.INTERVIEW.STATUS, () => {
    return HttpResponse.json({
      message: 'interview_phase_fetch_done',
      data: {
        interviewId: 'de305d54-75b4-431b-adb2-eb6b9e546014',
        timeRemain: 382,
        currentRound: 2,
        currentPhase: 'PENDING',
        isInterviewer: false,
        isAiInterview: false,
        partner: {
          nickname: 'joy.lee',
          name: '이주영',
          curriculum: '풀스택',
          profileImageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeiMOk4yAUOjDYIglZphMwDt3E1uO0a-2iw&s',
          jobInterest: ['프론트엔드 개발자'],
          techStack: ['Typescript'],
        },
        questionIdx: 3,
        selectedQuestion: '스레드를 사용했을 때 장단점을 서술하시오.',
        questionOption: [
          '질문선택지1',
          '질문선택지2',
          '질문선택지3',
          '질문선택지4',
        ],
      },
    })
  }),

  // 면접 ID 발급
  http.post(API.AI_INTERVIEW.ID, () => {
    return HttpResponse.json({
      message: 'get_interview_id',
      data: { interviewId: 'id-1234567890temp' },
    })
  }),

  // 면접 종료 및 삭제
  http.delete(API.AI_INTERVIEW.END(':interviewId'), () => {
    return HttpResponse.json({
      message: 'delete_interview_id',
      data: null,
    })
  }),

  // 면접 시간 설정
  http.put(API.AI_INTERVIEW.TIME(':interviewId'), () => {
    return HttpResponse.json({
      message: 'set_interview_time',
      data: null,
    })
  }),

  // 서버에 presigned url 을 요청하는 함수
  http.get(API.PRESIGNED_URL(':filename'), () => {
    return HttpResponse.json({
      message: 'get_presigned_url',
      data: {
        url: 'http//presigned.url',
      },
    })
  }),

  // s3 녹음파일 업로드
  http.put('http//presigned.url', () => {
    return HttpResponse.json({
      message: 'upload_recording_file',
      data: null,
    })
  }),

  // s3 녹음파일 업로드 컨펌
  http.post(API.AI_INTERVIEW.SAVE_RECODING(':filename'), () => {
    return HttpResponse.json({
      message: 'save_recording_s3',
      data: null,
    })
  }),

  // 문제 생성
  http.post(API.AI_INTERVIEW.QUESTION(':interviewId'), () => {
    return HttpResponse.json({
      message: 'get_interview_question',
      data: { question: 'Spring Boot와 Spring의 차이를 설명하시오.' },
    })
  }),

  http.get(API.AI_INTERVIEW.HISTORY(':userId', 10, ':cursor'), () => {
    return HttpResponse.json({
      message: 'interview_history_fetch_done',
      data: {
        history: DUMMY_HISTORY_LIST,
        hasNext: false,
        nextCursor: null,
      },
    })
  }),

  // 피드백 상세 조회
  http.get(API.AI_INTERVIEW.FEEDBACK_LIST(':userId', ':interviewId'), () => {
    return HttpResponse.json({
      message: 'feedback_fetch_done',
      data: DUMMY_HISTORY_DETAIL,
    })
  }),

  // 게시판 리스트 조회
  http.get(API.BOARD.LIST(':orderBy', 10, ':cursor'), ({ params }) => {
    const { orderBy } = params

    const mockPosts = [
      {
        boardId: 'board-1',
        question: 'Spring Boot와 Spring Framework의 차이점을 설명해주세요.',
        authorNickname: 'dev.kim',
        authorProfileImageUrl: '',
        createdAt: '2024-07-20T10:30:00Z',
        viewCnt: 156,
        feedback:
          'Spring Boot는 Spring Framework를 기반으로 한 프레임워크로...',
      },
      {
        boardId: 'board-2',
        question: 'RESTful API 설계 원칙에 대해 설명해주세요.',
        authorNickname: 'frontend.lee',
        authorProfileImageUrl: 'https://picsum.photos/40/40?random=2',
        createdAt: '2024-07-19T14:20:00Z',
        viewCnt: 89,
        feedback: 'RESTful API는 REST 아키텍처 스타일을 따르는...',
      },
      {
        boardId: 'board-3',
        question: 'JavaScript의 클로저(Closure)에 대해 설명해주세요.',
        authorNickname: 'js.master',
        authorProfileImageUrl: 'https://picsum.photos/40/40?random=3',
        createdAt: '2024-07-18T09:15:00Z',
        viewCnt: 234,
        feedback: '클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합...',
      },
    ]

    // 정렬 적용
    const sortedPosts =
      orderBy === 'popular'
        ? [...mockPosts].sort((a, b) => b.viewCnt - a.viewCnt)
        : [...mockPosts].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )

    return HttpResponse.json({
      message: 'board_list_fetch_done',
      data: {
        boardList: sortedPosts,
        hasNext: false,
        nextCursor: null,
      },
    })
  }),

  // 게시판 상세 조회
  http.get(API.BOARD.DETAIL(':boardId'), () => {
    const mockPost = {
      authorNickname: 'dev.kim',
      authorProfileImageUrl: 'https://picsum.photos/40/40?random=1',
      question: 'Spring Boot와 Spring Framework의 차이점을 설명해주세요.',
      modelAnswer:
        'Spring Framework는 Java 기반의 엔터프라이즈 애플리케이션 개발을 위한 포괄적인 프레임워크입니다. Spring Boot는 이를 기반으로 하여 자동 설정, 내장 서버, 스타터 의존성 등을 제공하여 개발 생산성을 크게 향상시킵니다. 주요 차이점으로는 1) 자동 설정: Spring Boot는 애플리케이션에 필요한 설정을 자동으로 구성합니다. 2) 내장 서버: Tomcat, Jetty 등의 서버가 내장되어 있어 별도 설치가 불필요합니다. 3) 스타터 의존성: 관련 라이브러리들을 묶어서 제공하여 의존성 관리를 단순화합니다.',
      score: 4,
      goodPoints:
        '전반적으로 Spring Boot와 Spring Framework의 핵심 차이점을 잘 설명했습니다. 특히 자동 설정과 내장 서버의 장점을 구체적으로 언급한 점이 좋았습니다. 개발 생산성 향상이라는 본질적인 목적을 이해하고 있음을 보여주었습니다.',
      improvements:
        '좀 더 구체적인 예시를 들어 설명하면 더 좋을 것 같습니다. 예를 들어, Spring에서는 web.xml이나 ApplicationContext.xml 설정이 필요하지만 Spring Boot에서는 @SpringBootApplication 어노테이션 하나로 해결된다는 식의 비교 예시를 추가하면 이해도가 높아 보일 것입니다.',
      details:
        'Spring Boot와 Spring Framework에 대한 이해도는 충분해 보입니다. 답변 구조도 논리적이고 체계적이었습니다. 다만 실무 경험이나 구체적인 사용 사례를 추가로 언급한다면 더욱 인상적인 답변이 될 것입니다. 전체적으로 기술적 지식과 이해도가 잘 드러나는 답변이었습니다.',
      authorComment:
        '실제 면접에서 이 질문을 받았는데, 자동 설정과 내장 서버 부분을 강조해서 답변하니 좋은 반응을 얻었습니다. 특히 개발 생산성 향상 측면을 언급하는 것이 중요한 것 같아요. 면접관이 추가로 "그럼 언제 Spring Boot 대신 순수 Spring을 사용해야 할까요?"라고 물어봤는데, 이 부분도 미리 준비해두시면 좋을 것 같습니다.',
      viewCnt: 156,
      createdAt: '2024-07-20T10:30:00Z',
    }

    return HttpResponse.json({
      message: 'board_detail_fetch_done',
      data: mockPost,
    })
  }),

  // 피드백 공유
  http.post(API.BOARD.SHARE(':segmentId'), async () => {
    return HttpResponse.json({
      message: 'feedback_share_done',
      data: {
        boardId: 'board-new-' + Date.now(),
      },
    })
  }),
]
