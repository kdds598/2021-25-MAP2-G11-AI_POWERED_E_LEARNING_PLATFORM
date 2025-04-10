import React from 'react'
import "../Styles/Style.css"
import pic1 from "../assets/images/user-1.png"
import pic2 from "../assets/images/user-2.jpeg"
import pic3 from "../assets/images/user-3.png"
import b1 from "../assets/images/hero-banner-1.jpg"
import b2 from "../assets/images/hero-banner-2.jpg"
import b3 from "../assets/images/hero-shape-2.png"
import b4 from "../assets/images/category-1.svg"
import b5 from "../assets/images/category-2.svg"
import b6 from "../assets/images/category-3.svg"
import b7 from "../assets/images/category-4.svg"
import a1 from "../assets/images/about-banner.jpg"
import a2 from "../assets/images/about-shape-2.svg"
import a3 from "../assets/images/about-shape-3.png"
import a4 from "../assets/images/about-shape-4.svg"
import s1 from "../assets/images/video-shape-1.png"
import s2 from "../assets/images/video-shape-2.png"
import t1 from "../assets/images/ai-learning.jpg"
import t2 from "../assets/images/ai-chatbot.png"
import t3 from "../assets/images/ai-personalized.png"
import b9 from "../assets/images/blog-shape.png"
import Footer from './Footer'

