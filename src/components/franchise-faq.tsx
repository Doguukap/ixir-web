"use client";

import { useState } from "react";
import { franchiseInvitation, franchiseQuestions } from "@/lib/franchise-content";

export default function FranchiseFaq() {
  const [active, setActive] = useState<string | null>(franchiseQuestions[0].id);
  return <section className="franchise-faq" aria-labelledby="franchise-faq-title">
    <div className="franchise-faq-intro"><p className="treatment-eyebrow">BİRLİKTE BÜYÜYELİM</p><h2 id="franchise-faq-title">İş ortaklığına<br/><em>ilk adım.</em></h2><p>İxir’i, sunduğumuz destekleri ve franchising koşullarımızı yakından tanıyın.</p></div>
    <div className="franchise-question-list">{franchiseQuestions.map((question, index) => {
      const open = active === question.id;
      return <article className={`franchise-question ${open ? "is-open" : ""}`} key={question.id}>
        <h3><button id={`franchise-question-${question.id}`} type="button" aria-expanded={open} aria-controls={`franchise-answer-${question.id}`} onClick={() => setActive(open ? null : question.id)}><span className="franchise-question-number">{String(index + 1).padStart(2, "0")}</span><span>{question.title}</span><span className="franchise-question-toggle" aria-hidden="true"><span/><span/></span></button></h3>
        <div className="franchise-answer" id={`franchise-answer-${question.id}`} role="region" aria-labelledby={`franchise-question-${question.id}`} aria-hidden={!open} inert={!open}><div className="franchise-answer-clip"><div className="franchise-answer-copy">
          {question.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {question.groups?.map((group, groupIndex) => <div className="franchise-answer-group" key={groupIndex}>{group.title && <h4>{group.title}</h4>}<ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}
          {question.closing && <p>{question.closing}</p>}
          <div className="franchise-answer-invitation"><p>{franchiseInvitation}</p><a href="#franchising-basvuru">Başvuru formuna geçin <span aria-hidden="true">↗</span></a></div>
        </div></div></div>
      </article>;
    })}</div>
  </section>;
}
