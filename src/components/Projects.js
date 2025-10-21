import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav, Card, Button, Form } from "react-bootstrap";
import sampleImg from "../assets/img/img2.png"
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://api.github.com/users/Reshmashanmugam1510/repos?per_page=100", {
          signal: controller.signal
        });
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = await res.json();
        const mapped = data.map(repo => ({
          id: repo.id,
          title: repo.name,
          description: repo.description || repo.language || "Repository",
          // use sample image for all projects
          imgUrl: sampleImg,
          repoUrl: repo.html_url,
          language: repo.language || "Unknown"
        }));
        setProjects(mapped);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
    return () => controller.abort();
  }, []);

  // derived
  const languages = ["All", ...Array.from(new Set(projects.map(p => p.language).filter(Boolean)))];

  const filtered = projects.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesLang = language === "All" ? true : p.language === language;
    return matchesQuery && matchesLang;
  });

  // styles
  const cardStyle = {
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    transition: "transform 160ms ease, box-shadow 160ms ease",
    cursor: "default",
    overflow: "hidden",
    minHeight: 320,
    display: "flex",
    flexDirection: "column",
  };

  const imgStyle = {
    height: 160,
    objectFit: "cover",
    width: "100%",
  };

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2 style={{marginBottom:8}}>Projects</h2>
                <p style={{color:"#6b6b6b", marginBottom:20}}>A selection of public repositories. Use the search and filter to find projects.</p>

                {/* Controls */}
                <Row className="mb-4 align-items-center">
                  <Col md={6} sm={12} className="mb-2">
                    <Form.Control
                      type="search"
                      placeholder="Search projects by name..."
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                    />
                  </Col>
                  <Col md={3} sm={6} className="mb-2">
                    <Form.Select value={language} onChange={e => setLanguage(e.target.value)}>
                      {languages.map((lang, idx) => <option key={idx} value={lang}>{lang}</option>)}
                    </Form.Select>
                  </Col>
                  <Col md={3} sm={6} className="text-md-end text-sm-start">
                    <small style={{color:"#8a8a8a"}}>{loading ? "Loading..." : `${filtered.length} project(s)`}</small>
                  </Col>
                </Row>

                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-3 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Featured</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Other</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row className="g-4">
                        {
                          loading ? (
                            <Col><p>Loading repositories...</p></Col>
                          ) : error ? (
                            <Col><p>Error loading repositories: {error}</p></Col>
                          ) : filtered.length === 0 ? (
                            <Col><p>No repositories found.</p></Col>
                          ) : (
                            filtered.map((project, index) => (
                              <Col sm={6} md={4} key={project.id || index}>
                                <Card
                                  style={{
                                    ...cardStyle,
                                    transform: hovered === index ? "translateY(-6px)" : "translateY(0)",
                                    boxShadow: hovered === index ? "0 10px 26px rgba(0,0,0,0.14)" : cardStyle.boxShadow
                                  }}
                                  onMouseEnter={() => setHovered(index)}
                                  onMouseLeave={() => setHovered(null)}
                                  className="h-100"
                                >
                                  <div style={{overflow:"hidden"}}>
                                    <Card.Img variant="top" src={project.imgUrl || sampleImg} alt={project.title} style={imgStyle} />
                                  </div>
                                  <Card.Body style={{flex:1, display:"flex", flexDirection:"column"}}>
                                    <Card.Title style={{fontSize:18, marginBottom:6}}>{project.title}</Card.Title>
                                    <Card.Text style={{flex:1, color:"#555", fontSize:14}}>
                                      {project.description ? (project.description.length > 120 ? project.description.slice(0,120) + "..." : project.description) : "No description"}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                      <small style={{color:"#888"}}>{project.language || "—"}</small>
                                      <Button
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="primary"
                                        size="sm"
                                      >
                                        View Repo
                                      </Button>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))
                          )
                        }
                      </Row>
                    </Tab.Pane>

                    {/* ...existing code for other panes... */}
                    <Tab.Pane eventKey="second">
                      <p>Featured projects — you can mark/filter featured manually later.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>Other projects and experiments.</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
  <img className="background-image-right" src={colorSharp2} alt="decorative color background" />
    </section>
  )
}
