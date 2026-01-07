import "./Waves.css";

export default function Waves() {
  return (
    <div className="waves">
      <svg
        viewBox="0 0 900 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          className="wave w1"
          d="M30 60 C 90 20, 150 100, 210 60 S 330 20, 390 60 S 510 100, 570 60 S 690 20, 750 60 S 870 100, 930 60"
        />
        <path
          className="wave w2"
          d="M30 110 C 90 70, 150 150, 210 110 S 330 70, 390 110 S 510 150, 570 110 S 690 70, 750 110 S 870 150, 930 110"
        />
        <path
          className="wave w3"
          d="M30 160 C 90 120, 150 200, 210 160 S 330 120, 390 160 S 510 200, 570 160 S 690 120, 750 160 S 870 200, 930 160"
        />
      </svg>
    </div>
  );
}
