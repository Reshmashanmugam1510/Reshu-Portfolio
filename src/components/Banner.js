import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-Img.webp";
import { ArrowRightCircle, Github, Linkedin, Twitter, Envelope, Telegram, ChatDots } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const contactItems = [
    { title: "Github", url: "https://github.com/Reshmashanmugam1510", Icon: Github },
    { title: "LinkedIn", url: "https://www.linkedin.com/in/reshma-shanmugam-3928812a5", Icon: Linkedin },
    { title: "Twitter", url: "https://x.com/Reshma615615?t=REpIooCvS661wdP4-3S4TA&s=09", Icon: Twitter },
    { title: "E-mail", url: "mailto:reshmashanmugam1234@gmail.com", Icon: Envelope },
    { title: "Telegram", url: "https://t.me/Reshma1510", Icon: Telegram },
    { title: "Discord", url: "#", Icon: ChatDots }, // replace url with actual Discord invite if available
  ];

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>

                {/* Updated intro */}
                <h1 style={{marginTop:12, marginBottom:12, lineHeight:1.2}}>
                  Hello! I'm Reshma,
                </h1>
                <p style={{color:"#efe8e8ff", marginBottom:12}}>
                  I'm a passionate B.Tech IT student at Jaya Engineering College. My journey in technology revolves around frontend development, focused on crafting engaging user experiences.
                  Proficient in HTML, CSS, JavaScript, and React.js, I've worked on responsive websites and dynamic web applications. Outside of coding, I enjoy exploring nature, reading, and connecting with fellow tech enthusiasts. With a curiosity to learn and a drive to innovate, I'm eager to embark on new challenges and contribute positively to the world of technology.
                </p>

                <div style={{marginBottom:14, fontWeight:500}}>Let's connect ❤</div>

                <div style={{display:"flex", gap:12, alignItems:"center", marginBottom:18, flexWrap:"wrap"}}>
                  {contactItems.map((item, i) => {
                    const Icon = item.Icon;
                    return (
                      <a
                        key={i}
                        href={item.url}
                        title={item.title}
                        aria-label={item.title}
                        target={item.url.startsWith("mailto:") ? "_self" : "_blank"}
                        rel={item.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: 72,
                        }}
                      >
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, rgba(58,123,213,0.12), rgba(131,58,180,0.12))",
                            boxShadow: "0 6px 20px rgba(99,102,241,0.08), inset 0 -2px 6px rgba(255,255,255,0.02)",
                            transition: "transform 160ms ease, box-shadow 160ms ease",
                            backdropFilter: "blur(6px)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(-6px) scale(1.03)";
                            el.style.boxShadow = "0 14px 36px rgba(99,102,241,0.18)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget;
                            el.style.transform = "translateY(0) scale(1)";
                            el.style.boxShadow = "0 6px 20px rgba(99,102,241,0.08), inset 0 -2px 6px rgba(255,255,255,0.02)";
                          }}
                        >
                          <Icon size={24} color="#7c7cff" />
                        </div>
                        <span style={{fontSize:12, color:"#bdbedf", marginTop:8, textAlign:"center"}}>{item.title}</span>
                      </a>
                    )
                  })}
                </div>

                <button onClick={() => window.location.href = 'mailto:reshmashanmugam1234@gmail.com'}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
