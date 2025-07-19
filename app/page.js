import LoginCard from "@/components/login_card/LoginCard";

export default function Home() {
  return (
    <div
      className="bg-[url('/images/login-bg.jpg')] bg-cover bg-mid-left
  bg-no-repeat flex h-screen
      flex-col items-center justify-center"
    >
      <LoginCard />
    </div>
  );
}