export default function Home() {
  return (
    <div 
    className='entry'
    >
<div>
  
  <main>
    <article>
      <section className="section hero has-bg-image" id="home" aria-label="home" style={{}}>
        <div className="container">
          <div className="hero-content">
            <h1 className="h1 section-title">
              The Ultimate <span className="span">AI-Powered</span> Learning Experience
            </h1>
            <p className="hero-text">
              "Unlock the power of AI-driven education with real-time lecture transcriptions and an intelligent chatbot for seamless learning."
            </p>
            <a href="#" className="btn has-before a">
              <span className="span">Explore More</span>
              <ion-icon name="arrow-forward-outline" aria-hidden="true" />
            </a>
          </div>
          <figure className="hero-banner">
            <div className="img-holder one" style={{"--width":"270","--height":"300"}}>
              <img src={b1} width={270} height={300} alt="hero banner" className="img-cover img" />
            </div>
            <div className="img-holder two" style={{"--width":"240","--height":"370"}}>
              <img src={b2} width={240} height={370} alt="hero banner" className="img-cover img" />
            </div>
            <img src={b3} width={622} height={551} alt className="shape hero-shape-2 img" />
          </figure>
        </div>
      </section>
      {/* CATEGORY */}
      <section className="section category" aria-label="category">
        <div className="container">
          <p className="section-subtitle">Categories</p>
          <h2 className="h2 section-title">
            📚 AI-Powered <span className="span">Learning</span> Modules.
          </h2>
          <p className="section-text">
            "Revolutionizing education with AI-powered tools for smarter, faster, and more accessible learning."
          </p>
          <ul className="grid-list">
            <li>
              <div className="category-card" style={{"--color":"170, 75%, 41%"}}>
                <div className="card-icon">
                  <img src={b4} width={40} height={40} loading="lazy" alt="AI-Generated Lecture Summaries" className="img" />
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title a">AI-Generated Lecture Summaries</a>
                </h3>
                <p className="card-text">
                  <br />Get concise, AI-powered summaries of your lectures for quick revision.
                </p>
              </div>
            </li>
            <li>
              <div className="category-card" style={{"--color":"351, 83%, 61%"}}>
                <div className="card-icon">
                  <img src={b5} width={40} height={40} loading="lazy" alt="Smart Q&A Chatbots" className="img" />
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title a">Smart Q&amp;A Chatbot</a>
                </h3>
                <p className="card-text">
                  <br />Ask questions and receive instant, context-aware answers from our AI assistant.
                </p>
              </div>
            </li>
            <li>
              <div className="category-card" style={{"--color":"229, 75%, 58%"}}>
                <div className="card-icon">
                  <img src={b6} width={40} height={40} loading="lazy" alt="Interactive Study Sessions" className="img" />
                </div>
                <h3 className="h3">
                  <a href="#" className="card-title a">Interactive Study Sessions</a>
                </h3>
                <p className="card-text">
                  Learn with a mix of video lectures, AI-generated notes, and interactive quizzes.
                </p>
              </div>
            </li>
            <li>
              <div className="category-card" style={{"--color":"42, 94%, 55%"}}>
                <div className="card-icon">
                  <img src={b7} width={40} height={40} loading="lazy" alt="Video Transcription Learning" className="img" />
                </div>
                <h3 className="h3">
                  <a href="#" className="a card-title">Video Transcription Learning</a>
                </h3>
                <p className="card-text">
                  Watch educational videos with real-time transcriptions and search functionality.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* ABOUT */}
      <section className="section about" id="about" aria-label="about">
        <div className="container">
          <figure className="about-banner">
            <div className="img-holder" style={{"--width":"520","--height":"370"}}>
              <img src={a1} width={520} height={370} loading="lazy" alt="about banner" className="img-cover img" />
            </div>
            <img src={a2} width={371} height={220} loading="lazy" alt className="shape about-shape-2 img" />
            <img src={a3} width={722} height={528} loading="lazy" alt className="shape about-shape-3 img" />
          </figure>
          <div className="about-content">
            <p className="section-subtitle">About Us</p>
            <h2 className="h2 section-title">
              "Transforming Education with <span className="span">AI-Driven Learning</span> Solutions for the Future"
            </h2>
            <p className="section-text">
              Enhancing education with cutting-edge AI technology for seamless and interactive learning experiences.
            </p>
            <ul className="about-list">
              <li className="about-item">
                <ion-icon name="checkmark-done-outline" aria-hidden="true" />
                <span className="span"> AI-Powered Expert Assistance</span>
              </li>
              <li className="about-item">
                <ion-icon name="checkmark-done-outline" aria-hidden="true" />
                <span className="span">Smart Online Learning Platform</span>
              </li>
              <li className="about-item">
                <ion-icon name="checkmark-done-outline" aria-hidden="true" />
                <span className="span"> Unlimited Access to Transcripts &amp; Chatbot Support</span>
              </li>
            </ul>
            <img src={a4} width={100} height={100} loading="lazy" alt className="shape about-shape-4 img" />
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="section course" id="testimonials" aria-label="testimonials">
        <div className="container">
          <p className="section-subtitle">What Our Learners Say</p>
          <h2 className="h2 section-title">Hear from Our Students</h2>
          <ul className="grid-list">
            <li>
              <div className="course-card">
                <figure className="card-banner img-holder" style={{"--width":"370","--height":"220"}}>
                  <img src={pic3} width={370} height={200} loading="lazy" alt="Rehan Khan - Testimonial" className="img-cover img" />
                </figure>
                <div className="card-content">
                  <span className="badge">Computer Science Student</span>
                  <h3 className="h3">Rishi Raj Sharma</h3>
                  <p className="rating-text">
                    "The AI-powered transcription feature saves me hours of rewatching lectures. Now, I can quickly find what I need!"
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="course-card">
                <figure className="card-banner img-holder" style={{"--width":"370","--height":"220"}}>
                  <img src={pic2} width={370} height={220} loading="lazy" alt="Raj Yadav - Testimonial" className="img-cover img" />
                </figure>
                <div className="card-content">
                  <span className="badge">MBA Aspirant</span>
                  <h3 className="h3">Raj Yadav</h3>
                  <p className="rating-text">
                    "The chatbot is amazing! It answers my questions instantly, making learning much more interactive."
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="course-card">
                <figure className="card-banner img-holder" style={{"--width":"370","--height":"220"}}>
                  <img src={pic1} width={370} height={220} loading="lazy" alt="RishiRaj Sharma - Testimonial" className="img-cover img" />
                </figure>
                <div className="card-content">
                  <span className="badge">Engineering Student</span>
                  <h3 className="h3">Rehan Khan</h3>
                  <p className="rating-text">
                    "This platform has completely changed the way I study. AI-driven insights help me focus on key concepts effortlessly."
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <a href="#" className="btn has-before a">
            <span className="span">Read More Testimonials</span>
            <ion-icon name="arrow-forward-outline" aria-hidden="true" />
          </a>
        </div>
      </section>
      {/* VIDEO */}
      <section className="video has-bg-image" aria-label="video" style={{}}>
        <div className="container">
          <div className="video-card">
            <img src={s1} width={1089} height={605} loading="lazy" alt className="shape video-shape-1 img" />
            <img src={s2} width={158} height={174} loading="lazy" alt className="shape video-shape-2 img" />
          </div>
        </div>
      </section>
      {/* STATE */}
      <section className="section stats" aria-label="stats">
        <div className="container">
          <ul className="grid-list">
            <li>
              <div className="stats-card" style={{"--color":"170, 75%, 41%"}}>
                <h3 className="card-title">10K+</h3>
                <p className="card-text">Lectures Transcribed</p>
              </div>
            </li>
            <li>
              <div className="stats-card" style={{"--color":"351, 83%, 61%"}}>
                <h3 className="card-title">5K+</h3>
                <p className="card-text">Students Benefited</p>
              </div>
            </li>
            <li>
              <div className="stats-card" style={{"--color":"260, 100%, 67%"}}>
                <h3 className="card-title">95%</h3>
                <p className="card-text">Accuracy Rate</p>
              </div>
            </li>
            <li>
              <div className="stats-card" style={{"--color":"42, 94%, 55%"}}>
                <h3 className="card-title">24/7</h3>
                <p className="card-text">AI Chatbot Support</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* BLOG */}
      <section className="section blog has-bg-image" id="blog" aria-label="blog" style={{}}>
        <div className="container">
          <p className="section-subtitle">Latest Insights</p>
          <h2 className="h2 section-title">Stay Updated With AI in Education</h2>
          <ul className="grid-list">
            <li>
              <div className="blog-card">
                <figure className="card-banner img-holder has-after" style={{"--width":"370","--height":"370"}}>
                  <img src={t1} width={370} height={370} loading="lazy" alt="How AI is Revolutionizing Online Learning" className="img-cover img" />
                </figure>
                <div className="card-content">
                  <a href="#" className="card-btn a" aria-label="read more">
                    <ion-icon name="arrow-forward-outline" aria-hidden="true" />
                  </a>
                  <a href="#" className="card-subtitle a">AI &amp; Education</a>
                  <h3 className="h3">
                    <a href="#" className="card-title a">How AI is Revolutionizing Online Learning</a>
                  </h3>
                  <ul className="card-meta-list">
                    <li className="card-meta-item">
                      <ion-icon name="calendar-outline" aria-hidden="true" />
                      <span className="span">Feb 20, 2025</span>
                    </li>
                    <li className="card-meta-item">
                      <ion-icon name="chatbubbles-outline" aria-hidden="true" />
                      <span className="span">12 Comments</span>
                    </li>
                  </ul>
                  <p className="card-text">
                    Discover how AI-driven tools enhance student learning, automate grading, and personalize courses.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="blog-card">
                <figure className="card-banner img-holder has-after" style={{"--width":"370","--height":"370"}}>
                  <img src={t2} width={370} height={370} loading="lazy" alt="The Role of AI Chatbots in Smart Education" className="img-cover img" />
                </figure>
                <div className="card-content">
                  <a href="#" className="card-btn a" aria-label="read more">
                    <ion-icon name="arrow-forward-outline" aria-hidden="true" />
                  </a>
                  <a href="#" className="card-subtitle a">AI Chatbots</a>
                  <h3 className="h3">
                    <a href="#" className="card-title a">The Role of AI Chatbots in Smart Education</a>
                  </h3>
                  <ul className="card-meta-list">
                    <li className="card-meta-item">
                      <ion-icon name="calendar-outline" aria-hidden="true" />
                      <span className="span">Feb 15, 2025</span>
                    </li>
                    <li className="card-meta-item">
                      <ion-icon name="chatbubbles-outline" aria-hidden="true" />
                      <span className="span">8 Comments</span>
                    </li>
                  </ul>
                  <p className="card-text">
                    Explore how AI-powered chatbots assist students with instant support and interactive learning experiences.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="blog-card">
                <figure className="card-banner img-holder has-after" style={{"--width":"370","--height":"370"}}>
                  <img src={t3} width={370} height={370} loading="lazy" alt="Personalized Learning with AI-Powered Systems" className="img-cover img" />
                </figure>
                <div className="card-content">
                  <a href="#" className="card-btn a" aria-label="read more">
                    <ion-icon name="arrow-forward-outline" aria-hidden="true" />
                  </a>
                  <a href="#" className="card-subtitle a">AI &amp; Learning</a>
                  <h3 className="h3">
                    <a href="#" className="card-title a">Personalized Learning with AI-Powered Systems</a>
                  </h3>
                  <ul className="card-meta-list">
                    <li className="card-meta-item">
                      <ion-icon name="calendar-outline" aria-hidden="true" />
                      <span className="span">Feb 10, 2025</span>
                    </li>
                    <li className="card-meta-item">
                      <ion-icon name="chatbubbles-outline" aria-hidden="true" />
                      <span className="span">10 Comments</span>
                    </li>
                  </ul>
                  <p className="card-text">
                    Learn how AI adapts learning experiences to individual student needs for better academic outcomes.
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <img src={b9} width={186} height={186} loading="lazy" alt className="shape blog-shape img" />
        </div>
      </section>
      <a href="#top" className="back-top-btn a" aria-label="back top top" data-back-top-btn>
        <ion-icon name="chevron-up" aria-hidden="true" />
      </a>
    
    </article></main></div>
      <Footer/>
    </div>
  )
}
