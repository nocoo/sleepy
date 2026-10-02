export function Scene() {
  return (
    <div className="landscape" aria-hidden="true">
      <div className="moon-halo" />
      <div className="moon-disc" />
      <div className="moon-caption">
        今夜的月光
        <br />
        也轻轻落在你身上
      </div>
      <svg
        className="mountains"
        viewBox="0 0 1600 640"
        preserveAspectRatio="xMidYMax slice"
      >
        <title>远山</title>
        <defs>
          <linearGradient id="distant-ink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="near-ink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.10" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.015" />
          </linearGradient>
        </defs>
        <path
          d="M0 470C120 469 203 492 307 461S505 399 603 419C704 440 754 337 844 358S939 282 1003 310C1065 337 1095 217 1166 229C1244 241 1244 170 1328 195S1446 124 1516 165L1600 181V640H0Z"
          fill="url(#distant-ink)"
        />
        <path
          d="M0 540C187 528 248 590 414 537S610 519 723 472C824 429 922 463 1036 396S1166 420 1307 343C1439 272 1495 311 1600 250V640H0Z"
          fill="url(#near-ink)"
        />
        <path
          d="M0 600C216 579 367 601 559 569S839 559 1037 511C1231 464 1409 494 1600 437V640H0Z"
          fill="currentColor"
          opacity="0.035"
        />
        <path
          d="M899 512C1081 488 1274 484 1469 457"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.07"
        />
      </svg>
      <div className="horizon-line" />
    </div>
  );
}
