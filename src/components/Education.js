import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Education = () => {
  const [hovered, setHovered] = useState(null);

  const education = [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "Jaya Engineering College",
      period: "2022 - 2026",
      details: "CGPA: 9.05/10",
      description: ""
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Don Bosco Matriculation Higher Secondary School, Erukkanchery",
      period: "2022",
      details: "79%",
      description: ""
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "Don Bosco Matriculation Higher Secondary School, Erukkanchery",
      period: "2020",
      details: "83%",
      description: ""
    }
  ];

  // layout styles (purple neon/glow)
  const sectionStyle = { padding: "50px 0", position: "relative" };
  const titleStyle = { marginBottom: 8, fontWeight: 700, color: "#efeaff", textShadow: "0 2px 10px rgba(142,75,255,0.28)" };
  const subtitleStyle = { color: "#ddcff8", marginBottom: 28 };

  const timelineWrap = { position: "relative", paddingLeft: 24, paddingRight: 24 };

  const verticalLine = {
    position: "absolute",
    left: "50%",
    top: 0,
    width: 6,
    height: "100%",
    background: "linear-gradient(180deg, rgba(142,75,255,0.95) 0%, rgba(179,107,255,0.95) 100%)",
    transform: "translateX(-50%)",
    borderRadius: 6,
    boxShadow: "0 6px 30px rgba(142,75,255,0.22), 0 0 40px rgba(179,107,255,0.08)"
  };

  const itemStyle = (side) => ({
    position: "relative",
    width: "50%",
    padding: "12px 24px",
    boxSizing: "border-box",
    textAlign: side === "left" ? "right" : "left"
  });

  const markerStyle = {
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "radial-gradient(circle at 30% 30%, #ffffff, #b89bff 40%)",
    border: "4px solid rgba(142,75,255,0.95)",
    boxShadow: "0 6px 24px rgba(142,75,255,0.28), 0 0 18px rgba(179,107,255,0.18)",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: 22,
    zIndex: 3
  };

  const cardBase = {
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(10,10,30,0.06), 0 0 18px rgba(142,75,255,0.06)",
    padding: 18,
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))",
    border: "1px solid rgba(142,75,255,0.08)",
    transition: "transform 180ms ease, box-shadow 180ms ease, border 180ms ease"
  };

  const neonHover = {
    transform: "translateY(-8px)",
    boxShadow: "0 18px 60px rgba(142,75,255,0.22), 0 0 40px rgba(179,107,255,0.18)",
    border: "1px solid rgba(142,75,255,0.28)"
  };

  const degreeStyle = { fontSize: 16, fontWeight: 700, color: "#f7f2ff", textShadow: "0 2px 12px rgba(142,75,255,0.22)" };
  const instStyle = { fontSize: 13, color: "#d1c4f6", marginBottom: 8 };
  const descStyle = { fontSize: 14, color: "#efe9ff", lineHeight: 1.45 };

  return (
    <section className="education" id="education" style={sectionStyle}>
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2 style={titleStyle}>Education</h2>
                  <p style={subtitleStyle}>Academic timeline and milestones — a concise history of learning.</p>

                  <div style={timelineWrap}>
                    <div style={verticalLine} />
                    {education.map((item, idx) => {
                      const side = idx % 2 === 0 ? "left" : "right";
                      const isHovered = hovered === idx;
                      return (
                        <div
                          key={idx}
                          style={{ position: "relative", marginBottom: 36 }}
                          onMouseEnter={() => setHovered(idx)}
                          onMouseLeave={() => setHovered(null)}
                        >
                          {/* marker */}
                          <div
                            style={{
                              ...markerStyle,
                              top: 12 + idx * 0,
                              boxShadow: isHovered
                                ? "0 10px 36px rgba(142,75,255,0.34), 0 0 60px rgba(179,107,255,0.22)"
                                : markerStyle.boxShadow
                            }}
                            aria-hidden="true"
                          />

                          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                            {/* left column */}
                            <div style={itemStyle("left")}>
                              {side === "left" && (
                                <div style={{ display: "inline-block", maxWidth: 520 }}>
                                  <div style={{ ...cardBase, ...(isHovered ? neonHover : {}) }}>
                                    <div>
                                      <div style={degreeStyle}>{item.degree}</div>
                                      <div style={instStyle}>{item.institution}</div>
                                      <div style={descStyle}>{item.description}</div>
                                      <div style={{ marginTop: 10, textAlign: "right", color: "#d2c9f8", fontSize: 13 }}>{item.details} | {item.period}</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* right column */}
                            <div style={itemStyle("right")}>
                              {side === "right" && (
                                <div style={{ display: "inline-block", maxWidth: 520 }}>
                                  <div style={{ ...cardBase, ...(isHovered ? neonHover : {}) }}>
                                    <div>
                                      <div style={degreeStyle}>{item.degree}</div>
                                      <div style={instStyle}>{item.institution}</div>
                                      <div style={descStyle}>{item.description}</div>
                                      <div style={{ marginTop: 10, textAlign: "left", color: "#d2c9f8", fontSize: 13 }}>{item.details} | {item.period}</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      <img className="background-image-right" src={colorSharp2} alt="decorative color background" />
    </section>
  );
};
