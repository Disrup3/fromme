import {
  IconDefinition,
  faHome,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Question {
  question: string;
  answer: string;
}

interface SubPage {
  title: string;
  icon: IconDefinition;
  questions: Question[];
}

const HowItWorks = () => {
  const [currentCategory, setCurrentCategory] = useState("General");
  const FAQS: SubPage[] = [
    {
      title: "General",
      icon: faHome,
      questions: [
        {
          question: "What is NFT?",
          answer:
            "An NFT is a non-fungible token. A digital asset that represents real-world objects like art, music, in-game items and videos. They are bought and sold online, frequently with cryptocurrency, and they are generally encoded with the same underlying software as many cryptos.",
        },
        {
          question: "Blockchain 101",
          answer:
            "It is a technology based on blocks of decentralized and public operations. This technology generates a shared database that is accessible to its participants, who can track every transaction they have made. It is like a large, unmodifiable, shared ledger that is written simultaneously by a large number of computers. The difference between blockchain and a centralized network (a traditional server that stores data) is that the blockchain network runs on multiple computers distributed around the world and not at a single site. This makes the blockchain network present a number of advantages such as privacy, decentralization or non-dependence on a centralized executor or security.",
        },
        {
          question: "About Smart Contracts",
          answer:
            "A smart contract is a program that lives in a system not controlled by any of the parties, or their agents, and that executes an automatic contract which works like an if-then statement of any other computer program. The difference is that it is performed in a way that interacts with real assets. When a pre-programmed condition is triggered, not subject to any human judgement, the smart contract executes the corresponding contract clause. They aim to provide superior security to traditional contract law and reduce transaction costs associated with contracting.",
        },
      ],
    },
    {
      title: "Products",
      icon: faPen,
      questions: [
        {
          question: "What items Can I upload?",
          answer:
            "From a photo that no one has seen to the first draft of that lyric that launched you to success or a video that will make your followers go crazy. Upload it in any format and we'll make it unique.",
        },
      ],
    },
  ];

  const faqsByCategory = FAQS.filter(
    (subPage) => subPage.title === currentCategory
  );
  const renderedFaqs = faqsByCategory.map((subPage) =>
    subPage.questions.map((faq, index) => (
      <div
        key={index}
        className="collapse-arrow collapse rounded-none border-y"
      >
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-bold text-slate-600">
          {faq.question}
        </div>
        <div className="collapse-content text-slate-500">
          <p>{faq.answer}</p>
        </div>
      </div>
    ))
  );
  return (
    <div
      className="mx-5 flex flex-col
      items-center justify-center
      gap-20 sm:gap-10
      md:mx-10 md:flex-row"
    >
      <div
        className="flex w-full flex-col rounded-xl p-4
        shadow-xl sm:w-5/6 md:w-2/6 lg:w-3/12 xl:w-1/6"
      >
        {FAQS.map((category, index) => (
          <button
            key={index}
            onClick={() => setCurrentCategory(category.title)}
            className={`flex items-center gap-2 py-3 pl-4
              ${
                currentCategory == category.title
                  ? "rounded-xl bg-base-200 text-primary"
                  : ""
              }`}
          >
            <FontAwesomeIcon icon={category.icon} />
            <p>{category.title}</p>
          </button>
        ))}
      </div>
      <div className="w-full sm:w-5/6 md:w-4/6 lg:w-2/6">{renderedFaqs}</div>
    </div>
  );
};

export default HowItWorks;
