import { auth, signOut } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFIlter from "@/components/filters/HomeFIlter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/route";
import Link from "next/link";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const questions = [
  {
    _id: "1",
    title: "I Want to learn React, how can I start?",
    tags: [
      {
        _id: "1",
        name: "React",
      },
      {
        _id: "2",
        name: "Javascript",
      },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image: `https://picsum.photos/id/1/200/200`,
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: getRandomPastDate(),
  },
  {
    _id: "2",
    title: "I Want to learn TypeScript, how can I start?",
    tags: [
      {
        _id: "3",
        name: "TypeScript",
      },
      {
        _id: "4",
        name: "Javascript",
      },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      image: `https://picsum.photos/id/2/200/200`,
    },
    upvotes: 8,
    answers: 3,
    views: 80,
    createdAt: getRandomPastDate(),
  },
  {
    _id: "3",
    title: "I Want to learn HTML, how can I start?",
    tags: [
      {
        _id: "5",
        name: "HTML",
      },
    ],
    author: {
      _id: "3",
      name: "Bob Johnson",
      image: `https://picsum.photos/id/3/200/200`,
    },
    upvotes: 6,
    answers: 2,
    views: 60,
    createdAt: getRandomPastDate(),
  },
];

function getRandomPastDate(): Date {
  const minDate = new Date(2020, 0, 1);
  const maxDate = new Date();
  const randomTime = new Date(
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()),
  );
  return randomTime;
}

const Page = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());

    const matchesFilter = filter
      ? question.tags.some(
          (tag) => tag.name.toLowerCase() === filter.toLowerCase(),
        )
      : true;

    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-11.5 px-4 py-3 text-light-900!"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Questions</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
          route="/"
        />
      </section>
      <HomeFIlter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Page;
