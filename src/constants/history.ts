export const DUMMY_HISTORY_LIST: HistoryListData[] = [
  {
    id: '1',
    createdAt: '6월 12일',
    firstQuestion: 'SQL에서 INNER JOIN과 LEFT JOIN의 차이점은?',
    questionCount: 1,
    duration: 5,
    hasFeedback: false,
    isFeedbackRequested: true,
  },

  {
    id: '2',
    createdAt: '6월 12일',
    firstQuestion: 'RESTful API에서 리소스 생성에 사용되는 HTTP 메서드는?',
    questionCount: 5,
    duration: 15,
    hasFeedback: true,
    isFeedbackRequested: true,
  },
]

export const DUMMY_HISTORY_DETAIL: FeedbackPageData = {
  createdAt: '2025.06.10',
  duration: 25,
  recordingUrl: 'https://example.com/recording/1',
  feedback: [
    {
      segmentId: '1',
      question: 'Docker에서 이미지와 컨테이너의 관계는?',
      modelAnswer:
        '교차 검증은 머신러닝 모델의 성능을 평가하기 위해 사용되는 기법입니다. 모델이 학습 데이터에 과적합되는 것을 방지하고, 새로운 데이터에 대한 일반화 성능을 추정하는 데 도움이 됩니다. K-Fold 교차 검증은 데이터셋을 K개의 부분집합으로 나누고, 각 부분집합을 한 번씩 검증 데이터로 사용하며 나머지 K-1개 부분집합을 학습 데이터로 사용하여 모델을 K번 학습하고 평가합니다. 최종 성능은 K번의 평가 결과를 평균하여 계산합니다. 이를 통해 전체 데이터를 효율적으로 활용하고 안정적인 성능 추정치를 얻을 수 있습니다. 예를 들어 5-Fold 교차 검증에서는 데이터를 5개의 폴드로 나누고 각 폴드에 대해 한 번씩 모델을 학습하고 평가하여 5개의 성능 점수를 얻고 이를 평균하여 최종 성능을 계산합니다. K값은 데이터 크기와 특성에 따라 적절히 선택해야 합니다.',
      score: 1,
      goodPoints: '면접자가 새로운 기술을 배우려는 의지는 긍정적입니다.',
      improvements:
        '교차 검증의 개념, 필요성, K-Fold 교차 검증 수행 방법에 대한 이해가 부족합니다. 면접 질문에 대한 핵심 내용을 제대로 파악하지 못하고 적절한 답변을 하지 못했습니다.',
      details:
        '기술적인 질문에 대해 명확하고 간결하게 답변하는 연습이 필요하며, 면접 전에 질문과 관련된 핵심 개념을 충분히 숙지해야 합니다. 또한, 횡설수설하는 부분 없이 질문의 요지를 정확하게 이해하고 답변하는 능력을 향상시켜야 합니다. 기술적인 역량과 면접 준비가 미흡하며, 추가적인 학습과 훈련이 필요합니다.',
      startAt: 480,
      endAt: 600,
    },
    {
      segmentId: '2',
      question: 'CORS(Cross-Origin Resource Sharing) 에러가 발생하는 이유는?',
      modelAnswer:
        '마이크로서비스 아키텍처에서 Circuit Breaker 패턴은 서비스 간 통신 실패가 연쇄적으로 전파되는 것을 방지하여 시스템 안정성을 확보하는 데 중요한 역할을 합니다. Circuit Breaker는 마치 전기 회로 차단기처럼 작동하여, 특정 서비스 호출이 반복적으로 실패하면 해당 서비스로의 추가 호출을 일시적으로 차단합니다. 이를 통해 장애가 발생한 서비스에 대한 부하를 줄여 복구 시간을 확보하고, 다른 서비스들이 정상적으로 작동할 수 있도록 합니다. Circuit Breaker는 일반적으로 Closed, Open, Half-Open 세 가지 상태를 갖습니다. Closed 상태에서는 모든 요청이 정상적으로 처리됩니다. 하지만 설정된 임계치(예: 일정 시간 내 실패 횟수)를 초과하면 Circuit Breaker는 Open 상태로 전환되어 이후의 모든 요청을 즉시 차단하고 예외를 반환합니다. 일정 시간이 지난 후 Circuit Breaker는 Half-Open 상태로 전환되어 제한된 수의 요청만 통과시킵니다. 이때 요청이 성공하면 Circuit Breaker는 Closed 상태로 복귀하고, 실패하면 다시 Open 상태로 전환됩니다. 이러한 방식으로 Circuit Breaker는 장애 전파를 효과적으로 방지하고 시스템의 안정적인 운영을 지원합니다. Netflix Hystrix, Resilience4j와 같은 라이브러리를 사용하여 Circuit Breaker를 구현할 수 있으며, Spring Cloud Circuit Breaker와 같은 프레임워크를 활용하여 보다 쉽게 통합할 수 있습니다.',
      score: 2,
      goodPoints:
        '서킷 브레이커 패턴을 활용하여 장애 전파를 방지한다는 기본적인 개념은 이해하고 있는 것 같습니다.',
      improvements:
        '답변이 매우 간략하고, Circuit Breaker의 작동 방식, 상태 전환, 구현 방법 등 핵심적인 내용이 거의 설명되지 않았습니다. Closed, Open, Half-Open 상태에 대한 설명과 각 상태의 역할, 상태 전환의 조건 및 과정을 자세히 설명해야 합니다.',
      details:
        '실제 구현에 사용되는 라이브러리나 프레임워크(예: Netflix Hystrix, Resilience4j, Spring Cloud Circuit Breaker)를 언급하고, 이를 어떻게 활용할 수 있는지에 대한 설명을 추가하면 좋습니다. 면접 질문의 의도를 정확히 파악하고 핵심적인 내용을 중심으로 답변을 구성하는 연습이 필요합니다. Circuit Breaker 패턴을 실제로 적용해본 경험을 바탕으로 답변을 구성했다면 더욱 좋았을 것입니다. 면접 질문에 대한 깊이 있는 이해와 실제 적용 경험을 바탕으로 답변을 구성하는 능력을 더욱 향상시켜야 합니다.',
      startAt: 600,
      endAt: 720,
    },
  ],
}
