import Header from "./Header";
import TaskCard from "./TaskCard";

export default function Home() {
  return (
    <div>
      <Header nome="Seu Nome" />
      <TaskCard />
    </div>
  );
}