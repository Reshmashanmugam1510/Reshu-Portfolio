import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import colorSharp from "../assets/img/color-sharp.png"
import TrackVisibility from 'react-on-screen';

export const Skills = () => {
  // new skill list with levels and optional small note
  const skills = [
    { name: "JavaScript", level: 85, img: meter1 },
    { name: "CSS", level: 90, img: meter2 },
    { name: "React.js", level: 80, img: meter3 },
    { name: "HTML5", level: 95, img: meter1 },
    { name: "Figma", level: 75, img: meter2 },
    { name: "Python", level: 60, img: meter3 },
    { name: "C", level: 70, img: meter1 },
    { name: "Node.js", level: 65, img: meter2 }
  ];

  // SVG ring helpers
  const R = 36;
  const C = 2 * Math.PI * R;

  return (
    <section
      className="skill"
      id="skills"
      style={{
        padding: "60px 0",
        background: "linear-gradient(180deg, #ffd1e8 0%, #f7d6ff 100%)" // removed any white, soft girly gradient
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""} style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ color: "#c2185b", fontWeight: 900, textShadow: "0 0 12px rgba(194,24,91,0.25)" }}>Skills</h2>
                  <p style={{ color: "#7a3a66", maxWidth: 740, margin: "8px auto 28px", fontSize: 14 }}>
                    Soft pastels, pinks and purples — a cute girly vibe with gentle glows. Hover a card to lift it like a little heart.
                  </p>

                  {/* skills grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
                    {skills.map((s, idx) => {
                      const offset = C - (s.level / 100) * C;
                      return (
                        <div
                          key={idx}
                          style={{
                            padding: 18,
                            borderRadius: 18,
                            background: "linear-gradient(135deg, rgba(255,192,203,0.22), rgba(221,160,221,0.18))",
                            border: "1px solid rgba(194,24,91,0.16)",
                            boxShadow: "0 18px 40px rgba(194,24,91,0.12), inset 0 0 14px rgba(255,192,203,0.06)",
                            transition: "transform 180ms ease, box-shadow 180ms ease, border 180ms ease",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 12,
                            minHeight: 180,
                            position: "relative",
                            overflow: "hidden"
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(-10px) scale(1.025)";
                            el.style.boxShadow = "0 30px 80px rgba(194,24,91,0.22), 0 0 40px rgba(221,160,221,0.12), inset 0 0 22px rgba(255,192,203,0.08)";
                            el.style.border = "1px solid rgba(194,24,91,0.32)";
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(0) scale(1)";
                            el.style.boxShadow = "0 18px 40px rgba(194,24,91,0.12), inset 0 0 14px rgba(255,192,203,0.06)";
                            el.style.border = "1px solid rgba(194,24,91,0.16)";
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                            <svg width={92} height={92} viewBox="0 0 92 92" style={{ display: "block" }}>
                              <defs>
                                <linearGradient id={`g${idx}`} x1="0" x2="1" y1="0" y2="1">
                                  <stop offset="0%" stopColor="#ffb6c1" />
                                  <stop offset="100%" stopColor="#dda0dd" />
                                </linearGradient>
                              </defs>
                              <g transform="translate(46,46)">
                                {/* subtle pastel background circle (no white) */}
                                <circle r={R} fill="rgba(255,182,193,0.06)" stroke="rgba(194,24,91,0.06)" strokeWidth="8" />
                                <circle
                                  r={R}
                                  fill="transparent"
                                  stroke={`url(#g${idx})`}
                                  strokeWidth="8"
                                  strokeDasharray={C}
                                  strokeDashoffset={offset}
                                  strokeLinecap="round"
                                  style={{ transition: "stroke-dashoffset 800ms ease", filter: "drop-shadow(0 0 6px rgba(194,24,91,0.32))" }}
                                  transform="rotate(-90)"
                                />
                                <text x="0" y="6" textAnchor="middle" fontSize="14" fill="#9b0f4a" fontWeight="700" style={{ textShadow: "0 0 10px rgba(194,24,91,0.3)" }}>{s.level}%</text>
                              </g>
                            </svg>

                            <div style={{ fontWeight: 800, color: "#9b0f4a", fontSize: 16, textShadow: "0 0 8px rgba(194,24,91,0.18)" }}>{s.name}</div>
                            <div style={{ fontSize: 12, color: "#7a3a66", display: "flex", alignItems: "center", gap: 6 }}>
                              <img src={s.img} alt="" style={{ width: 18, height: 18, verticalAlign: "middle", filter: "hue-rotate(300deg) saturate(160%) brightness(1.1)" }} />
                              <span style={{ opacity: 0.9 }}>cute</span>
                            </div>
                          </div>

                          {/* little decorative heart in the bottom-right corner */}
                          <div style={{
                            position: "absolute",
                            right: 10,
                            bottom: 10,
                            fontSize: 18,
                            color: "#ff6fa3",
                            textShadow: "0 0 6px rgba(255,111,163,0.18)",
                            pointerEvents: "none"
                          }}>❤</div>
                        </div>
                      )
                    })}
                  </div>
                </div>}
            </TrackVisibility>
          </div>
        </div>
      </div>

      <img className="background-image-left" src={colorSharp} alt="decorative color background" style={{ filter: "hue-rotate(-10deg) saturate(120%)" }} />
    </section>
  )
}
