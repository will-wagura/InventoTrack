// src/components/FAQs.js
import { useState } from "react";
import "./FAQs.css";

function FAQs() {
  const faqs = [
    {
      question: "What is InventoTrack?",
      answer:
        "InventoTrack is a comprehensive inventory management solution designed for small and large Shops. It helps streamline stock control, item tracking, and supply chain management.",
    },
    {
      question: "How do I get started with InventoTrack?",
      answer:
        "Getting started is easy! Simply sign up for an account on our website, and you'll be guided through the setup process. You can then start adding your inventory items and customizing your dashboard.",
    },
    {
      question: "Is InventoTrack suitable for my business?",
      answer:
        "InventoTrack is designed to be flexible and scalable, making it suitable for a wide range of businesses. Whether you're a small startup or a growing enterprise, our features can be tailored to meet your specific needs.",
    },
    {
      question: "What kind of support does InventoTrack offer?",
      answer:
        "We offer comprehensive support including detailed documentation, video tutorials, email support, and live chat during business hours. Our team is always ready to assist you with any questions or issues you may have.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqs">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span
                className={`arrow ${activeIndex === index ? "active" : ""}`}
              >
                ▼
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
